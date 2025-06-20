# Theme Studio Render Flow Analysis

## Root Cause of Cascading Re-renders

After analyzing the complete render flow, I've identified several issues causing cascading re-renders:

### 1. **Circular Dependency Between Preview Generation and Theme Updates**

The main issue is in `useThemePreviewGenerator`:

```typescript
// useThemePreviewGenerator.ts
const visualProperties = useMemo(() => ({
  mode: theme.mode,
  colorPaletteId: theme.colorPaletteId,
  neutralPaletteId: theme.neutralPaletteId,
  fontFamily: theme.fontFamily,
  visualStyles: theme.visualStyles,
  structuralColors: theme.structuralColors,
  textClasses: theme.textClasses
}), [...dependencies]);
```

This creates a new object on every render when ANY theme property changes, even unrelated ones like `theme.name`.

### 2. **Object Reference Instability in useThemeStudio**

The hook returns a new object on every render:

```typescript
return useMemo(() => ({
  theme: themeData.theme,
  previewTheme,
  colorPalette,
  // ... many properties
}), [/* long dependency list */]);
```

Even though it's memoized, the dependency list includes objects that change reference frequently.

### 3. **Visual Settings State Duplication**

In `ThemeStudioContent`:

```typescript
const [visualSettings, setVisualSettings] = useState<Record<string, any>>(() => {
  const styles = { ...(themeStudio.theme.visualStyles || {}) };
  // ...
});

// Then syncing with theme
useEffectDebug(() => {
  const currentStyles = themeStudio.theme.visualStyles || {};
  const hasChanges = JSON.stringify(currentStyles) !== JSON.stringify(visualSettings);
  
  if (hasChanges) {
    setVisualSettings(styles);
  }
}, [themeStudio.theme.visualStyles]);
```

This creates a feedback loop where:
1. Visual styles change in store
2. Component state updates
3. Component calls `onVisualSettingsChange`
4. Store updates again

### 4. **Store Update Pattern Issues**

In the store's `updateTheme`:

```typescript
updateTheme: (updates) =>
  set((state) => {
    const hasChanges = Object.keys(updates).some(key => {
      const oldValue = state.theme[key as keyof StudioTheme];
      const newValue = updates[key as keyof StudioTheme];
      return !isEqual(oldValue, newValue);
    });
    
    if (!hasChanges) {
      return state;
    }
    
    const newTheme = { ...state.theme, ...updates };
    return { theme: newTheme };
  }),
```

While it checks for changes, it still creates new references for nested objects.

### 5. **SimplePowerBIEmbed Theme Application**

The component applies theme updates frequently:

```typescript
useEffect(() => {
  if (isReportReady && reportRef.current && variantPreviewTheme) {
    const timeoutId = setTimeout(async () => {
      await reportRef.current.applyTheme({ themeJson: themeToApply });
    }, 500);
  }
}, [variantPreviewTheme, isReportReady]);
```

This triggers whenever `variantPreviewTheme` changes, which happens on every preview regeneration.

## Cascade Pattern

The cascade happens like this:

1. User changes a single property (e.g., font size)
2. Store updates `theme.visualStyles`
3. `useThemePreviewGenerator` detects change and regenerates preview
4. Preview generation updates `resolved.previewTheme` 
5. `useThemeStudio` returns new object with new `previewTheme`
6. `ThemeStudioContent` re-renders
7. `visualSettings` state syncs with new theme
8. `VisualStylesPanel` re-renders
9. `SimplePowerBIEmbed` receives new theme and applies it
10. Multiple components re-render due to object reference changes

## Solutions

### 1. **Stabilize Object References**
- Use more granular memoization
- Avoid creating new objects unless data actually changes
- Use stable references for callbacks

### 2. **Debounce Preview Generation**
- Already has 50ms debounce, but might need longer
- Consider batching multiple updates

### 3. **Remove State Duplication**
- Remove `visualSettings` state in `ThemeStudioContent`
- Use store directly instead of syncing

### 4. **Optimize Store Updates**
- Use immer or similar for immutable updates
- Ensure deep equality checks work properly

### 5. **Separate Concerns**
- Split preview generation from theme data
- Use separate stores for UI state vs theme data