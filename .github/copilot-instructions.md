# Copilot Instructions for Charity Free SaaS

## Project Overview

Multi-platform charity management SaaS built to run as both **Desktop (Electron)** and **Web** applications with a shared codebase. Manages beneficiaries, donations, benefits distribution, and organizational operations.

### Tech Stack

- **Frontend**: Vue.js 3 + TypeScript + PrimeVue + TailwindCSS
- **Backend**: NestJS + Prisma ORM
- **Database**: MySQL 8.0
- **Build**: Vite + Doubleshot (Electron) / Standard Vite (Web)
- **Package Manager**: pnpm

## Architecture Principles

### MVVM Pattern

- **Model**: Prisma entities + DTOs in `@shared`
- **View**: Vue components following atomic design
- **ViewModel**: Vue composables handling business logic and state

### Modular Architecture

Each feature is organized as a complete module with:

```
modules/[feature]/
├── components/          # UI components
├── composables/        # Business logic (ViewModels)
├── types/             # Feature-specific types
└── utils/             # Feature utilities
```

### Atomic Design Structure

```
components/
├── atoms/             # Basic UI elements (buttons, inputs)
├── molecules/         # Simple component combinations
└── organisms/         # Complex component compositions
```

## Code Organization

### Directory Structure

```
src/
├── main/                 # Electron main + NestJS backend
│   ├── nest/
│   │   ├── modules/     # Feature modules (CRUD + business logic)
│   │   └── shared/      # Backend utilities
│   └── prisma/          # Database schema + seeds
├── render/              # Vue.js frontend
│   ├── components/      # Atomic design components
│   ├── modules/         # Feature modules (MVVM)
│   ├── pages/          # Route components
│   ├── composables/    # Global composables
│   └── utils/          # Frontend utilities
└── shared/             # **CRITICAL: Always use this**
    ├── types/          # All DTOs and interfaces
    └── services/schema/ # All Zod validation schemas
```

### Path Aliases

- `@render`: Frontend (`src/render`)
- `@main`: Main process (`src/main`)
- `@nest`: NestJS backend (`src/main/nest`)
- `@shared`: **Shared schemas/types** (`src/shared`)

## Mandatory Patterns

### 1. Always Use @shared

**NEVER** define types or schemas outside of `@shared`:

```typescript
// ✅ CORRECT
import { UserCreateDTO } from '@shared/types/user/user.dto';
import { userSchema } from '@shared/services/schema/user.schema';

// ❌ WRONG - Don't create local types
interface LocalUser { ... }
```

### 2. Module Structure (Required)

Every feature module must follow this pattern:

```
modules/[feature]/
├── components/
│   ├── [feature].vue  #atomic design components
├── composables/
│   └── use-[feature]-vm.ts    # ViewModel (business logic)
├── types/                     # Move to @shared instead
└── [feature].module.ts        # NestJS module
```

### 3. MVVM Implementation

```typescript
// ViewModel (composables/use-[feature]-vm.ts)
export const useFeatureVM = () => {
  // Business logic, API calls, state management
  const items = ref<FeatureDTO[]>([]);

  const fetchItems = async () => {
    // Use @shared schemas for validation
  };

  return { items, fetchItems };
};

// View (components/feature-list.vue)
<script setup lang="ts">
import { useFeatureVM } from '../composables/use-feature-vm';
const { items, fetchItems } = useFeatureVM();
</script>
```

### 4. Cross-Platform Compatibility

Write code that works for both Desktop and Web:

```typescript
// ✅ Platform-agnostic patterns
const isMobile = computed(() => window.innerWidth < 768);

// ❌ Avoid Electron-specific code in components
const { ipcRenderer } = require('electron'); // Don't do this
```

## Development Guidelines

### Backend (NestJS)

- Modular architecture with feature modules
- Use `@shared` DTOs for all data transfer
- Validate with `@shared` Zod schemas
- Prisma transactions for complex operations
- JWT authentication with role-based access

### Frontend (Vue.js)

- Composition API with `<script setup>`
- MVVM pattern with composables as ViewModels
- Atomic design for components
- Use `@shared` types everywhere
- TanStack Query for server state
- i18n for Arabic/English support

### Shared Layer

- **All DTOs** in `@shared/types/[module]/`
- **All schemas** in `@shared/services/schema/`
- Validation schemas must use Zod with satisfies ts keyword
- Types shared between frontend/backend

## Business Domain

### Core Entities

1. **Organization/Branch**: Multi-branch structure
2. **Beneficiaries**: People receiving aid
3. **Benefits**: Financial/item-based assistance
4. **Users**: Staff with branch permissions
5. **Transactions**: Financial movements
6. **Visits**: Benefit distribution tracking

### Business Rules

- Branch-based data isolation
- Role-based access control
- Audit trails for all operations
- Multi-language support (AR/EN)
- Financial integrity constraints

## Code Standards

### TypeScript

```typescript
// Use strict typing from @shared
import { CreateUserDTO } from '@shared/types/user/user.dto';
import { userSchema } from '@shared/services/schema/user.schema';

// Validate with shared schemas
const validatedData = userSchema.createUser.parse(userData);
```

### Vue Components

```vue
<script setup lang="ts">
// Import from @shared
import type { UserDTO } from '@shared/types/user/user.dto';

// Use MVVM pattern
const { users, createUser } = useUserVM();

// Props with strict typing
interface Props {
  user: UserDTO;
}
const props = defineProps<Props>();
</script>
```

### NestJS Services

```typescript
@Injectable()
export class UserService {
  // Use @shared DTOs
  async create(dto: CreateUserDTO): Promise<UserDTO> {
    // Validate with @shared schema
    const validated = userSchema.create.parse(dto);
    return this.prisma.user.create({ data: validated });
  }
}
```

## Key Requirements

### Multi-Platform

- Single codebase for Desktop + Web
- Responsive design for all screen sizes
- Platform-specific optimizations when needed

### Internationalization

- Arabic (RTL) and English (LTR)
- Localized business logic

### Performance

- Lazy loading for large datasets
- Efficient state management
- Optimized bundle sizes

### Security

- Branch-level data isolation
- Role-based permissions
- Input validation at all layers

## Development Workflow

1. **Define**: Create DTOs in `@shared/types/`
2. **Validate**: Add Zod schemas in `@shared/services/schema/`
3. **Backend**: Implement NestJS module using shared types
4. **Frontend**: Create Vue module with MVVM pattern inside its own module

## Common Mistakes to Avoid

❌ Creating types outside `@shared`
❌ Skipping validation schemas  
❌ Breaking modular architecture
❌ Not following atomic design

## Success Criteria

- All types/schemas in `@shared`
- MVVM pattern consistently applied
- Modular architecture maintained
- Cross-platform compatibility
- Multi-language support working
- Clean, maintainable codebase
- Generate Nestjs module with nest cli command
