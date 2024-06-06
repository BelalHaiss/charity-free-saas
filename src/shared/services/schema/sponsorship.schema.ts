import { SponsorshipCase } from '@prisma/client';
import { ZodType, z } from 'zod';

export const sponsorshipsCaseSchema = z.object({
  name: z.string().min(1),
  branch_id: z.number()
}) satisfies ZodType<Omit<SponsorshipCase, 'id'>>;
