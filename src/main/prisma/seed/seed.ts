/**
 * ! Executing this script will delete all data in your database and seed it with 10 benefit.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { faker } from "@faker-js/faker";
import { createSeedClient } from "@snaplet/seed";

const main = async () => {
  const seed = await createSeedClient({
    connect: true,
  });

  // Truncate all tables in the database
  await seed.$resetDatabase();
  await seed.beneficiary((x) =>
    x(200, () => ({
      people: [
        {
          name: faker.person.fullName(),
          type: "BENEFICIARY",
          gender: "MALE",
          identity_card: faker.phone.imei(),
          phone: faker.phone.number(),
        },
        {
          name: faker.person.fullName(),
          type: "SPOUSE",
          gender: "FEMALE",
          identity_card: faker.phone.imei(),
          phone: faker.phone.number(),
        },
      ],
    })),
  );

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log("Database seeded successfully!");

  process.exit();
};

main();
