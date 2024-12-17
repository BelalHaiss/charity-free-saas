import { CurrentUser } from "../user/user.dto";

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  user: CurrentUser;
};
