import { Test, TestingModule } from '@nestjs/testing';
import { BoulderService } from './boulder.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { createBaseDto } from './fixture';

describe('BoulderService', () => {
  let service: BoulderService;
  let prisma: PrismaService;

  const mockPrismaService = {
    boulder: {
      create: jest.fn(),
    },
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('some-value'),
  };

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); // silenzia console.error
  });

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('insertBoulder', () => {

    it('should call prisma.boulder.create with correct data', async () => {
      const baseDtoNoUser = createBaseDto();
      mockPrismaService.boulder.create.mockResolvedValue(baseDtoNoUser);
      const result = await service.insertBoulder(baseDtoNoUser);
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
      await expect(service.insertBoulder(baseDtoNoUser)).rejects.toThrow(
        'Failed to create boulder',
      );
    });

    it('should pass userId if provided', async () => {
      const baseDtoWithUser = createBaseDto(42);
      mockPrismaService.boulder.create.mockResolvedValue(baseDtoWithUser);
      const result = await service.insertBoulder(baseDtoWithUser);
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
      const result = await service.insertBoulder(baseDtoNoUser);
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
});
