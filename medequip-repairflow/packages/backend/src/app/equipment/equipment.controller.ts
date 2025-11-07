import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EquipmentService } from './equipment.service';

@Controller('equipment')
@UseGuards(JwtAuthGuard)
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Get('search')
  search(@Query('q') query: string, @Query('customerId') customerId?: string) {
    return this.equipmentService.search(query, customerId ? +customerId : undefined);
  }
}
