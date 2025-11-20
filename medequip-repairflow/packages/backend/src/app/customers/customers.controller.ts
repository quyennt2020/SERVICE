import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CustomersService } from './customers.service';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Post()
  create(@Body() createCustomerDto: any) {
    return this.customersService.create(createCustomerDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: any) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }

  @Get('search')
  search(@Query('q') query: string) {
    return this.customersService.search(query);
  }

  // Customer 360° View Endpoints
  @Get(':id/equipment')
  getCustomerEquipment(@Param('id') id: string) {
    return this.customersService.getCustomerEquipment(+id);
  }

  @Get(':id/tickets')
  getCustomerTickets(@Param('id') id: string) {
    return this.customersService.getCustomerTickets(+id);
  }

  @Get(':id/stats')
  getCustomerStats(@Param('id') id: string) {
    return this.customersService.getCustomerStats(+id);
  }
}
