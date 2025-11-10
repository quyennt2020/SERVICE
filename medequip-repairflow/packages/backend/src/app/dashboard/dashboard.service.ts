import { Injectable } from '@nestjs/common';
import { TicketsService } from '../tickets/tickets.service';
import { In } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(private readonly ticketsService: TicketsService) {}

  async getKpiSummary() {
    const pendingApproval = await this.ticketsService.countByStatus('AWAITING_APPROVAL');
    const inProgress = await this.ticketsService.countByStatus(['DIAGNOSING', 'REPAIRING', 'TESTING']);
    const pendingParts = await this.ticketsService.countByStatus('PARTS_ORDERED');
    const awaitingPayment = await this.ticketsService.countByStatus('READY_FOR_INVOICING');

    return {
      pendingApproval,
      inProgress,
      pendingParts,
      awaitingPayment,
    };
  }

  async getActiveTickets(filterDto: any) {
    const excludedStatuses = ['COMPLETED', 'CANCELLED', 'WARRANTY_EXPIRED'];
    const findOptions = { ...filterDto, notStatus: excludedStatuses };
    return this.ticketsService.findAll(findOptions);
  }

  async getRecentActivity() {
    // Logic to get recent activity will be implemented here
    return [];
  }
}
