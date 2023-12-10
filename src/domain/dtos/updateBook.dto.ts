import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional
} from 'class-validator';

export class UpdateBookDto{
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  author: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  published: number;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  pages: number;
}