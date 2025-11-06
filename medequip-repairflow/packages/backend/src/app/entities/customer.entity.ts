import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CustomerContact } from './customer-contact.entity';
import { Equipment } from './equipment.entity';
import { Contract } from './contract.entity';
import { Ticket } from './ticket.entity';
import { Invoice } from './invoice.entity';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('text', { nullable: true })
  address: string;

  @Column({ length: 100, nullable: true })
  tax_id: string;

  @Column({ length: 50, nullable: true })
  tier: string;

  @Column({ length: 50 })
  status: string;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => CustomerContact, (contact) => contact.customer)
  contacts: CustomerContact[];

  @OneToMany(() => Equipment, (equipment) => equipment.customer)
  equipment: Equipment[];

  @OneToMany(() => Contract, (contract) => contract.customer)
  contracts: Contract[];

  @OneToMany(() => Ticket, (ticket) => ticket.customer)
  tickets: Ticket[];

  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoices: Invoice[];
}
