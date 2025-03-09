import {
  IsNumber,
  IsString,
  IsBoolean,
  IsArray,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  clientId: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  surrName: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsBoolean()
  delivery: boolean;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  deliveryTime: string;

  @IsEnum(['cash', 'online'])
  paymentMethod: 'cash' | 'online';

  @IsArray()
  dishes: {
    dishId: string;
    quantity: number;
  }[];
}
