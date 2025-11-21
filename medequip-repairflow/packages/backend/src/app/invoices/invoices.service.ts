import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from '../entities/invoice.entity';
import { InvoiceLineItem } from '../entities/invoice-line-item.entity';
import { Ticket } from '../entities/ticket.entity';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class InvoicesService {
    constructor(
        @InjectRepository(Invoice)
        private invoicesRepository: Repository<Invoice>,
        @InjectRepository(InvoiceLineItem)
        private invoiceLineItemsRepository: Repository<InvoiceLineItem>,
        @InjectRepository(Ticket)
        private ticketsRepository: Repository<Ticket>,
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,
    ) { }

    findAll(): Promise<Invoice[]> {
        return this.invoicesRepository.find({
            relations: ['customer', 'ticket', 'line_items'],
            order: { created_at: 'DESC' },
        });
    }

    async findOne(id: number): Promise<Invoice> {
        const invoice = await this.invoicesRepository.findOne({
            where: { id },
            relations: ['customer', 'ticket', 'line_items'],
        });
        if (!invoice) {
            throw new NotFoundException(`Invoice with ID ${id} not found`);
        }
        return invoice;
    }

    async findByCustomer(customerId: number): Promise<Invoice[]> {
        return this.invoicesRepository.find({
            where: { customer_id: customerId },
            relations: ['ticket'],
            order: { created_at: 'DESC' },
        });
    }

    async create(createInvoiceDto: Partial<Invoice>): Promise<Invoice> {
        // Basic creation logic - to be expanded
        const invoice = this.invoicesRepository.create(createInvoiceDto);
        return this.invoicesRepository.save(invoice);
    }

    async update(id: number, updateInvoiceDto: any): Promise<Invoice> {
        await this.invoicesRepository.update(id, updateInvoiceDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.invoicesRepository.delete(id);
    }

    async recordPayment(id: number): Promise<Invoice> {
        const invoice = await this.findOne(id);
        invoice.status = 'Paid';
        invoice.paid_at = new Date();
        return this.invoicesRepository.save(invoice);
    }
}
