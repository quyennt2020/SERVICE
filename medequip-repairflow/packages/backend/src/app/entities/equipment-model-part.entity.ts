import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { EquipmentModel } from './equipment-model.entity';
import { Part } from './part.entity';

@Entity({ name: 'equipment_model_parts' })
@Unique(['model_id', 'part_id'])
export class EquipmentModelPart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model_id: number;

  @Column()
  part_id: number;

  @ManyToOne(() => EquipmentModel)
  @JoinColumn({ name: 'model_id' })
  model: EquipmentModel;

  @ManyToOne(() => Part)
  @JoinColumn({ name: 'part_id' })
  part: Part;
}
