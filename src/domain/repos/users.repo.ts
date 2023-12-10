import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { UserDto } from 'src/domain/dtos/user.dto';
import { UpdateUserDto } from '../dtos/updateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepo {
    constructor(private readonly prisma: PrismaService) { }

    async create(userDto: UserDto) {
      const hashedPassword = await bcrypt.hash(userDto.password, 10);
      userDto.password = hashedPassword;
      return this.prisma.user.create({
        data: {
          ...userDto
        }
      });
    }

    async addFavouriteBook(userId: string, bookId: string) {
      return this.prisma.user.update({
        where: {id: userId},
        data: {
          favouriteBooks: {
            connect: {
              id: bookId
            }
          }
        },
        include: {
          favouriteBooks: true
        }
      })
    }

    async addFavouriteCategory(userId: string, categoryId: string) {
      return this.prisma.user.update({
        where: {id: userId},
        data: {
          favouriteCategories: {
            connect: {
              id: categoryId
            }
          }
        },
        include: {
          favouriteCategories: true
        }
      })
    }

    async deleteFavouriteBook(userId: string, bookId: string) {
      return this.prisma.user.update({
        where: {id: userId},
        data: {
          favouriteBooks: {
            disconnect: {
              id: bookId
            }
          }
        },
        include: {
          favouriteBooks: true
        }
      })
    }

    async deleteFavouriteCategory(userId: string, categoryId: string) {
      return this.prisma.user.update({
        where: {id: userId},
        data: {
          favouriteCategories: {
            disconnect: {
              id: categoryId
            }
          }
        },
        include: {
          favouriteCategories: true
        }
      })
    }

    async becomeUser(userId: string) {
      return this.prisma.user.update({
        where: { id: userId },
        data: {
          roles: ["user"]
        },
      });
    };

    async becomeAdmin(userId: string) {
      return this.prisma.user.update({
        where: { id: userId },
        data: {
          roles: ["user", "admin"]
        },
      });
    };

    async becomeSuperAdmin(userId: string) {
      return this.prisma.user.update({
        where: { id: userId },
        data: {
          roles: ["user", "admin", "super-admin"]
        },
      });
    };

    async findById(userId: string) {
      return this.prisma.user.findUnique({
        where: {id: userId},
        include: {
          favouriteBooks: {
            select: {
              title: true,
              author: true
            }
          },
          favouriteCategories: {
            select: {
              name: true
            }
          }
        }
      })
    }

    async findByUsername(username: string) {
      return this.prisma.user.findUnique({
        where: {username: username}
      })
    }
    
    async findAll() {
      return this.prisma.user.findMany({
        include: {
          favouriteBooks: {
            select: {
              title: true,
              author: true
            }
          },
          favouriteCategories: {
            select: {
              name: true
            }
          }
        }
      });
    }

    async update(userId: string, updateUserDto: UpdateUserDto) {
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      };
      return this.prisma.user.update({
        where: { id: userId },
        data: updateUserDto,
      });
    }
  
    async delete(userId: string) {
      return this.prisma.user.delete({ where: { id: userId } });
    }
};