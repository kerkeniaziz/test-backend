import { PartialType } from '@nestjs/mapped-types';
import { CreateSubPocketDto } from './create-sub-pocket.dto';
import { IsInt, IsUUID } from 'class-validator';

export class UpdateSubPocketDto extends PartialType(CreateSubPocketDto) {
      @IsUUID()
        id: string;
      
        @IsInt()
        order: number;
}
