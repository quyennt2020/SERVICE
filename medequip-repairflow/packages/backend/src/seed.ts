import { AppDataSource } from './data-source';
import { User } from './app/entities/user.entity';
import { Customer } from './app/entities/customer.entity';
import { Equipment } from './app/entities/equipment.entity';
import { EquipmentModel } from './app/entities/equipment-model.entity';
import { Part } from './app/entities/part.entity';
import * as bcrypt from 'bcrypt';

async function seed() {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);

  const adminUser = await userRepository.findOne({ where: { email: 'admin@medequip.com' } });

  const hashedPassword = await bcrypt.hash('password', 10);

  if (!adminUser) {
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
    adminUser.password_hash = hashedPassword;
    await userRepository.save(adminUser);
    console.log('Admin user password updated.');
  }

  // Seed Customer
  const customerRepository = AppDataSource.getRepository(Customer);
  let customer = await customerRepository.findOne({ where: { name: 'Test Customer' } });
  if (!customer) {
    customer = customerRepository.create({
      name: 'Test Customer',
      status: 'Active',
      // email and phone are in CustomerContact, not Customer
    });
    await customerRepository.save(customer);
    console.log('Test Customer created.');
  }

  // Seed Equipment Model
  const modelRepository = AppDataSource.getRepository(EquipmentModel);
  let model = await modelRepository.findOne({ where: { model_number: 'MOD-001' } });
  if (!model) {
    model = modelRepository.create({
      name: 'Test Model X',
      model_number: 'MOD-001',
      manufacturer: 'Test Corp',
    });
    await modelRepository.save(model);
    console.log('Test Model created.');
  }

  // Seed Equipment
  const equipmentRepository = AppDataSource.getRepository(Equipment);
  let equipment = await equipmentRepository.findOne({ where: { serial_number: 'SN-123' } });
  if (!equipment) {
    equipment = equipmentRepository.create({
      serial_number: 'SN-123',
      customer_id: customer.id,
      model_id: model.id,
      status: 'Active',
      location: 'Room 101',
    });
    await equipmentRepository.save(equipment);
    console.log('Test Equipment created.');
  }

  // Seed Part
  const partRepository = AppDataSource.getRepository(Part);
  let part = await partRepository.findOne({ where: { part_number: 'PART-001' } });
  if (!part) {
    part = partRepository.create({
      // name: 'Test Part A', // Part entity does not have name
      part_number: 'PART-001',
      description: 'A test part',
      price: 50.00,
      stock: 100, // stock_quantity -> stock
    });
    await partRepository.save(part);
    console.log('Test Part created.');
  }

  await AppDataSource.destroy();
}

seed().catch(error => console.error('Seed failed:', error));
