import { IsString, IsNumber } from 'class-validator';

export class UpdateSubPocketItemDto {
  @IsString()
  id: string;

  @IsNumber()
  order: number;
}