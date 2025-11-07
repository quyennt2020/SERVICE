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
}
