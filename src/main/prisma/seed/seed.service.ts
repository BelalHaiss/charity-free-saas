import type { SeedClient } from '@snaplet/seed';
import type {
  RoleSeed,
  UserSeed,
  OrganizationSeed,
  RolePermissionSeed,
  UserRoleSeed,
  UnitSeed,
  PermissionAction
} from './seed.types';
import { ROLE_IDS } from './seed.types';

export class SeedService {
  constructor(private seed: SeedClient) {}

  async seedPermissions(permissions: PermissionAction[]): Promise<void> {
    console.log('🔐 Seeding permissions...');
    await this.seed.permission(permissions.map((action) => ({ action })));
    console.log(`✅ Seeded ${permissions.length} permissions`);
  }

  async seedRoles(roles: RoleSeed[]): Promise<void> {
    console.log('👥 Seeding roles...');
    await this.seed.role(roles);
    console.log(`✅ Seeded ${roles.length} roles`);
  }

  async seedUsers(users: UserSeed[]): Promise<void> {
    console.log('👤 Seeding users...');
    await this.seed.user(users);
    console.log(`✅ Seeded ${users.length} users`);
  }

  async seedOrganizations(organizations: OrganizationSeed[]): Promise<void> {
    console.log('🏢 Seeding organizations...');
    await this.seed.organization(organizations);
    console.log(`✅ Seeded ${organizations.length} organizations`);
  }

  async seedUnits(units: UnitSeed[]): Promise<void> {
    console.log('📏 Seeding units...');
    await this.seed.unit(units);
    console.log(`✅ Seeded ${units.length} units`);
  }

  async seedRolePermissions(
    rolePermissionsMap: Record<keyof typeof ROLE_IDS, PermissionAction[]>
  ): Promise<void> {
    console.log('🔗 Seeding role permissions...');

    const rolePermissions: RolePermissionSeed[] = [];

    // Type-safe iteration over role permissions
    for (const [roleKey, permissions] of Object.entries(
      rolePermissionsMap
    ) as Array<[keyof typeof ROLE_IDS, PermissionAction[]]>) {
      const roleId = ROLE_IDS[roleKey];

      for (const permission of permissions) {
        rolePermissions.push({
          role_id: roleId,
          permission_action: permission
        });
      }
    }

    await this.seed.rolePermission(rolePermissions);
    console.log(`✅ Seeded ${rolePermissions.length} role permissions`);
  }

  async seedUserRoles(userRoles: UserRoleSeed[]): Promise<void> {
    console.log('👤🔗 Seeding user roles...');
    await this.seed.userRole(userRoles);
    console.log(`✅ Seeded ${userRoles.length} user roles`);
  }

  async seedBeneficiaries(count: number, branch_id: number): Promise<void> {
    console.log(`👨‍👩‍👧‍👦 Seeding ${count} beneficiaries...`);
    const { faker, fakerAR } = await import('@faker-js/faker');

    await this.seed.beneficiary((x) =>
      x(count, () => ({
        branch_id: branch_id,
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
    console.log(`✅ Seeded ${count} beneficiaries`);
  }

  async seedCategories(
    count: number,
    branch_id: number,
    unitIds: number[]
  ): Promise<void> {
    console.log(`📁 Seeding ${count} categories...`);
    const { faker, fakerAR } = await import('@faker-js/faker');

    await this.seed.category((x) =>
      x(count, () => ({
        branch_id: branch_id,
        name: fakerAR.commerce.product(),
        Item: (x) =>
          x(50, {
            benefit: { type: 'ITEM' },
            unit_id: faker.helpers.arrayElement(unitIds),
            name: fakerAR.commerce.productName()
          })
      }))
    );
    console.log(`✅ Seeded ${count} categories with items`);
  }

  async resetDatabase(): Promise<void> {
    console.log('🗑️  Resetting database...');
    await this.seed.$resetDatabase();
    console.log('✅ Database reset completed');
  }
}
