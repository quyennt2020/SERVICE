import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Customer } from './customer.entity';
import { EquipmentModel } from './equipment-model.entity';
import { Ticket } from './ticket.entity';

@Entity({ name: 'equipment' })
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_id: number;

  @Column()
  model_id: number;

  @Column({ length: 100, unique: true })
  serial_number: string;

  @Column('text', { nullable: true })
  location: string;

  @Column('date', { nullable: true })
  install_date: Date;

  @Column({ length: 50 })
  status: string;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Customer, (customer) => customer.equipment)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => EquipmentModel, (model) => model.equipment)
  @JoinColumn({ name: 'model_id' })
  model: EquipmentModel;

  @OneToMany(() => Ticket, (ticket) => ticket.equipment)
  tickets: Ticket[];
}
