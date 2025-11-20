import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('tickets')
@UseGuards(JwtAuthGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) { }

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  findAll(@Query('techId') techId?: string) {
    return this.ticketsService.findAll(techId ? +techId : undefined);
  }

  @Patch(':id/assign')
  @UseGuards(AdminGuard)
  assignTicket(@Param('id') id: string, @Body('techId') techId: number) {
    return this.ticketsService.assignTicket(+id, +techId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id);
  }

  @Patch(':id/status')
  @UseGuards(AdminGuard)
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.ticketsService.updateStatus(+id, status);
  }

  @Post(':id/diagnosis')
  addDiagnosis(@Param('id') id: string, @Body('description') description: string) {
    return this.ticketsService.addDiagnosis(+id, description);
  }

  @Post(':id/quote')
  createQuote(
    @Param('id') id: string,
    @Body('items') items: any[],
    @Body('total') total: number,
  ) {
    return this.ticketsService.createQuote(+id, items, total);
  }

  @Patch(':id/quote/:quoteId/status')
  updateQuoteStatus(
    @Param('quoteId') quoteId: string,
    @Body('status') status: string,
  ) {
    return this.ticketsService.updateQuoteStatus(+quoteId, status);
  }

  @Post(':id/parts')
  logPartUsage(
    @Param('id') id: string,
    @Body('partId') partId: number,
    @Body('quantity') quantity: number,
  ) {
    return this.ticketsService.logPartUsage(+id, partId, quantity);
  }

  @Post(':id/complete')
  completeRepair(@Param('id') id: string) {
    return this.ticketsService.completeRepair(+id);
  }
}
