import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { Equipment } from '../entities/equipment.entity';
import { Ticket } from '../entities/ticket.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
  ) { }

  findAll(): Promise<Customer[]> {
    return this.customersRepository.find();
  }

  findOne(id: number): Promise<Customer> {
    return this.customersRepository.findOneBy({ id });
  }

  create(data: Partial<Customer>): Promise<Customer> {
    const customer = this.customersRepository.create({
      ...data,
      status: data.status || 'Active',
    });
    return this.customersRepository.save(customer);
  }

  async update(id: number, data: Partial<Customer>): Promise<Customer> {
    await this.customersRepository.update(id, data);
    return this.customersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.customersRepository.delete(id);
  }

  search(query: string): Promise<Customer[]> {
    return this.customersRepository.find({
      where: { name: ILike(`%${query}%`) },
      take: 10,
    });
  }

  // Customer 360° View Methods
  async getCustomerEquipment(customerId: number): Promise<Equipment[]> {
    return this.equipmentRepository.find({
      where: { customer_id: customerId },
      relations: ['model'],
      order: { created_at: 'DESC' },
    });
  }

  async getCustomerTickets(customerId: number): Promise<Ticket[]> {
    return this.ticketsRepository.find({
      where: { customer_id: customerId },
      relations: ['equipment', 'assigned_tech'],
      order: { created_at: 'DESC' },
    });
  }

  async getCustomerStats(customerId: number) {
    const [totalTickets, activeTickets, totalEquipment] = await Promise.all([
      this.ticketsRepository.count({ where: { customer_id: customerId } }),
      this.ticketsRepository.count({
        where: {
          customer_id: customerId,
          status: ILike('%Open%') || ILike('%In Progress%'),
        },
      }),
      this.equipmentRepository.count({ where: { customer_id: customerId } }),
    ]);

    return {
      totalTickets,
      activeTickets,
      totalEquipment,
      // Placeholder for future metrics
      totalRevenue: 0,
      pendingInvoices: 0,
    };
  }
}

