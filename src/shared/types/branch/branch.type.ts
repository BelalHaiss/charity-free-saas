import { Prisma } from '@prisma/client';

export type BranchAppModel = Prisma.BranchGetPayload<{
  include: { sponsorships_cases: true };
}>;
