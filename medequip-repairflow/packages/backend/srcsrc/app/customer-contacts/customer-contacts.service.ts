import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerContact } from '../entities/customer-contact.entity';

@Injectable()
export class CustomerContactsService {
  constructor(
    @InjectRepository(CustomerContact)
    private contactsRepository: Repository<CustomerContact>,
  ) {}

  findAll(customerId: number): Promise<CustomerContact[]> {
    return this.contactsRepository.find({ where: { customer_id: customerId } });
  }

  create(createContactDto: any): Promise<CustomerContact> {
    const newContact = this.contactsRepository.create(createContactDto);
    return this.contactsRepository.save(newContact);
  }

  async update(id: number, updateContactDto: any): Promise<CustomerContact> {
    await this.contactsRepository.update(id, updateContactDto);
    return this.contactsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.contactsRepository.delete(id);
  }
}
