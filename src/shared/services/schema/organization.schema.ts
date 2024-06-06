import { formErrorsMsgs } from '@render/locales/locale.util';
import { minStringWithShortErrorMSG } from '@render/utils/schemas/utils.schema';
import { OrganizationToServer } from '@shared/types/organization/organization.dto';
import { ZodType, z } from 'zod';

export const createOrganizationSchema = z.object({
  name: minStringWithShortErrorMSG(),
  created_at: z.coerce.date({ message: formErrorsMsgs.date })
}) satisfies ZodType<OrganizationToServer>;
