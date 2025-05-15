
import { Type } from 'class-transformer';
import { ValidateNested, ArrayNotEmpty } from 'class-validator';
import { UpdatePocketItemDto } from './update-pocket-item.dto';

export class UpdatePocketOrderDto {
  @ValidateNested({ each: true })
  @Type(() => UpdatePocketItemDto)
  @ArrayNotEmpty()
  updates: UpdatePocketItemDto[];
}