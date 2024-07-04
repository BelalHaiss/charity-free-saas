import { User } from "@prisma/client";
import { PrismaInteractiveTransaction } from "@shared/types/prisma.types";
import { InitialAdminToServer } from "@shared/types/user/user.dto";

export interface UserServiceI {
  createInitialAdmin(
    tx: PrismaInteractiveTransaction,
    user: InitialAdminToServer,
  ): Promise<User>;
}
