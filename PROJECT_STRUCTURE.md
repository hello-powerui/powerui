# PowerUI Project Structure Reference

## Root Directory
```
powerui/
├── app/                      # Next.js 14 App Router
├── components/               # Reusable React components
├── lib/                      # Core business logic and utilities
├── public/                   # Static assets
├── prisma/                   # Database schema and migrations
├── scripts/                  # Build and utility scripts
├── types/                    # TypeScript type definitions
└── docs/                     # Documentation
```

## /app - Application Routes

### Route Groups
```
app/
├── (auth)/                   # Authenticated routes (requires login)
│   ├── dashboard/            # User dashboard and overview
│   ├── palettes/             # Color palette management
│   ├── themes/               # Theme management
│   │   └── studio/           # Theme editor interface
│   ├── team-setup/           # Team/organization configuration
│   └── (authenticated)/      # Additional auth-required routes
│
├── (public)/                 # Public routes (no auth required)
│   ├── page.tsx              # Landing page
│   ├── blog/                 # Blog posts and articles
│   ├── checkout/             # Stripe checkout flow
│   └── themes/               # Public theme gallery
│
├── api/                      # API routes
│   ├── auth/                 # Authentication endpoints
│   ├── palettes/             # Palette CRUD operations
│   ├── themes/               # Theme CRUD operations
│   ├── powerbi/              # PowerBI integration endpoints
│   ├── webhooks/             # External service webhooks
│   │   ├── clerk/            # User management webhooks
│   │   └── stripe/           # Payment webhooks
│   ├── organizations/        # Team management endpoints
│   └── user/                 # User profile endpoints
│
├── sign-in/                  # Clerk sign-in page
├── sign-up/                  # Clerk sign-up page
└── upgrade/                  # Subscription upgrade flow
```

## /components - UI Components

### Component Organization
```
components/
├── ui/                       # Base UI components (shadcn/ui)
│   ├── button.tsx            # Button component
│   ├── card.tsx              # Card component
│   ├── dialog.tsx            # Modal/dialog component
│   └── ...                   # Other primitive components
│
├── common/                   # Shared components
│   ├── forms/                # Form-related components
│   │   ├── BaseField.tsx     # Field wrapper HOC
│   │   └── ...               # Common form components
│   └── layouts/              # Layout components
│
├── forms/                    # Specialized form components
│   ├── fields/               # Custom form fields
│   │   ├── ColorField.tsx    # Color picker field
│   │   ├── TextField.tsx     # Text input field
│   │   └── ...               # Other field types
│   ├── controls/             # Form controls
│   └── SchemaForm.tsx        # Dynamic form from schema
│
├── theme-studio/             # Theme editor components
│   ├── preview/              # Theme preview components
│   │   ├── PowerBIPreview.tsx
│   │   └── SimplePowerBIEmbed.tsx
│   ├── palette/              # Palette management
│   │   └── UnifiedPaletteManager.tsx
│   ├── typography/           # Typography controls
│   │   └── TextClassesEditor.tsx
│   └── form/                 # Theme form components
│       ├── schema-form.tsx   # Schema-driven forms
│       └── visual-property-selector.tsx
│
├── theme-sharing-controls.tsx # Theme sharing functionality
├── stripe-provider.tsx        # Stripe payment context
└── debug/                     # Development/debug components
```

## /lib - Core Business Logic

### Library Structure
```
lib/
├── api/                      # API utilities
│   ├── middleware.ts         # Auth, validation, error handling
│   └── schemas.ts            # Zod validation schemas
│
├── auth/                     # Authentication utilities
│   ├── index.ts              # Unified auth helpers
│   └── permissions.ts        # User permission checks
│
├── data/                     # Static/default data
│   └── built-in-palettes.ts  # Default color palettes
│
├── db/                       # Database layer
│   ├── prisma.ts             # Prisma client instance
│   └── services/             # Legacy service files
│
├── errors/                   # Error handling
│   └── index.ts              # Custom error classes
│
├── services/                 # Business logic services
│   ├── index.ts              # Service registry
│   ├── base-service.ts       # Base service class
│   ├── theme-service.ts      # Theme operations
│   ├── palette-service.ts    # Palette operations
│   ├── user-service.ts       # User management
│   ├── powerbi-service.ts    # PowerBI integration
│   └── theme-editor-service.ts
│
├── stores/                   # Zustand state management
│   ├── theme-data-store.ts   # Theme JSON data
│   ├── visual-editor-store.ts # Visual editing state
│   ├── ui-state-store.ts     # UI flags and loading
│   ├── history-store.ts      # Undo/redo functionality
│   └── foundation-store.ts   # Palettes and typography
│
├── stripe/                   # Stripe integration
│   ├── client.ts             # Stripe client config
│   └── webhook.ts            # Webhook handlers
│
├── blog/                     # Blog utilities
│   └── index.ts              # Blog post management
│
├── theme-studio/             # Theme editor utilities
│   └── utils/                # Helper functions
│
├── webhooks/                 # Webhook handlers
│   └── clerk-handlers.ts     # Clerk event processors
│
├── powerbi/                  # PowerBI configuration
│   └── config.ts             # PowerBI settings
│
└── utils.ts                  # General utilities
```

## /prisma - Database

```
prisma/
├── schema.prisma             # Database schema definition
├── migrations/               # Database migration files
└── seed.ts                   # Database seeding script
```

## /scripts - Utility Scripts

```
scripts/
├── seed-palettes.ts          # Populate default palettes
├── setup-stripe-products.ts  # Configure Stripe products
├── fix-theme-data.ts         # Data migration utilities
├── dev-stripe.sh             # Stripe webhook forwarding
└── test-*.ts                 # Various test scripts
```

## /types - TypeScript Definitions

```
types/
├── index.d.ts                # Global type definitions
├── theme.ts                  # Theme-related types
├── palette.ts                # Palette types
└── api.ts                    # API response types
```

## Key Architectural Patterns

### 1. **Service Layer Pattern**
- All business logic in `/lib/services`
- Services use dependency injection
- Single registry for all services

### 2. **Store Pattern (Zustand)**
- Separate stores by domain
- Minimal store interdependencies
- Actions co-located with state

### 3. **API Middleware Pattern**
- Centralized auth checking
- Consistent error handling
- Request validation with Zod

### 4. **Component Composition**
- Small, focused components
- Props drilling minimized
- Custom hooks for logic

### 5. **File Naming Conventions**
- Components: PascalCase.tsx
- Hooks: useCamelCase.ts
- Utilities: kebab-case.ts
- API routes: route.ts

## Environment Variables

```
# Authentication
CLERK_*                       # Clerk auth configuration

# Database
DATABASE_URL                  # PostgreSQL connection

# PowerBI
POWERBI_*                     # PowerBI integration
AZURE_*                       # Azure AD credentials

# Stripe
STRIPE_*                      # Payment processing

# Application
NEXT_PUBLIC_*                 # Client-side variables
```

## Development Workflow

1. **Components**: Start in `/components` for UI work
2. **Business Logic**: Implement in `/lib/services`
3. **API Routes**: Add to `/app/api` with middleware
4. **State**: Create/update Zustand stores in `/lib/stores`
5. **Types**: Define in `/types` or co-locate with features