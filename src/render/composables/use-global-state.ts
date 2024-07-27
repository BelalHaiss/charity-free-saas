import { User, Unit } from "@prisma/client";
import { NullableKeys } from "@render/types/util.types";
import { OrganizationAppModel } from "@shared/types/organization/organization.dto";
import { createGlobalState, useStorage } from "@vueuse/core";

type StateValues = {
  organization: OrganizationAppModel;
  user: User;
  units: Unit[];
};
export const useGlobalState = createGlobalState(() => {
  // state
  const initialState: NullableKeys<StateValues> = {
    user: null,
    organization: null,
    units: [],
  };

  const storage = useStorage("app-store", initialState);

  //   Actions
  const actions = {
    setOrganization: (org: OrganizationAppModel) =>
      (storage.value.organization = { ...org }),
    setUser: (userData: User) => (storage.value.user = { ...userData }),
    setUnits: (units: Unit[]) => (storage.value.units = units),
  };

  const getters = {
    getSponsorShipCaseById: (id: number) =>
      storage.value.organization!.branches[0].sponsorships_cases.find(
        (val) => val.id === id,
      ),
    getUnitById: (unitId: number) =>
      storage.value.units?.find((unit) => unit.id === unitId),
  };

  return { actions, storage, getters };
});
