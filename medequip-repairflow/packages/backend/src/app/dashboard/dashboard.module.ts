import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TicketsModule } from '../tickets/tickets.module'; // Import TicketsModule to use TicketsService

@Module({
  imports: [TicketsModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
