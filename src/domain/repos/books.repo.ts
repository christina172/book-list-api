import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { BookDto } from 'src/domain/dtos/book.dto';

@Injectable()
export class BooksRepo {
    constructor(private readonly prisma: PrismaService) { }
    
    async create(bookDto: BookDto) {
      return this.prisma.book.create({
        data: {
          ...bookDto}
      });
    }

    async addCategory(bookId: string, categoryId: string) {
      return this.prisma.book.update({
        where: { id: bookId },
        data: {
          categories: {
            connect: {
              id: categoryId
            }
          }
        },
        include: {
          categories: true
        }
      })
    }

    async deleteCategory(bookId: string, categoryId: string) {
      return this.prisma.book.update({
        where: { id: bookId },
        data: {
          categories: {
            disconnect: {
              id: categoryId
          }
        }
        },
        include: {
          categories: true
        }
      })
    }

    async findById(bookId: string) {
      return this.prisma.book.findUnique({
        where: {id: bookId},
        include: {
          categories: {
            select: {
              name: true
            }
          }
        }
      })
    }
    
    async findAll() {
      return this.prisma.book.findMany({
        include: {
          categories: {
            select: {
              name: true
            }
          }
        }
      });
    }

    async update(bookId: string, bookDto: BookDto) {
      return this.prisma.book.update({
        where: { id: bookId },
        data: bookDto,
      });
    }
  
    async delete(bookId: string) {
      return this.prisma.book.delete({ where: { id: bookId } });
    }
};