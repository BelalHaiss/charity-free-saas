import { User } from "@prisma/client";
import { Locale } from "@shared/types/util.types";

export type InitialAdmin = Pick<User, "username" | "password"> & {
  branches: number[];
};
export type InitialAdminToServer = InitialAdmin & { lang: Locale };

export type CurrentUser = Omit<User, "password">;
