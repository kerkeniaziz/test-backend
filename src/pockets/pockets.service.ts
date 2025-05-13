import { Injectable } from '@nestjs/common';
import { CreatePocketDto } from './dto/create-pocket.dto';
import { UpdatePocketDto } from './dto/update-pocket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pocket } from './entities/pocket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PocketsService {
  constructor(
      @InjectRepository(Pocket)
      private readonly PocketRepo: Repository<Pocket>,
      
    ) {}
  async create(createPocketDto: CreatePocketDto) {
    const pocket = this.PocketRepo.create(createPocketDto);
    await this.PocketRepo.save(pocket);
    return pocket;
  }

  async findAll() {
    const pockets = this.PocketRepo.find({
      relations: ['subPockets'],
    });
    if (!pockets) {
      throw new Error('No pockets found');
    }
    return pockets;
  }

  findOne(id: number) {
    return `This action returns a #${id} pocket`;
  }

  async findByUser() {
    const pockets= await this.PocketRepo.find({
      relations: ['user','subPockets'],
    });

    if (!pockets) {
      throw new Error('No pockets found');
    }
    
    const pocketwithoutSubPockets = pockets.filter(pocket => !pocket.subPockets);

    if (pocketwithoutSubPockets.length === 0) {
      throw new Error('No subPockets found for this user');
    }
    const pocketCondition = pockets.subPockets.condition; 

    const filteredPockets = pockets.filter(pocket => pocket.subPockets === pocketCondition);
    if (filteredPockets.length === 0) {
      throw new Error('No pockets found for this user');
    }
    return pockets;
  } 

  update(id: number, updatePocketDto: UpdatePocketDto) {
    return `This action updates a #${id} pocket`;
  }

  remove(id: number) {
    return `This action removes a #${id} pocket`;
  }
}
