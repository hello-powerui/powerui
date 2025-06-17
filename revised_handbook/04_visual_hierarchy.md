# Visual hierarchy and organization

## Learning objectives

By the end of this chapter, you will understand:
- How typography creates clear information hierarchy
- Effective organization and labeling strategies for visuals
- Methods for structuring dashboard content logically
- Techniques for managing data freshness and context

## Typography fundamentals

Typography might be the most overlooked aspect of Power BI report design. Yet it plays a crucial role in shaping how users perceive and interact with your data. The right font choices and consistent use of font weights improve readability, create visual hierarchy, and enhance the overall user experience.

### Font application in Power BI

Fonts in Power BI can be applied in two ways:
1. **Theme file specification:** Custom font and weight for specific components
2. **Default font selection:** Using Power BI's built-in font list and weights

When you specify a custom font in a theme file, it only applies to components defined in that theme. It won't appear in Power BI's font dropdown for other elements.

### Default font combinations

When you create a new Power BI report, the default theme combines Segoe UI and DIN fonts:
- **Segoe UI:** Most components including text boxes and labels
- **DIN:** KPI card values, axis labels, slicer headers, and axis titles

For a more cohesive design, choose one font family and use it consistently throughout your report. This approach unifies the overall look, makes your design more recognizable, and simplifies font management.

### Font selection criteria

When selecting fonts for Power BI reports, consider these factors:

**Font weights:** Choose fonts with five or more weights for maximum flexibility. This allows you to create clear hierarchy through weight variations.

**Sans-serif preference:** Sans-serif fonts offer clean, modern appearance and excellent readability across different screen sizes.

**Web-safe options:** Ensure fonts display correctly on all operating systems by choosing web-safe options.

### Recommended font choices

**Segoe UI (Preferred)**
Hands-down the best choice for most dashboards. Benefits include:
- Sans-serif design for modern appearance
- Six available weights for hierarchy flexibility
- Excellent screen readability
- Native Power BI integration

**Arial (Web-safe alternative)**
The clear choice for web-safe dashboards, despite having only three weights available:
- Universal availability across operating systems
- Reliable rendering on all devices
- Professional appearance

**Custom fonts (Use sparingly)**
Only recommended when IT teams control font installation across all devices. Users must have the same fonts installed for consistent display. For professional, cohesive design, stick with built-in or web-safe fonts.

### Font sizing systems

Power BI uses a point-based system (pt) similar to Microsoft Office applications. However, most web designers use pixels (px). Since Power BI uses pixels for other sizing, it's helpful to understand the conversion:

**Key sizing guidelines:**
- **16px (12pt):** Default minimum font size for accessibility
- **12px (9pt):** Smallest size that should be used
- **24px (18pt):** Appropriate size for dashboard titles

Web Content Accessibility Guidelines (WCAG) recommend at least 16px as a starting point for text. This enhances readability and improves user experience.

### Creating hierarchy through typography

**Larger, bolder fonts** draw attention. Use them for:
- Dashboard titles
- Section headings
- Key metrics that need emphasis

**Smaller, lighter fonts** work best for:
- Axis titles and labels
- Subtitles and supporting information
- Detailed explanatory text

This balance ensures clear visual hierarchy. It keeps your layout organized and your primary data prominent.

### Font sizing system implementation

Using a consistent font sizing system reduces decision fatigue. Define these sizes in a theme file to bring consistency across your organization:

**Example sizing scale:**
- H1 (Dashboard title): 24px (18pt)
- H2 (Section headers): 20px (15pt)
- H3 (Subsection headers): 16px (12pt)
- Body text: 14px (11pt)
- Small text: 12px (9pt)

Apply these consistently across various elements like headings, subheadings, and body text. This creates visual hierarchy and makes content easier to scan and comprehend.

## Visual elements and organization

Clear organization extends beyond typography to include how you structure and label all visual elements.

### Data organization and naming

Clarity isn't just about design—it's about how you label and organize your data. Pay close attention to naming tables and fields with human-readable labels.

**Avoid technical naming conventions:**
- Bad: "Sum of ttl_sale_rev by dim_date_id"
- Good: "Total Sales Revenue by Date"

**Use familiar terminology:**
If a metric is commonly called "headcount," don't label it "staffing." Stick to terms your users know. This ensures clarity and consistency across reports.

### Measures and documentation

Always comment and properly format your measures. Comments help you remember logic and intent. They make code accessible to other developers who might work on the report later.

**Formatting tools:**
- **Bravo (by SQLBI):** External tool for formatting all measures at once
- **DAX Formatter (by SQLBI):** Web-based tool for individual measures
- **Tabular Editor:** External tool for bulk measure management and grouping

**Organization strategies:**
Group related measures to maintain clean, logical structure. Group measures that serve similar functions or relate to the same data sets. This makes them easier to manage, navigate, and update.

