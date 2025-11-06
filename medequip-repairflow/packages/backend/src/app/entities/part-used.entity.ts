import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Ticket } from './ticket.entity';
import { Part } from './part.entity';

@Entity({ name: 'parts_used' })
export class PartUsed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ticket_id: number;

  @Column()
  part_id: number;

  @Column({ default: 1 })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  cost_at_time: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price_at_time: number;

  @ManyToOne(() => Ticket)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;

  @ManyToOne(() => Part)
  @JoinColumn({ name: 'part_id' })
  part: Part;
}
