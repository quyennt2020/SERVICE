import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from '../entities/ticket.entity';
import { Quote } from '../entities/quote.entity';
import { PartUsed } from '../entities/part-used.entity';
import { Part } from '../entities/part.entity';
import { Invoice } from '../entities/invoice.entity';
import { InventoryLog } from '../entities/inventory-log.entity';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { PartsModule } from '../parts/parts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, Quote, PartUsed, Part, Invoice, InventoryLog]),
    PartsModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule { }
