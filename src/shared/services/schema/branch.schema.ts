import { ZodType, z } from 'zod';
import { NewBranchData } from '@shared/types/branch/brach.dto';
import {
  creatableSelectStringSchema,
  minStringWithShortErrorMSG,
  moreThanValue
} from '@render/utils/schemas/utils.schema';

export const newBranchSchema = z.object({
  name: minStringWithShortErrorMSG(),
  address: z.string(),
  scheduled_visits: z.boolean(),
  phone: z.coerce.string(),
  sponsorships_cases: moreThanValue(z.array(creatableSelectStringSchema), 1)
}) satisfies ZodType<NewBranchData>;
