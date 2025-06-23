import { Test, TestingModule } from '@nestjs/testing';
import { BoulderService } from './boulder.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { createBaseDto } from './fixture';
import { describe } from 'node:test';

describe('BoulderService', () => {
  // Variables to keep trace of instances of BoulderService and PrismaService. they will be initialized in beforeEach
  let service: BoulderService;
  let prisma: PrismaService;

  // Mock of PrismaService --> mock object simulating Prisma. Only boulder.create is simulated with jest.fn()
  const mockPrismaService = {
    boulder: {
      create: jest.fn(),
      findMany: jest.fn().mockResolvedValue([
        {
          id: 1,
          name: 'Test Boulder',
          description: 'Sample',
          difficulty: 'medio',
          latitude: 45.0,
          longitude: 9.0,
          createdAt: new Date(),
        },
      ]),
    },
  };

  // Mock of ConfigService --> to avoid to load configfile
  const mockConfigService = {
    get: jest.fn(),
  };

  // Silent console.error
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  // Create a nestJs module to provide real BoulderService (to test) and mocked PrismaModule & ConfiService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoulderService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<BoulderService>(BoulderService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  // Clear and clean all mock between each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addBoulder', () => {
    it('should call prisma.boulder.create with correct data', async () => {
      const baseDtoNoUser = createBaseDto();
      mockPrismaService.boulder.create.mockResolvedValue(baseDtoNoUser);
      const result = await service.addBoulder(baseDtoNoUser);
      expect(prisma.boulder.create).toHaveBeenCalledWith({
        data: {
          name: baseDtoNoUser.name,
          description: baseDtoNoUser.description,
          difficulty: baseDtoNoUser.difficulty,
          latitude: baseDtoNoUser.latitude,
          longitude: baseDtoNoUser.longitude,
          createdAt: baseDtoNoUser.createdAt,
          userId: baseDtoNoUser.userId,
        },
      });

      expect(result).toEqual(baseDtoNoUser);
    });

    it('should throw an error if prisma does it', async () => {
      const baseDtoNoUser = createBaseDto();
      mockPrismaService.boulder.create.mockRejectedValue(new Error('DB error'));
      await expect(service.addBoulder(baseDtoNoUser)).rejects.toThrow(
        'Failed to create boulder',
      );
    });

    it('should pass userId if provided', async () => {
      const baseDtoWithUser = createBaseDto(42);
      mockPrismaService.boulder.create.mockResolvedValue(baseDtoWithUser);
      const result = await service.addBoulder(baseDtoWithUser);
      expect(prisma.boulder.create).toHaveBeenCalledWith({
        data: {
          name: baseDtoWithUser.name,
          description: baseDtoWithUser.description,
          difficulty: baseDtoWithUser.difficulty,
          latitude: baseDtoWithUser.latitude,
          longitude: baseDtoWithUser.longitude,
          createdAt: baseDtoWithUser.createdAt,
          userId: baseDtoWithUser.userId,
        },
      });
      expect(result).toEqual(baseDtoWithUser);
    });

    it('should omit userId if not provided', async () => {
      const baseDtoNoUser = createBaseDto();
      mockPrismaService.boulder.create.mockResolvedValue(baseDtoNoUser);
      const result = await service.addBoulder(baseDtoNoUser);
      expect(prisma.boulder.create).toHaveBeenCalledWith({
        data: {
          name: baseDtoNoUser.name,
          description: baseDtoNoUser.description,
          difficulty: baseDtoNoUser.difficulty,
          latitude: baseDtoNoUser.latitude,
          longitude: baseDtoNoUser.longitude,
          createdAt: baseDtoNoUser.createdAt,
        },
      });
      expect(result).toEqual(baseDtoNoUser);
    });
  });
  describe('getBoulders', () => {
    it('should return list of boulders', async () => {
      const boulders = await service.getBoulders();
      expect(boulders).toHaveLength(1);
      expect(boulders[0].name).toBe('Test Boulder');
    });
  });
});
