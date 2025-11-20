import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Equipment } from '../entities/equipment.entity';
import { EquipmentModel } from '../entities/equipment-model.entity';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
    @InjectRepository(EquipmentModel)
    private equipmentModelRepository: Repository<EquipmentModel>,
  ) { }

  findAll(): Promise<Equipment[]> {
    return this.equipmentRepository.find({ relations: ['model', 'customer'] });
  }

  findOne(id: number): Promise<Equipment> {
    return this.equipmentRepository.findOne({
      where: { id },
      relations: ['model', 'customer'],
    });
  }

  create(data: Partial<Equipment>): Promise<Equipment> {
    const equipment = this.equipmentRepository.create(data);
    return this.equipmentRepository.save(equipment);
  }

  async update(id: number, data: Partial<Equipment>): Promise<Equipment> {
    await this.equipmentRepository.update(id, data);
    return this.equipmentRepository.findOne({
      where: { id },
      relations: ['model', 'customer'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.equipmentRepository.delete(id);
  }

  search(query: string, customerId?: number): Promise<Equipment[]> {
    const whereClause: any = { serial_number: ILike(`%${query}%`) };
    if (customerId) {
      whereClause.customer_id = customerId;
    }

    return this.equipmentRepository.find({
      where: whereClause,
      relations: ['model'],
      take: 10,
    });
  }

  createModel(data: Partial<EquipmentModel>): Promise<EquipmentModel> {
    const model = this.equipmentModelRepository.create(data);
    return this.equipmentModelRepository.save(model);
  }
}
