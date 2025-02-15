import { Controller, Post, Body } from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post('create')
  async create(@Body() dto: CreateDishDto) {
    return this.dishService.create(dto);
  }
}
