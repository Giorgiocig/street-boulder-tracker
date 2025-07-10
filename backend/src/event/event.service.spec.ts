import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { eventFixture, eventWithBouldersFixture } from './fixture';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('EventService', () => {
  let service: EventService;
  let prisma: PrismaService;

  const mockPrismaService = {
    event: {
      create: jest.fn(),
      findMany: jest.fn().mockResolvedValue([eventFixture]),
      findUnique: jest.fn().mockResolvedValue(eventFixture),
      update: jest.fn().mockResolvedValue(eventFixture),
      delete: jest.fn().mockResolvedValue(eventFixture),
      getEventWithBoulders: jest.fn().mockResolvedValue(eventFixture),
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
  it('should throw an error if prisma does it', async () => {
    mockPrismaService.event.create.mockRejectedValue(new Error('DB error'));
    await expect(service.addEvent(eventFixture)).rejects.toThrow(
      'Failed to create event',
    );
  });
  describe('getEvents', () => {
    it('should return list of boulders', async () => {
      const events = await service.getEvents();
      expect(events).toHaveLength(1);
      expect(events[0].name).toBe('Test Event');
    });
  });
  describe('updateEvent', () => {
    it('should update', async () => {
      mockPrismaService.event.findUnique.mockResolvedValue({
        ...eventFixture,
        id: 1,
      });
      mockPrismaService.event.update.mockImplementation(({ data }) => ({
        ...eventFixture,
        ...data,
      }));
      const event = await service.updateEvent(1, { name: 'new' });
      expect(event.name).toBe('new');
    });
    it('should fail if event doesn’t exist', async () => {
      mockPrismaService.event.findUnique.mockResolvedValue(null);
      await expect(service.updateEvent(999, { name: 'new' })).rejects.toThrow(
        NotFoundException,
      );
    });
    it('should throw InternalServerErrorException on update failure', async () => {
      mockPrismaService.event.findUnique.mockResolvedValue(eventFixture);
      mockPrismaService.event.update.mockRejectedValue(new Error('DB failure'));
      await expect(service.updateEvent(1, { name: 'new' })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
  describe('deleteEvent', () => {
    it('should delete', async () => {
      const mockEvent = { ...eventFixture, id: 1 };
      mockPrismaService.event.findUnique.mockResolvedValue(mockEvent);
      mockPrismaService.event.delete.mockResolvedValue(mockEvent);
      const result = await service.deleteEvent(mockEvent.id);
      expect(prisma.event.delete).toHaveBeenCalledWith({
        where: { id: mockEvent.id },
      });
      expect(result).toEqual(mockEvent);
    });
    it('should fail if eventa doesn’t exist', async () => {
      mockPrismaService.event.findUnique.mockResolvedValue(null);
      await expect(service.deleteEvent(999)).rejects.toThrow(NotFoundException);
    });
    it('should throw InternalServerErrorException on delete failure', async () => {
      mockPrismaService.event.findUnique.mockResolvedValue(eventFixture);

      mockPrismaService.event.delete.mockRejectedValue(new Error('DB failure'));

      await expect(service.deleteEvent(1)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
  describe('getEventWithBouldersById', () => {
    it('should get boulders', async () => {
      mockPrismaService.event.findUnique.mockResolvedValue(
        eventWithBouldersFixture,
      );
      const eventWithBoulders = await service.getEventWithBouldersById(1);
      expect(eventWithBoulders).toHaveLength(2);
      expect(eventWithBoulders[0].name).toBe('Test Boulder1');
    });
    it('should fail if eventa doesn’t exist', async () => {
      mockPrismaService.event.findUnique.mockResolvedValue(null);
      await expect(service.getEventWithBouldersById(999)).rejects.toThrow(
        NotFoundException,
      );
    });
    it('should throw InternalServerErrorException on get failure', async () => {
      mockPrismaService.event.findUnique.mockResolvedValue(eventFixture);
      mockPrismaService.event.findUnique.mockRejectedValue(
        new Error('DB failure'),
      );
      await expect(service.getEventWithBouldersById(1)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
