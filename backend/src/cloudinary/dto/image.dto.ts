import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ImageDto {
  @IsString()
  url: string;

  @IsString()
  public_id: string;

  @IsNumber()
  boulderId: number;
}
