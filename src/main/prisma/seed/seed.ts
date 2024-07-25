/**
 * ! Executing this script will delete all data in your database and seed it with 10 benefit.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { fakerAR } from "@faker-js/faker";

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

  await seed.unit([{ label: "ج م" }]);

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log("Database seeded successfully!");

  process.exit();
};

main();
