import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CustomerContactsService } from './customer-contacts.service';

@Controller('customer-contacts')
@UseGuards(JwtAuthGuard, AdminGuard)
export class CustomerContactsController {
  constructor(private readonly contactsService: CustomerContactsService) {}

  @Get()
  findAll(@Query('customerId') customerId: string) {
    return this.contactsService.findAll(+customerId);
  }

  @Post()
  create(@Body() createContactDto: any) {
    return this.contactsService.create(createContactDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: any) {
    return this.contactsService.update(+id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(+id);
  }
}
