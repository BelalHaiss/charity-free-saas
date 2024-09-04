import { User, Unit, MoneyUnit } from "@prisma/client";
import { GroupedUnits } from "@render/modules/unit/types/unit.type";
import { NullableKeys } from "@render/types/util.types";
import { devUser } from "@render/utils/dev.util";
import { OrganizationAppModel } from "@shared/types/organization/organization.dto";
import { CurrentUser } from "@shared/types/user/user.dto";
import { createGlobalState, useStorage } from "@vueuse/core";

type StateValues = {
  organization: OrganizationAppModel;
  user: CurrentUser;
  units: Unit[];
  moneyUnits: MoneyUnit[];
  branchId: number;
};

export const useGlobalState = createGlobalState(() => {
  const initialState: NullableKeys<
    StateValues,
    "branchId" | "units" | "moneyUnits" | "user"
  > = {
    user: devUser,
    organization: null,
    units: [],
    branchId: 1,
    moneyUnits: [],
  };

  const storage = useStorage("app-store", initialState);

  //   Actions
  const actions = {
    setOrganization: (org: OrganizationAppModel) =>
      (storage.value.organization = { ...org }),
    setUser: (userData: User) => (storage.value.user = { ...userData }),
    setUnits: (units: Unit[]) => (storage.value.units = units),
    setMoneyUnits: (units: MoneyUnit[]) => (storage.value.moneyUnits = units),
    setBranchId: (branchId: number) => (storage.value.branchId = branchId),
  };

  const getters = {
    getSponsorShipCaseById: (id: number) =>
      storage.value.organization!.branches[0].sponsorships_cases.find(
        (val) => val.id === id,
      ),
    getUnitById: (unitId: number) =>
      storage.value.units.find((unit) => unit.id === unitId),
    getMoneyUnitByEnCode: (enCode: string) =>
      storage.value.moneyUnits.find((unit) => unit.en_code === enCode),
    getCurrentUser: (): CurrentUser => storage.value.user,
    getBranchId: (): number => storage.value.branchId,
    getGroupedUnits: (): GroupedUnits[] => {
      const units = storage.value.units;
      const groupedUnits: GroupedUnits[] = [];
      units.forEach((unit) => {
        const isCategoryInArray = groupedUnits.find(
          (groupedUnit) => groupedUnit.category === unit.category_label,
        );
        if (isCategoryInArray) {
          isCategoryInArray.units.push(unit);
        } else {
          groupedUnits.push({ category: unit.category_label, units: [unit] });
        }
      });
      return groupedUnits;
    },
  };

  return { actions, storage, getters };
});
