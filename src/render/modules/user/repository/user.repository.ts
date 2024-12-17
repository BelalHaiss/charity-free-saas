import { fetcher } from "@render/utils/api.util";
import { LoginPayload, LoginResponse } from "@shared/types/auth/auth.dto";

class UserRepository {
  public async login(payload: LoginPayload) {
    const res = await fetcher<LoginResponse>({
      url: "/auth/login",
      config: {
        method: "POST",
        data: payload,
      },
    });
    return res;
  }
}

export const userRepository = new UserRepository();
