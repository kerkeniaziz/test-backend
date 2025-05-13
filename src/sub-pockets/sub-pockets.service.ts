import { Injectable } from '@nestjs/common';
import { CreateSubPocketDto } from './dto/create-sub-pocket.dto';
import { UpdateSubPocketDto } from './dto/update-sub-pocket.dto';

@Injectable()
export class SubPocketsService {
  create(createSubPocketDto: CreateSubPocketDto) {
    return 'This action adds a new subPocket';
  }

  findAll() {
    return `This action returns all subPockets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subPocket`;
  }

  update(id: number, updateSubPocketDto: UpdateSubPocketDto) {
    return `This action updates a #${id} subPocket`;
  }

  remove(id: number) {
    return `This action removes a #${id} subPocket`;
  }
}
