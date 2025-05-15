import { IsString, IsNumber } from 'class-validator';

export class UpdatePocketItemDto {
  @IsString()
  id: string;

  @IsNumber()
  order: number;
}