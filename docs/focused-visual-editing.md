# Focused Visual Editing

## Overview

The Focused Visual Editing feature provides a distraction-free environment for customizing specific Power BI visual types in the theme studio. When you select a visual type (like Action Button, Shape, or Card), the Power BI preview automatically isolates visuals of that type, hiding all others and presenting them front and center for easier editing.

## How It Works

### Automatic Activation
Focus mode activates automatically when you:
1. Navigate to the Visual Styles section in the theme studio
2. Select a specific visual type from the dropdown (anything other than "All Visuals")

### Visual Discovery
The system automatically:
- Discovers all visuals in the current Power BI report
- Identifies visual types and their positions
- Updates when you change report pages

### Layout Optimization
When focus mode is active:
- **Single Visual**: Centered on the canvas and enlarged by 50% for better visibility
- **Multiple Visuals**: Arranged in an optimized grid layout while maintaining aspect ratios
- **Hidden Visuals**: All other visual types are hidden to reduce clutter

## User Experience

### Visual Selection
1. Open the theme studio and navigate to "Visual Styles"
2. Select a visual type from the dropdown (e.g., "Action Button")
3. Focus mode activates automatically

### Focus Mode Indicator
When active, you'll see:
- A blue "Focus Mode: [Visual Type]" badge in the top-left of the preview
- An informational message below the visual selector
- Only the selected visual type displayed in the preview

### Exiting Focus Mode
To exit focus mode and see all visuals:
- Select "All Visuals" from the visual type dropdown
- The preview returns to the default layout showing all visuals

## Supported Visual Types

The focus mode supports all Power BI visual types, with intelligent mapping for:
- **Action Button** → `actionButton`, `button`
- **Shape** → `shape`
- **Card** → `card`
- **KPI** → `kpi`
- **Slicer** → `slicer`
- **Table** → `table`, `tableEx`
- **Charts** → Various chart types (bar, column, line, pie, etc.)
- **Maps** → `map`, `filledMap`, `shapeMap`
- And many more...

## Technical Implementation

### Components
- **`SimplePowerBIEmbed`**: Enhanced to support visual discovery and focus mode
- **`visual-focus-utils.ts`**: Utilities for generating focused layouts
- **`PowerBIPreview`**: Passes selected visual type to the embed component

### Visual Discovery Process
1. When the report loads, the system queries all pages
2. For the active page, it retrieves all visual descriptors
3. Visual information (type, position, size) is stored for layout calculations

### Layout Generation
The system generates custom Power BI layouts using:
```javascript
{
  layoutType: models.LayoutType.Custom,
  customLayout: {
    pageSize: { /* custom dimensions */ },
    displayOption: models.DisplayOption.FitToPage,
    pagesLayout: {
      "[PageId]": {
        defaultLayout: { /* hidden by default */ },
        visualsLayout: { /* specific visual positions */ }
      }
    }
  }
}
```

## Benefits

### For Theme Designers
- **Reduced Distractions**: Focus on one visual type at a time
- **Better Visibility**: Enlarged visuals make it easier to see style changes
- **Faster Workflow**: No need to search for specific visuals in complex reports
- **Immediate Feedback**: See changes applied to all visuals of the selected type

### For Design Consistency
- **Bulk Editing**: Style all visuals of the same type simultaneously
- **Visual Comparison**: When multiple visuals exist, see them side-by-side
- **State Testing**: Easily test hover, selected, and disabled states

## Best Practices

1. **Start with Focus Mode**: When editing a specific visual type, let focus mode help you concentrate
2. **Test Multiple Instances**: If your report has multiple visuals of the same type, focus mode shows them all
3. **Check All States**: Use the visual state selector to ensure consistency across all interaction states
4. **Preview in Context**: Periodically switch back to "All Visuals" to see how your changes look in the full report

## Troubleshooting

### Focus Mode Not Activating
- Ensure you've selected a specific visual type (not "All Visuals")
- Check that the Power BI report has loaded successfully
- Verify that visuals of the selected type exist in the report

### Visuals Not Centered Properly
- The system respects the original aspect ratios of visuals
- Very wide or tall visuals may appear differently than expected
- Grid layout activates automatically for multiple visuals

### Performance Considerations
- Visual discovery happens once per page load
- Layout changes are debounced to prevent rapid updates
- Focus mode has minimal performance impact

## Future Enhancements

Potential improvements include:
- Visual state preview (showing hover/selected states side-by-side)
- Zoom controls for focused visuals
- Animation preview for state transitions
- Export focused visual as image
- Side-by-side variant comparison