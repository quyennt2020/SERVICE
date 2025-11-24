import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './app/entities/user.entity';
import { Customer } from './app/entities/customer.entity';
import { Equipment } from './app/entities/equipment.entity';
import { EquipmentModel } from './app/entities/equipment-model.entity';
import { Part } from './app/entities/part.entity';
import { Ticket } from './app/entities/ticket.entity';
import { Quote } from './app/entities/quote.entity';
import { Invoice } from './app/entities/invoice.entity';
import { PartUsed } from './app/entities/part-used.entity';
import { Contract } from './app/entities/contract.entity';
import { ContractEquipment } from './app/entities/contract-equipment.entity';
import { CustomerContact } from './app/entities/customer-contact.entity';
import { EquipmentModelPart } from './app/entities/equipment-model-part.entity';
import { InventoryLog } from './app/entities/inventory-log.entity';
import { InvoiceLineItem } from './app/entities/invoice-line-item.entity';
import { JobAttachment } from './app/entities/job-attachment.entity';
import { JobNote } from './app/entities/job-note.entity';
import { KbArticle } from './app/entities/kb-article.entity';
import { Notification } from './app/entities/notification.entity';
import { SystemSetting } from './app/entities/system-setting.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
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
  migrations: [],
  subscribers: [],
});
