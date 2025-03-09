import { Types, HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Client } from '../../client/client.schema/client.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({
    type: [
      {
        dish: { type: Types.ObjectId, ref: 'Dish', required: true },
        quantity: { type: Number, required: true },
      },
    ],
    required: true,
  })
  dishes: { dish: Types.ObjectId; quantity: number }[];

  @Prop({ required: false })
  firstName: string;

  @Prop({ required: false })
  lastName: string;

  @Prop({ required: false })
  surrName: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ type: Types.ObjectId, ref: 'Client', required: false })
  client: Client | null;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true, default: 'new' })
  status: string;

  @Prop({ required: true })
  delivery: boolean;

  @Prop({ required: false })
  deliveryTime: string;

  @Prop({ required: false })
  address: string;

  @Prop({ required: true, enum: ['cash', 'online'] })
  paymentMethod: string;

  @Prop({ required: true, enum: ['unpaid', 'paid'], default: 'unpaid' })
  paymentStatus: string;

  // add stripe transaction

  @Prop({ required: true, default: Date.now })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
