import { Injectable } from '@nestjs/common';
import { BooksRepo } from 'src/domain/repos/books.repo';
import { BookDto } from 'src/domain/dtos/book.dto';

@Injectable()
export class BooksService {
    constructor(private booksRepo: BooksRepo){}

    async create(bookDto: BookDto) {
        return this.booksRepo.create(bookDto);
    }

    async addCategory(bookId: string, categoryId: string) {
        return this.booksRepo.addCategory(bookId, categoryId);
    }

    async deleteCategory(bookId: string, categoryId: string) {
        return this.booksRepo.deleteCategory(bookId, categoryId);
    }

    async findById(bookId: string) {
        return this.booksRepo.findById(bookId);
    }

    async findAll() {
        return this.booksRepo.findAll();
    }

    async update(bookId: string, bookDto: BookDto) {
        return this.booksRepo.update(bookId, bookDto);
    }

    async delete(bookId: string) {
        return this.booksRepo.delete(bookId);
    }
}
