import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { CategoryDto } from '../dtos/category.dto';

@Injectable()
export class CategoriesRepo {
    constructor(private readonly prisma: PrismaService) { }
    
    async create(categoryDto: CategoryDto) {
      return this.prisma.category.create({
        data: {
          ...categoryDto
        }
      });
    };

    async addBook(categoryId: string, bookId: string) {
      return this.prisma.category.update({
        where: { id: categoryId },
        data: {
          books: {
            connect: {
              id: bookId
            }
          }
        },
        include: {
          books: true
        }
      })
    };

    async deleteBook(categoryId: string, bookId: string) {
      return this.prisma.category.update({
        where: { id: categoryId },
        data: {
          books: {
            disconnect: {
              id: bookId
            }
          }
        },
        include: {
          books: true
        }
      })
    };

    async findById(categoryId: string) {
      return this.prisma.category.findUnique({
        where: {id: categoryId},
        include: {
          books: {
            select: {
              title: true,
              author: true
            }
          }
        }
      })
    };
    
    async findAll() {
      return this.prisma.category.findMany({
        include: {
          books: {
            select: {
              title: true,
              author: true
            }
          }
        }
      });
    };

    async update(categoryId: string, categoryDto: CategoryDto) {
      return this.prisma.category.update({
        where: { id: categoryId },
        data: categoryDto,
      });
    };
  
    async delete(categoryId: string) {
      return this.prisma.category.delete({ where: { id: categoryId } });
    };
};