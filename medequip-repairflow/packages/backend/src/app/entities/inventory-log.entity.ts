import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Part } from './part.entity';
import { User } from './user.entity';
import { Ticket } from './ticket.entity';

@Entity({ name: 'inventory_logs' })
export class InventoryLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  part_id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column({ nullable: true })
  ticket_id: number;

  @Column()
  change: number;

  @Column({ length: 255 })
  reason: string;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Part)
  @JoinColumn({ name: 'part_id' })
  part: Part;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Ticket)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;
}
