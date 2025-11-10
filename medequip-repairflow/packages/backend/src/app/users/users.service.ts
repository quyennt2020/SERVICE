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

  findAll(role?: string): Promise<User[]> {
    const findOptions: any = {};
    if (role) {
      findOptions.where = { role };
    }
    return this.usersRepository.find(findOptions);
  }

  findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // We will add more methods like create, update, etc. later
}
