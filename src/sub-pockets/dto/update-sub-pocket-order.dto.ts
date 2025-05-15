
import { Type } from 'class-transformer';
import { ValidateNested, ArrayNotEmpty } from 'class-validator';
import { UpdateSubPocketItemDto } from './update-sub-pocket-item.dto';

export class UpdateSubPocketOrderDto {
  @ValidateNested({ each: true })
  @Type(() => UpdateSubPocketItemDto)
  @ArrayNotEmpty()
  updates: UpdateSubPocketItemDto[];
}