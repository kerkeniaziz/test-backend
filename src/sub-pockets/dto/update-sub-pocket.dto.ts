import { PartialType } from '@nestjs/mapped-types';
import { CreateSubPocketDto } from './create-sub-pocket.dto';

export class UpdateSubPocketDto extends PartialType(CreateSubPocketDto) {}
