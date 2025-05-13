import { Module } from '@nestjs/common';
import { SubPocketsService } from './sub-pockets.service';
import { SubPocketsController } from './sub-pockets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubPocket } from './entities/sub-pocket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubPocket]),
    
  ],
  controllers: [SubPocketsController],
  providers: [SubPocketsService],
  exports: [TypeOrmModule],
})
export class SubPocketsModule {}
