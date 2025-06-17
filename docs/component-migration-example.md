# Component Migration Example

This document shows how to migrate existing components to the new architecture.

## Example: Migrating a Form Field Component

### Before (Old Pattern)

```typescript
// components/theme-studio/form/fields/ColorSchemaField.tsx
import React from 'react';
import { UnifiedColorPicker } from '@/components/ui/unified-color-picker';

interface ColorSchemaFieldProps {
  label: string;
  value: any;
  onChange: (value: any) => void;
  schema: any;
  path: string[];
}

export const ColorSchemaField: React.FC<ColorSchemaFieldProps> = ({
  label,
  value,
  onChange,
  schema,
  path,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {schema.description && (
        <p className="text-xs text-muted-foreground">{schema.description}</p>
      )}
      <UnifiedColorPicker
        value={value || '#000000'}
        onChange={onChange}
      />
    </div>
  );
};
```

### After (New Pattern)

```typescript
// components/forms/fields/ColorField.tsx
import React from 'react';
import { createFormField } from '@/components/common/forms/BaseField';
import { ColorPicker } from '@/components/forms/controls/ColorPicker';
import { useFormField, validators } from '@/lib/hooks/useFormField';
import { useThemeProperty } from '@/lib/hooks/useThemeProperty';

// Simple version using createFormField
export const ColorField = createFormField<string, { presets?: string[] }>(ColorPicker);

// Advanced version with theme integration
export const ThemeColorField: React.FC<{
  path: string[];
  label: string;
  description?: string;
  required?: boolean;
  presets?: string[];
}> = ({ path, label, description, required, presets }) => {
  const [value, setValue] = useThemeProperty(path);
  
  const field = useFormField({
    name: path.join('.'),
    defaultValue: value || '#000000',
    validate: validators.hexColor(),
    required,
  });

  // Sync with theme store
  React.useEffect(() => {
    if (field.value !== value) {
      setValue(field.value);
    }
  }, [field.value]);

  return (
    <ColorField
      label={label}
      description={description}
      required={required}
      presets={presets}
      {...field.bind}
      error={field.error}
    />
  );
};
```

## Key Changes

1. **Separation of Concerns**
   - Base field logic extracted to `BaseField`
   - Form field logic in custom hook
   - Theme integration separated from UI

2. **Type Safety**
   - No more `any` types
   - Proper generic types
   - Validated props

3. **Reusability**
   - `createFormField` HOC for quick field creation
   - Shared validation logic
   - Consistent error handling

4. **Better Composition**
   - Small, focused components
   - Clear props interface
   - Easy to extend

## Migration Steps

1. **Identify the component type**
   - Is it a form field?
   - Is it a control?
   - Is it a container?

2. **Extract business logic**
   - Move to custom hooks
   - Move to services
   - Keep component pure

3. **Use new patterns**
   - For form fields: use `createFormField` or `BaseField`
   - For state: use specific stores
   - For validation: use `useFormField`

4. **Update imports**
   ```typescript
   // Before
   import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
   
   // After
   import { useThemeDataStore } from '@/lib/stores/theme-data-store';
   import { useThemeProperty } from '@/lib/hooks/useThemeProperty';
   ```

5. **Test the migration**
   - Component still renders correctly
   - Interactions work as expected
   - No TypeScript errors

## Common Patterns

### Pattern 1: Form Field with Validation

```typescript
const MyField = () => {
  const field = useFormField({
    name: 'myField',
    defaultValue: '',
    validate: validators.compose(
      validators.required(),
      validators.minLength(3)
    ),
  });

  return <TextField {...field.bind} error={field.error} />;
};
```

### Pattern 2: Theme-Connected Component

```typescript
const ThemeComponent = ({ path }: { path: string[] }) => {
  const [value, setValue] = useThemeProperty(path);
  
  return (
    <MyControl
      value={value}
      onChange={setValue}
    />
  );
};
```

### Pattern 3: Memoized Heavy Component

```typescript
const HeavyComponent = memo(({ data }: Props) => {
  const processedData = useMemo(() => 
    expensiveProcessing(data),
    [data]
  );
  
  return <div>{/* render processed data */}</div>;
}, (prev, next) => {
  // Custom comparison
  return prev.data.id === next.data.id;
});
```