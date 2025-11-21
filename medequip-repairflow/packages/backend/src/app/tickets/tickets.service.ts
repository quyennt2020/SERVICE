import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import { Quote } from '../entities/quote.entity';
import { PartUsed } from '../entities/part-used.entity';
import { Part } from '../entities/part.entity';
import { Invoice } from '../entities/invoice.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PartsService } from '../parts/parts.service';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
    @InjectRepository(Quote)
    private quotesRepository: Repository<Quote>,
    @InjectRepository(PartUsed)
    private partsUsedRepository: Repository<PartUsed>,
    @InjectRepository(Part)
    private partsRepository: Repository<Part>,
    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
    private partsService: PartsService, // Inject PartsService
  ) { }

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const newTicket = this.ticketsRepository.create(createTicketDto);
    newTicket.ticket_ref = `T-${Date.now()}`;
    newTicket.status = 'Open';
    return this.ticketsRepository.save(newTicket);
  }

  findAll(techId?: number): Promise<Ticket[]> {
    const where: any = {};
    if (techId) {
      where.assigned_tech_id = techId;
    }
    return this.ticketsRepository.find({
      where,
      relations: ['customer', 'equipment', 'assigned_tech'],
      order: { created_at: 'DESC' },
    });
  }

  findOne(id: number): Promise<Ticket> {
    return this.ticketsRepository.findOne({
      where: { id },
      relations: ['customer', 'equipment', 'assigned_tech', 'quotes', 'invoice'],
    });
  }

  async update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    await this.ticketsRepository.update(id, updateTicketDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.ticketsRepository.delete(id);
  }

  async updateStatus(id: number, status: string): Promise<Ticket> {
    const ticket = await this.findOne(id);
    if (!ticket) throw new NotFoundException(`Ticket #${id} not found`);

    // Basic transition validation (can be expanded)
    ticket.status = status;
    return this.ticketsRepository.save(ticket);
  }

  async addDiagnosis(id: number, description: string): Promise<Ticket> {
    const ticket = await this.findOne(id);
    if (!ticket) throw new NotFoundException(`Ticket #${id} not found`);

    ticket.issue_description = description; // Or append to a notes field
    ticket.status = 'Diagnosed';
    return this.ticketsRepository.save(ticket);
  }

  async createQuote(id: number, items: any[], total: number): Promise<Quote> {
    const ticket = await this.findOne(id);
    if (!ticket) throw new NotFoundException(`Ticket #${id} not found`);

    const quote = this.quotesRepository.create({
      ticket_id: id,
      items: items,
      total_amount: total,
      status: 'DRAFT',
    });

    ticket.status = 'Quote Generated';
    await this.ticketsRepository.save(ticket);

    return this.quotesRepository.save(quote);
  }

  async updateQuoteStatus(quoteId: number, status: string): Promise<Quote> {
    const quote = await this.quotesRepository.findOne({ where: { id: quoteId }, relations: ['ticket'] });
    if (!quote) throw new NotFoundException(`Quote #${quoteId} not found`);

    quote.status = status;
    await this.quotesRepository.save(quote);

    if (status === 'APPROVED') {
      quote.ticket.status = 'In Progress'; // Ready for repair
      await this.ticketsRepository.save(quote.ticket);
    } else if (status === 'REJECTED') {
      quote.ticket.status = 'Quote Rejected';
      await this.ticketsRepository.save(quote.ticket);
    }

    return quote;
  }

  async logPartUsage(ticketId: number, partId: number, quantity: number, userId?: number): Promise<PartUsed> {
    const part = await this.partsRepository.findOne({ where: { id: partId } });
    if (!part) throw new NotFoundException(`Part #${partId} not found`);

    // Check stock availability
    if (part.stock < quantity) {
      throw new BadRequestException(
        `Insufficient stock for ${part.description}. Available: ${part.stock}, Requested: ${quantity}`
      );
    }

    // Auto-deduct stock using PartsService (creates inventory log)
    await this.partsService.adjustStock(
      partId,
      -quantity, // Negative to deduct
      'Used in Repair',
      userId
    );

    // Create parts used record
    const partUsed = this.partsUsedRepository.create({
      ticket_id: ticketId,
      part_id: partId,
      quantity: quantity,
      cost_at_time: part.cost,
      price_at_time: part.price,
    });

    return this.partsUsedRepository.save(partUsed);
  }

  async getPartsUsed(ticketId: number): Promise<PartUsed[]> {
    return this.partsUsedRepository.find({
      where: { ticket_id: ticketId },
      relations: ['part'],
    });
  }

  async removePartUsage(ticketId: number, partUsedId: number, userId?: number): Promise<void> {
    const partUsed = await this.partsUsedRepository.findOne({
      where: { id: partUsedId, ticket_id: ticketId },
      relations: ['part'],
    });

    if (!partUsed) {
      throw new NotFoundException(`Part usage #${partUsedId} not found for ticket #${ticketId}`);
    }

    // Restore stock by adding back the quantity
    await this.partsService.adjustStock(
      partUsed.part_id,
      partUsed.quantity, // Positive to add back
      'Removed from Ticket',
      userId
    );

    // Delete the part usage record
    await this.partsUsedRepository.remove(partUsed);
  }

  async completeRepair(ticketId: number): Promise<Ticket> {
    const ticket = await this.findOne(ticketId);
    if (!ticket) throw new NotFoundException(`Ticket #${ticketId} not found`);

    ticket.status = 'Resolved';
    ticket.completed_at = new Date();
    await this.ticketsRepository.save(ticket);

    // Auto-generate Draft Invoice
    await this.generateDraftInvoice(ticket);

    return ticket;
  }

  private async generateDraftInvoice(ticket: Ticket): Promise<Invoice> {
    // Simple invoice generation logic
    const invoice = this.invoicesRepository.create({
      ticket_id: ticket.id,
      customer_id: ticket.customer_id,
      invoice_ref: `INV-${Date.now()}`,
      status: 'DRAFT',
      issue_date: new Date(),
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
      sub_total: 0, // Calculate from parts + labor
      tax: 0,
      total: 0,
    });
    return this.invoicesRepository.save(invoice);
  }

  async assignTicket(id: number, techId: number): Promise<Ticket> {
    await this.ticketsRepository.update(id, { assigned_tech_id: techId });
    return this.findOne(id);
  }
}
