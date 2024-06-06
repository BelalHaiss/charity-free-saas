import { User } from '@prisma/client';
import { NullableKeys } from '@render/types/util.types';
import { OrganizationAppModel } from '@shared/types/organization/organization.dto';
import { createGlobalState, useStorage } from '@vueuse/core';

type StateValues = {
  organization: OrganizationAppModel;
  user: User;
};
export const useGlobalState = createGlobalState(() => {
  // state
  const initialState: NullableKeys<StateValues> = {
    user: null,
    organization: null
  };

  const storage = useStorage('app-store', initialState);

  //   Actions
  const actions = {
    setOrganization: (org: OrganizationAppModel) =>
      (storage.value.organization = { ...org }),
    setUser: (userData: User) => (storage.value.user = { ...userData })
  };

  return { actions, storage };
});
