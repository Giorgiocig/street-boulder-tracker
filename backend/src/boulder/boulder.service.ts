import { Injectable } from '@nestjs/common';
import { BoulderDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoulderService {
  constructor(private prisma: PrismaService) {}
  async addBoulder(dto: BoulderDto) {
    try {
      const boulder = {
        name: dto.name,
        description: dto.description,
        difficulty: dto.difficulty,
        latitude: dto.latitude,
        longitude: dto.longitude,
        createdAt: dto.createdAt,
        ...(dto.userId ? { userId: dto.userId } : null),
      };
      return await this.prisma.boulder.create({ data: boulder });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create boulder');
    }
  }
  async getBoulders() {
    try {
      return await this.prisma.boulder.findMany();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch and get boulders');
    }
  }
}
