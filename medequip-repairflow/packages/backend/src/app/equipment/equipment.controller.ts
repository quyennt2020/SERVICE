import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EquipmentService } from './equipment.service';

@Controller('equipment')
@UseGuards(JwtAuthGuard)
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) { }

  @Get()
  findAll() {
    return this.equipmentService.findAll();
  }

  @Get('search')
  search(@Query('q') query: string, @Query('customerId') customerId?: string) {
    return this.equipmentService.search(query, customerId ? +customerId : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentService.findOne(+id);
  }

  @Post('models')
  createModel(@Body() createModelDto: any) {
    return this.equipmentService.createModel(createModelDto);
  }

  @Post()
  create(@Body() createEquipmentDto: any) {
    return this.equipmentService.create(createEquipmentDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipmentDto: any) {
    return this.equipmentService.update(+id, updateEquipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentService.remove(+id);
  }
}
