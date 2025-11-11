import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(filters: { role?: string }): Promise<User[]> {
    const findOptions: any = {};
    if (filters.role) {
      findOptions.where = { role: filters.role };
    }
    return this.usersRepository.find(findOptions);
  }

  findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: number, updateDto: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, updateDto);
    return this.usersRepository.findOne({ where: { id } });
  }
}
