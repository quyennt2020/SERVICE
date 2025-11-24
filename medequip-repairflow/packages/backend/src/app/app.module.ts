import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';
import { TicketsModule } from './tickets/tickets.module';
import { CustomersModule } from './customers/customers.module';
import { EquipmentModule } from './equipment/equipment.module';
import { InvoicesModule } from './invoices/invoices.module';
import { PartsModule } from './parts/parts.module';
import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';
import { Equipment } from './entities/equipment.entity';
import { EquipmentModel } from './entities/equipment-model.entity';
import { Part } from './entities/part.entity';
import { Ticket } from './entities/ticket.entity';
import { Quote } from './entities/quote.entity';
import { Invoice } from './entities/invoice.entity';
import { PartUsed } from './entities/part-used.entity';
import { Contract } from './entities/contract.entity';
import { ContractEquipment } from './entities/contract-equipment.entity';
import { CustomerContact } from './entities/customer-contact.entity';
import { EquipmentModelPart } from './entities/equipment-model-part.entity';
import { InventoryLog } from './entities/inventory-log.entity';
import { InvoiceLineItem } from './entities/invoice-line-item.entity';
import { JobAttachment } from './entities/job-attachment.entity';
import { JobNote } from './entities/job-note.entity';
import { KbArticle } from './entities/kb-article.entity';
import { Notification } from './entities/notification.entity';
import { SystemSetting } from './entities/system-setting.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [
          User,
          Customer,
          Equipment,
          EquipmentModel,
          Part,
          Ticket,
          Quote,
          Invoice,
          PartUsed,
          Contract,
          ContractEquipment,
          CustomerContact,
          EquipmentModelPart,
          InventoryLog,
          InvoiceLineItem,
          JobAttachment,
          JobNote,
          KbArticle,
          Notification,
          SystemSetting,
        ],
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    SettingsModule,
    TicketsModule,
    CustomersModule,
    EquipmentModule,
    InvoicesModule,
    PartsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
