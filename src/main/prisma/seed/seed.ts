import * as argon2 from 'argon2';
import { createSeedClient } from '@snaplet/seed';

// Import data and services
import { moneyUnitsSeeds } from './seed.util';
import { permissionsData } from './permissions.data';
import { rolesData, rolePermissions } from './roles.data';
import { organizationData, userData, unitsData } from './basic.data';
import { SeedService } from './seed.service';
import { ROLE_IDS } from './seed.types';
import type { UserRoleSeed } from './seed.types';

const main = async (): Promise<void> => {
  try {
    console.log('🌱 Starting database seeding...\n');

    const seed = await createSeedClient({});
    const seedService = new SeedService(seed);

    // Reset database
    await seedService.resetDatabase();

    // Seed organizations with branches
    await seedService.seedOrganizations([organizationData]);

    // Seed permissions
    await seedService.seedPermissions(permissionsData);

    // Seed roles
    await seedService.seedRoles(rolesData);

    // Hash password and seed user
    const hashedPassword = await argon2.hash(userData.password);
    await seedService.seedUsers([
      {
        ...userData,
        password: hashedPassword
      }
    ]);

    // Seed role permissions
    await seedService.seedRolePermissions(rolePermissions);

    // Assign Super Admin role to admin user
    const adminUserRole: UserRoleSeed = {
      user_id: userData.id,
      role_id: ROLE_IDS.SUPER_ADMIN,
      organization_id: organizationData.id,
      branch_key: -1
    };
    await seedService.seedUserRoles([adminUserRole]);

    // Seed money units
    console.log('💰 Seeding money units...');
    await seed.moneyUnit(moneyUnitsSeeds);
    console.log(`✅ Seeded ${moneyUnitsSeeds.length} money units`);

    // Seed units
    await seedService.seedUnits(unitsData);

    // Seed beneficiaries
    await seedService.seedBeneficiaries(200, organizationData.branches[0].id);

    // Seed categories with items
    const unitIds = unitsData.map((unit) => unit.id!);
    await seedService.seedCategories(
      20,
      organizationData.branches[0].id,
      unitIds
    );

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

main();
