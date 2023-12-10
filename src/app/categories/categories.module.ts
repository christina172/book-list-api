import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { CategoriesRepo } from 'src/domain/repos/categories.repo';

@Module({
  imports: [PrismaModule],
  providers: [CategoriesService, CategoriesRepo],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
