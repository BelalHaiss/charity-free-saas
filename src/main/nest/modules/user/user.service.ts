import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import { UserServiceI } from './interfaces/user.service.interface';
import { PrismaInteractiveTransaction } from '@shared/types/prisma.types';
import { InitialAdmin } from '@shared/types/user/user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService implements UserServiceI {
  async createInitialAdmin(
    tx: PrismaInteractiveTransaction,
    user: InitialAdmin
  ): Promise<User> {
    const password_hash = await argon2.hash(user.password);

    return tx.user.create({
      data: {
        username: user.username,
        password: password_hash,
        branches: user.branches
      }
    });
  }
}
export const userService = new UserService();
