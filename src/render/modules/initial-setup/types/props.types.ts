import { NewBranchData } from '@shared/types/branch/brach.dto';
import { OrganizationToServer } from '@shared/types/organization/organization.dto';
import { InitialAdmin } from '@shared/types/user/user.dto';
import { Ref } from 'vue';

export type OrganizationFormRef = {
  organization: OrganizationToServer;
  branch: NewBranchData;
};

export type OrganizationProvider = {
  key: 'organization_state';
  type: {
    updateFormData<T extends OrganizationFormRef, K extends keyof T>(
      type: K,
      data: T[K]
    ): void;
  };
};

export type AdminProvider = {
  key: 'admin_state';
  type: {
    updateAdminFormData(data: InitialAdmin): void;
  };
};
