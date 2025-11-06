import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';

@Entity({ name: 'contracts' })
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_id: number;

  @Column({ length: 255 })
  title: string;

  @Column('date')
  start_date: Date;

  @Column('date')
  end_date: Date;

  @Column({ length: 50 })
  status: string;

  @Column('text', { nullable: true })
  terms: string;

  @ManyToOne(() => Customer, (customer) => customer.contracts)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
