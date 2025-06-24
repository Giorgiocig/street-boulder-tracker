import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BoulderService } from './boulder.service';
import { BoulderDto } from './dto';

@Controller('v1/boulders')
export class BoulderController {
  constructor(private readonly boulderService: BoulderService) {}

  @Post('/add')
  async addBoulder(@Body() dto: BoulderDto): Promise<any> {
    return await this.boulderService.addBoulder(dto);
  }

  @Get('/get')
  async getBoulders() {
    return await this.boulderService.getBoulders();
  }

  @Get(':id')
  async getBoulder(@Param('id', ParseIntPipe) id: number) {
    return await this.boulderService.getBoulder(id);
  }
}
