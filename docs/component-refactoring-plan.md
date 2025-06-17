# Component Refactoring Plan

## 1. New Folder Structure

```
components/
├── common/                 # Shared/reusable components
│   ├── forms/             # Form utilities
│   │   ├── BaseField.tsx
│   │   ├── FieldWrapper.tsx
│   │   └── ValidationError.tsx
│   ├── layouts/           # Layout components
│   │   ├── PageLayout.tsx
│   │   └── SectionLayout.tsx
│   └── feedback/          # User feedback components
│       ├── LoadingSpinner.tsx
│       └── ErrorBoundary.tsx
│
├── forms/                  # All form-related components
│   ├── fields/            # Form field components
│   │   ├── TextField.tsx
│   │   ├── NumberField.tsx
│   │   ├── ColorField.tsx
│   │   ├── SelectField.tsx
│   │   └── SwitchField.tsx
│   ├── controls/          # Low-level form controls
│   │   ├── ColorPicker.tsx (unified)
│   │   ├── NumberInput.tsx
│   │   └── TextInput.tsx
│   └── SchemaForm.tsx     # Main schema-driven form
│
├── theme-editor/          # Theme studio components
│   ├── panels/           # Main panels
│   │   ├── VisualStylesPanel.tsx
│   │   ├── PropertiesPanel.tsx
│   │   └── GlobalSettingsPanel.tsx
│   ├── editors/          # Specific editors
│   │   ├── PaletteEditor.tsx
│   │   ├── TypographyEditor.tsx
│   │   └── VisualPropertyEditor.tsx
│   ├── preview/          # Preview components
│   │   ├── ThemePreview.tsx
│   │   └── PowerBIEmbed.tsx
│   └── utils/            # Theme editor utilities
│       ├── PropertyInheritance.tsx
│       └── ChangeIndicator.tsx
│
├── ui/                    # Pure UI primitives (keep as is, but review)
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Dialog.tsx
│   ├── Input.tsx
│   └── ... (other primitives)
│
├── providers/            # React context providers
│   ├── StripeProvider.tsx
│   ├── ThemeProvider.tsx
│   └── AuthProvider.tsx
│
└── debug/               # Debug components (if needed in prod)
    └── PaletteDebug.tsx
```

## 2. Component Consolidation Plan

### 2.1 Color Picker Consolidation

**Current State:**
- `ui/color-picker.tsx`
- `ui/modern-color-picker.tsx`
- `ui/unified-color-picker.tsx`

**New Component:**
```typescript
// components/forms/controls/ColorPicker.tsx
interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  variant?: 'compact' | 'full' | 'inline';
  showAlpha?: boolean;
  presets?: string[];
  disabled?: boolean;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ 
  variant = 'full',
  ...props 
}) => {
  // Unified implementation
};
```

### 2.2 Form Field Abstraction

**Base Field Component:**
```typescript
// components/common/forms/BaseField.tsx
interface BaseFieldProps<T> {
  label: string;
  name: string;
  value: T;
  onChange: (value: T) => void;
  error?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
}

export function BaseField<T>({ 
  children,
  ...props 
}: BaseFieldProps<T> & { children: React.ReactNode }) {
  return (
    <FieldWrapper>
      <Label required={props.required}>{props.label}</Label>
      {props.description && <Description>{props.description}</Description>}
      {children}
      {props.error && <ErrorMessage>{props.error}</ErrorMessage>}
    </FieldWrapper>
  );
}
```

### 2.3 Text Editors Consolidation

**Current:**
- `theme-studio/TextClassesEditor.tsx`
- `theme-studio/typography/TextClassesEditor.tsx`

**New:**
```typescript
// components/theme-editor/editors/TypographyEditor.tsx
export const TypographyEditor: React.FC<{
  mode?: 'simple' | 'advanced';
}> = ({ mode = 'simple' }) => {
  // Unified implementation
};
```

## 3. Business Logic Extraction

