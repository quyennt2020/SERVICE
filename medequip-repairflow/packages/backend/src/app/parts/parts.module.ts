import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartsController } from './parts.controller';
import { PartsService } from './parts.service';
import { Part } from '../entities/part.entity';
import { InventoryLog } from '../entities/inventory-log.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Part, InventoryLog])],
    controllers: [PartsController],
    providers: [PartsService],
    exports: [PartsService], // Export so other modules can use it
})
export class PartsModule { }
