import { Body, Controller, Post } from '@nestjs/common';
import { BoulderService } from './boulder.service';

@Controller('boulders')
export class BoulderController {
  constructor(private boulderService: BoulderService) {}

  @Post()
  async insertBoulder(@Body() data: any) {
    return this.boulderService.insertBoulder(data);
  }
}
