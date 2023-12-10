import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from 'src/domain/dtos/book.dto';
import { UpdateBookDto } from 'src/domain/dtos/updateBook.dto';
import { CategoryIdDto } from 'src/domain/dtos/categoryId.dto';
import { Public } from 'src/libs/security/decorators/public.decorator';
import { Roles } from 'src/libs/security/decorators/roles.decorator';
import { Role } from 'src/libs/security/enums/role.enum';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() bookDto: BookDto) {
    return this.booksService.create(bookDto);
  }

  @Public()
  @Get()
  async findAll() {
    return this.booksService.findAll();
  }

  @Public()
  @Get(':bookId')
  async findById(@Param('bookId') bookId: string) {
    const book = await this.booksService.findById(bookId);
    if (!book) {
      throw new NotFoundException(`Book with the id ${bookId} does not exist.`);
    }
    return book;
  }

  @Patch(':bookId/add_category')
  @Roles(Role.Admin)
  async addCategory(@Param('bookId') bookId: string, @Body() {categoryId}: CategoryIdDto) {
    return this.booksService.addCategory(bookId, categoryId);
  }

  @Patch(':bookId/delete_category')
  @Roles(Role.Admin)
  async deleteCategory(@Param('bookId') bookId: string, @Body() {categoryId}: CategoryIdDto) {
    return this.booksService.deleteCategory(bookId, categoryId);
  }

  @Patch(':bookId')
  @Roles(Role.Admin)
  async update(@Param('bookId') bookId: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(bookId, updateBookDto);
  }

  @Delete(':bookId')
  @Roles(Role.Admin)
  async delete(@Param('bookId') bookId: string) {
    return this.booksService.delete(bookId);
  }
}
