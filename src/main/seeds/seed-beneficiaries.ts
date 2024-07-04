import { Beneficiary, Person, PersonType } from "@prisma/client";
import { faker } from "@faker-js/faker";

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
      gender: "MALE",
      identity_card: faker.phone.imei(),
    },
    {
      name: faker.person.fullName(),
      type: PersonType.SPOUSE,
      gender: "FEMALE",
      identity_card: faker.phone.imei(),
    },
  ],
}));
