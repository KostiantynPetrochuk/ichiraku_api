import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DishDocument = HydratedDocument<Dish>;

@Schema()
export class Dish {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  imagePath: string;

  @Prop()
  weight: number;

  @Prop()
  price: number;

  @Prop()
  category: string;

  @Prop({ type: [String], default: [] })
  ingredients: string[];
}

export const DishSchema = SchemaFactory.createForClass(Dish);
