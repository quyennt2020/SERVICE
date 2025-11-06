import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'parts' })
export class Part {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  part_number: string;

  @Column('text')
  description: string;

  @Column({ default: 0 })
  stock: number;

  @Column({ default: 5 })
  min_stock: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  cost: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ length: 100, nullable: true })
  location: string;

  @Column({ length: 50, nullable: true })
  status: string;
}
