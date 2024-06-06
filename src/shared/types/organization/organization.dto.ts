import { Organization, Prisma } from '@prisma/client';

export type OrganizationToServer = Pick<Organization, 'name' | 'created_at'>;

export type OrganizationAppModel = Prisma.OrganizationGetPayload<{
  include: {
    branches: {
      include: {
        sponsorships_cases: true;
      };
    };
  };
}>;
