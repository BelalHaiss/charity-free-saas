import { faker, fakerAR } from '@faker-js/faker';
import * as argon2 from 'argon2';

import { createSeedClient } from '@snaplet/seed';

const main = async () => {
  const seed = await createSeedClient({});
  // Truncate all tables in the database

  await seed.$resetDatabase();
  await seed.organization([
    {
      id: 1,
      branches: [{ id: 1, lang: 'ar', name: 'اهل الخير' }],
      name: 'منظمة التعاون'
    }
  ]);
  await seed.user([
    {
      username: 'admin',
      password: await argon2.hash('admin'),

      lang: 'ar',
      branches: [{ branch_id: 1 }]
    }
  ]);
  await seed.beneficiary((x) =>
    x(200, () => ({
      branch_id: 1,

      people: [
        {
          name: fakerAR.person.fullName(),
          type: 'BENEFICIARY',
          gender: 'MALE',
          identity_card: fakerAR.phone.imei(),
          phone: fakerAR.phone.number()
        },
        {
          name: fakerAR.person.fullName(),
          type: 'SPOUSE',
          gender: 'FEMALE',
          identity_card: fakerAR.phone.imei(),
          phone: fakerAR.phone.number()
        }
      ]
    }))
  );

  await seed.unit([
    {
      label: 'ع-3ش',
      bg_unit_abbr: 'ع',
      bg_unit_label: 'علبة',
      sm_to_bg_factor: 3,
      sm_unit_abbr: 'ش',
      sm_unit_label: 'شريط',
      category_label: 'قوالب ادوية',
      id: 3
    },
    {
      label: 'ع-2ش',
      bg_unit_abbr: 'ع',
      bg_unit_label: 'علبة',
      sm_to_bg_factor: 2,
      sm_unit_abbr: 'ش',
      sm_unit_label: 'شريط',
      category_label: 'قوالب ادوية',
      id: 4
    },
    {
      label: 'ك-10ق',
      bg_unit_abbr: 'ك',
      bg_unit_label: 'كرتونه',
      sm_to_bg_factor: 10,
      sm_unit_abbr: 'ق',
      sm_unit_label: 'قطعة',
      category_label: 'قوالب منتجات',
      id: 5
    }
  ]);

  // category need branch id and unit_id
  await seed.category((x) =>
    x(20, () => ({
      branch_id: 1,
      name: fakerAR.commerce.product(),
      Item: (x) =>
        x(50, {
          benefit: { type: 'ITEM' },
          unit_id: faker.helpers.arrayElement([3, 4, 5]),
          name: fakerAR.commerce.productName()
        })
    }))
  );

  process.exit();
};

main();
