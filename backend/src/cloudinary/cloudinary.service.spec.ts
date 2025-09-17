import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryService } from './cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { createBaseDto } from 'src/boulder/fixture';
import { v2 as cloudinary } from 'cloudinary';
import { cloudinaryConfigTest, imageResultFixture } from './test.utilities';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('CloudinaryService', () => {
  let service: CloudinaryService;
  let prisma: PrismaService;
  let consoleErrorSpy: jest.SpyInstance;

  const mockPrismaService = {
    boulder: {
      findUnique: jest.fn(),
    },
    image: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      return cloudinaryConfigTest[key];
    }),
  };

  beforeEach(async () => {
    // Mock console.error
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CloudinaryService,
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

    service = module.get<CloudinaryService>(CloudinaryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy.mockRestore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadImage', () => {
    it('should upload an image successfully', async () => {
      // Mock found boulder
      const mockBoulder = createBaseDto();
      mockPrismaService.boulder.findUnique.mockResolvedValue(mockBoulder);

      // Mock found image

      mockPrismaService.image.create.mockResolvedValue(imageResultFixture);

      // Mock Cloudinary upload_stream
      const mockStream = {
        end: jest.fn(),
      };

      // Mimick an async call with setTimeout
      jest
        .spyOn(cloudinary.uploader, 'upload_stream')
        .mockImplementation(
          (options: any, callback?: (error: any, result: any) => void) => {
            setTimeout(() => {
              if (callback) {
                callback(null, {
                  secure_url:
                    'https://res.cloudinary.com/ddcyifrfx/image/upload/v1758014220/boulders/vxvqxoyfc1lpyuacjfhg.jpg',
                  public_id: 'boulders/iyt2iary8hgj3jrmdpg4',
                });
              }
            }, 0);
            return mockStream as any;
          },
        );

      const fileBuffer = Buffer.from('mock image data');
      const result = await service.uploadImage(fileBuffer, 1);

      // Verify that boulder exists
      expect(mockPrismaService.boulder.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });

      expect(mockPrismaService.image.create).toHaveBeenCalledWith({
        data: {
          url: 'https://res.cloudinary.com/ddcyifrfx/image/upload/v1758014220/boulders/vxvqxoyfc1lpyuacjfhg.jpg',
          public_id: 'boulders/iyt2iary8hgj3jrmdpg4',
          boulderId: 1,
        },
      });

      expect(result).toEqual(imageResultFixture);
      expect(mockStream.end).toHaveBeenCalledWith(fileBuffer);
    });

    it('should throw error when boulder not found', async () => {
      // Mock not found boulder
      mockPrismaService.boulder.findUnique.mockResolvedValue(null);
      const fileBuffer = Buffer.from('mock image data');
      await expect(service.uploadImage(fileBuffer, 999)).rejects.toBeInstanceOf(
        NotFoundException,
      );

      expect(mockPrismaService.boulder.findUnique).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });

    it('should handle cloudinary upload error', async () => {
      // Mock found boulder
      mockPrismaService.boulder.findUnique.mockResolvedValue(createBaseDto());

      // Mock Cloudinary upload_stream with error
      const mockStream = {
        end: jest.fn(),
      };

      jest
        .spyOn(cloudinary.uploader, 'upload_stream')
        .mockImplementation(
          (options: any, callback?: (error: any, result: any) => void) => {
            setTimeout(() => {
              if (callback) {
                callback(new Error('Cloudinary upload failed'), null);
              }
            }, 0);
            return mockStream as any;
          },
        );

      const fileBuffer = Buffer.from('mock image data');

      await expect(service.uploadImage(fileBuffer, 1)).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
  describe('getImages', () => {
    it('should get one image', async () => {
      const mockBoulder = createBaseDto();
      mockPrismaService.boulder.findUnique.mockResolvedValue(mockBoulder);
      mockPrismaService.image.findMany.mockResolvedValue([imageResultFixture]);
      const image = await service.getImages(1);
      expect(image[0].url).toBe(
        'https://res.cloudinary.com/ddcyifrfx/image/upload/v1758014220/boulders/vxvqxoyfc1lpyuacjfhg.jpg',
      );
    });
    it('should return empty array if no images', async () => {
      const mockBoulder = createBaseDto();
      mockPrismaService.boulder.findUnique.mockResolvedValue(mockBoulder);
      mockPrismaService.image.findMany.mockResolvedValue([]);
      const image = await service.getImages(1);
      expect(image).toEqual([]);
    });
    it('should throw NotFoundException if boulder not found', async () => {
      mockPrismaService.boulder.findUnique.mockResolvedValue(null);

      await expect(service.getImages(999)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
