import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaInteractiveTransaction } from '@shared/types/prisma.types';
import { InitialAdminToServer } from '@shared/types/user/user.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@main/nest/shared/services/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async findByUsername(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username
      },
      include: {
        userRoles: {
          include: {
            organization: true,
            branch: true
          }
        }
      }
    });
    if (!user) return null;

    return user;
  }

  public async findUserById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id
      },
      include: {
        userRoles: {
          include: {
            organization: true,
            branch: true
          }
        }
      }
    });
    if (!user) return null;

    return user;
  }

  async createInitialAdmin(
    tx: PrismaInteractiveTransaction,
    user: InitialAdminToServer
  ): Promise<User> {
    const password_hash = await argon2.hash(user.password);

    return tx.user.create({
      data: {
        username: user.username,
        password: password_hash,
        lang: user.lang
      }
    });
  }
}
