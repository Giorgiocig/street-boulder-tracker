import { Module } from '@nestjs/common';
import { BoulderService } from './boulder.service';
import { BoulderController } from './boulder.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  providers: [BoulderService, CloudinaryService],
  controllers: [BoulderController],
})
export class BoulderModule {}
