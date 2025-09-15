import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BoulderService } from './boulder.service';
import { BoulderDto } from './dto';
import { UpdateBoulderDto } from './dto/update-boulder.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('v1/boulders')
export class BoulderController {
  constructor(
    private readonly boulderService: BoulderService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('/add')
  async addBoulder(@Body() dto: BoulderDto): Promise<any> {
    return await this.boulderService.addBoulder(dto);
  }

  @Get('/get')
  async getBoulders(): Promise<any> {
    return await this.boulderService.getBoulders();
  }

  @Get(':id')
  async getBoulder(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.boulderService.getBoulder(id);
  }

  @Patch(':id')
  async updateBoulder(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBoulderDto,
  ): Promise<any> {
    return await this.boulderService.updateBoulder(id, dto);
  }

  @Delete(':id')
  async deleteBoulder(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.boulderService.deleteBoulder(id);
  }

  @Post(':id/image')
  @UseInterceptors(FileInterceptor('file', { storage: undefined })) // memory storage default
  async uploadImage(
    @Param('id') boulderId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // file.buffer contains image data
    return this.cloudinaryService.uploadImage(file.buffer, Number(boulderId));
  }
}
