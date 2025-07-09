import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventDto } from './dto';
import { UpdateEventDto } from './dto/updateEvent.dto';

@Controller('v1/events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/add')
  @HttpCode(201)
  async addEvent(@Body() dto: EventDto): Promise<any> {
    return await this.eventService.addEvent(dto);
  }

  @Get('/get')
  async getEvents(): Promise<any> {
    return await this.eventService.getEvents();
  }

  @Patch(':id')
  async updateEvent(
    @Body() dto: UpdateEventDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return await this.eventService.updateEvent(id, dto);
  }

  @Delete(':id')
  async deleteEvent(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.eventService.deleteEvent(id);
  }
}
