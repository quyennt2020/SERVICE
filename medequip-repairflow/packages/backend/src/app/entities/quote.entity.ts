import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity({ name: 'quotes' })
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ticket_id: number;

  @Column('decimal', { precision: 12, scale: 2 })
  total_amount: number;

  @Column({ length: 50, default: 'DRAFT' }) // DRAFT, SENT, APPROVED, REJECTED
  status: string;

  @Column('jsonb', { nullable: true })
  items: any; // Stores details of parts and labor in JSON format for flexibility

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @ManyToOne(() => Ticket, (ticket) => ticket.quotes)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;
}
