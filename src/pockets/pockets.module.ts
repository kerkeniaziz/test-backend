import { Module } from '@nestjs/common';
import { PocketsService } from './pockets.service';
import { PocketsController } from './pockets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pocket } from './entities/pocket.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Pocket]),
      
    ],
  controllers: [PocketsController],
  providers: [PocketsService],
  exports: [TypeOrmModule],
})
export class PocketsModule {}
