import {
  Beneficiary,
  GENDER,
  Person,
  PersonType,
  Prisma
} from '@prisma/client';
import { OptionalNullable } from '@shared/types/util.types';
import { faker } from '@faker-js/faker';

export const seedBenefciaries: (Partial<Beneficiary> & {
  people: Partial<Person>[];
})[] = Array.from({ length: 10000 }).map(() => ({
  branch_id: 1,
  created_at: faker.date.anytime(),
  join_date: faker.date.anytime(),
  notes: faker.commerce.productDescription(),
  people: [
    {
      name: faker.person.fullName(),
      type: PersonType.BENEFICIARY,
      gender: 'MALE',
      identity_card: faker.phone.imei()
    }
  ]
}));
