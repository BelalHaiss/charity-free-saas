import { ZodType, z } from 'zod';
import { createOrganizationSchema } from './organization.schema';
import { newBranchSchema } from './branch.schema';
import { userSchema } from './user.schema';
import { InitialSetupClient } from '@shared/types/setup/initial.dto';

export const initialSetupSchema = z.object({
  organization: createOrganizationSchema,
  branch: newBranchSchema,
  adminUser: userSchema.initialAdminWithBranches
}) satisfies ZodType<InitialSetupClient>;

export const initialUiOrganizationSchema = z.object({
  organization: createOrganizationSchema,
  branch: newBranchSchema
});
