import { UserWithBranches } from "@shared/types/user/user.dto";

export type JWT_PAYLOAD = {
  sub: number;
  username: string;
};

export type UserInRequestHeader = Omit<UserWithBranches, "branches"> & {
  branches: number[];
};
