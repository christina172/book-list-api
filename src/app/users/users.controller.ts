import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from 'src/domain/dtos/user.dto';
import { UpdateUserDto } from 'src/domain/dtos/updateUser.dto';
import { BookIdDto } from 'src/domain/dtos/bookId.dto';
import { CategoryIdDto } from 'src/domain/dtos/categoryId.dto';
import { Public } from 'src/libs/security/decorators/public.decorator';
import { Roles } from 'src/libs/security/decorators/roles.decorator';
import { Role } from 'src/libs/security/enums/role.enum';
import { UserEntity } from 'src/domain/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() userDto: UserDto) {
    return this.usersService.create(userDto);
  }

  // the password is included in the response
  // issue: works only if placed before routes that require roles of admin or super-admin, 
  // issue: otherwise works only for super-admin (isn't forbidden), but still doesn't return anything
  @Get('/user')
  async findUser(@Request() req) {
    return this.usersService.findById(req.user.sub);
  }

  // issue: works only if placed before routes that require roles of admin or super-admin
  @Delete('/delete')
  async deleteUser(@Request() req) {
    return this.usersService.delete(req.user.sub);
  }

  // response doesn't include the passwords
  @Get()
  @Roles(Role.SuperAdmin)
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  // response doesn't include the passwords
  @Get(':userId')
  @Roles(Role.SuperAdmin)
  async findById(@Param('userId') userId: string) {
    return new UserEntity(await this.usersService.findById(userId));
  }

  @Patch('/add_favourite_book')
  async addFavouriteBook(@Request() req, @Body() {bookId}: BookIdDto) {
    return this.usersService.addFavouriteBook(req.user.sub, bookId);
  }

  @Patch('/add_favourite_category')
  async addFavouriteCategory(@Request() req, @Body() {categoryId}: CategoryIdDto) {
    return this.usersService.addFavouriteCategory(req.user.sub, categoryId);
  }

  @Patch('/delete_favourite_book')
  async deleteFavouriteBook(@Request() req, @Body() {bookId}: BookIdDto) {
    return this.usersService.deleteFavouriteBook(req.user.sub, bookId);
  }

  @Patch('/delete_favourite_category')
  async deleteFavouriteCategory(@Request() req, @Body() {categoryId}: CategoryIdDto) {
    return this.usersService.deleteFavouriteCategory(req.user.sub, categoryId);
  }

  @Patch(':userId/become_user')
  @Roles(Role.SuperAdmin)
  async becomeUser(@Param('userId') userId: string) {
    return this.usersService.becomeUser(userId);
  }

  @Patch(':userId/become_admin')
  @Roles(Role.SuperAdmin)
  async becomeAdmin(@Param('userId') userId: string) {
    return this.usersService.becomeAdmin(userId);
  }

  @Patch(':userId/become_super_admin')
  @Roles(Role.SuperAdmin)
  async becomeSuperAdmin(@Param('userId') userId: string) {
    return this.usersService.becomeSuperAdmin(userId);
  }

  @Patch('/update')
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.sub, updateUserDto);
  }

  @Delete(':userId')
  @Roles(Role.SuperAdmin)
  async delete(@Param('userId') userId: string) {
    return this.usersService.delete(userId);
  }
}

