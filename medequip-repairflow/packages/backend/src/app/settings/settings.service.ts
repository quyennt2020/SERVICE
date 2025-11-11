import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemSettings } from '../entities/system-settings.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SystemSettings)
    private settingsRepository: Repository<SystemSettings>,
  ) {}

  async findOrCreate(): Promise<SystemSettings> {
    let settings = await this.settingsRepository.findOne({ where: { id: 1 } });
    if (!settings) {
      settings = this.settingsRepository.create({ id: 1 });
      await this.settingsRepository.save(settings);
    }
    return settings;
  }

  async update(updateDto: Partial<SystemSettings>): Promise<SystemSettings> {
    const settings = await this.findOrCreate();
    this.settingsRepository.merge(settings, updateDto);
    return this.settingsRepository.save(settings);
  }
}
