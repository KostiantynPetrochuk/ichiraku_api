import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Order } from '../../order/order.schema/order.schema';
import { Types } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@Schema()
export class Client {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  surrName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Order' }], default: [] })
  orders: Order[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);
