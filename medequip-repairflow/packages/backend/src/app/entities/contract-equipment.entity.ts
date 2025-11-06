import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Contract } from './contract.entity';
import { Equipment } from './equipment.entity';

@Entity({ name: 'contract_equipment' })
export class ContractEquipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contract_id: number;

  @Column()
  equipment_id: number;

  @ManyToOne(() => Contract)
  @JoinColumn({ name: 'contract_id' })
  contract: Contract;

  @ManyToOne(() => Equipment)
  @JoinColumn({ name: 'equipment_id' })
  equipment: Equipment;
}
