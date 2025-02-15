import {
  IsNumber,
  IsString,
  IsBoolean,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateDishDto {
  @IsString()
  category: string;
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
  @IsBoolean()
  isNovelty: boolean;
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  ingredients?: string[];
}
