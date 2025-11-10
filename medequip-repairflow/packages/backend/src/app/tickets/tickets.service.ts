import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
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

  findAll(filterDto?: any): Promise<Ticket[]> {
    const findOptions: any = { relations: ['customer', 'equipment', 'assigned_to'] };
    const where: any = {};

    if (filterDto) {
      if (filterDto.status) where.status = In(filterDto.status);
      if (filterDto.priority) where.priority = In(filterDto.priority);
      if (filterDto.technicianId) where.assigned_to_id = In(filterDto.technicianId);
      if (filterDto.customerId) where.customer_id = In(filterDto.customerId);
      if (filterDto.notStatus) where.status = Not(In(filterDto.notStatus));
    }

    findOptions.where = where;
    return this.ticketsRepository.find(findOptions);
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

  countByStatus(status: string | string[]): Promise<number> {
    const whereCondition = Array.isArray(status) ? { status: In(status) } : { status };
    return this.ticketsRepository.count({ where: whereCondition });
  }
}
