import { Body, Controller, Post } from '@nestjs/common';
import { BoulderService } from './boulder.service';
import { BoulderDto } from './dto';
import { IBoulder } from 'src/utilities/interfaces';

@Controller('boulders')
export class BoulderController {
  constructor(private readonly boulderService: BoulderService) {}

  @Post()
  async insertBoulder(@Body() dto: BoulderDto): Promise<any> {
    return await this.boulderService.insertBoulder(dto);
  }
}
