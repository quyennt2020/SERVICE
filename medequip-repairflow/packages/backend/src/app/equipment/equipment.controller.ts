import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { EquipmentService } from './equipment.service';

@Controller('equipment')
@UseGuards(JwtAuthGuard)
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Get('search')
  search(@Query('q') query: string, @Query('customerId') customerId?: string) {
    return this.equipmentService.search(query, customerId ? +customerId : undefined);
  }

  @Get()
  findAll(
    @Query('customerId') customerId?: string,
    @Query('manufacturer') manufacturer?: string,
    @Query('searchQuery') searchQuery?: string
  ) {
    const filters = {
      customerId: customerId ? +customerId : undefined,
      manufacturer,
      searchQuery,
    };
    return this.equipmentService.findAll(filters);
  }

  @Patch(':id/deactivate')
  @UseGuards(AdminGuard)
  deactivate(@Param('id') id: string) {
    return this.equipmentService.update(+id, { status: 'INACTIVE' });
  }

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createEquipmentDto: any) {
    return this.equipmentService.create(createEquipmentDto);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() updateEquipmentDto: any) {
    return this.equipmentService.update(+id, updateEquipmentDto);
  }
}
