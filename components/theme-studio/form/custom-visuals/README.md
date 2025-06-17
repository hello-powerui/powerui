# Custom Visual Components

This directory contains custom components for specific Power BI visuals that need special handling in the theme editor.

## Architecture

- Each visual that needs custom rendering has its own component file
- Components are registered in the `index.ts` file
- The `VisualPropertiesPanel` checks for custom components before falling back to generic rendering

## ActionButtonVisual

The action button visual has special handling for:

1. **Fill Toggle** - A boolean toggle outside of state context that controls whether the button has a fill
2. **Visual State Selector** - Clear indication of which state properties apply to
3. **Fill Properties** - State-aware properties for button background (color, gradient, etc.)
4. **Text Properties** - State-aware properties for button text
5. **Other Properties** - Non-state properties organized by section

### Key Features:
- The fill toggle is rendered at the top level, not within any state
- When fill is disabled, fill properties are hidden
- State selector is prominently displayed
- Properties are organized into logical groups

## Adding New Custom Visuals

To add a custom component for a new visual:

1. Create a new component file: `[VisualName]Visual.tsx`
2. Export it from `index.ts`
3. Add it to the `customVisualComponents` mapping with the visual type as the key

The visual type key should match the property name in the theme schema (e.g., 'actionButton', 'shape', etc.).