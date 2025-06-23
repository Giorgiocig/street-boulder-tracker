import { Body, Controller, Post } from '@nestjs/common';
import { BoulderService } from './boulder.service';
import { BoulderDto } from './dto';

@Controller('v1/boulders')
export class BoulderController {
  constructor(private readonly boulderService: BoulderService) {}

  @Post('/insert')
  async insertBoulder(@Body() dto: BoulderDto): Promise<any> {
    return await this.boulderService.insertBoulder(dto);
  }
}
