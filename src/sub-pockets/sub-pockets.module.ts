import { Module } from '@nestjs/common';
import { SubPocketsService } from './sub-pockets.service';
import { SubPocketsController } from './sub-pockets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubPocket } from './entities/sub-pocket.entity';
import { Note } from 'src/note/entities/note.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubPocket , Note]),
    
  ],
  controllers: [SubPocketsController],
  providers: [SubPocketsService],
  exports: [TypeOrmModule],
})
export class SubPocketsModule {}
