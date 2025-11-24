import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DataSource } from 'typeorm';
import { Part } from './app/entities/part.entity';

async function seedParts() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);
    const partRepository = dataSource.getRepository(Part);

    const parts = [
        {
            part_number: 'PCB-001',
            description: 'Main Control Board - Universal',
            stock: 15,
            min_stock: 5,
            cost: 45.00,
            price: 89.99,
            location: 'Shelf A1',
            status: 'Active',
        },
        {
            part_number: 'MOT-002',
            description: 'Stepper Motor 12V',
            stock: 3,
            min_stock: 5,
            cost: 25.00,
            price: 49.99,
            location: 'Shelf B2',
            status: 'Active',
        },
        {
            part_number: 'SEN-003',
            description: 'Temperature Sensor',
            stock: 0,
            min_stock: 10,
            cost: 8.50,
            price: 15.99,
            location: 'Shelf C3',
            status: 'Active',
        },
        {
            part_number: 'CAB-004',
            description: 'Power Cable Assembly',
            stock: 25,
            min_stock: 10,
            cost: 12.00,
            price: 24.99,
            location: 'Shelf D1',
            status: 'Active',
        },
        {
            part_number: 'FIL-005',
            description: 'Air Filter HEPA',
            stock: 8,
            min_stock: 15,
            cost: 18.00,
            price: 34.99,
            location: 'Shelf E2',
            status: 'Active',
        },
        {
            part_number: 'LCD-006',
            description: 'LCD Display 7 inch',
            stock: 12,
            min_stock: 3,
            cost: 65.00,
            price: 129.99,
            location: 'Shelf F1',
            status: 'Active',
        },
        {
            part_number: 'BAT-007',
            description: 'Lithium Battery Pack',
            stock: 20,
            min_stock: 8,
            cost: 35.00,
            price: 69.99,
            location: 'Shelf G3',
            status: 'Active',
        },
        {
            part_number: 'PUM-008',
            description: 'Vacuum Pump Assembly',
            stock: 2,
            min_stock: 4,
            cost: 120.00,
            price: 249.99,
            location: 'Shelf H1',
            status: 'Active',
        },
    ];

    for (const partData of parts) {
        const existing = await partRepository.findOne({
            where: { part_number: partData.part_number },
        });

        if (!existing) {
            const part = partRepository.create(partData);
            await partRepository.save(part);
            console.log(`✓ Created part: ${partData.part_number}`);
        } else {
            console.log(`- Part already exists: ${partData.part_number}`);
        }
    }

    console.log('\n✅ Parts seeding complete!');
    await app.close();
}

seedParts().catch((error) => {
    console.error('Error seeding parts:', error);
    process.exit(1);
});
