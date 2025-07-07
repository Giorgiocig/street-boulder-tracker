import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BoulderDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateBoulderDto } from './dto/update-boulder.dto';

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
        eventId: dto.eventId,
        ...(dto.userId ? { userId: dto.userId } : null),
      };
      return await this.prisma.boulder.create({ data: boulder });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create boulder', error);
    }
  }
  async getBoulders() {
    try {
      return await this.prisma.boulder.findMany();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch and get boulders', error);
    }
  }
  async getBoulder(id: number) {
    try {
      const boulder = await this.prisma.boulder.findUnique({
        where: { id },
      });
      if (!boulder)
        throw new NotFoundException(`Boulder with ID ${id} not found`);
      return boulder;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update boulder', error);
    }
  }
  async updateBoulder(id: number, dto: UpdateBoulderDto) {
    try {
      const existingBoulder = await this.prisma.boulder.findUnique({
        where: { id },
      });
      if (!existingBoulder)
        throw new NotFoundException(`Boulder with ID ${id} not found`);
      const updatedBoulder: UpdateBoulderDto = {};
      for (const [key, value] of Object.entries(dto)) {
        if (value !== undefined) updatedBoulder[key] = value;
      }
      return await this.prisma.boulder.update({
        where: {
          id: id,
        },
        data: updatedBoulder,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update boulder', error);
    }
  }
  async deleteBoulder(id: number) {
    try {
      const existingBoulder = await this.prisma.boulder.findUnique({
        where: { id },
      });
      if (!existingBoulder)
        throw new NotFoundException(`Boulder with ID ${id} not found`);
      return await this.prisma.boulder.delete({ where: { id } });
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update boulder', error);
    }
  }
}
