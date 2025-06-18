import { Module } from '@nestjs/common';
import { BoulderService } from './boulder.service';
import { BoulderController } from './boulder.controller';

@Module({
  providers: [BoulderService],
  controllers: [BoulderController]
})
export class BoulderModule {}
