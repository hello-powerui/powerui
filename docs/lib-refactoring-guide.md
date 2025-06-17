# Library Refactoring Migration Guide

This guide helps you migrate to the new refactored library structure.

## File Relocations

The following files have been moved to better organize the codebase:

- `lib/stripe.ts` → `lib/stripe/client.ts`
- `lib/stripe-webhook.ts` → `lib/stripe/webhook.ts`
- `lib/blog.ts` → `lib/blog/index.ts`
- `lib/user-permissions.ts` → `lib/auth/permissions.ts`
- `lib/auth-helpers.ts` → **REMOVED** (use `lib/auth/index.ts`)
- `lib/utils/get-current-user.ts` → **REMOVED** (use `lib/auth/index.ts`)

## 1. Authentication Updates

### Old Usage:
```typescript
// From lib/auth-helpers.ts
import { requireUser, requirePaidUser } from '@/lib/auth-helpers';

// From lib/utils/get-current-user.ts
import { getCurrentUser } from '@/lib/utils/get-current-user';
```

### New Usage:
```typescript
import { 
  requireAuth, 
  requirePaidUser, 
  getCurrentUser,
  getAuthUserId 
} from '@/lib/auth';

// Example usage
const user = await requireAuth(); // Returns { clerkUser, dbUser }
const paidUser = await requirePaidUser(); // Throws if no subscription
```

## 2. Error Handling Updates

### Old Usage:
```typescript
throw new Error('Not found');
throw new Error('Unauthorized');
```

### New Usage:
```typescript
import { 
  NotFoundError, 
  AuthenticationError,
  AuthorizationError,
  ValidationError,
  handleApiError 
} from '@/lib/errors';

// In API routes
try {
  // ... your code
} catch (error) {
  return handleApiError(error);
}
```

## 3. Store Updates

### Old Usage:
```typescript
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';

const { 
  currentTheme, 
  updateThemeProperty,
  selectedVisual,
  setSelectedVisual,
  isDirty,
  history,
  undo
} = useThemeStudioStore();
```

### New Usage:
```typescript
// Import specific stores
import { useThemeDataStore } from '@/lib/stores/theme-data-store';
import { useVisualEditorStore } from '@/lib/stores/visual-editor-store';
import { useUIStateStore } from '@/lib/stores/ui-state-store';
import { useHistoryStore } from '@/lib/stores/history-store';
import { useFoundationStore } from '@/lib/stores/foundation-store';

// Use specific stores
const { currentTheme, updateThemeProperty, isDirty } = useThemeDataStore();
const { selectedVisual, setSelectedVisual } = useVisualEditorStore();
const { isLoading, setIsLoading } = useUIStateStore();
const { undo, redo, canUndo } = useHistoryStore();
const { palette, setPalette, fontFamily } = useFoundationStore();
```

## 4. Service Updates

### Old Usage:
```typescript
import { ThemeService } from '@/lib/db/services/theme-service';
import { PaletteService } from '@/lib/db/services/palette-service';

// Static methods
const themes = await ThemeService.getUserThemes(userId);
const palette = await PaletteService.createColorPalette(data);
```

### New Usage:
```typescript
import { services } from '@/lib/services';

// Instance methods
const themes = await services.theme.getUserThemes(userId);
const palette = await services.palette.createColorPalette(data);

// Or import individual services
import { themeService, paletteService } from '@/lib/services';
```

## 5. Type Safety Updates

### Old Usage:
```typescript
const themeData = JSON.parse(themeJson) as any;
const visualStyles: Record<string, any> = {};
```

### New Usage:
```typescript
import { 
  PowerBITheme, 
  validatePowerBITheme,
  safeParseThemeJSON 
} from '@/lib/types/theme';

// Validate and parse
const themeData = validatePowerBITheme(JSON.parse(themeJson));
// Or safe parse
const theme = safeParseThemeJSON(themeJson);
```

## 6. Component Updates Needed

### Files that need updating:
1. **API Routes** - Update error handling and auth imports
2. **Theme Studio Components** - Update store imports
3. **Dashboard/Palettes Pages** - Update service imports
4. **Middleware** - Update auth imports

### Example API Route Update:

```typescript
// Before
import { requireUser } from '@/lib/auth-helpers';
import { ThemeService } from '@/lib/db/services/theme-service';

export async function GET() {
  try {
    const userId = await requireUser();
    const themes = await ThemeService.getUserThemes(userId);
    return NextResponse.json(themes);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// After
import { requireAuthUserId } from '@/lib/auth';
import { services } from '@/lib/services';
import { handleApiError } from '@/lib/errors';

export async function GET() {
  try {
    const userId = await requireAuthUserId();
    const themes = await services.theme.getUserThemes(userId);
    return NextResponse.json(themes);
  } catch (error) {
    return handleApiError(error);
  }
}
```

## 7. Testing the Migration

1. Update imports in one file at a time
2. Run TypeScript check: `npm run typecheck`
3. Test functionality in development
4. Look for any `any` types and replace with proper types

## 8. Benefits After Migration

- **Better Error Messages**: Users get clearer error responses
- **Type Safety**: Catch bugs at compile time
- **Easier Testing**: Services can be mocked/injected
- **Better Performance**: Smaller store updates
- **Clearer Code**: Each module has single responsibility