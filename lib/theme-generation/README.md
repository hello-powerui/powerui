# Simplified Theme Generation System

## Overview

The theme generation system has been simplified to remove complex token resolution and multiple configuration files. The new system uses direct color mapping and programmatic theme generation.

## Key Changes

### Before (Complex Token System)
- Token indirection: `@bg-primary` → `base-white` → `#FFFFFF`
- Multiple JSON files: `base-theme.json`, `elements.json`, `palettes.json`, `styles.json`
- Complex token resolution with multiple passes
- Conflicting visual styles structures

### After (Simplified System)
- Direct color mapping based on mode and palette
- Single configuration file: `theme-config.ts`
- Programmatic theme generation
- No token resolution issues

## Architecture

### 1. Theme Configuration (`theme-config.ts`)
Central configuration file containing:
- Color mappings for light/dark modes
- Font configurations
- Style presets
- Helper functions

```typescript
// Example color mapping
colorMappings: {
  light: {
    'background-primary': () => '#FFFFFF',
    'text-primary': (p) => p.neutral['900'],
    'border-primary': (p) => p.neutral['300'],
  }
}
```

### 2. Simple Theme Generator (`simple-generator.ts`)
- Direct color resolution
- Programmatic visual styles generation
- Clean, understandable code

## How to Update Styles

### Change a Color Mapping
Edit `theme-config.ts`:
```typescript
// Change table header background
'table-header-bg': (p) => p.neutral['200'], // was '100'
```

### Add a New Color
Add to the appropriate mode in `colorMappings`:
```typescript
'my-custom-color': (p) => p.neutral['500'],
```

### Create a Style Preset
Add to `stylePresets`:
```typescript
myPreset: {
  name: 'My Preset',
  description: 'Custom style preset',
  borderRadius: 8,
  borderStyle: 'subtle',
  padding: 20,
  colorOverrides: {
    'background-primary': (p) => p.neutral['50']
  }
}
```

## Benefits

1. **Simplicity** - No complex token resolution
2. **Debuggability** - Direct path from color key to value
3. **Maintainability** - Single source of truth
4. **Performance** - Faster theme generation
5. **Flexibility** - Easy to add new colors and styles

## Migration Notes

The old token-based system files are still present but not used:
- `generator.ts` - Old complex generator
- `data-loader.ts` - Loads JSON configuration files
- JSON files in `/public/theme-data/`

These can be removed once the new system is fully validated.