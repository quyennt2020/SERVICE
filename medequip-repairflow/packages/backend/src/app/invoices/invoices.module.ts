import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { Invoice } from '../entities/invoice.entity';
import { InvoiceLineItem } from '../entities/invoice-line-item.entity';
import { Ticket } from '../entities/ticket.entity';
import { Customer } from '../entities/customer.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Invoice, InvoiceLineItem, Ticket, Customer])],
    controllers: [InvoicesController],
    providers: [InvoicesService],
    exports: [InvoicesService],
})
export class InvoicesModule { }
