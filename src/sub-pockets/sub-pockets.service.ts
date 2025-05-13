import { Injectable } from '@nestjs/common';
import { CreateSubPocketDto } from './dto/create-sub-pocket.dto';
import { UpdateSubPocketDto } from './dto/update-sub-pocket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubPocket } from './entities/sub-pocket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubPocketsService {
  constructor(
        @InjectRepository(SubPocket)
        private readonly SubPocketRepo: Repository<SubPocket>,
        
      ) {}

  async create(createSubPocketDto: CreateSubPocketDto) {
    const subPocket = this.SubPocketRepo.create(createSubPocketDto);
    await this.SubPocketRepo.save(subPocket);
    return subPocket;
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
