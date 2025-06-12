Here's the content formatted in markdown:

# Set Structural Colors

Next, you can add various color classes, such as `background` and `firstLevelElements`. These color classes set the structural colors for elements in the report, such as axis gridlines, highlight colors, and background colors for visual elements.

The following table shows the six color classes you can format. The **Color class** names correspond to the names in the "Advanced" subsection of the "Name and Colors" section in the **Customize theme** dialog box.

## Color Classes

| Color class preferred name | Also called | What it formats |
|----------------------------|-------------|-----------------|
| **firstLevelElements** | foreground | Label background color (when outside data points), Trend line color, Textbox default color, Table and matrix values and totals font colors, Data bars axis color, Card data labels, Gauge callout value color, KPI goal color, KPI text color, Slicer item color (when in focus mode), Slicer dropdown item font color, Slicer numeric input font color, Slicer header font color, Scatter chart ratio line color, Line chart forecast line color, Map leader line color, Filter pane and card text color, Modern visual tooltips text and icon color (Preview) |
| **secondLevelElements** | foregroundNeutralSecondary | Light secondary text classes, Label colors, Legend label color, Axis label color, Table and matrix header font color, Gauge target and target leader line color, KPI trend axis color, Slicer slider color, Slicer item font color, Slicer outline color, Line chart hover color, Multi-row card title color, Ribbon chart stroke color, Shape map border color, Button text font color, Button icon line color, Button outline color |
| **thirdLevelElements** | backgroundLight | Axis gridline color, Table and matrix grid color, Slicer header background color (when in focus mode), Multi-row card outline color, Shape fill color, Gauge arc background color, Applied filter card background color, Disabled button fill color (when the background is `FFFFFF`), Disabled button outline color (when the background is `FFFFFF`) |
| **fourthLevelElements** | foregroundNeutralTertiary | Legend dimmed color, Card category label color, Multi-row card category labels color, Multi-row card bar color, Funnel chart conversion rate stroke color, Disabled button text font color, Disabled button icon line color |
| **background** |  | Label background color (when inside data points), Slicer dropdown items background color, Donut chart stroke color, Treemap stroke color, Combo chart background color, Button fill color, Filter pane and available filter card background color, Modern visual tooltips background color (Preview) |
| **secondaryBackground** | backgroundNeutral | Table and matrix grid outline color, Shape map default color, Ribbon chart ribbon fill color (when match series option is turned off), Disabled button fill color (when the background color isn't `FFFFFF`), Disabled button outline color (when the background color isn't `FFFFFF`), Modern visual tooltips separator line and hover color (Preview) |
| **tableAccent** |  | Table and matrix grid outline color (when present) |

## Sample Theme

Here's a sample theme that sets the color classes:

```json
{
    "name": "Custom Theme",
    "firstLevelElements": "#252423",
    "secondLevelElements": "#605E5C",
    "thirdLevelElements": "#F3F2F1",
    "fourthLevelElements": "#B3B0AD",
    "background": "#FFFFFF",
    "secondaryBackground": "#C8C6C4",
    "tableAccent": "#118DFF"
}
```

## Tip

If you use a dark theme or other colorful theme that diverges from the typical black `firstLevelElements` on white `background` style, set the values for other structural colors and the **primary text class colors**. This ensures that data labels on charts with a label background match the anticipated style, are readable, and have visible axis gridlines.