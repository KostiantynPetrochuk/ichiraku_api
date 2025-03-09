import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
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

  async getByIds(ids: string[]) {
    return this.dishModel.find({
      _id: { $in: ids },
    });
  }

  async getForHomepage() {
    const allCategories = await this.dishModel.distinct('category');
    const categories = allCategories.filter(
      (category) => category !== 'sauce' && category !== 'drink',
    );
    const dishPromises = categories.map((category) =>
      this.dishModel.find({ category }).limit(4).exec(),
    );
    const dishesByCategory = await Promise.all(dishPromises);
    return categories.reduce((acc, category, index) => {
      acc[category] = dishesByCategory[index];
      return acc;
    }, {});
  }
}