**Formatting benefits:**
Proper measure formatting improves readability by adding:
- Commas for large numbers
- Currency symbols where appropriate
- Percentage formatting
- Consistent decimal places

This prevents misinterpretation and ensures professional presentation.

### Titles and labels

**Dashboard titles** should be subtle yet descriptive. They should clearly indicate the report's focus without overwhelming the user. A dashboard title doesn't need to be huge or use the boldest font. It's not the main focus of the dashboard. Aim for around 24px (18pt).

**Subtitles** can provide additional context, such as time frames or specific metrics covered. This combination allows users to immediately understand the report's purpose while keeping the visual design clean and professional.

**Visual titles** should clearly convey what each visual represents. Make it easy for users to understand the data with minimal effort. If you've used human-friendly names for measures and fields in your model, default visual titles will automatically reflect meaningful information.

**Axis titles and labels** should derive from well-named fields in your model. Avoid leaving users guessing about what fields represent. Most users aren't database administrators familiar with technical field names.

Clear, intuitive titles improve the overall user experience. They reduce cognitive load on your audience, allowing them to focus on insights rather than decoding labels.

## Dynamic visuals and icons

### SVG and dynamic content

SVG images give Power BI users incredible flexibility for creating dynamic visuals that update with data. Using DAX measures and variables, you can create nearly any visual from progress bars to star ratings.

If you're unfamiliar with XML code for SVG visuals, tools like Power UI GPT can help. These tools take plain English descriptions and generate SVG code embedded in DAX measures ready for Power BI.

### Icon usage best practices

Effective icon usage enhances both visual appeal and usability. Icons make complex ideas easier to understand at a glance. They can represent:
- Actions users can take
- Data categories or types
- Status indicators (completion, warnings, errors)

**Common icon problems:**
- Inconsistent styles from pulling icons from various sources
- Oversized icons that overpower content
- Icons that don't align with overall design

**Icon consistency guidelines:**
- Stick to cohesive style, size, and color scheme
- Ensure icons complement rather than overpower data visualizations
- Use scalable, high-quality icons for all devices
- Maintain consistent sizing and positioning

**Technical considerations:**
SVG images scale infinitely without quality loss. They're ideal for dynamic fields where you reference image URLs or measures. However, Power BI doesn't support importing SVGs directly to the canvas. Use PNGs or default Power BI shapes for static canvas icons.

## Grouping and labeling

Organize visuals logically to create clear structure. This enhances both report maintenance and user navigation.

### Visual grouping strategies

Group related visuals in the Selection Pane. This practice:
- Keeps reports organized for developers
- Clarifies purpose for users
- Simplifies managing states and visibility with bookmarks
- Makes applying consistent adjustments easier

**Grouping approaches:**
- By business function (Sales, Marketing, Operations)
- By data source or time period
- By user workflow or decision process
- By level of detail (summary vs. detailed views)

### Context and modals

When reports require extensive context or detailed information, consider using modals. Modals help keep your main canvas clean and uncluttered. Users can focus on data without being overwhelmed by additional details.

**Good uses for modals:**
- Complex business logic explanations
- Data refresh schedules and processes
- Data source documentation
- Detailed methodology or calculation explanations

This approach provides easy access to important information without sacrificing the simplicity and usability of your report's main interface.

## Data freshness and transparency

### Communicating data currency

If your report doesn't provide real-time data, make refresh dates clear and visible. Users need to know:
- When data was last updated
- Where data comes from
- How current the information is

Display this information prominently. This ensures users can accurately interpret data and avoid misconceptions about timeliness or relevance.

### Dataset vs. data refresh timing

Differentiate between Power BI dataset refresh time and actual data refresh date. Power BI shows when the dataset was last refreshed, but this doesn't always reflect true data freshness.

**Example scenario:** A file processes through a data flow daily, but the latest file hasn't been received. The dataset might still refresh on schedule, misleading users into thinking data is current.

**Solution:** Include visuals that clearly display latest data availability based on real-world updates. This ensures users have accurate understanding of data timeliness and prevents potential misinterpretations.

### Date context clarity

Date slicers can be confusing. Clearly reiterate which dates are currently in view. Validate that your DAX formulas accurately reflect selected date ranges.

If you have default date filters applied in the Filter Pane (where users are less likely to look), bring the active dates onto the canvas. This ensures users understand the time period they're analyzing.

## Summary

Visual hierarchy creates the structure that guides users through your dashboard effectively. Typography establishes clear information levels and improves readability. Proper organization and labeling reduce cognitive load and prevent confusion. Transparency about data freshness builds trust with your audience.

**Key takeaways:**
- Use typography systematically to create clear information hierarchy
- Choose appropriate fonts and sizing for your audience and context
- Organize and label data with human-readable, familiar terminology
- Group related visuals logically for better navigation and maintenance
- Communicate data freshness and context clearly to build user trust
- Consider modals for complex information that would clutter the main view

In the next chapter, we'll explore how color and visual polish can enhance your well-organized foundation to create truly professional dashboards.