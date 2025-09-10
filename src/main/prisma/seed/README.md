# Database Seeding Documentation

## Overview

The seeding system provides a maintainable, type-safe, and organized approach to database initialization. All seed files are modular with clear separation of concerns.

## File Structure

```
src/main/prisma/seed/
├── seed.ts                 # Main entry point
├── seed.types.ts          # TypeScript interfaces & constants
├── seed.service.ts        # Seeding service with helper methods
├── permissions.data.ts    # Permission definitions
├── roles.data.ts         # Role definitions & permission mappings
├── basic.data.ts         # Organizations, users, units
└── seed.util.ts          # Utility data (money units, etc.)
```

## Features

### 🔒 Type Safety

- TypeScript interfaces for all seed data
- Permission action constants prevent typos
- Role ID constants ensure consistency

### 📦 Modular Organization

- Permissions in dedicated files
- Roles with permission mappings
- Separated basic data and utilities
- Reusable service class methods

### 🛡️ Error Handling

- Comprehensive logging with proper error handling
- Process exit codes for CI/CD integration
- Unhandled promise rejection handling

### 📊 Enhanced Logging

- Emoji-enhanced progress indicators
- Clear success/error status reporting
- Detailed operation visibility

## Permission System

### Structure

Permissions follow the pattern: `RESOURCE_ACTION`

- **RESOURCE**: Entity being acted upon (USER, BENEFICIARY, etc.)
- **ACTION**: Operation being performed (CREATE, READ, UPDATE, DELETE, LIST)

### Role Hierarchy

1. **Super Admin** - Full system access
2. **Branch Manager** - Branch-level management
3. **Staff** - Operational tasks within branch
4. **Volunteer** - Read-only access to essential data

### Constants

All permissions are defined in the `PERMISSIONS` constant:

```typescript
export const PERMISSIONS = {
  USER_CREATE: 'USER_CREATE',
  USER_READ: 'USER_READ'
  // ... more permissions
} as const;
```

## Usage

### Database Migration & Seeding

```bash
# Run migration without seeding
pnpm run migrate

# Run seeding after migration (automatically runs via postmigrate hook)
pnpm run postmigrate

# Full setup: install dependencies, start Docker, and migrate
pnpm run initial-setup
```

### Adding New Permissions

1. **Add to constants** in `seed.types.ts`:

   ```typescript
   export const PERMISSIONS = {
     // ... existing permissions
     REPORT_SCHEDULE: 'REPORT_SCHEDULE'
   } as const;
   ```

2. **Add to permissions data** in `permissions.data.ts`:

   ```typescript
   export const permissionsData: PermissionSeed[] = [
     // ... existing permissions
     {
       action: PERMISSIONS.REPORT_SCHEDULE,
       description: 'Schedule automated reports'
     }
   ];
   ```

3. **Add to role mappings** in `roles.data.ts`:
   ```typescript
   export const rolePermissions: Record<
     keyof typeof ROLE_IDS,
     PermissionAction[]
   > = {
     SUPER_ADMIN: [
       // ... existing permissions
       PERMISSIONS.REPORT_SCHEDULE
     ]
     // ... other roles
   };
   ```

### Adding New Roles

1. Add role ID to `ROLE_IDS` constant in `seed.types.ts`
2. Add role data to `rolesData` array in `roles.data.ts`
3. Add permission mapping to `rolePermissions` object in `roles.data.ts`

## Benefits

- ✅ **Type Safety** - Compile-time checking prevents errors
- 🔧 **Maintainability** - Clear separation of concerns
- 📈 **Scalability** - Easy to add new permissions and roles
- 📖 **Self-Documenting** - Types and constants provide clarity
- ♻️ **Reusability** - Service methods work across scenarios
- 🧪 **Testability** - Each module can be tested independently
- 🛡️ **Robust Error Handling** - Comprehensive logging and error management
