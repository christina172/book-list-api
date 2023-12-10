import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from './libs/prisma/prisma.service';
import { PrismaModule } from './libs/prisma/prisma.module';
import { BooksModule } from './app/books/books.module';
import { UsersModule } from './app/users/users.module';
import { CategoriesModule } from './app/categories/categories.module';
import { AuthModule } from './app/auth/auth.module';
import { JwtAuthGuard } from 'src/libs/security/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './libs/security/guards/roles.guard';

@Module({
  imports: [
    PrismaModule, 
    BooksModule, 
    UsersModule, 
    CategoriesModule, 
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    })
  ],
  providers: [
    PrismaService, 
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
