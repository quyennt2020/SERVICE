import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Equipment } from '../entities/equipment.entity';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
  ) {}

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

  findAll(filterDto: { customerId?: number, manufacturer?: string, searchQuery?: string }): Promise<Equipment[]> {
    const { customerId, manufacturer, searchQuery } = filterDto;
    const findOptions: any = {
      relations: ['customer', 'model'],
      where: [],
    };

    const baseConditions: any = {};
    if (customerId) {
      baseConditions.customer_id = customerId;
    }
    if (manufacturer) {
      baseConditions.model = { manufacturer: ILike(`%${manufacturer}%`) };
    }

    if (searchQuery) {
      findOptions.where = [
        { ...baseConditions, serial_number: ILike(`%${searchQuery}%`) },
        { ...baseConditions, model: { ...baseConditions.model, name: ILike(`%${searchQuery}%`) } },
      ];
    } else {
      findOptions.where = baseConditions;
    }

    return this.equipmentRepository.find(findOptions);
  }

  create(createEquipmentDto: any): Promise<Equipment> {
    const newEquipment = this.equipmentRepository.create(createEquipmentDto);
    return this.equipmentRepository.save(newEquipment) as unknown as Promise<Equipment>;
  }

  async update(id: number, updateEquipmentDto: any): Promise<Equipment> {
    await this.equipmentRepository.update(id, updateEquipmentDto);
    return this.equipmentRepository.findOne({ where: { id }, relations: ['customer', 'model'] });
  }
}
