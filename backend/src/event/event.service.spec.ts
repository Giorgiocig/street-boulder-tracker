import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { eventFixture } from './fixture';

describe('EventService', () => {
  let service: EventService;
  let prisma: PrismaService;

  const mockPrismaService = {
    event: {
      create: jest.fn(),
    },
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
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

    service = module.get<EventService>(EventService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it('should call prisma.event.create with correct data', async () => {
    mockPrismaService.event.create.mockResolvedValue(eventFixture);
    const result = await service.addEvent(eventFixture);
    expect(prisma.event.create).toHaveBeenCalledWith({
      data: {
        name: eventFixture.name,
        description: eventFixture.description,
        date: eventFixture.date,
        city: eventFixture.city,
        latitude: eventFixture.latitude,
        longitude: eventFixture.longitude,
        createdAt: eventFixture.createdAt,
      },
    });
    expect(result).toEqual(eventFixture);
  });
});
