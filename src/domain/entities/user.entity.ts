import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  id: string;

  username: string;
  
  name: string;

  @Exclude()
  password: string;

  about: string;

  roles: string[];

  @Exclude()
  refreshToken: string;
  
  favouriteBooks: {title: string, author: string}[];
  
  favouriteCategories: {name: string}[];
}