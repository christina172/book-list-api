import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { BooksRepo } from 'src/domain/repos/books.repo';

@Module({
  imports: [PrismaModule],
  providers: [BooksService, BooksRepo],
  controllers: [BooksController]
})
export class BooksModule {}
