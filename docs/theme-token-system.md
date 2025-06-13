# Theme Token System Documentation

## Overview

The PowerUI theme system supports both dynamic token references and static hex values for colors in visual styles. This allows themes to maintain dynamic relationships with foundation colors while also supporting custom color overrides.

## How It Works

### 1. Value Storage Format

Visual styles can contain three types of color values:

```typescript
// Token reference (dynamic)
{ solid: { color: "@bg-primary" } }

// Theme data color reference (dynamic)
{ solid: { color: { expr: { ThemeDataColor: { ColorId: 0 } } } } }

// Custom hex value (static)
{ solid: { color: "#FF5733" } }
```

### 2. Save/Load Process

**Saving:**
- Visual styles are saved exactly as entered (tokens remain tokens, hex remains hex)
- Foundation data (palettes, mode) is saved alongside visual styles
- No resolution happens during save

**Loading:**
- Theme data is loaded with tokens intact
- Visual styles display token names in the UI
- Foundation settings are restored

### 3. Token Resolution

Tokens are only resolved to hex values in two scenarios:

**For Preview:**
- The `generateTheme` function resolves all tokens based on current foundation
- Preview component receives fully resolved theme
- Changes to foundation immediately update preview

**For Export:**
- Export process calls `generateTheme` to get resolved theme
- Downloaded JSON contains all hex values
- Original tokens preserved in saved theme

### 4. Dynamic Updates

When foundation changes (palette, neutral palette, mode):
- Saved tokens remain unchanged
- Preview automatically updates with new resolved values
- Custom hex values remain static

## Benefits

1. **Editability**: Themes can be loaded and edited with original token assignments visible
2. **Dynamic Relationships**: Changing palettes automatically updates all token-based colors
3. **Flexibility**: Mix of tokens and custom colors supported
4. **Clean Data**: No redundant storage of both tokens and resolved values

## Example Flow

1. User selects `@bg-primary` for card background
2. UI shows "@bg-primary" in color picker
3. Save stores: `{ solid: { color: "@bg-primary" } }`
4. Preview resolves to "#ffffff" (for light mode)
5. User changes to dark mode
6. Preview updates to "#0d0d0d" automatically
7. Export produces theme with "#0d0d0d" for card background