import { PartialType } from '@nestjs/mapped-types';
import { BoulderDto } from './boulder.dto';

export class UpdateBoulderDto extends PartialType(BoulderDto) {}
