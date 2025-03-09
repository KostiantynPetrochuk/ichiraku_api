import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';
import { Dish, DishSchema } from './dish.schema/dish.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Dish.name, schema: DishSchema }]),
  ],
  controllers: [DishController],
  providers: [DishService],
  exports: [DishService],
})
export class DishModule {}
