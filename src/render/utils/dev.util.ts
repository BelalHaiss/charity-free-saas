import { CurrentUser } from "@shared/types/user/user.dto";

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
