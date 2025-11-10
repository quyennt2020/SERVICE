import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('kpi')
  getKpiSummary() {
    return this.dashboardService.getKpiSummary();
  }

  @Get('active-tickets')
  getActiveTickets(@Query() filterDto: any) {
    return this.dashboardService.getActiveTickets(filterDto);
  }

  @Get('activity')
  getRecentActivity() {
    return this.dashboardService.getRecentActivity();
  }
}
