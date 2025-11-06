import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Equipment } from './equipment.entity';

@Entity({ name: 'equipment_models' })
export class EquipmentModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 100, unique: true })
  model_number: string;

  @Column({ length: 100, nullable: true })
  manufacturer: string;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Equipment, (equipment) => equipment.model)
  equipment: Equipment[];
}
