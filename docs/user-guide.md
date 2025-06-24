# Power UI Theme Studio - Complete User Guide

This comprehensive guide covers all features of Power UI Theme Studio. Follow along to master creating professional Power BI themes.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Interface Overview](#interface-overview)
3. [Theme Foundation](#theme-foundation)
4. [Color Palette Management](#color-palette-management)
5. [Neutral Palette System](#neutral-palette-system)
6. [Typography & Text Styling](#typography--text-styling)
7. [Light/Dark Mode](#lightdark-mode)
8. [Visual Styles & Variants](#visual-styles--variants)
9. [Real-Time Preview](#real-time-preview)
10. [Importing Themes](#importing-themes)
11. [Sharing & Collaboration](#sharing--collaboration)
12. [JSON View & Editing](#json-view--editing)
13. [Saving & Exporting](#saving--exporting)
14. [Keyboard Shortcuts](#keyboard-shortcuts)
15. [Pro Tips & Best Practices](#pro-tips--best-practices)

---

## Getting Started

### Accessing Theme Studio

1. Log into Power UI
2. Navigate to **Themes** from your dashboard
3. Click **"Create New Theme"** or select an existing theme to edit
4. The Theme Studio opens with three main panels

### First Steps

1. Name your theme using the input field in the header
2. Add an optional description
3. Start customizing using the Foundation panel on the left

---

## Interface Overview

The Theme Studio has three main sections:

### Left Panel - Foundation
Controls core theme settings:
- Color palettes
- Typography
- Structural colors
- Canvas settings

### Center - Preview/JSON View
- **Preview Mode**: Live Power BI report showing your theme
- **JSON Mode**: Real-time JSON output with syntax highlighting

### Right Panel - Visual Styles
- Per-visual customization
- Style variants management
- Visual-specific properties

### Header Controls
- **Back Button**: Return to themes list (prompts if unsaved changes)
- **Theme Name/Description**: Click to edit
- **View Toggle**: Switch between Preview and JSON
- **Import**: Load existing themes
- **Export**: Download your theme
- **Reset**: Revert unsaved changes
- **Save**: Save to cloud

---

## Theme Foundation

The Foundation panel contains core theme settings that affect all visuals.

### Accessing Foundation Settings

1. Look for the **Foundation** panel on the left (collapsible)
2. Click sections to expand/collapse
3. Blue dots indicate changed properties

### Foundation Sections

- **Palettes**: Color and neutral palette selection
- **Typography**: Font settings
- **Structural Colors**: UI colors
- **Text Classes**: Specific text element styling
- **Canvas Layout**: Report canvas settings

---

## Color Palette Management

Color palettes define the data colors used in your visualizations.

### What Are Color Palettes?

Color palettes are sets of colors (up to 20) that Power BI uses for:
- Chart series
- Data points
- Legend items
- Conditional formatting

### Managing Color Palettes

1. In Foundation panel, find **"Color Palette"** section
2. Click **"Manage Palettes"** button
3. The Palette Manager opens with three tabs:
   - **My Palettes**: Your custom palettes
   - **Trending**: Popular community palettes
   - **Organization**: Team-shared palettes

### Creating a Custom Palette

1. Click **"+ New palette"** in Palette Manager
2. Enter a name and optional description
3. Add colors by:
   - Clicking **"+ Add"** button
   - Using the color picker
   - Entering hex values
4. Reorder colors by dragging
5. Click **"Create"** to save

### Importing from Coolors.co

1. Go to [Coolors.co](https://coolors.co) and create a palette
2. Copy the URL (e.g., `https://coolors.co/palette/264653-2a9d8f-e9c46a`)
3. In Palette Editor, paste URL in import field
4. Click **"Import"**
5. Colors are automatically added

### Using a Palette

1. In Palette Manager, click any palette to select it
2. Selected palette shows a checkmark
3. Click outside to close - palette is now applied

### Editing Palettes

1. Hover over a palette in the manager
2. Click the **Edit** (pencil) icon
3. Modify colors, name, or description
4. Click **"Save"**

### Pro Tips
- Use 5-8 colors for most reports
- Ensure sufficient contrast between colors
- Test with colorblind simulation tools
- Save brand colors as a custom palette

---

## Neutral Palette System

Neutral palettes provide consistent grayscale colors for UI elements.

### What Are Neutral Palettes?

Neutral palettes are 12-shade grayscale systems (25-950) used for:
- Backgrounds and surfaces
- Borders and dividers
- Text colors
- Shadows and overlays

### Creating a Neutral Palette

1. Click **"Manage Palettes"** in Neutral Palette section
2. Click **"+ New palette"**
3. Enter a name
4. Set a base color (usually a mid-gray like #6B7280)
5. Click **"Generate Scale"**
6. AI generates a complete 12-shade palette
7. Click **"Create"** to save

### Understanding Shade Numbers

- **25-100**: Light backgrounds, subtle borders
- **200-400**: Dividers, disabled states
- **500-600**: Base colors, secondary text
- **700-900**: Primary text, strong borders
- **950**: Near black, highest contrast

### Using Neutral Palettes

1. Select from Palette Manager
2. Theme automatically maps shades to appropriate elements
3. Ensures consistent grayscale across your report

### Pro Tips
- Start with built-in palettes for consistency
- Warm grays (slight red/yellow) feel friendlier
- Cool grays (slight blue) feel more professional
- Test in both light and dark modes

---

## Typography & Text Styling

Control fonts and text appearance throughout your reports.

### Font Family

1. In Foundation > Typography section
2. Use the **Font Family** dropdown
3. Select from available fonts:
   - System fonts (Arial, Calibri, etc.)
   - Web fonts (if configured)
4. Changes apply to all text elements

### Text Classes

Power BI has specific text element types you can style:

1. **Title**: Report and page titles
2. **Label**: Axis labels, data labels
3. **Callout Value**: Card visual values

For each text class:
- Set font size (px)
- Choose font weight
- Configure color (inherits from structural colors)

### Structural Colors for Text

In **Structural Colors** section:
- **Foreground**: Primary text color
- **Foreground Neutral Secondary**: Secondary/subtle text
- These automatically apply to appropriate text elements

### Pro Tips
- Maintain hierarchy: Titles > Labels > Values
- Use consistent font weights
- Ensure text contrast meets accessibility standards
- Test readability at different zoom levels

---

## Light/Dark Mode

Create themes that work in both light and dark environments.

### Understanding Theme Modes

- **Light Mode**: Dark text on light backgrounds
- **Dark Mode**: Light text on dark backgrounds
- Colors automatically adjust based on mode

### Toggling Theme Mode

1. In Foundation panel, find **"Theme Mode"** toggle
2. Click to switch between Light/Dark
3. Watch colors update in real-time
4. Preview shows the active mode

### How It Works

When you switch modes:
- Structural colors invert appropriately
- Neutral palette usage adjusts
- Text maintains readability
- Data colors may shift for contrast

### Customizing for Each Mode

Some properties have mode-specific values:
1. Set values in light mode
2. Switch to dark mode
3. Adjust values that don't work well
4. Theme remembers both sets

### Pro Tips
- Design in light mode first
- Test all visuals in both modes
- Ensure sufficient contrast in both
- Consider ambient lighting where reports are viewed

---

## Visual Styles & Variants

The most powerful feature - create multiple style variations for each visual type.

### What Are Style Variants?

Style variants let you create different looks for the same visual type:
- **Default**: Standard appearance
- **Emphasis**: Bold, attention-grabbing
- **Subtle**: Muted, supporting role
- **Custom**: Any style you define

### Accessing Visual Styles

1. Click **Visual Styles** panel on the right
2. Select a visual type from the dropdown
3. Current variant shows in the variant selector

### Creating a Style Variant

1. Select a visual type (e.g., "Column Chart")
2. Click **"Create"** button in the Variant Manager
3. Enter a variant name (e.g., "emphasis", "minimal")
4. Click **"Create Variant"**
5. New variant is created and selected

### Customizing Variants

With a variant selected:
1. Expand property sections (General, Title, etc.)
2. Modify any property
3. Changes apply only to this variant
4. Blue dots indicate modified properties

### Duplicating Variants

1. Select the variant to copy
2. Click **Copy** (duplicate) icon
3. Enter name for the new variant
4. Variant is created with all settings copied

### Deleting Variants

1. Select the variant (cannot delete default "*")
2. Click **Delete** (trash) icon
3. Confirm deletion
4. Theme reverts to default variant

### Using Variants in Power BI

When you apply the theme in Power BI:
1. Right-click any visual
2. Select Format > Style Presets
3. Choose from your created variants
4. Visual updates to use that variant's styling

### Variant Properties

Each variant can customize:
- **General**: Background, border, shadow
- **Title**: Font, size, color, alignment
- **Data Colors**: Override palette colors
- **Data Labels**: Size, font, position
- **Category/Value Axis**: Gridlines, labels, title
- **Legend**: Position, style, text
- **Visual-specific**: Properties unique to that visual type

### Pro Tips
- Create consistent variant names across visuals
- Use "emphasis" for KPIs and important metrics
- Use "subtle" for supporting information
- Test variants with real data
- Document variant purposes for team members

---

## Real-Time Preview

See your theme changes instantly without leaving the studio.

### Understanding the Preview

- Shows actual Power BI report
- Updates within 1-2 seconds of changes
- Fully interactive (hover, tooltips work)
- Multiple sample reports available

### Preview Controls

Above the preview:
- **Report Selector**: Switch between sample reports
- **Refresh**: Force preview update
- **Full Screen**: Expand preview

### Testing Focus Mode

1. Hover over any visual in the preview
2. Click the **Focus** icon that appears
3. Visual expands to focus mode
4. Test your theme in this view
5. Click outside to exit focus mode

### Visual Selection Sync

1. Click any visual in the preview
2. Visual Styles panel automatically shows that visual type
3. Make changes to see them immediately
4. Selecting variants updates the focused visual

### Preview Tips
- Test with different data densities
- Check all visual types in your theme
- Verify text readability
- Test interactive states (hover, selection)
- Try focus mode for all key visuals

---

## Importing Themes

Enhance existing themes with Power UI's advanced features.

### Import Methods

1. Click **Import** in the header
2. Choose method:
   - **Drag & Drop**: Drag .json file to the drop zone
   - **Browse**: Click to select file
   - **Paste JSON**: Copy/paste theme JSON

### What Happens During Import

1. Theme validates for compatibility
2. Existing properties are preserved
3. Power UI features become available:
   - Style variants
   - Advanced customization
   - Palette management
4. Theme name extracted or uses filename

### Enhancing Imported Themes

After import:
1. Add style variants to existing visuals
2. Create proper color/neutral palettes
3. Fine-tune with visual controls
4. Add missing visual types
5. Save enhanced version

### Import Validation

If import fails:
- Check JSON validity
- Ensure it's a Power BI theme file
- Remove any invalid properties
- Try pasting JSON directly

### Pro Tips
- Always import before starting from scratch
- Preserve original theme as backup
- Test imported theme before modifying
- Document what you've enhanced

---

## Sharing & Collaboration

Share themes with the community or collaborate with your team.

### Visibility Options

Themes have three visibility levels:

1. **Private** (Lock icon)
   - Only visible to you
   - Default for new themes
   
2. **Public** (Globe icon)
   - Visible to all Power UI users
   - Appears in public gallery
   - Others can copy but not edit

3. **Organization** (Users icon)
   - Shared with organization members
   - Requires organization account
   - Team members can view/copy

### Changing Visibility

1. Open your theme in Theme Studio
2. Find sharing dropdown in header (shows current visibility)
3. Select new visibility level
4. Confirm change
5. Theme URL remains the same

### Public Gallery

Browse community themes:
1. Go to Themes page
2. Click **"Browse Gallery"** tab
3. Filter by:
   - Most recent
   - Most popular
   - Categories
4. Preview themes before copying

### Organization Sharing

For team accounts:
1. Set visibility to "Organization"
2. All team members see it in their list
3. Maintains single source of truth
4. Track who's using themes

### Copying Shared Themes

1. Find theme in gallery or shared list
2. Click **"Use Theme"** or **"Make a Copy"**
3. Creates your own editable version
4. Original remains unchanged

### Pro Tips
- Add good descriptions for public themes
- Include variant documentation
- Credit original authors when enhancing
- Use organization themes for brand consistency

---

## JSON View & Editing

For developers and advanced users who need precise control.

### Accessing JSON View

1. Click **"JSON"** toggle in header
2. View switches from preview to code
3. Shows real-time generated JSON
4. Syntax highlighting for readability

### JSON View Features

- **Real-time Updates**: Changes in UI reflect immediately
- **Syntax Highlighting**: Color-coded for clarity
- **Line Numbers**: Easy reference
- **Copy Button**: Copy entire JSON
- **Search**: Find specific properties (Ctrl/Cmd+F)

### Direct JSON Editing

1. Click **"Edit JSON"** button
2. Editor becomes editable
3. Make changes directly
4. Click **"Apply Changes"**
5. UI updates to match JSON

### JSON Structure

```json
{
  "name": "My Theme",
  "dataColors": ["#264653", "#2a9d8f"],
  "background": "#FFFFFF",
  "foreground": "#000000",
  "tableAccent": "#2a9d8f",
  "visualStyles": {
    "columnChart": {
      "*": {
        "general": [{
          "responsive": true
        }]
      }
    }
  }
}
```

### Common JSON Tasks

- Copy specific visual styles
- Bulk find/replace colors
- Add properties not in UI
- Debug theme issues
- Version control integration

### Pro Tips
- Validate JSON before applying
- Keep formatting consistent
- Comment complex sections
- Use JSON view for bulk operations
- Export regularly for backups

---

## Saving & Exporting

Preserve your work and use themes in Power BI.

### Saving Themes

#### Auto-Save Indicators
- Blue dot appears next to changed properties
- Header shows "X unsaved changes"
- Changes persist in browser temporarily

#### Manual Save
1. Click **Save** button in header
2. Theme saves to cloud
3. Unique URL generated (first save)
4. Save button shows "Saving..." then check mark

#### What Gets Saved
- All theme properties
- Style variants
- Metadata (name, description)
- Sharing settings
- Version timestamp

### Exporting Themes

1. Click **Export** button in header
2. File downloads as `[theme-name]-theme.json`
3. Ready to use in Power BI Desktop/Service

### Using Exported Themes

In Power BI Desktop:
1. View tab > Themes dropdown
2. Select "Browse for themes"
3. Choose your exported .json file
4. Theme applies immediately

In Power BI Service:
1. Not directly supported
2. Apply theme in Desktop first
3. Publish report with theme

### Export Best Practices
- Export after major changes
- Use descriptive filenames
- Include version in filename
- Store in version control
- Document variant usage

---

## Keyboard Shortcuts

Speed up your workflow with keyboard shortcuts.

### Global Shortcuts
- **Ctrl/Cmd + S**: Save theme
- **Ctrl/Cmd + Z**: Undo last change
- **Ctrl/Cmd + Shift + Z**: Redo
- **Ctrl/Cmd + D**: Download/Export theme
- **Escape**: Close dialogs/modals

### Navigation
- **Tab**: Move between inputs
- **Shift + Tab**: Move backwards
- **Arrow Keys**: Navigate dropdowns
- **Enter**: Confirm selection

### Panel Controls
- **Ctrl/Cmd + 1**: Toggle Foundation panel
- **Ctrl/Cmd + 2**: Toggle Preview/JSON
- **Ctrl/Cmd + 3**: Toggle Visual Styles

### Preview Shortcuts
- **P**: Toggle preview/JSON view
- **F**: Enter focus mode (when visual selected)
- **R**: Refresh preview

### Pro Shortcuts
- **Ctrl/Cmd + Shift + C**: Copy current color
- **Ctrl/Cmd + Shift + V**: Paste color
- **Ctrl/Cmd + /**: Show shortcuts help

---

## Pro Tips & Best Practices

### Design Principles

1. **Consistency First**
   - Use same margins/padding throughout
   - Consistent color usage
   - Uniform text hierarchy

2. **Less Is More**
   - Limit to 5-8 data colors
   - Use variants sparingly
   - Avoid over-styling

3. **Accessibility**
   - Test contrast ratios
   - Avoid color-only information
   - Ensure text readability

### Workflow Tips

1. **Start with Structure**
   - Set neutral palette first
   - Define typography
   - Then customize visuals

2. **Use Templates**
   - Start from existing themes
   - Create base themes for projects
   - Share team templates

3. **Test Thoroughly**
   - All visual types
   - Different data scenarios
   - Both theme modes
   - Various screen sizes

### Performance

1. **Optimize Variants**
   - Only create needed variants
   - Reuse where possible
   - Document usage

2. **Clean JSON**
   - Remove unused properties
   - Avoid duplication
   - Keep file size reasonable

### Team Collaboration

1. **Naming Conventions**
   - Consistent variant names
   - Descriptive theme names
   - Version in description

2. **Documentation**
   - Document variant purposes
   - Note color meanings
   - Include usage guidelines

3. **Review Process**
   - Test before sharing
   - Get team feedback
   - Version major changes

### Common Pitfalls to Avoid

1. **Over-customization**
   - Don't style every property
   - Keep defaults where sensible
   - Focus on impactful changes

2. **Ignoring Context**
   - Consider where reports are viewed
   - Test on target screens
   - Account for printing

3. **Breaking Conventions**
   - Respect Power BI patterns
   - Don't hide essential elements
   - Maintain usability

### Advanced Techniques

1. **Batch Operations**
   - Use JSON view for bulk changes
   - Find/replace colors
   - Copy sections between themes

2. **Variant Strategy**
   - "default": Standard reporting
   - "emphasis": KPIs, alerts
   - "subtle": Supporting visuals
   - "print": Print-optimized

3. **Color Psychology**
   - Blues: Trust, stability
   - Greens: Growth, positive
   - Reds: Urgency, negative
   - Grays: Neutral, professional

---

## Troubleshooting

### Preview Not Updating
- Click refresh button
- Check browser console for errors
- Try switching view modes
- Clear browser cache

### Import Failures
- Validate JSON structure
- Remove custom properties
- Check file encoding (UTF-8)
- Try paste method instead

### Saving Issues
- Check internet connection
- Verify you're logged in
- Try manual save
- Export as backup

### Performance Problems
- Reduce variant count
- Simplify complex themes
- Use newer browser
- Close other tabs

---

## Getting Support

- **Documentation**: You're reading it!
- **Community Forum**: Share tips and get help
- **GitHub Issues**: Report bugs
- **Email Support**: For account issues

---

*Happy theming! Transform your Power BI reports with Power UI Theme Studio.*