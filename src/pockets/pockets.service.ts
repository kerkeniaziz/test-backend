import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePocketDto } from './dto/create-pocket.dto';
import { UpdatePocketDto } from './dto/update-pocket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pocket } from './entities/pocket.entity';
import { Repository } from 'typeorm';
import { UpdatePocketOrderDto } from './dto/update-pocket-order.dto';

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
      relations: ['subPockets','subPockets.condition'],
    });
    if (!pockets) {
      throw new Error('No pockets found');
    }
    return pockets;
  }

  async updateOrder(updatePocketOrderDto: UpdatePocketOrderDto) {
    const { updates } = updatePocketOrderDto;
  
    // On récupère toutes les subPockets concernées par les IDs
    const ids = updates.map(update => update.id);
    const existingSubPockets = await this.PocketRepo.findByIds(ids);
  
    if (existingSubPockets.length !== updates.length) {
      throw new BadRequestException('One or more subPockets not found.');
    }
  
    // On crée une map pour accéder plus facilement aux updates par ID
    const updatesMap = new Map(updates.map(u => [u.id, u.order]));
  
    // Mise à jour des ordres
    for (const subPocket of existingSubPockets) {
      const newOrder = updatesMap.get(subPocket.id);
      if (typeof newOrder === 'number' && subPocket.order !== newOrder) {
        subPocket.order = newOrder;
      }
    }
  
    await this.PocketRepo.save(existingSubPockets);
  
    return { message: 'Order updated successfully' };
  }


  ///////////////////////////////
  async findByUser(user: any) {

    const pockets = await this.PocketRepo.find({
      relations: ['subPockets', 'subPockets.condition', 'subPockets.notes', 'subPockets.notes.user'],
    });
  
    if (!pockets || pockets.length === 0) {
      throw new Error('No pockets found');
    }
    const filteredPockets = pockets
      .map(pocket => {
        const matchingSubPockets = pocket.subPockets.filter(sub => {
          const condition: any = sub.condition;
          
          if (!condition) return false; // dont include if no condition
          
          const userFieldValue = user.selectedUser[condition.field];
          if (condition.type === 'number') {
            const userValue = +userFieldValue;
            const conditionValue = +condition.value;
            switch (condition.operator) {
              case '=':
                return userValue == conditionValue;
              case '>':
                return  userValue > conditionValue;
              case '<':
                return  userValue < conditionValue; 
              default:
                return false;
            }
          }
          else {
            switch (condition.operator) {
              case '=':
                return userFieldValue == condition.value;
              case 'startsWith':
                return  userFieldValue.startsWith(condition.value);
              case 'endsWith':
                return  userFieldValue.endsWith(condition.value);
              default:
                return false;
            }
          }
        });
        
        return {
          ...pocket,
          subPockets: matchingSubPockets,
        };
      })
      .filter(pocket => pocket.subPockets.length > 0); // keep only pockets with matching subPockets
      console.log('filteredPockets', filteredPockets);
    if (filteredPockets.length === 0) {
      return {message:'No matching pockets found for this user'};
    }
  
    return filteredPockets;
   
  }

  async update( updatePocketDto: UpdatePocketDto): Promise<Pocket> {
    const { id, order } = updatePocketDto;
  
    const pocket = await this.PocketRepo.findOne({ where: { id } });
  
    if (!pocket) {
      throw new NotFoundException(`Pocket with id ${id} not found`);
    }
  
    pocket.order = order;
    return await this.PocketRepo.save(pocket); 
  }

  remove(id: number) {
    return `This action removes a #${id} pocket`;
  }
}
