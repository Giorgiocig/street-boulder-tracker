import { Test, TestingModule } from '@nestjs/testing';
import { BoulderService } from './boulder.service';

describe('BoulderService', () => {
  let service: BoulderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoulderService],
    }).compile();

    service = module.get<BoulderService>(BoulderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
