import { User } from '@prisma/client';
import { InitialAdmin, InitialAdminToServer } from '../user/user.dto';
import {
  OrganizationAppModel,
  OrganizationToServer
} from '../organization/organization.dto';
import { NewBranchData, NewBranchDataToServer } from '../branch/brach.dto';
import { Locale } from '@render/config/i18n';

export interface InitialSetupClient {
  branch: NewBranchData;
  organization: OrganizationToServer;
  adminUser: InitialAdmin;
  lang: Locale;
}

export type InitialSetupToClient = {
  organization: OrganizationAppModel;
  user: User;
};

export type InitialSetupToServer = {
  branch: NewBranchDataToServer;
  organization: OrganizationToServer;
  adminUser: InitialAdminToServer;
};
