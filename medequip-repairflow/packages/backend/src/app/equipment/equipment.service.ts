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
}
