import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post('create')
  async create(@Body() dto: CreateDishDto) {
    return this.dishService.create(dto);
  }

  @Get('slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.dishService.getBySlug(slug);
  }

  @Get('category/:category')
  async getByCategory(@Param('category') category: string) {
    return this.dishService.getByCategory(category);
  }
}
