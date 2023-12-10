import {
  IsNotEmpty,
  IsString,
  IsOptional
} from 'class-validator';

export class UpdateCategoryDto{
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;
}