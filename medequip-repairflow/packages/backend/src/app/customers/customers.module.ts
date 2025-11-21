import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { Equipment } from '../entities/equipment.entity';
import { Ticket } from '../entities/ticket.entity';
import { CustomerContact } from '../entities/customer-contact.entity';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Equipment, Ticket, CustomerContact])],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule { }
