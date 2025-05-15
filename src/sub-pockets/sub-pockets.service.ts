import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubPocketDto } from './dto/create-sub-pocket.dto';
import { UpdateSubPocketDto } from './dto/update-sub-pocket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubPocket } from './entities/sub-pocket.entity';
import { Repository } from 'typeorm';
import { CreateSubPocketNoteDto } from './dto/create-sub-pocket-note.dto';
import { Note } from 'src/note/entities/note.entity';
import { UpdateSubPocketOrderDto } from './dto/update-sub-pocket-order.dto';

@Injectable()
export class SubPocketsService {
  constructor(
        @InjectRepository(SubPocket)
        private readonly SubPocketRepo: Repository<SubPocket>,
        @InjectRepository(Note)
        private readonly NoteRepo: Repository<Note>,
        
      ) {}

  async create(createSubPocketDto: CreateSubPocketDto) {
    const subPocket = this.SubPocketRepo.create(createSubPocketDto);
    await this.SubPocketRepo.save(subPocket);
    return subPocket;
  }

  async addNote(createSubPocketNoteDto: CreateSubPocketNoteDto) {
    const subPocket = this.NoteRepo.create(createSubPocketNoteDto);
    await this.NoteRepo.save(subPocket);
    return subPocket;
  }

  findAll() {
    return `This action returns all subPockets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subPocket`;
  }

  async updateOrder(updateSubPocketOrderDto: UpdateSubPocketOrderDto) {
    const { updates } = updateSubPocketOrderDto;
  
    // On récupère toutes les subPockets concernées par les IDs
    const ids = updates.map(update => update.id);
    const existingSubPockets = await this.SubPocketRepo.findByIds(ids);
  
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
  
    await this.SubPocketRepo.save(existingSubPockets);
  
    return { message: 'Order updated successfully' };
  }
  

  async update(updateSubPocketDto: UpdateSubPocketDto): Promise<SubPocket> {
    const { id, order } = updateSubPocketDto;
    
      const pocket = await this.SubPocketRepo.findOne({ where: { id } });
    
      if (!pocket) {
        throw new NotFoundException(`Pocket with id ${id} not found`);
      }
      pocket.order = order;
      return await this.SubPocketRepo.save(pocket); 
  }
   

  remove(id: number) {
    return `This action removes a #${id} subPocket`;
  }
}
