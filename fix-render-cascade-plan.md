# Fix Render Cascade Implementation Plan

## Priority 1: Stabilize Object References in useThemePreviewGenerator

### Issue
The `visualProperties` object is recreated on every render, causing unnecessary preview regenerations.

### Fix
```typescript
// Instead of creating a new object every time, use individual selectors
const mode = useThemeStudioStore((state) => state.theme.mode);
const colorPaletteId = useThemeStudioStore((state) => state.theme.colorPaletteId);
const neutralPaletteId = useThemeStudioStore((state) => state.theme.neutralPaletteId);
const fontFamily = useThemeStudioStore((state) => state.theme.fontFamily);
const visualStyles = useThemeStudioStore((state) => state.theme.visualStyles);
const structuralColors = useThemeStudioStore((state) => state.theme.structuralColors);
const textClasses = useThemeStudioStore((state) => state.theme.textClasses);

// Create a stable hash or key instead of comparing objects
const visualPropertiesKey = useMemo(() => 
  JSON.stringify({
    mode,
    colorPaletteId,
    neutralPaletteId,
    fontFamily,
    visualStyles,
    structuralColors,
    textClasses
  }),
  [mode, colorPaletteId, neutralPaletteId, fontFamily, visualStyles, structuralColors, textClasses]
);
```

## Priority 2: Remove Visual Settings State Duplication

### Issue
`ThemeStudioContent` maintains its own `visualSettings` state that syncs with the store, causing loops.

### Fix
Remove the local state and use the store directly:

```typescript
// Remove this:
const [visualSettings, setVisualSettings] = useState<Record<string, any>>(() => {
  const styles = { ...(themeStudio.theme.visualStyles || {}) };
  // ...
});

// Remove the sync effect

// Update handlers to work directly with store:
const handleVisualSettingsChange = useCallback((newVisualSettings: Record<string, any>) => {
  themeStudio.updateTheme({ visualStyles: newVisualSettings });
}, [themeStudio]);

// Pass store value directly to child components:
<VisualStylesPanel
  visualSettings={themeStudio.theme.visualStyles}
  // ...
/>
```

## Priority 3: Optimize SimplePowerBIEmbed Memo Comparison

### Issue
The memo comparison is comparing the entire theme object including name changes.

### Fix
Create a more specific comparison that ignores non-visual changes:

```typescript
export default memo(SimplePowerBIEmbed, (prevProps, nextProps) => {
  // Compare only visual-affecting properties
  const prevVisualKey = JSON.stringify({
    mode: prevProps.generatedTheme?.mode,
    dataColors: prevProps.generatedTheme?.dataColors,
    visualStyles: prevProps.generatedTheme?.visualStyles,
    // ... other visual properties
  });
  
  const nextVisualKey = JSON.stringify({
    mode: nextProps.generatedTheme?.mode,
    dataColors: nextProps.generatedTheme?.dataColors,
    visualStyles: nextProps.generatedTheme?.visualStyles,
    // ... other visual properties
  });
  
  return prevVisualKey === nextVisualKey &&
    prevProps.selectedVisualType === nextProps.selectedVisualType &&
    prevProps.selectedVariant === nextProps.selectedVariant &&
    prevProps.enterFocusMode === nextProps.enterFocusMode;
});
```

## Priority 4: Batch Theme Updates

### Issue
Multiple sequential updates trigger multiple re-renders.

### Fix
Add a batched update method to the store:

```typescript
// In theme-studio-store.ts
batchUpdateTheme: (updateFn: (theme: StudioTheme) => Partial<StudioTheme>) => {
  set((state) => {
    const updates = updateFn(state.theme);
    const hasChanges = Object.keys(updates).some(key => {
      return !isEqual(state.theme[key as keyof StudioTheme], updates[key as keyof StudioTheme]);
    });
    
    if (!hasChanges) return state;
    
    return {
      theme: { ...state.theme, ...updates }
    };
  });
}
```

## Priority 5: Increase Preview Generation Debounce

### Issue
50ms debounce might be too short for rapid updates.

### Fix
```typescript
// In useThemePreviewGenerator
const debouncedVisualProperties = useDebounce(visualPropertiesKey, 300); // Increase to 300ms
```

## Implementation Order

1. **Start with Priority 2** - Remove visual settings state duplication (biggest impact, easiest fix)
2. **Then Priority 1** - Stabilize object references in preview generator
3. **Then Priority 3** - Optimize SimplePowerBIEmbed memo
4. **Then Priority 5** - Increase debounce time
5. **Finally Priority 4** - Add batch updates if still needed

## Expected Results

- Reduce re-renders from ~10-20 per change to 2-3
- Eliminate feedback loops between store and component state
- Improve UI responsiveness
- Reduce Power BI theme application calls