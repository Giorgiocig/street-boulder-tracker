import { Test, TestingModule } from '@nestjs/testing';
import { BoulderController } from './boulder.controller';

describe('BoulderController', () => {
  let controller: BoulderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoulderController],
    }).compile();

    controller = module.get<BoulderController>(BoulderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
