import { userRepository } from "@render/modules/user/repository/user.repository";
import { LoginPayload, LoginResponse } from "@shared/types/auth/auth.dto";
import { useGlobalState } from "./use-global-state";
import { useRouter } from "vue-router/auto";

export const useAuth = () => {
  const { actions, getters } = useGlobalState();
  const router = useRouter();
  const handleLogin = async (payload: LoginPayload) => {
    try {
      const userResponse = await userRepository.login(payload);
      handleSetUserState(userResponse);
      router.push("/");
    } catch (e) {
      actions.resetUserAndToken();
      throw e;
    }
  };

  const validateUserToken = async (token: string) => {
    try {
      const userResponse = await userRepository.revalidateToken(token);
      handleSetUserState(userResponse);
    } catch (error) {
      actions.resetUserAndToken();

      throw error;
    }
  };

  const handleSetUserState = (userResponse: LoginResponse) => {
    actions.setUserToken(`Bearer ${userResponse.access_token}`);
    actions.setUser(userResponse.user);
    actions.setBranchId(userResponse.user.branches[0]);
  };

  const handleLogout = () => {
    actions.setUser(null);
    actions.setUserToken(null);
    router.push("/login");
  };

  return {
    handleLogin,
    handleLogout,
    user: getters.getCurrentUser(),
    validateUserToken,
  };
};