### 3.1 Custom Hooks

```typescript
// hooks/useThemeProperty.ts
export function useThemeProperty(path: string[]) {
  const { updateThemeProperty, currentTheme } = useThemeDataStore();
  const value = getValueByPath(currentTheme, path);
  
  const setValue = useCallback((newValue: any) => {
    updateThemeProperty(path, newValue);
  }, [path, updateThemeProperty]);
  
  return [value, setValue] as const;
}

// hooks/useFormField.ts
export function useFormField<T>({
  name,
  validate,
  defaultValue,
}: FormFieldOptions<T>) {
  const [value, setValue] = useState<T>(defaultValue);
  const [error, setError] = useState<string>();
  const [touched, setTouched] = useState(false);
  
  // Validation logic
  // Change handling
  // Blur handling
  
  return { value, error, touched, onChange, onBlur };
}
```

### 3.2 Component Services

```typescript
// services/theme-editor-service.ts
export class ThemeEditorService {
  static validateProperty(schema: any, value: any): ValidationResult {
    // Move validation logic here
  }
  
  static resolveReference(ref: string, schema: any): any {
    // Move ref resolution here
  }
  
  static getPropertyMetadata(path: string[]): PropertyMetadata {
    // Move metadata logic here
  }
}
```

## 4. Type Safety Improvements

### 4.1 Replace `any` Types

```typescript
// types/theme-editor.ts
export interface ThemeProperty {
  path: string[];
  value: ThemePropertyValue;
  metadata: PropertyMetadata;
}

export type ThemePropertyValue = 
  | string 
  | number 
  | boolean 
  | ColorValue 
  | FontValue
  | ThemePropertyValue[];

export interface PropertyMetadata {
  type: 'color' | 'number' | 'string' | 'boolean' | 'font';
  label: string;
  description?: string;
  min?: number;
  max?: number;
  enum?: string[];
}
```

### 4.2 Strict Component Props

```typescript
// Before
interface Props {
  value: any;
  onChange: (value: any) => void;
  properties?: Record<string, any>;
}

// After
interface Props<T extends ThemePropertyValue> {
  value: T;
  onChange: (value: T) => void;
  properties?: PropertyMap;
}
```

## 5. Performance Optimizations

### 5.1 Component Splitting

```typescript
// Lazy load heavy components
const PowerBIPreview = lazy(() => import('./preview/PowerBIEmbed'));
const SchemaForm = lazy(() => import('./forms/SchemaForm'));
```

### 5.2 Memoization

```typescript
// Memoize expensive computations
const MemoizedVisualList = memo(VisualList, (prev, next) => {
  return prev.selectedVisual === next.selectedVisual;
});

// Use useMemo for expensive operations
const processedSchema = useMemo(() => 
  processSchema(rawSchema), 
  [rawSchema]
);
```

## 6. Migration Steps

### Phase 1: Structure (Week 1)
1. Create new folder structure
2. Move files without changing imports
3. Update import paths

### Phase 2: Consolidation (Week 2)
1. Merge color pickers
2. Consolidate text editors
3. Create base components

### Phase 3: Logic Extraction (Week 3)
1. Create custom hooks
2. Move business logic to services
3. Update components to use hooks

### Phase 4: Type Safety (Week 4)
1. Add proper types
2. Remove all `any` types
3. Add validation

### Phase 5: Performance (Week 5)
1. Add code splitting
2. Implement memoization
3. Optimize re-renders

## 7. Testing Strategy

1. **Unit Tests**: For all new hooks and services
2. **Component Tests**: For refactored components
3. **Integration Tests**: For theme editor workflows
4. **Visual Regression**: For UI components

## 8. Success Metrics

- [ ] No more `any` types in components
- [ ] All components < 200 lines
- [ ] Clear separation of concerns
- [ ] Consistent naming patterns
- [ ] 90%+ type coverage
- [ ] Performance improvements measurable