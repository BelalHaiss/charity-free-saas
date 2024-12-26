import { User } from "@prisma/client";
import * as argon2 from "argon2";
import { PrismaInteractiveTransaction } from "@shared/types/prisma.types";
import {
  InitialAdminToServer,
  UserWithBranches,
} from "@shared/types/user/user.dto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@main/nest/shared/services/prisma.service";
import { removeFields } from "@shared/services/object.util";

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public findByUsername(username: string) {
    return this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
  }

  public async findByUserId(id: number): Promise<UserWithBranches | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },

      include: {
        branches: true,
      },
    });
    if (!user) return null;

    return removeFields(user, ["password"]);
  }
  async createInitialAdmin(
    tx: PrismaInteractiveTransaction,
    user: InitialAdminToServer,
  ): Promise<User> {
    const password_hash = await argon2.hash(user.password);

    return tx.user.create({
      data: {
        username: user.username,
        password: password_hash,
        lang: user.lang,
      },
    });
  }
}
