import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('invoices')
@UseGuards(JwtAuthGuard)
export class InvoicesController {
    constructor(private readonly invoicesService: InvoicesService) { }

    @Get()
    findAll() {
        return this.invoicesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.invoicesService.findOne(+id);
    }

    @Get('customer/:customerId')
    findByCustomer(@Param('customerId') customerId: string) {
        return this.invoicesService.findByCustomer(+customerId);
    }

    @Post()
    create(@Body() createInvoiceDto: any) {
        return this.invoicesService.create(createInvoiceDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateInvoiceDto: any) {
        return this.invoicesService.update(+id, updateInvoiceDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.invoicesService.remove(+id);
    }

    @Post(':id/pay')
    recordPayment(@Param('id') id: string) {
        return this.invoicesService.recordPayment(+id);
    }
}
