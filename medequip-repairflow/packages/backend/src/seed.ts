import { AppDataSource } from './data-source';
import { User } from './app/entities/user.entity';
import * as bcrypt from 'bcrypt';

async function seed() {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);

  const adminUser = await userRepository.findOne({ where: { email: 'admin@medequip.com' } });

  if (!adminUser) {
    const hashedPassword = await bcrypt.hash('password', 10);
    const newAdmin = userRepository.create({
      full_name: 'Admin User',
      email: 'admin@medequip.com',
      password_hash: hashedPassword,
      role: 'ADMIN',
      status: 'ACTIVE',
    });
    await userRepository.save(newAdmin);
    console.log('Admin user created.');
  } else {
    console.log('Admin user already exists.');
  }

  // We can add more seed data for customers, tickets etc. here later

  await AppDataSource.destroy();
}

seed().catch(error => console.error('Seed failed:', error));
