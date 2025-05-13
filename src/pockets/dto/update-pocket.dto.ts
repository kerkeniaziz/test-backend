import { PartialType } from '@nestjs/mapped-types';
import { CreatePocketDto } from './create-pocket.dto';
import { IsInt, IsUUID } from 'class-validator';

export class UpdatePocketDto extends PartialType(CreatePocketDto) {

    @IsUUID()
    id: string;
  
    @IsInt()
    order: number;
}
