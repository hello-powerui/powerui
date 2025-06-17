# Planning and foundation setup

## Learning objectives

By the end of this chapter, you will understand:
- How to plan your dashboard structure before building
- Canvas sizing options and when to use each
- Grid systems for consistent alignment and spacing
- How spacing creates professional, readable layouts

## Dashboard planning and wireframing

Before placing any visuals in Power BI, successful designers create a plan. This planning phase prevents costly revisions and ensures your dashboard serves its intended purpose.

### Information architecture

Start by organizing your information logically. Group related metrics together. Establish a clear hierarchy of importance. Consider how users will scan and navigate your content.

**Steps for planning:**
1. List all required metrics and dimensions
2. Group related information into logical sections
3. Prioritize information by business importance
4. Sketch potential layouts on paper or whiteboard
5. Consider user workflow and scanning patterns

### Wireframing basics

A wireframe is a simple sketch showing where elements will be placed. It focuses on structure rather than visual design. This prevents you from getting distracted by colors and fonts before solving the fundamental layout challenges.

**Wireframe elements to include:**
- Title and header information
- Major section divisions
- Key metrics and KPIs
- Charts and visualizations (as labeled boxes)
- Navigation elements
- Footer information

**Tools for wireframing:**
- Pen and paper (fastest for initial concepts)
- PowerPoint or Google Slides (good for sharing)
- Specialized tools like Figma or Sketch (if available)
- Even Power BI shapes can work for basic wireframes

## Canvas sizing fundamentals

In Power BI, the canvas is where all your visuals come together to form your dashboard. This makes canvas sizing one of your first important decisions. Unlike responsive web design, Power BI uses fixed canvas dimensions. This means you must be deliberate about selecting the report canvas size.

### Standard canvas sizes

**1280x720px (Default)**
This size works well for dashboards and presentations. It scales nicely on televisions and in PowerPoint presentations. Choose this size when:
- Presenting on large screens or projectors
- Embedding in PowerPoint presentations
- Creating executive dashboards for conference rooms

**1440x1080px (Recommended)**
This size offers more space for complex reports. Most web designers start with this dimension when building web dashboards. Choose this size when:
- Building detailed operational dashboards
- Including multiple visualizations
- Designing for desktop computer viewing
- Creating reports with extensive filtering options

### Choosing your canvas size

Select a size that strikes a balance between visual clarity and usability. Be consistent across your reports. Consider the resolution of your audience's most common viewing device.

**Recommendation:** Start with 1440x1080px and adjust as needed. Always maintain a 16:9 or 4:3 aspect ratio for the best compatibility across devices.

### Page view settings

Power BI offers three ways to scale content based on window size. Choose the setting that best suits your audience and their viewing devices:

**Actual size**
Shows the report at its designed dimensions. Best for development and precise control over appearance.

**Fit to page**
Scales the entire report to fit within the browser window. Good for varying screen sizes but may make text too small.

**Fit to width**
Scales the report width to match the browser while maintaining aspect ratio. Users may need to scroll vertically.

**Recommendation:** Develop in Actual size, then use Fit to page or Fit to width when publishing based on your content length.

## Grid systems for alignment

Before placing any visuals, set up a grid to guide alignment and spacing. Proper alignment is fundamental to creating polished, professional-looking reports. Misaligned visuals make dashboards appear cluttered and disorganized. Well-aligned elements bring balance and structure.

### Power BI's default grid

The default Power BI grid consists of 96x96px squares. These remain fixed regardless of canvas size. While it doesn't scale with canvas changes, it provides a simple way to introduce structure and consistency.

**Grid navigation shortcuts:**
- Arrow keys: Move visuals by 8px (16px when zoomed out)
- Shift + Arrow keys: Move by 96px
- Without "Snap to Grid": Arrow keys move by 1px, Shift + Arrow by 10px

### Custom column grids

The default grid lacks functionality that web designers typically use. A column grid helps apply spacing more consistently and ensures sufficient whitespace throughout your dashboard.

