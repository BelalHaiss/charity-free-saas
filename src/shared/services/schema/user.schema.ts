import { ZodType, z } from 'zod';
import { minStringWithShortErrorMSG } from '@render/utils/schemas/utils.schema';
import { InitialAdmin } from '@shared/types/user/user.dto';
const initialAdminWithBranches = z.object({
  username: minStringWithShortErrorMSG(),
  password: minStringWithShortErrorMSG(),
  branches: z.array(z.number())
}) satisfies ZodType<InitialAdmin>;

export const userSchema = {
  initialAdminWithBranches
};
