import { User } from '@prisma/client';
import { InitialAdmin } from '../user/user.dto';
import {
  OrganizationAppModel,
  OrganizationToServer
} from '../organization/organization.dto';
import { NewBranchData, NewBranchDataToServer } from '../branch/brach.dto';

export interface InitialSetupClient {
  branch: NewBranchData;
  organization: OrganizationToServer;
  adminUser: InitialAdmin;
}

export type InitialSetupToClient = {
  organization: OrganizationAppModel;
  user: User;
};

export type InitialSetupToServer = {
  branch: NewBranchDataToServer;
  organization: OrganizationToServer;
  adminUser: InitialAdmin;
};