**Grid system components:**
- **Columns:** Vertical divisions that organize and align content
- **Margins:** Spaces on outer edges providing breathing room
- **Gutters:** Spaces between columns preventing crowded visuals

### Recommended grid setup

For a 1440px width report, use:
- **Margins:** 80px on each side
- **Gutters:** 26px between columns  
- **Column width:** Approximately 83px each
- **Content area:** 1,280px (after subtracting margins)

This setup provides ample spacing while maintaining clean, organized layouts. It ensures readability and smooth visual flow across your report.

### Creating grids in Power BI

You can create custom grids using basic rectangle shapes:

1. Insert rectangle shapes to mark column boundaries
2. Set consistent spacing measurements
3. Group grid elements in the Selection Pane
4. Toggle grid visibility on/off while developing
5. Hide the grid before publishing

**Important:** Use grids as guides, not rigid rules. Flexibility allows for creative adjustments while maintaining consistency and structure.

## Spacing and rhythm principles

Grid systems help with alignment across the page. Managing spacing within your visuals is equally important. This is where padding and rhythm come into play.

### Padding consistency

Padding ensures your content has enough breathing room. It prevents visuals from feeling cramped while improving readability. Different visuals have varying default padding, so set consistent padding (such as 16px on all sides) throughout your report.

**Benefits of consistent padding:**
- Prevents cluttered or disjointed appearance
- Establishes clear visual hierarchy
- Guides viewer attention smoothly across the report
- Makes data easier to interpret and compare
- Streamlines the design process

### Horizontal and vertical rhythm

Many report authors place visuals with little concern for layout or hierarchy. This makes reports feel chaotic and difficult to follow. Improve your layout by using consistent horizontal and vertical rhythm.

**Horizontal rhythm** refers to aligning visuals along a row with equal spacing between them. This creates balance across the canvas.

**Vertical rhythm** ensures consistent spacing between rows of visuals. This prevents visuals from feeling cramped or uneven.

Together, these create a grid-like structure that promotes clarity and readability.

### Managing spacing manually

Power BI doesn't have auto-layout options like CSS. You must manually manage alignment and spacing. Use shapes with pre-defined sizes to maintain consistent spacing throughout your design.

**Spacing management tips:**
- Create "spacer" rectangles with standard measurements
- Use the Selection Pane to organize spacing elements
- Document your spacing standards for team consistency
- Test spacing on different screen sizes
- Consider touch targets for mobile users

## Foundation summary

Canvas sizing, grid systems, and consistent padding form the foundation of well-structured, visually appealing reports. When these elements work together, your dashboard looks clean and professional while becoming easier to navigate.

Proper spacing within and between visuals creates order. This makes data more accessible and reduces clutter. Setting up these design fundamentals early streamlines the report-building process. You can focus more on content and insights rather than layout adjustments.

**Key foundation principles:**
- Plan your information architecture before building
- Choose appropriate canvas sizes for your audience
- Use grid systems to guide alignment decisions
- Apply consistent padding and spacing throughout
- Create rhythm through horizontal and vertical alignment

You don't need every detail perfect before starting. These elements provide a flexible framework that can evolve as your report takes shape. Start with good structure. This allows for experimentation and adjustments without losing consistency.

As you progress, refine the layout and spacing to match your data's flow. Balance creativity with functionality for the best user experience.

## Summary

Strong foundations enable effective dashboard design. Planning your information architecture and establishing consistent spacing creates the structure needed for professional results. Your users will appreciate the clarity and ease of navigation that good foundations provide.

**Key takeaways:**
- Always wireframe before building to organize information logically
- Choose canvas sizes based on your audience's primary viewing context
- Use grid systems to ensure consistent alignment and professional appearance
- Apply consistent padding and spacing to create visual rhythm
- Remember that foundations can evolve—start with structure and refine as needed

In the next chapter, we'll build on these foundations by creating clear visual hierarchy through typography and organization principles.