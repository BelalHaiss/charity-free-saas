import { onMounted } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useGlobalState } from "./use-global-state";
import { QUERY_KEYS } from "./use-query-typed";
import { setupRepository } from "@render/modules/initial-setup/repository/setup.repository";
import { useRouter } from "vue-router/auto";
import { userRepository } from "@render/modules/user/repository/user.repository";
import { useAuth } from "./use-auth";
import { useToast } from "./use-toast";

export const useInitialRouteHandling = (setRouteHandled: () => void) => {
  const { storage } = useGlobalState();
  const router = useRouter();
  const { refetch } = useQuery({
    queryKey: QUERY_KEYS.SETUP_STATUS,
    queryFn: setupRepository.isAppStatusDone,
    enabled: false, // Prevent automatic fetching
  });

  const { validateUserToken } = useAuth();
  const { failedToast } = useToast();

  const fetchSetupStatus = async () => {
    const result = await refetch();
    return result.data; // Access the data from refetch result
  };
  const { organization, user: cachedUser, userToken } = storage.value;

  const isSetupPageDone = async () => {
    if (organization) return true;

    const isAppSetupDone = await fetchSetupStatus();
    return isAppSetupDone;
  };

  const handleCachedUser = async () => {
    if (!cachedUser || !userToken) return false;

    try {
      await validateUserToken(userToken);
      return true;
    } catch (e) {
      failedToast(e);
      return false;
    }
  };
  const handleInitialRouting = async () => {
    const isSetupDone = await isSetupPageDone();

    if (!isSetupDone) {
      router.push("/setup");
      setRouteHandled();
      return;
    }

    const user = await handleCachedUser();

    if (!user) {
      router.push("/login");
    }
    setRouteHandled();
  };

  // Use the lifecycle hook to ensure this runs only once
  onMounted(() => {
    handleInitialRouting();
  });

  return {
    fetchSetupStatus,
    isSetupPageDone,
  };
};
