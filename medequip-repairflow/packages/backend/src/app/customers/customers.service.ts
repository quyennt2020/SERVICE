import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  search(query: string): Promise<Customer[]> {
    return this.customersRepository.find({
      where: { name: ILike(`%${query}%`) },
      take: 10,
    });
  }

  findAll(): Promise<Customer[]> {
    return this.customersRepository.find();
  }

  findOne(id: number): Promise<Customer> {
    return this.customersRepository.findOne({ where: { id } });
  }

  create(createCustomerDto: any): Promise<Customer> {
    const newCustomer = this.customersRepository.create(createCustomerDto);
    return this.customersRepository.save(newCustomer) as unknown as Promise<Customer>;
  }

  async update(id: number, updateCustomerDto: any): Promise<Customer> {
    await this.customersRepository.update(id, updateCustomerDto);
    return this.findOne(id);
  }
}
