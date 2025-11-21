import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    UseGuards,
} from '@nestjs/common';
import { PartsService } from './parts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Part } from '../entities/part.entity';

@Controller('parts')
@UseGuards(JwtAuthGuard)
export class PartsController {
    constructor(private readonly partsService: PartsService) { }

    @Get()
    findAll() {
        return this.partsService.findAll();
    }

    @Get('low-stock')
    findLowStock() {
        return this.partsService.findLowStock();
    }

    @Post('seed')
    seedParts() {
        return this.partsService.seedParts();
    }

    @Get('logs/all')
    getAllInventoryLogs() {
        return this.partsService.getInventoryLogs();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.partsService.findOne(+id);
    }

    @Post()
    create(@Body() partData: Partial<Part>) {
        return this.partsService.create(partData);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() partData: Partial<Part>) {
        return this.partsService.update(+id, partData);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.partsService.remove(+id);
    }

    @Post(':id/adjust-stock')
    adjustStock(
        @Param('id') id: string,
        @Body() body: { quantity: number; reason: string; userId?: number },
    ) {
        return this.partsService.adjustStock(
            +id,
            body.quantity,
            body.reason,
            body.userId,
        );
    }

    @Get(':id/logs')
    getInventoryLogs(@Param('id') id: string) {
        return this.partsService.getInventoryLogs(+id);
    }
}
