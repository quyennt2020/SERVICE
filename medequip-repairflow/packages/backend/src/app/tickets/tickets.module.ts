import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from '../entities/ticket.entity';
import { Quote } from '../entities/quote.entity';
import { PartUsed } from '../entities/part-used.entity';
import { Part } from '../entities/part.entity';
import { Invoice } from '../entities/invoice.entity';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Quote, PartUsed, Part, Invoice])],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule { }
