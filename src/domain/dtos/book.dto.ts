import {
  IsNotEmpty,
  IsString,
  IsInt,
} from 'class-validator';

export class BookDto{
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  published: number;

  @IsNotEmpty()
  @IsInt()
  pages: number;
}