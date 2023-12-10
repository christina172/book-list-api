import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { UsersRepo } from 'src/domain/repos/users.repo';

@Module({
  imports: [PrismaModule],
  providers: [UsersService, UsersRepo],
  controllers: [UsersController],
  exports: [UsersService, UsersRepo]
})
export class UsersModule {}
