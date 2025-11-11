import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SystemSettings } from '../entities/system-settings.entity';

@Controller('settings')
@UseGuards(JwtAuthGuard, AdminGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  getSettings(): Promise<SystemSettings> {
    return this.settingsService.findOrCreate();
  }

  @Patch()
  updateSettings(@Body() updateDto: Partial<SystemSettings>): Promise<SystemSettings> {
    return this.settingsService.update(updateDto);
  }
}
