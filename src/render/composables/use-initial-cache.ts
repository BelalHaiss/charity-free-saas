import { unitRepository } from "@render/modules/unit/repository/unit.repository";
import { useQueryTyped } from "./use-query-typed";
import { watchEffect } from "vue";
import { useGlobalState } from "./use-global-state";

export const useInitialCacheHandler = (setCachedFetchedDone: () => void) => {
  const { actions } = useGlobalState();
  // fetch units
  const { data, error } = useQueryTyped({
    queryKey: ["unit"],
    queryFn: () => unitRepository.getAllUnits(),
  });
  watchEffect(() => {
    if (data.value && Array.isArray(data.value)) {
      setCachedFetchedDone();
      actions.setUnits(data.value);
    }
  });
};
