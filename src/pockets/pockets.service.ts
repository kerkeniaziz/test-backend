import { Injectable } from '@nestjs/common';
import { CreatePocketDto } from './dto/create-pocket.dto';
import { UpdatePocketDto } from './dto/update-pocket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pocket } from './entities/pocket.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Condition } from 'src/condition/entities/condition.entity';

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

  async findByUser(user: User) {
    const pockets = await this.PocketRepo.find({
      relations: ['user', 'subPockets', 'subPockets.condition'],
    });
  
    if (!pockets || pockets.length === 0) {
      throw new Error('No pockets found');
    }
  
    
    const filteredPockets = pockets
      .map(pocket => {
        const matchingSubPockets = pocket.subPockets.filter(sub => {
          const condition:any = sub.condition;
          if (!condition) return true; // include if no condition
  
          const userFieldValue = user[condition.field];
  
          switch (condition.operator) {
            case '=':
              return userFieldValue == condition.value;
            case '>':
              return +userFieldValue > condition.value;
            case '<':
              return +userFieldValue < condition.value;
            case 'startsWith':
              return typeof userFieldValue === 'string' && userFieldValue.startsWith(condition.value);
            case 'endsWith':
              return typeof userFieldValue === 'string' && userFieldValue.endsWith(condition.value);
            default:
              return false;
          }
        });
  
        return {
          ...pocket,
          subPockets: matchingSubPockets,
        };
      })
      .filter(pocket => pocket.subPockets.length > 0); // keep only pockets with matching subPockets
  
    if (filteredPockets.length === 0) {
      throw new Error('No matching pockets found for this user');
    }
  
    return filteredPockets;
  }

  update(id: number, updatePocketDto: UpdatePocketDto) {
    return `This action updates a #${id} pocket`;
  }

  remove(id: number) {
    return `This action removes a #${id} pocket`;
  }
}
