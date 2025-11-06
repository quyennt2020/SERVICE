import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Customer } from './customer.entity';
import { Ticket } from './ticket.entity';
import { InvoiceLineItem } from './invoice-line-item.entity';

@Entity({ name: 'invoices' })
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  invoice_ref: string;

  @Column()
  customer_id: number;

  @Column({ unique: true })
  ticket_id: number;

  @Column({ length: 50 })
  status: string;

  @Column('date')
  issue_date: Date;

  @Column('date')
  due_date: Date;

  @Column('decimal', { precision: 12, scale: 2 })
  sub_total: number;

  @Column('decimal', { precision: 12, scale: 2 })
  tax: number;

  @Column('decimal', { precision: 12, scale: 2 })
  total: number;

  @Column({ type: 'timestamp with time zone', nullable: true })
  paid_at: Date;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Customer, (customer) => customer.invoices)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToOne(() => Ticket, (ticket) => ticket.invoice)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;

  @OneToMany(() => InvoiceLineItem, (item) => item.invoice)
  line_items: InvoiceLineItem[];
}
