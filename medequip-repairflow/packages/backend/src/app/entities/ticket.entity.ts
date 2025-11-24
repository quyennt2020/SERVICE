import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Customer } from './customer.entity';
import { Equipment } from './equipment.entity';
import { User } from './user.entity';
import { CustomerContact } from './customer-contact.entity';
import { Invoice } from './invoice.entity';
import { Quote } from './quote.entity';
import { OneToMany } from 'typeorm';

@Entity({ name: 'tickets' })
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  ticket_ref: string;

  @Column()
  customer_id: number;

  @Column()
  equipment_id: number;

  @Column({ nullable: true })
  assigned_tech_id: number;

  @Column({ nullable: true })
  created_by_id: number;

  @Column({ length: 50 })
  status: string;

  @Column({ length: 50 })
  priority: string;

  @Column('text')
  issue_description: string;

  @Column('text', { nullable: true })
  resolution_notes: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  scheduled_date: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  completed_at: Date;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  labor_hours: number;

  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  quote_amount: number;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Customer, (customer) => customer.tickets)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Equipment, (equipment) => equipment.tickets)
  @JoinColumn({ name: 'equipment_id' })
  equipment: Equipment;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'assigned_tech_id' })
  assigned_tech: User;

  @ManyToOne(() => CustomerContact)
  @JoinColumn({ name: 'created_by_id' })
  created_by: CustomerContact;

  @OneToOne(() => Invoice, (invoice) => invoice.ticket)
  invoice: Invoice;

  @OneToMany(() => Quote, (quote) => quote.ticket)
  quotes: Quote[];
}
