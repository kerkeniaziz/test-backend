import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PocketsService } from './pockets.service';
import { CreatePocketDto } from './dto/create-pocket.dto';
import { UpdatePocketDto } from './dto/update-pocket.dto';
import { User } from 'src/user/entities/user.entity';
import { UpdatePocketOrderDto } from './dto/update-pocket-order.dto';

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

  @Patch('order')
    updateOrder( @Body() updatePocketOrderDto: UpdatePocketOrderDto) {
      return this.pocketsService.updateOrder(updatePocketOrderDto);
    }

  @Post('/user')
  findByUser(@Body() user: any) {
    return this.pocketsService.findByUser(user);
  }


  @Patch()
  update(@Body() updatePocketDto: UpdatePocketDto) {
    return this.pocketsService.update(updatePocketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pocketsService.remove(+id);
  }
}
