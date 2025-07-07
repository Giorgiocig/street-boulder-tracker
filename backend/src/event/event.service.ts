import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventDto } from './dto';

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);
  constructor(private readonly prisma: PrismaService) {}
  async addEvent(dto: EventDto) {
    try {
      const event = {
        name: dto.name,
        description: dto.description,
        date: dto.date,
        city: dto.city,
        latitude: dto.latitude,
        longitude: dto.longitude,
        createdAt: dto.createdAt,
      };
      return await this.prisma.event.create({ data: event });
    } catch (error) {
      this.logger.error('Failed to create event', error.stack);
      throw error;
    }
  }
}
