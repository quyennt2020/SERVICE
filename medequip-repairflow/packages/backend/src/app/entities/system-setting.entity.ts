import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'system_settings' })
export class SystemSetting {
  @PrimaryColumn({ default: 1 })
  id: number;

  @Column({ length: 255, nullable: true })
  company_name: string;

  @Column('text', { nullable: true })
  company_address: string;

  @Column({ length: 100, nullable: true })
  company_tax_id: string;

  @Column({ length: 512, nullable: true })
  company_logo_url: string;
}
