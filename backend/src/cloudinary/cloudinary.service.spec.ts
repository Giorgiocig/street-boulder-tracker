import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryService } from './cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { createBaseDto } from 'src/boulder/fixture';
import { v2 as cloudinary } from 'cloudinary';

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
    },
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const config = {
        CLOUDINARY_CLOUD_NAME: 'test-cloud',
        CLOUDINARY_API_KEY: 'test-api-key',
        CLOUDINARY_API_SECRET: 'test-api-secret',
      };
      return config[key];
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
      // Mock boulder trovato
      const mockBoulder = createBaseDto();
      mockPrismaService.boulder.findUnique.mockResolvedValue(mockBoulder);

      // Mock risultato immagine creata
      const mockImageResult = {
        id: 3,
        url: 'https://res.cloudinary.com/ddcyifrfx/image/upload/v1758010208/boulders/iyt2iary8hgj3jrmdpg4.jpg',
        public_id: 'boulders/iyt2iary8hgj3jrmdpg4',
        uploadedAt: '2025-09-16T08:10:09.126Z',
        boulderId: 1,
      };
      mockPrismaService.image.create.mockResolvedValue(mockImageResult);

      // Mock Cloudinary upload_stream
      const mockStream = {
        end: jest.fn(),
      };

      jest
        .spyOn(cloudinary.uploader, 'upload_stream')
        .mockImplementation(
          (options: any, callback?: (error: any, result: any) => void) => {
            // Simula una chiamata asincrona con setTimeout per essere più realistico
            setTimeout(() => {
              if (callback) {
                callback(null, {
                  secure_url:
                    'https://res.cloudinary.com/ddcyifrfx/image/upload/v1758010208/boulders/iyt2iary8hgj3jrmdpg4.jpg',
                  public_id: 'boulders/iyt2iary8hgj3jrmdpg4',
                });
              }
            }, 0);
            return mockStream as any;
          },
        );

      const fileBuffer = Buffer.from('mock image data');
      const result = await service.uploadImage(fileBuffer, 1);

      // Verifiche
      expect(mockPrismaService.boulder.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });

      expect(mockPrismaService.image.create).toHaveBeenCalledWith({
        data: {
          url: 'https://res.cloudinary.com/ddcyifrfx/image/upload/v1758010208/boulders/iyt2iary8hgj3jrmdpg4.jpg',
          public_id: 'boulders/iyt2iary8hgj3jrmdpg4',
          boulderId: 1,
        },
      });

      expect(result).toEqual(mockImageResult);
      expect(mockStream.end).toHaveBeenCalledWith(fileBuffer);
    });

    it('should throw error when boulder not found', async () => {
      // Mock boulder non trovato
      mockPrismaService.boulder.findUnique.mockResolvedValue(null);

      const fileBuffer = Buffer.from('mock image data');

      await expect(service.uploadImage(fileBuffer, 999)).rejects.toThrow(
        'Failed to create boulder',
      );

      expect(mockPrismaService.boulder.findUnique).toHaveBeenCalledWith({
        where: { id: 999 },
      });

      // Verifica che console.error sia stato chiamato
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should handle cloudinary upload error', async () => {
      // Mock boulder trovato
      mockPrismaService.boulder.findUnique.mockResolvedValue(createBaseDto());

      // Mock Cloudinary upload_stream con errore
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

      await expect(service.uploadImage(fileBuffer, 1)).rejects.toThrow(
        'Failed to create boulder',
      );

      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });
});
