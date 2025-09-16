import { Injectable } from '@nestjs/common';
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
        throw new Error(`Boulder with id ${boulderId} not found`);
      }
      // Promise is required because Cloudinary API doesn t return a promise.
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

      const dto: ImageDto = {
        url: result.secure_url,
        public_id: result.public_id,
        boulderId,
      };

      return await this.prisma.image.create({
        data: dto,
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create boulder', error);
    }
  }
}
