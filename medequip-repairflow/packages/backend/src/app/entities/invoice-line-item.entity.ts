import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Invoice } from './invoice.entity';

@Entity({ name: 'invoice_line_items' })
export class InvoiceLineItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  invoice_id: number;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 5, scale: 2 })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  unit_price: number;

  @Column('decimal', { precision: 12, scale: 2 })
  line_total: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.line_items)
  @JoinColumn({ name: 'invoice_id' })
  invoice: Invoice;
}
