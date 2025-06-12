Here's the content formatted in markdown:

# Text Classes and Settings

| Primary class | Secondary classes | JSON class name | Default settings | Associated visual objects |
|---------------|-------------------|-----------------|------------------|---------------------------|
| Callout | N/A | callout | DIN #252423 45 pt | Card data labels, KPI indicators |
| Header | N/A | header | Segoe UI Semibold #252423 12 pt | Key influencers headers |
| Title | | title | DIN #252423 12 pt | Category axis title, Value axis title, Multi-row card title* |
| | | | | Slicer header |
| Large title | | largeTitle | | 14 pt |
| | | | | Visual title |
| Label | | label | Segoe UI #252423 10 pt | Table and matrix column headers, Matrix row headers, Table and matrix grid, Table and matrix values |
| | Semibold | semiboldLabel | Segoe UI Semibold | Key influencers profile text |
| | Large | largeLabel | | 12 pt |
| | | | | Multi-row card data labels |
| | Small | smallLabel | | 9 pt |
| | | | | Reference line labels*, Slicer date range labels, Slicer numeric input text style, Slicer search box, Key influencers influencer text |
| | Light | lightLabel | #605E5C | Legend text, Button text, Category Axis labels, Funnel chart data labels, Funnel chart conversion rate labels, Gauge target, Scatter chart category label, Slicer items |
| | Bold | boldLabel | Segoe UI Bold | Matrix subtotals, Matrix grand totals, Table totals |
| | Large and Light | largeLightLabel | #605E5C 12 pt | Card category labels, Gauge labels, Multi-row card category labels |
| | Small and Light | smallLightLabel | #605E5C 9 pt | Data labels, Value axis labels |

**Note:** Starred items are based on the first data color of the report theme.

## Bold Text Settings

You can use the `bold` Boolean setting to adjust the format. To make the text bold, use the following settings:

* `bold`: true
* `titleBold`: true

## Tip

The *light* variations of text classes take their light color from the **structural colors** defined earlier. If you're authoring a `dark theme`, set the color's `firstLevelElements` (matching the primary text color), `secondLevelElements` (matching the anticipated light color for text), and `background` (with sufficient contrast to both first- and second-level elements colors).