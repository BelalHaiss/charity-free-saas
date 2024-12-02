import { unitRepository } from "@render/modules/unit/repository/unit.repository";
import { QUERY_KEYS } from "./use-query-typed";
import { watchEffect } from "vue";
import { useGlobalState } from "./use-global-state";
import { moneyUnitRepository } from "@render/modules/unit/repository/money-unit.repository";
import { useQuery } from "@tanstack/vue-query";

export const useInitialCacheHandler = (setCachedFetchedDone: () => void) => {
  const { actions } = useGlobalState();
  // fetch units
  const { data, error } = useQuery({
    queryKey: QUERY_KEYS.UNITS,
    queryFn: () => unitRepository.getAllUnits(),
  });

  const { data: moneyUnits } = useQuery({
    queryKey: QUERY_KEYS.MONEY_UNITS,
    queryFn: () => moneyUnitRepository.getAllUnits(),
  });

  watchEffect(() => {
    if (data.value && moneyUnits.value && Array.isArray(data.value)) {
      setCachedFetchedDone();
      actions.setUnits(data.value);
      actions.setMoneyUnits(moneyUnits.value);
    }
  });
};
