import { User } from '@prisma/client';
import { PrismaInteractiveTransaction } from '@shared/types/prisma.types';
import { InitialAdmin } from '@shared/types/user/user.dto';

export interface UserServiceI {
  createInitialAdmin(
    tx: PrismaInteractiveTransaction,
    user: InitialAdmin
  ): Promise<User>;
}
