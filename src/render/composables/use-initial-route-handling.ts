import { onMounted } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useGlobalState } from "./use-global-state";
import { QUERY_KEYS } from "./use-query-typed";
import { setupRepository } from "@render/modules/initial-setup/repository/setup.repository";
import { useRouter } from "vue-router/auto";

export const useInitialRouteHandling = (setRouteHandled: () => void) => {
  const { storage } = useGlobalState();
  const router = useRouter();
  const { refetch } = useQuery({
    queryKey: QUERY_KEYS.SETUP_STATUS,
    queryFn: setupRepository.isAppStatusDone,
    enabled: false, // Prevent automatic fetching
  });

  const fetchSetupStatus = async () => {
    const result = await refetch();
    return result.data; // Access the data from refetch result
  };
  const { organization, user } = storage.value;

  const isSetupPageDone = async () => {
    if (organization) return true;

    const isAppSetupDone = await fetchSetupStatus();
    return isAppSetupDone;
  };

  const handleInitialRouting = async () => {
    const isSetupDone = await isSetupPageDone();

    if (!isSetupDone) {
      router.push("/setup");
      setRouteHandled();
      return;
    }

    if (!user) {
      router.push("/login");
      setRouteHandled(); // Call the callback after routing
    }
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
