import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PocketsService } from './pockets.service';
import { CreatePocketDto } from './dto/create-pocket.dto';
import { UpdatePocketDto } from './dto/update-pocket.dto';

@Controller('pockets')
export class PocketsController {
  constructor(private readonly pocketsService: PocketsService) {}

  @Post()
  create(@Body() createPocketDto: CreatePocketDto) {
    return this.pocketsService.create(createPocketDto);
  }

  @Get()
  findAll() {
    return this.pocketsService.findAll();
  }

  @Get('user')
  findByUser() {
    return this.pocketsService.findByUser();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pocketsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePocketDto: UpdatePocketDto) {
    return this.pocketsService.update(+id, updatePocketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pocketsService.remove(+id);
  }
}
