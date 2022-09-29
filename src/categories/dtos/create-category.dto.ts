import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Event } from '../interfaces/category.interface';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Event[];
}
