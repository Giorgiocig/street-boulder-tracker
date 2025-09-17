import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImageDto } from './dto';

@Injectable()
export class CloudinaryService {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    cloudinary.config({
      cloud_name: this.config.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.config.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.config.get<string>('CLOUDINARY_API_SECRET'),
    });
  }
  async uploadImage(fileBuffer: Buffer, boulderId: number) {
    try {
      const boulder = await this.prisma.boulder.findUnique({
        where: { id: boulderId },
      });
      if (!boulder) {
        throw new NotFoundException(`Boulder with id ${boulderId} not found`);
      }
      // Upload image on Cloudinary
      const result = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'boulders' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        stream.end(fileBuffer);
      });

      return await this.prisma.image.create({
        data: {
          url: result.secure_url,
          public_id: result.public_id,
          boulderId,
        },
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to upload image: ${error.message}`,
      );
    }
  }
  async getImages(boulderId: number) {
    try {
      const boulder = await this.prisma.boulder.findUnique({
        where: { id: boulderId },
      });
      if (!boulder) {
        throw new NotFoundException(`Boulder with id ${boulderId} not found`);
      }
      // return images
      return await this.prisma.image.findMany({
        where: { boulderId },
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to get images: ${error.message}`,
      );
    }
  }
}
