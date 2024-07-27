/**
 * ! Executing this script will delete all data in your database and seed it with 10 benefit.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { fakerAR } from "@faker-js/faker";

import { createSeedClient } from "@snaplet/seed";

const main = async () => {
  const seed = await createSeedClient({});
  // Truncate all tables in the database

  await seed.$resetDatabase();
  await seed.organization([
    {
      id: 1,
      branches: [{ id: 1, lang: "ar", name: "اهل الخير" }],
      name: "منظمة التعاون",
    },
  ]);
  await seed.beneficiary((x) =>
    x(200, () => ({
      branch_id: 1,

      people: [
        {
          name: fakerAR.person.fullName(),
          type: "BENEFICIARY",
          gender: "MALE",
          identity_card: fakerAR.phone.imei(),
          phone: fakerAR.phone.number(),
        },
        {
          name: fakerAR.person.fullName(),
          type: "SPOUSE",
          gender: "FEMALE",
          identity_card: fakerAR.phone.imei(),
          phone: fakerAR.phone.number(),
        },
      ],
    })),
  );

  await seed.unit([
    {
      label: "ج-م",
      bg_unit_abbr: "ج",
      bg_unit_label: "جنية",
      sm_to_bg_factor: 100,
      sm_unit_abbr: "ق",
      sm_unit_label: "قرش",
      category_label: "قوالب مالية",
      id: 1,
    },
    {
      label: "د-ك",
      bg_unit_abbr: "د",
      bg_unit_label: "دينار",
      sm_to_bg_factor: 1000,
      sm_unit_abbr: "ف",
      sm_unit_label: "فلس",
      category_label: "قوالب مالية",
      id: 2,
    },
    {
      label: "ع-3ش",
      bg_unit_abbr: "ع",
      bg_unit_label: "علبة",
      sm_to_bg_factor: 3,
      sm_unit_abbr: "ش",
      sm_unit_label: "شريط",
      category_label: "قوالب ادوية",
      id: 3,
    },
    {
      label: "ع-2ش",
      bg_unit_abbr: "ع",
      bg_unit_label: "علبة",
      sm_to_bg_factor: 2,
      sm_unit_abbr: "ش",
      sm_unit_label: "شريط",
      category_label: "قوالب ادوية",
      id: 4,
    },
    {
      label: "ك-10ق",
      bg_unit_abbr: "ك",
      bg_unit_label: "كرتونه",
      sm_to_bg_factor: 10,
      sm_unit_abbr: "ق",
      sm_unit_label: "قطعة",
      category_label: "قوالب منتجات",
      id: 5,
    },
  ]);

  await seed.categoryItem([
    { branch_id: 1, name: "علاج برد ", id: 1 },
    { branch_id: 1, name: "كونجستال ", parent_category_id: 1, unit_id: 3 },
    { branch_id: 1, name: "اوترفين ", parent_category_id: 1, unit_id: 2 },
    { branch_id: 1, name: "منتجات  ", id: 5 },
    { branch_id: 1, name: "سكر ", parent_category_id: 5, unit_id: 5 },
    { branch_id: 1, name: "رز ", parent_category_id: 5, unit_id: 5 },
  ]);

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log("Database seeded successfully!");

  process.exit();
};

main();
