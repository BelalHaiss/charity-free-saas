import { CurrentUser } from "@shared/types/user/user.dto";

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const devUser: Omit<CurrentUser, "password"> = {
  id: 1,
  username: "belal",
  is_suspended: false,
  branches: [],
  lang: "ar",
  role_id: 1,
};
