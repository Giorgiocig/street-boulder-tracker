import { Body, Controller, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { EventDto } from './dto';

@Controller('v1/events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/add')
  async addEvent(@Body() dto: EventDto): Promise<any> {
    return await this.eventService.addEvent(dto);
  }
}
