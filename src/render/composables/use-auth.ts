import { userRepository } from "@render/modules/user/repository/user.repository";
import { LoginPayload } from "@shared/types/auth/auth.dto";
import { useGlobalState } from "./use-global-state";
import { useRouter } from "vue-router/auto";

export const useAuth = () => {
  const { actions, getters } = useGlobalState();
  const router = useRouter();
  const handleLogin = async (payload: LoginPayload) => {
    const userResponse = await userRepository.login(payload);
    actions.setUserToken(`Bearer ${userResponse.access_token}`);
    actions.setUser(userResponse.user);
    router.push("/");
  };

  const handleLogout = () => {
    actions.setUser(null);
    actions.setUserToken(null);
    router.push("/login");
  };

  return { handleLogin, handleLogout, user: getters.getCurrentUser() };
};
