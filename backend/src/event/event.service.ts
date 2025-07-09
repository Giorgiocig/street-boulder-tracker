import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventDto } from './dto';
import { UpdateEventDto } from './dto/updateEvent.dto';

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
      throw new InternalServerErrorException('Failed to create event');
    }
  }
  async getEvents() {
    try {
      return await this.prisma.event.findMany();
    } catch (error) {
      this.logger.error('Failed to fetch event', error.stack);
      throw new Error('Failed to fetch events');
    }
  }

  async updateEvent(id: number, dto: UpdateEventDto) {
    try {
      const existingEvent = await this.prisma.event.findUnique({
        where: { id },
      });

      if (!existingEvent) {
        this.logger.warn(`Event with ID ${id} not found`);
        throw new NotFoundException(`Event with ID ${id} not found`);
      }

      const updatedEvent = {};
      for (const [key, value] of Object.entries(dto)) {
        if (value !== undefined) updatedEvent[key] = value;
      }

      return await this.prisma.event.update({
        where: { id },
        data: updatedEvent,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Failed to update event with ID ${id}`, error.stack);
      throw new InternalServerErrorException('Failed to update event');
    }
  }

  async deleteEvent(id: number) {
    try {
      const existingEvent = await this.prisma.event.findUnique({
        where: { id },
      });
      if (!existingEvent) {
        this.logger.warn(`Event with ID ${id} not found`);
        throw new NotFoundException(`Event with ID ${id} not found`);
      }
      return await this.prisma.event.delete({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to delete event with ID ${id}`, error.stack);
      throw new InternalServerErrorException('Failed to delete event', error);
    }
  }
}
