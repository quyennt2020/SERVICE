import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const newTicket = this.ticketsRepository.create(createTicketDto);
    // Logic to generate ticket_ref can be added here
    newTicket.ticket_ref = `T-${Date.now()}`;
    return this.ticketsRepository.save(newTicket);
  }

  findAll(): Promise<Ticket[]> {
    return this.ticketsRepository.find({ relations: ['customer', 'equipment', 'assigned_to'] });
  }

  findOne(id: number): Promise<Ticket> {
    return this.ticketsRepository.findOne({ where: { id }, relations: ['customer', 'equipment', 'assigned_to'] });
  }

  async update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    await this.ticketsRepository.update(id, updateTicketDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.ticketsRepository.delete(id);
  }
}
