import { User } from '@prisma/client';

export type InitialAdmin = Pick<User, 'username' | 'password'> & {
  branches: number[];
};
