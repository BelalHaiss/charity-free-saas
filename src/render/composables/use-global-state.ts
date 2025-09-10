import { NullableKeys } from '@render/types/util.types';
import { OrganizationAppModel } from '@shared/types/organization/organization.dto';
import { CurrentUser } from '@shared/types/user/user.dto';
import { createGlobalState, useStorage } from '@vueuse/core';

type StateValues = {
  organization: OrganizationAppModel;
  user: CurrentUser | null;
  userToken: `Bearer ${string}` | null;
  branchId: number;
};
export const useGlobalState = createGlobalState(() => {
  const initialState: NullableKeys<StateValues, 'branchId' | 'user'> = {
    organization: null,
    branchId: 1,
    user: null,
    userToken: null
  };

  const storage = useStorage('app-store', initialState);

  //   Actions
  const actions = {
    setOrganization: (org: OrganizationAppModel) =>
      (storage.value.organization = { ...org }),
    setUser: (userData: StateValues['user']) => (storage.value.user = userData),
    setBranchId: (branchId: number) => (storage.value.branchId = branchId),
    setUserToken: (token: StateValues['userToken']) =>
      (storage.value.userToken = token),
    resetUserAndToken: () => {
      storage.value.user = null;
      storage.value.userToken = null;
    }
  };

  const getters = {
    getSponsorShipCaseById: (id: number) =>
      storage.value.organization!.branches[0].sponsorships_cases.find(
        (val) => val.id === id
      ),

    getCurrentUser: () => storage.value.user,
    getUserToken: () => storage.value.userToken,
    getBranchId: (): number => storage.value.branchId
  };

  return { actions, storage, getters };
});
