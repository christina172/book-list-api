import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from 'src/domain/dtos/category.dto';
import { UpdateCategoryDto } from 'src/domain/dtos/updateCategory.dto';
import { BookIdDto } from 'src/domain/dtos/bookId.dto';
import { Public } from 'src/libs/security/decorators/public.decorator';
import { Roles } from 'src/libs/security/decorators/roles.decorator';
import { Role } from 'src/libs/security/enums/role.enum';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() categoryDto: CategoryDto) {
    return this.categoriesService.create(categoryDto);
  }

  @Public()
  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Public()
  @Get(':categoryId')
  async findById(@Param('categoryId') categoryId: string) {
    const category = await this.categoriesService.findById(categoryId);
    if (!category) {
      throw new NotFoundException(`Category with ${categoryId} does not exist.`);
    }
    return category;
  }

  @Patch(':categoryId/add_book')
  @Roles(Role.Admin)
  async addBook(@Param('categoryId') categoryId: string, @Body() {bookId}: BookIdDto) {
    return this.categoriesService.addBook(categoryId, bookId);
  }

  @Patch(':categoryId/delete_book')
  @Roles(Role.Admin)
  async deleteBook(@Param('categoryId') categoryId: string, @Body() {bookId}: BookIdDto) {
    return this.categoriesService.deleteBook(categoryId, bookId);
  }

  @Patch(':categoryId')
  @Roles(Role.Admin)
  async update(@Param('categoryId') categoryId: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(categoryId, updateCategoryDto);
  }

  @Delete(':categoryId')
  @Roles(Role.Admin)
  async delete(@Param('categoryId') categoryId: string) {
    return this.categoriesService.delete(categoryId);
  }
}
