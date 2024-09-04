/**
 * ! Executing this script will delete all data in your database and seed it with 10 benefit.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { fakerAR } from "@faker-js/faker";

import { createSeedClient } from "@snaplet/seed";
import { moneyUnits } from "./seed.util";

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

  await seed.category([
    {
      id: 1,
      name: "ادوية",
      Item: [
        {
          name: " دواء صداع",
          unit_id: 3,
          branch_id: 1,
          benefit: { type: "ITEM" },
        },
        {
          name: " دواء ضغط",
          unit_id: 3,
          branch_id: 1,
          benefit: { type: "ITEM" },
        },
        {
          name: " دواء برد",
          unit_id: 3,
          branch_id: 1,
          benefit: { type: "ITEM" },
        },
      ],
    },
    {
      id: 2,
      name: "سلع ",
      Item: [
        {
          name: " سكر",
          unit_id: 5,
          branch_id: 1,
          benefit: { type: "ITEM" },
        },
        {
          name: " شاي",
          unit_id: 5,
          branch_id: 1,
          benefit: { type: "ITEM" },
        },
        {
          name: " دقيق",
          unit_id: 5,
          branch_id: 1,
          benefit: { type: "ITEM" },
        },
        {
          name: " رز",
          unit_id: 5,
          branch_id: 1,
          benefit: { type: "ITEM" },
        },
      ],
    },
  ]);
  // seed category

  await seed.moneyUnit(moneyUnits);

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log("Database seeded successfully!");

  process.exit();
};

main();
