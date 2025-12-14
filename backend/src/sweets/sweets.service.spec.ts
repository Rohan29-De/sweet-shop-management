import { Test, TestingModule } from '@nestjs/testing';
import { SweetsService } from './sweets.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  sweet: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  $transaction: jest.fn(async (cb: any) => cb({ sweet: mockPrisma.sweet })),
};

describe('SweetsService', () => {
  let service: SweetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SweetsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<SweetsService>(SweetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
