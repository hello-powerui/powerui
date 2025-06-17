# Component Import Migration Guide

This guide shows how to update imports after the component refactoring.

## Import Changes

### Color Pickers
```typescript
// OLD - Multiple imports
import { ColorPicker } from '@/components/ui/color-picker';
import { ModernColorPicker } from '@/components/ui/modern-color-picker';
import { UnifiedColorPicker } from '@/components/ui/unified-color-picker';

// NEW - Single import
import { ColorPicker } from '@/components/forms/controls/ColorPicker';
```

### Text Editors
```typescript
// OLD - Duplicate components
import { TextClassesEditor } from '@/components/theme-studio/TextClassesEditor';
import { TextClassesEditor } from '@/components/theme-studio/typography/TextClassesEditor';

// NEW - Single component
import { TypographyEditor } from '@/components/theme-editor/editors/TypographyEditor';
```

### Palette Components
```typescript
// OLD
import { UnifiedPaletteManager } from '@/components/theme-studio/palette/UnifiedPaletteManager';
import { UnifiedPaletteEditor } from '@/components/theme-studio/palette/UnifiedPaletteEditor';

// NEW
import { PaletteEditor } from '@/components/theme-editor/editors/PaletteEditor';
```

### Form Components
```typescript
// OLD
import { ColorSchemaField } from '@/components/theme-studio/form/fields/ColorSchemaField';
import { NumberSchemaField } from '@/components/theme-studio/form/fields/NumberSchemaField';
import { schema-form } from '@/components/theme-studio/form/schema-form';

// NEW
import { ColorField, NumberField } from '@/components/forms/fields';
import { SchemaForm } from '@/components/forms/SchemaForm';
```

### Preview Components
```typescript
// OLD
import { PowerBIPreview } from '@/components/theme-studio/preview/PowerBIPreview';
import { SimplePowerBIEmbed } from '@/components/theme-studio/preview/SimplePowerBIEmbed';

// NEW
import { ThemePreview } from '@/components/theme-editor/preview/ThemePreview';
import { PowerBIEmbed } from '@/components/theme-editor/preview/PowerBIEmbed';
```

### Providers
```typescript
// OLD
import { StripeProvider } from '@/components/stripe-provider';

// NEW
import { StripeProvider } from '@/components/providers/StripeProvider';
```

### Visual Panels
```typescript
// OLD
import { VisualStylesPanel } from '@/components/theme-studio/VisualStylesPanel';

// NEW
import { VisualStylesPanel } from '@/components/theme-editor/panels/VisualStylesPanel';
```

## Store Updates

Remember to also update store imports:

```typescript
// OLD
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';

// NEW
import { useThemeDataStore } from '@/lib/stores/theme-data-store';
import { useVisualEditorStore } from '@/lib/stores/visual-editor-store';
import { useUIStateStore } from '@/lib/stores/ui-state-store';
import { useFoundationStore } from '@/lib/stores/foundation-store';
```

## Hook Updates

```typescript
// NEW hooks to use
import { useThemeProperty } from '@/lib/hooks/useThemeProperty';
import { useFormField } from '@/lib/hooks/useFormField';
```

## Service Updates

```typescript
// OLD
// Business logic in components

// NEW
import { ThemeEditorService } from '@/lib/services/theme-editor-service';
import { services } from '@/lib/services';
```

## Migration Script

To help with migration, you can use these search/replace patterns:

```bash
# Find old imports
grep -r "from '@/components/ui/.*color-picker" .
grep -r "from '@/components/theme-studio" .
grep -r "useThemeStudioStore" .

# Common replacements
# '@/components/ui/color-picker' -> '@/components/forms/controls/ColorPicker'
# '@/components/ui/modern-color-picker' -> '@/components/forms/controls/ColorPicker'
# '@/components/ui/unified-color-picker' -> '@/components/forms/controls/ColorPicker'
# 'useThemeStudioStore' -> 'useThemeDataStore' (or other specific stores)
```

## Component API Changes

### ColorPicker
```typescript
// OLD - Different props for different pickers
<UnifiedColorPicker color={value} onColorChange={onChange} />
<ModernColorPicker value={value} onChange={onChange} />

// NEW - Unified API
<ColorPicker 
  value={value} 
  onChange={onChange}
  variant="full" // 'compact' | 'full' | 'inline'
/>
```

### Typography Editor
```typescript
// OLD
<TextClassesEditor 
  open={open}
  onOpenChange={setOpen}
  onUpdateTextClasses={handleUpdate}
/>

// NEW
<TypographyEditor
  open={open}
  onOpenChange={setOpen}
  mode="dialog" // or "inline"
  showDescriptions={true}
/>
```

### Form Fields
```typescript
// OLD - Complex wrapper
<ColorSchemaField
  label={label}
  value={value}
  onChange={onChange}
  schema={schema}
  path={path}
/>

// NEW - Simple, typed
<ColorField
  label={label}
  value={value}
  onChange={onChange}
  description={schema.description}
  required={required}
/>
```

## Benefits After Migration

1. **Cleaner imports** - No more duplicate components
2. **Better types** - Full TypeScript support
3. **Smaller bundles** - Tree-shaking friendly
4. **Easier testing** - Components are more focused
5. **Better performance** - Optimized re-renders