import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TicketsService } from './tickets.service';
import { Ticket } from '../entities/ticket.entity';
import { Quote } from '../entities/quote.entity';
import { PartUsed } from '../entities/part-used.entity';
import { Part } from '../entities/part.entity';
import { Invoice } from '../entities/invoice.entity';
import { Repository } from 'typeorm';

describe('TicketsService', () => {
    let service: TicketsService;
    let ticketsRepository: Repository<Ticket>;
    let quoteRepository: Repository<Quote>;

    beforeEach(async () => {
        const mockTicket = {
            id: 1,
            ticket_ref: 'T-123',
            status: 'Open',
            issue_description: 'Broken',
            quotes: [],
            save: jest.fn(),
        };

        const mockQuote = {
            id: 1,
            ticket_id: 1,
            status: 'DRAFT',
            total_amount: 100,
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TicketsService,
                {
                    provide: getRepositoryToken(Ticket),
                    useValue: {
                        create: jest.fn().mockReturnValue(mockTicket),
                        save: jest.fn().mockImplementation((entity) => Promise.resolve(entity)),
                        find: jest.fn().mockResolvedValue([mockTicket]),
                        findOne: jest.fn().mockResolvedValue(mockTicket),
                        update: jest.fn(),
                        delete: jest.fn(),
                    },
                },
                {
                    provide: getRepositoryToken(Quote),
                    useValue: {
                        create: jest.fn().mockReturnValue(mockQuote),
                        save: jest.fn().mockResolvedValue(mockQuote),
                        findOne: jest.fn().mockResolvedValue(mockQuote),
                    },
                },
                {
                    provide: getRepositoryToken(PartUsed),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                    },
                },
                {
                    provide: getRepositoryToken(Part),
                    useValue: {
                        findOne: jest.fn().mockResolvedValue({ id: 1, price: 50, stock_quantity: 10 }),
                        save: jest.fn(),
                    },
                },
                {
                    provide: getRepositoryToken(Invoice),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<TicketsService>(TicketsService);
        ticketsRepository = module.get<Repository<Ticket>>(getRepositoryToken(Ticket));
        quoteRepository = module.get<Repository<Quote>>(getRepositoryToken(Quote));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a ticket', async () => {
            const createDto = { customer_id: 1, equipment_id: 1, issue_description: 'Test', priority: 'Low', status: 'Open' };
            const result = await service.create(createDto);
            expect(result.ticket_ref).toMatch(/T-\d+/);
            expect(ticketsRepository.create).toHaveBeenCalledWith(createDto);
        });
    });

    describe('addDiagnosis', () => {
        it('should update status to Diagnosed', async () => {
            await service.addDiagnosis(1, 'Faulty PSU');
            expect(ticketsRepository.save).toHaveBeenCalledWith(expect.objectContaining({ status: 'Diagnosed' }));
        });
    });

    describe('createQuote', () => {
        it('should create a quote and update ticket status', async () => {
            await service.createQuote(1, [{ item: 'Part', price: 100 }], 100);
            expect(quoteRepository.create).toHaveBeenCalled();
            expect(ticketsRepository.save).toHaveBeenCalledWith(expect.objectContaining({ status: 'Quote Generated' }));
        });
    });
});
