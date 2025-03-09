import {
  IsNumber,
  IsString,
  IsBoolean,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateDishDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  imagePath: string;

  @IsNumber()
  weight: number;

  @IsNumber()
  price: number;

  @IsString()
  category: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  ingredients?: string[];
}
