import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument } from './order.schema/order.schema';
import { Order } from './order.schema/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { DishService } from '../dish/dish.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private dishService: DishService,
  ) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    const dishesIds = dto.dishes.map((dishItem) => dishItem.dishId);
    const currentDishes = await this.dishService.getByIds(dishesIds);
    let totalPrice = 0;
    const orderDishes = dto.dishes.map((dishItem) => {
      const targetDish = currentDishes.find(
        (item) => item.id === dishItem.dishId,
      );
      if (targetDish) {
        totalPrice += dishItem.quantity * targetDish.price;
      }
      return {
        dish: targetDish,
        quantity: dishItem.quantity,
      };
    });
    const newOrder = {
      firstName: dto.firstName,
      lastName: dto.lastName,
      surrName: dto.surrName,
      totalPrice,
      delivery: dto.delivery,
      address: dto.address,
      deliveryTime: dto.deliveryTime,
      paymentMethod: dto.paymentMethod,
      dishes: orderDishes,
    };
    return this.orderModel.create(newOrder);
  }
}
