import { Beneficiary, Person } from '@prisma/client';

export type BeneficiaryTableDTO = Pick<
  Beneficiary,
  'created_at' | 'updated_at' | 'id' | 'notes'
> &
  Pick<Person, 'sponsorship_case_id' | 'name' | 'identity_card'>;
