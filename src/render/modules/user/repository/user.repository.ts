import { fetcher } from "@render/utils/api.util";
import { LoginPayload, LoginResponse } from "@shared/types/auth/auth.dto";

class UserRepository {
  public async login(payload: LoginPayload) {
    return fetcher<LoginResponse>({
      url: "/auth/login",
      config: {
        method: "POST",
        data: payload,
      },
    });
  }

  public async revalidateToken(token: string) {
    return fetcher<LoginResponse>({
      url: "/auth/validate-token",
      config: {
        method: "POST",
        data: { token },
      },
    });
  }
}

export const userRepository = new UserRepository();
