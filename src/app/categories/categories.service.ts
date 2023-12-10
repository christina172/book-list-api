import { Injectable } from '@nestjs/common';
import { CategoriesRepo } from 'src/domain/repos/categories.repo';
import { CategoryDto } from 'src/domain/dtos/category.dto';

@Injectable()
export class CategoriesService {
    constructor(private categoriesRepo: CategoriesRepo){}

    async create(categoryDto: CategoryDto) {
        return this.categoriesRepo.create(categoryDto);
    }

    async addBook(categoryId: string, bookId: string) {
        return this.categoriesRepo.addBook(categoryId, bookId);
    }

    async deleteBook(categoryId: string, bookId: string) {
        return this.categoriesRepo.deleteBook(categoryId, bookId);
    }

    async findById(categoryId: string) {
        return this.categoriesRepo.findById(categoryId);
    }

    async findAll() {
        return this.categoriesRepo.findAll();
    }

    async update(categoryId: string, categoryDto: CategoryDto) {
        return this.categoriesRepo.update(categoryId, categoryDto);
    }

    async delete(categoryId: string) {
        return this.categoriesRepo.delete(categoryId);
    }
}
