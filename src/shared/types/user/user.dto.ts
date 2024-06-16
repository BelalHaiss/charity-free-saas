import { User } from '@prisma/client';
import { Locale } from '@render/config/i18n';

export type InitialAdmin = Pick<User, 'username' | 'password'> & {
  branches: number[];
};

export type InitialAdminToServer = InitialAdmin & { lang: Locale };
