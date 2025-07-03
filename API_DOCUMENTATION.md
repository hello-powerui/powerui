# PowerUI API Documentation

## Table of Contents

1. [Overview](#overview)
2. [API Endpoints](#api-endpoints)
3. [React Components](#react-components)
4. [Custom Hooks](#custom-hooks)
5. [Services & Utilities](#services--utilities)
6. [Type Definitions](#type-definitions)
7. [Usage Examples](#usage-examples)

## Overview

PowerUI is a comprehensive Power BI theme generator application built with Next.js. It provides tools for creating, customizing, and managing Power BI themes with features including:

- Theme creation and editing
- Color palette generation
- Visual style customization
- Team collaboration
- Power BI integration
- Subscription management

## API Endpoints

### Theme Management

#### `GET /api/themes`
Retrieves all themes for the authenticated user.

**Authentication:** Required (Paid subscription)

**Response:**
```typescript
Theme[] // Array of user themes including organization themes
```

**Example:**
```javascript
const response = await fetch('/api/themes', {
  headers: { 'Authorization': 'Bearer <token>' }
});
const themes = await response.json();
```

#### `POST /api/themes`
Creates a new theme.

**Authentication:** Required (Paid subscription)

**Request Body:**
```typescript
{
  name: string;
  description?: string;
  themeData: object;
}
```

**Response:**
```typescript
Theme // Created theme object
```

#### `GET /api/themes/[id]`
Retrieves a specific theme by ID.

**Authentication:** Required

**Response:**
```typescript
Theme | null
```

#### `PUT /api/themes/[id]`
Updates an existing theme.

**Authentication:** Required (Owner or organization member)

**Request Body:**
```typescript
{
  name?: string;
  description?: string;
  themeData?: object;
  visibility?: 'PRIVATE' | 'ORGANIZATION' | 'PUBLIC';
}
```

#### `DELETE /api/themes/[id]`
Deletes a theme.

**Authentication:** Required (Owner only)

### Palette Management

#### `POST /api/generate-brand-palette`
Generates a brand color palette from input colors.

**Request Body:**
```typescript
{
  colors: string[]; // Array of hex color codes
}
```

**Response:**
```typescript
{
  palette: Record<string, string>;
  name: string;
}
```

#### `POST /api/generate-neutral-palette`
Generates a neutral color palette from a base color.

**Request Body:**
```typescript
{
  hexColor: string; // Base hex color
}
```

**Response:**
```typescript
{
  name: string;
  palette: Record<string, string>;
}
```

#### `GET /api/palettes`
Retrieves all color palettes for the user.

#### `POST /api/palettes`
Creates a new color palette.

### Power BI Integration

#### `GET /api/powerbi/reports`
Retrieves available Power BI reports.

#### `POST /api/powerbi/embed-config`
Generates embed configuration for Power BI visuals.

### Subscription Management

#### `GET /api/check-subscription`
Checks user's subscription status.

#### `POST /api/checkout`
Creates a checkout session for subscription.

### User & Organization

#### `GET /api/user`
Retrieves current user information.

#### `GET /api/organizations`
Retrieves user's organizations.

## React Components

### Theme Components

#### `ThemeCard`
Displays a theme card with preview and actions.

**Props:**
```typescript
interface ThemeCardProps {
  theme: Theme;
  isOwner?: boolean;
  currentUserId?: string;
  userOrganization?: { id: string; name: string } | null;
  onDelete?: (themeId: string, themeName: string) => void;
  onDuplicate?: (themeId: string) => void;
  onVisibilityChange?: (themeId: string, visibility: 'PRIVATE' | 'ORGANIZATION' | 'PUBLIC') => void;
  onUpdate?: (themeId: string, name: string, description: string) => Promise<void>;
  isTeamTheme?: boolean;
}
```

**Usage:**
```tsx
<ThemeCard
  theme={theme}
  isOwner={true}
  currentUserId={userId}
  onDelete={handleDelete}
  onDuplicate={handleDuplicate}
/>
```

#### `ThemeEditModal`
Modal for editing theme name and description.

**Props:**
```typescript
interface ThemeEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  onSave: (themeId: string, name: string, description: string) => Promise<void>;
}
```

#### `ThemePreviewModal`
Modal for previewing themes with Power BI visuals.

#### `ShareModal`
Modal for managing theme sharing and visibility.

### UI Components

#### `Button`
Reusable button component with variants.

**Props:**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}
```

**Usage:**
```tsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Save Theme
</Button>
```

#### `ColorPicker`
Color input component for theme customization.

#### `UnifiedColorPicker`
Advanced color picker with palette integration.

#### `ModernColorPicker`
Modern styled color picker component.

### Form Components

#### `Input`
Styled input component.

#### `Select`
Dropdown select component.

#### `Textarea`
Multi-line text input component.

#### `Switch`
Toggle switch component.

#### `Slider`
Range slider component.

### Layout Components

#### `AppHeader`
Main application header with navigation.

#### `PublicHeader`
Header for public/marketing pages.

#### `Card`
Container component for content sections.

## Custom Hooks

### Theme Management Hooks

#### `useThemeStudio()`
Main hook for theme studio functionality.

**Returns:**
```typescript
{
  // Theme data
  theme: ThemeGenerationInput;
  previewTheme: PowerBITheme;
  
  // Resolved palettes
  colorPalette: ColorPalette;
  neutralPalette: ColorPalette;
  
  // UI state
  selectedVisual: string;
  selectedVariant: string;
  selectedState: string;
  selectedSection: string;
  
  // Loading states
  isLoading: boolean;
  isSaving: boolean;
  isGenerating: boolean;
  
  // Change tracking
  isDirty: boolean;
  changedPaths: Set<string>;
  
  // Actions
  updateTheme: (updates: Partial<ThemeGenerationInput>) => void;
  setColorPaletteId: (id: string) => void;
  setNeutralPaletteId: (id: string) => void;
  setThemeMode: (mode: 'light' | 'dark') => void;
  setFontFamily: (fontFamily: string) => void;
  
  // UI actions
  setSelectedVisual: (visual: string) => void;
  setSelectedVariant: (variant: string) => void;
  
  // Save/load
  saveTheme: (name?: string) => Promise<void>;
  loadTheme: (themeId: string) => Promise<void>;
  resetTheme: () => void;
}
```

**Usage:**
```tsx
function ThemeStudio() {
  const {
    theme,
    updateTheme,
    setColorPaletteId,
    saveTheme,
    isLoading
  } = useThemeStudio();
  
  return (
    <div>
      {isLoading ? 'Loading...' : 'Ready'}
      <button onClick={() => saveTheme('My Theme')}>
        Save Theme
      </button>
    </div>
  );
}
```

#### `useThemeData()`
Hook for managing theme data state.

#### `useThemeUI()`
Hook for managing theme studio UI state.

#### `useThemePersistence()`
Hook for saving and loading themes.

#### `useThemePreviewGenerator()`
Hook for generating theme previews.

#### `useThemeChanges()`
Hook for tracking theme changes.

### Utility Hooks

#### `useDebounce(value, delay)`
Debounces a value update.

**Usage:**
```tsx
const debouncedValue = useDebounce(searchTerm, 300);
```

#### `useStableObject(obj)`
Returns a stable reference to an object.

#### `useUser()`
Hook for accessing current user data.

## Services & Utilities

### Theme Services

#### `ThemeService`
Database service for theme operations.

**Methods:**
```typescript
class ThemeService {
  static async getUserThemes(userId: string): Promise<Theme[]>;
  static async getThemeById(themeId: string, userId: string): Promise<Theme | null>;
  static async createTheme(userId: string, data: CreateThemeData): Promise<Theme>;
  static async updateTheme(themeId: string, userId: string, data: UpdateThemeData): Promise<Theme>;
  static async deleteTheme(themeId: string, userId: string): Promise<void>;
  static async duplicateTheme(themeId: string, userId: string, newName?: string): Promise<Theme>;
  static async shareThemeWithOrganization(themeId: string, userId: string, organizationId: string): Promise<Theme>;
  static async setDefaultTheme(themeId: string, userId: string): Promise<void>;
}
```

**Usage:**
```typescript
// Create a new theme
const theme = await ThemeService.createTheme(userId, {
  name: 'My Theme',
  description: 'A custom theme',
  themeData: themeData
});

// Get user themes
const themes = await ThemeService.getUserThemes(userId);
```

### Power BI Services

#### `PowerBIService`
Service for Power BI integration.

**Methods:**
```typescript
class PowerBIService {
  static async getEmbedConfig(reportId: string): Promise<EmbedConfig>;
  static async validateReport(reportId: string): Promise<boolean>;
  static async getReportVisuals(reportId: string): Promise<Visual[]>;
}
```

#### `VisualDiscoveryService`
Service for discovering Power BI visuals.

### Color & Palette Utilities

#### `generateBrandPalette(colors: string[])`
Generates a brand palette from input colors.

**Usage:**
```typescript
const palette = generateBrandPalette(['#FF6B6B', '#4ECDC4', '#45B7D1']);
```

#### `generateNeutralPalette(baseColor: string)`
Generates a neutral palette from a base color.

#### `parseCoolorsUrl(url: string)`
Parses colors from a Coolors.co URL.

**Usage:**
```typescript
const colors = parseCoolorsUrl('https://coolors.co/ff6b6b-4ecdc4-45b7d1');
// Returns: ['#FF6B6B', '#4ECDC4', '#45B7D1']
```

#### `isValidHexColor(color: string)`
Validates if a string is a valid hex color.

#### `generateCoolorsUrl(colors: string[])`
Generates a Coolors.co URL from an array of colors.

### Authentication Utilities

#### `requireUser()`
Requires user authentication.

**Usage:**
```typescript
const userId = await requireUser(); // Throws if not authenticated
```

#### `requirePaidUser()`
Requires paid user authentication.

#### `handleAuthError(error: unknown)`
Handles authentication errors.

### Theme Generation Utilities

#### `generateThemeFromInput(input: ThemeGenerationInput)`
Generates a complete Power BI theme from input parameters.

#### `cleanupVisualStyles(visualStyles: object)`
Cleans up visual styles by removing empty values.

#### `hasActualContent(value: any)`
Checks if a value has actual content (not empty/null/undefined).

## Type Definitions

### Core Types

#### `Theme`
```typescript
interface Theme {
  id: string;
  name: string;
  description: string | null;
  themeData: any;
  createdAt: string;
  updatedAt: string;
  userId: string;
  visibility: 'PRIVATE' | 'ORGANIZATION' | 'PUBLIC';
  organizationId?: string;
  isDefault: boolean;
}
```

#### `ThemeGenerationInput`
```typescript
interface ThemeGenerationInput {
  mode: 'light' | 'dark';
  neutralPalette: string | Record<string, string> | string[];
  fontFamily: string;
  dataColors: string[];
  name: string;
  
  // Optional properties
  brandPalette?: Record<string, string> | null;
  successPalette?: Record<string, string> | null;
  warningPalette?: Record<string, string> | null;
  errorPalette?: Record<string, string> | null;
  
  // Typography
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  textDecoration?: 'none' | 'underline';
  lineHeight?: number;
  
  // Colors
  background?: FillDefinition;
  foreground?: FillDefinition;
  border?: FillDefinition;
  
  // Layout
  padding?: Spacing;
  spacing?: number;
  shadow?: ShadowDefinition;
  
  // Visual overrides
  visualStyles?: VisualStyleOverrides;
  structuralColors?: StructuralColors;
  textClasses?: TextClasses;
}
```

#### `ColorPalette`
```typescript
interface ColorPalette {
  [shade: string]: string;
}
```

#### `VisualStyleOverrides`
```typescript
interface VisualStyleOverrides {
  card?: Partial<VisualStyle>;
  slicer?: Partial<VisualStyle>;
  textbox?: Partial<VisualStyle>;
  shape?: Partial<VisualStyle>;
  tableEx?: Partial<VisualStyle>;
  pivotTable?: Partial<VisualStyle>;
  multiRowCard?: Partial<VisualStyle>;
  kpi?: Partial<VisualStyle>;
  gauge?: Partial<VisualStyle>;
  [visualType: string]: Partial<VisualStyle> | undefined;
}
```

### Power BI Types

#### `EmbedConfig`
```typescript
interface EmbedConfig {
  type: string;
  id: string;
  embedUrl: string;
  accessToken: string;
  tokenType: number;
  settings: {
    panes: {
      filters: { expanded: boolean; visible: boolean };
      pageNavigation: { visible: boolean };
    };
  };
}
```

#### `PowerBIReport`
```typescript
interface PowerBIReport {
  id: string;
  name: string;
  webUrl: string;
  embedUrl: string;
  datasetId: string;
}
```

### Organization Types

#### `Organization`
```typescript
interface Organization {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  stripeCustomerId?: string;
}
```

#### `OrganizationMember`
```typescript
interface OrganizationMember {
  id: string;
  userId: string;
  organizationId: string;
  role: 'ADMIN' | 'MEMBER';
  joinedAt: string;
  invitedAt?: string;
  invitedBy?: string;
  status: 'ACTIVE' | 'INVITED' | 'SUSPENDED';
}
```

## Usage Examples

### Creating a New Theme

```typescript
import { useThemeStudio } from '@/lib/hooks/use-theme-studio';

function CreateTheme() {
  const { updateTheme, saveTheme } = useThemeStudio();
  
  const handleCreateTheme = async () => {
    // Set theme properties
    updateTheme({
      name: 'My Custom Theme',
      mode: 'light',
      fontFamily: 'Segoe UI',
      dataColors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
    });
    
    // Save the theme
    await saveTheme();
  };
  
  return (
    <button onClick={handleCreateTheme}>
      Create Theme
    </button>
  );
}
```

### Using Theme Service

```typescript
import { ThemeService } from '@/lib/db/services/theme-service';

async function loadUserThemes(userId: string) {
  try {
    const themes = await ThemeService.getUserThemes(userId);
    console.log(`Found ${themes.length} themes`);
    return themes;
  } catch (error) {
    console.error('Failed to load themes:', error);
    return [];
  }
}

async function duplicateTheme(themeId: string, userId: string) {
  try {
    const duplicatedTheme = await ThemeService.duplicateTheme(
      themeId, 
      userId, 
      'My Copied Theme'
    );
    console.log('Theme duplicated:', duplicatedTheme.id);
    return duplicatedTheme;
  } catch (error) {
    console.error('Failed to duplicate theme:', error);
    throw error;
  }
}
```

### Generating Color Palettes

```typescript
import { generateBrandPalette, generateNeutralPalette } from '@/lib/theme-generation';

// Generate brand palette from colors
const brandColors = ['#FF6B6B', '#4ECDC4', '#45B7D1'];
const brandPalette = generateBrandPalette(brandColors);

// Generate neutral palette from base color
const neutralPalette = generateNeutralPalette('#2C3E50');

console.log('Brand palette:', brandPalette);
console.log('Neutral palette:', neutralPalette);
```

### Using Power BI Integration

```typescript
import { PowerBIService } from '@/lib/powerbi/service';

async function embedReport(reportId: string) {
  try {
    const config = await PowerBIService.getEmbedConfig(reportId);
    
    // Use config with Power BI JavaScript SDK
    const report = powerbi.embed(element, config);
    
    return report;
  } catch (error) {
    console.error('Failed to embed report:', error);
  }
}
```

### API Usage Examples

```typescript
// Fetch user themes
const fetchThemes = async () => {
  const response = await fetch('/api/themes');
  if (response.ok) {
    const themes = await response.json();
    return themes;
  }
  throw new Error('Failed to fetch themes');
};

// Create a new theme
const createTheme = async (themeData: any) => {
  const response = await fetch('/api/themes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'New Theme',
      description: 'My custom theme',
      themeData: themeData
    })
  });
  
  if (response.ok) {
    return await response.json();
  }
  throw new Error('Failed to create theme');
};

// Generate color palette
const generatePalette = async (colors: string[]) => {
  const response = await fetch('/api/generate-brand-palette', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ colors })
  });
  
  if (response.ok) {
    return await response.json();
  }
  throw new Error('Failed to generate palette');
};
```

This documentation provides comprehensive coverage of all public APIs, functions, and components in the PowerUI application. Each section includes type definitions, usage examples, and practical code snippets to help developers understand and integrate with the system.