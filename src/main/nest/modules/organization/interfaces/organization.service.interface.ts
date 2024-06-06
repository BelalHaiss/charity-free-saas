import type {
  OrganizationToServer,
  OrganizationAppModel
} from '@shared/types/organization/organization.dto';
import type { PrismaInteractiveTransaction } from '@shared/types/prisma.types';
import type { InitialSetupToServer } from '@shared/types/setup/initial.dto';

export interface OrganizationServiceI {
  createOrganization(
    tx: PrismaInteractiveTransaction,
    organization: OrganizationToServer,
    branch: InitialSetupToServer['branch']
  ): Promise<OrganizationAppModel>;
}
