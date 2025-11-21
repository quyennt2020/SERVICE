import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Part } from '../entities/part.entity';
import { InventoryLog } from '../entities/inventory-log.entity';

@Injectable()
export class PartsService {
    constructor(
        @InjectRepository(Part)
        private partsRepository: Repository<Part>,
        @InjectRepository(InventoryLog)
        private inventoryLogRepository: Repository<InventoryLog>,
    ) { }

    async findAll(): Promise<Part[]> {
        return this.partsRepository.find({
            order: { part_number: 'ASC' },
        });
    }

    async findOne(id: number): Promise<Part> {
        const part = await this.partsRepository.findOne({ where: { id } });
        if (!part) {
            throw new NotFoundException(`Part with ID ${id} not found`);
        }
        return part;
    }

    async findLowStock(): Promise<Part[]> {
        return this.partsRepository
            .createQueryBuilder('part')
            .where('part.stock <= part.min_stock')
            .orderBy('part.stock', 'ASC')
            .getMany();
    }

    async create(partData: Partial<Part>): Promise<Part> {
        const part = this.partsRepository.create(partData);
        return this.partsRepository.save(part);
    }

    async update(id: number, partData: Partial<Part>): Promise<Part> {
        const part = await this.findOne(id);
        Object.assign(part, partData);
        return this.partsRepository.save(part);
    }

    async remove(id: number): Promise<void> {
        const part = await this.findOne(id);
        await this.partsRepository.remove(part);
    }

    async adjustStock(
        id: number,
        quantity: number,
        reason: string,
        userId?: number,
    ): Promise<Part> {
        const part = await this.findOne(id);
        part.stock += quantity;

        // Log the inventory change
        const log = this.inventoryLogRepository.create({
            part_id: id,
            change: quantity,
            reason,
            user_id: userId,
        });

        await this.inventoryLogRepository.save(log);
        return this.partsRepository.save(part);
    }

    async getInventoryLogs(partId?: number): Promise<InventoryLog[]> {
        const query = this.inventoryLogRepository
            .createQueryBuilder('log')
            .orderBy('log.created_at', 'DESC')
            .take(100);

        if (partId) {
            query.where('log.part_id = :partId', { partId });
        }

        return query.getMany();
    }

    async seedParts(): Promise<string> {
        const parts = [
            {
                part_number: 'PCB-001',
                description: 'Main Control Board - Universal',
                stock: 15,
                min_stock: 5,
                cost: 45.0,
                price: 89.99,
                location: 'Shelf A1',
                status: 'Active',
            },
            {
                part_number: 'MOT-002',
                description: 'Stepper Motor 12V',
                stock: 3,
                min_stock: 5,
                cost: 25.0,
                price: 49.99,
                location: 'Shelf B2',
                status: 'Active',
            },
            {
                part_number: 'SEN-003',
                description: 'Temperature Sensor',
                stock: 0,
                min_stock: 10,
                cost: 8.5,
                price: 15.99,
                location: 'Shelf C3',
                status: 'Active',
            },
            {
                part_number: 'CAB-004',
                description: 'Power Cable Assembly',
                stock: 25,
                min_stock: 10,
                cost: 12.0,
                price: 24.99,
                location: 'Shelf D1',
                status: 'Active',
            },
            {
                part_number: 'FIL-005',
                description: 'Air Filter HEPA',
                stock: 8,
                min_stock: 15,
                cost: 18.0,
                price: 34.99,
                location: 'Shelf E2',
                status: 'Active',
            },
            {
                part_number: 'LCD-006',
                description: 'LCD Display 7 inch',
                stock: 12,
                min_stock: 3,
                cost: 65.0,
                price: 129.99,
                location: 'Shelf F1',
                status: 'Active',
            },
            {
                part_number: 'BAT-007',
                description: 'Lithium Battery Pack',
                stock: 20,
                min_stock: 8,
                cost: 35.0,
                price: 69.99,
                location: 'Shelf G3',
                status: 'Active',
            },
            {
                part_number: 'PUM-008',
                description: 'Vacuum Pump Assembly',
                stock: 2,
                min_stock: 4,
                cost: 120.0,
                price: 249.99,
                location: 'Shelf H1',
                status: 'Active',
            },
        ];

        for (const partData of parts) {
            const existing = await this.partsRepository.findOne({
                where: { part_number: partData.part_number },
            });

            if (!existing) {
                const part = this.partsRepository.create(partData);
                await this.partsRepository.save(part);
            }
        }

        return 'Parts seeded successfully!';
    }
}
