import { Test, TestingModule } from '@nestjs/testing';
import { SweetsController } from './sweets.controller';
import { SweetsService } from './sweets.service';

const mockSweetsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  search: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  purchase: jest.fn(),
  restock: jest.fn(),
};

describe('SweetsController', () => {
  let controller: SweetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SweetsController],
      providers: [{ provide: SweetsService, useValue: mockSweetsService }],
    }).compile();

    controller = module.get<SweetsController>(SweetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
