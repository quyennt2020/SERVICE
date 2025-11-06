import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'kb_articles' })
export class KbArticle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  author_id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  content: string;

  @Column({ length: 100, nullable: true })
  category: string;

  @Column('text', { array: true, nullable: true })
  tags: string[];

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'author_id' })
  author: User;
}
