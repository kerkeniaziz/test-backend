import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubPocketsService } from './sub-pockets.service';
import { CreateSubPocketDto } from './dto/create-sub-pocket.dto';
import { UpdateSubPocketDto } from './dto/update-sub-pocket.dto';
import { CreateSubPocketNoteDto } from './dto/create-sub-pocket-note.dto';
import { UpdateSubPocketOrderDto } from './dto/update-sub-pocket-order.dto';

@Controller('sub-pockets')
export class SubPocketsController {
  constructor(private readonly subPocketsService: SubPocketsService) {}

  @Post()
  create(@Body() createSubPocketDto: CreateSubPocketDto) {
    return this.subPocketsService.create(createSubPocketDto);
  }

  @Post('/addNote')
  addNote(@Body() createSubPocketNoteDto: CreateSubPocketNoteDto) {
    return this.subPocketsService.addNote(createSubPocketNoteDto);
  }

  @Get()
  findAll() {
    return this.subPocketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subPocketsService.findOne(+id);
  }

  @Patch()
  update( @Body() updateSubPocketDto: UpdateSubPocketDto) {
    return this.subPocketsService.update(updateSubPocketDto);
  }


  @Patch('order')
  updateOrder( @Body() updateSubPocketOrderDto: UpdateSubPocketOrderDto) {
    return this.subPocketsService.updateOrder(updateSubPocketOrderDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subPocketsService.remove(+id);
  }
}
