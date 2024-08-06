import { unitRepository } from "@render/modules/unit/repository/unit.repository";
import { useQueryTyped } from "./use-query-typed";
import { watchEffect } from "vue";
import { useGlobalState } from "./use-global-state";
import { moneyUnitRepository } from "@render/modules/unit/repository/money-unit.repository";

export const useInitialCacheHandler = (setCachedFetchedDone: () => void) => {
  const { actions } = useGlobalState();
  // fetch units
  const { data, error } = useQueryTyped({
    queryKey: ["unit"],
    queryFn: () => unitRepository.getAllUnits(),
  });

  const { data: moneyUnits } = useQueryTyped({
    queryKey: ["money_unit"],
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
