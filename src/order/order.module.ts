import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './order.schema/order.schema';
import { DishModule } from 'src/dish/dish.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    DishModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
