import {
	IsNotEmpty,
	IsString,
} from 'class-validator';

export class CategoryIdDto {
	@IsNotEmpty()
  @IsString()
	categoryId: string;
}