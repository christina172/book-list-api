import { Injectable } from '@nestjs/common';
import { UsersRepo } from 'src/domain/repos/users.repo';
import { UserDto } from 'src/domain/dtos/user.dto';
import { UpdateUserDto } from 'src/domain/dtos/updateUser.dto';

@Injectable()
export class UsersService {
    constructor(private usersRepo: UsersRepo){}

    async create(userDto: UserDto) {
        return this.usersRepo.create(userDto);
    }

    async addFavouriteBook(userId: string, bookId: string) {
        return this.usersRepo.addFavouriteBook(userId, bookId);
    }

    async addFavouriteCategory(userId: string, categoryId: string) {
        return this.usersRepo.addFavouriteCategory(userId, categoryId);
    }

    async deleteFavouriteBook(userId: string, bookId: string) {
        return this.usersRepo.deleteFavouriteBook(userId, bookId);
    }

    async deleteFavouriteCategory(userId: string, categoryId: string) {
        return this.usersRepo.deleteFavouriteCategory(userId, categoryId);
    }

    async findById(userId: string) {
        return this.usersRepo.findById(userId);
    }

    async findByUsername(username: string) {
        return this.usersRepo.findByUsername(username);
    }

    async findAll() {
        return this.usersRepo.findAll();
    }

    async becomeUser(userId: string) {
        return this.usersRepo.becomeUser(userId);
    }

    async becomeAdmin(userId: string) {
        return this.usersRepo.becomeAdmin(userId);
    }

    async becomeSuperAdmin(userId: string) {
        return this.usersRepo.becomeSuperAdmin(userId);
    }

    async update(userId: string, updateUserDto: UpdateUserDto) {
        return this.usersRepo.update(userId, updateUserDto);
    }

    async delete(userId: string) {
        return this.usersRepo.delete(userId);
    }
}
