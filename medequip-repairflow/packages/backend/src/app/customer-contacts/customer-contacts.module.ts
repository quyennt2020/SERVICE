import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerContact } from '../entities/customer-contact.entity';
import { CustomerContactsController } from './customer-contacts.controller';
import { CustomerContactsService } from './customer-contacts.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerContact])],
  controllers: [CustomerContactsController],
  providers: [CustomerContactsService],
})
export class CustomerContactsModule {}
