import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from '../entities/equipment.entity';
import { EquipmentModel } from '../entities/equipment-model.entity';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Equipment, EquipmentModel])],
  controllers: [EquipmentController],
  providers: [EquipmentService],
})
export class EquipmentModule { }
