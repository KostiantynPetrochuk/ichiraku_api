import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dish, DishDocument } from './dish.schema/dish.schema';
import { CreateDishDto } from './dto/create-dish.dto';

@Injectable()
export class DishService {
  constructor(@InjectModel(Dish.name) private dishModel: Model<DishDocument>) {}

  async create(dto: CreateDishDto): Promise<Dish> {
    return this.dishModel.create(dto);
  }

  async getBySlug(slug: string) {
    return this.dishModel.findOne({ slug });
  }

  async getByCategory(category: string) {
    return this.dishModel.find({ category });
  }
}
