import { Branch, SponsorshipCase } from '@prisma/client';
import { CreatableSelectOptions } from '@render/types/form.types';

export type NewBranchData = Pick<
  Branch,
  'name' | 'address' | 'phone' | 'scheduled_visits'
> & {
  sponsorships_cases: CreatableSelectOptions<string>[];
};

export type NewBranchDataToServer = Omit<
  NewBranchData,
  'sponsorships_cases'
> & {
  sponsorships_cases: {
    create: { name: SponsorshipCase['name'] }[];
  };
};
