import { SchemaProperty } from '../types/schema';

// Helper to format property names
export const formatPropertyName = (name: string): string => {
  const specialCases: Record<string, string> = {
    'solid': 'Solid Color',
    'gradient': 'Gradient',
    'pattern': 'Pattern',
    'fontFamily': 'Font Family',
    'fontSize': 'Font Size',
    'fontColor': 'Font Color',
    'fontWeight': 'Font Weight',
    'backgroundColor': 'Background Color',
    'borderColor': 'Border Color',
    'transparency': 'Transparency',
    'bold': 'Bold',
    'italic': 'Italic',
    'underline': 'Underline',
    // Add more contextual names for common properties
    'titleText': 'Title Text',
    'titleFontSize': 'Title Font Size',
    'titleFontFamily': 'Title Font Family',
    'titleFontColor': 'Title Font Color',
    'show': 'Show',
    'position': 'Position',
    'alignment': 'Alignment',
    'showTitle': 'Show Title',
    'showDataLabel': 'Show Data Label',
    'labelText': 'Label Text',
    'labelFontSize': 'Label Font Size',
    'labelFontFamily': 'Label Font Family',
    'labelColor': 'Label Color',
  };
  
  if (specialCases[name]) {
    return specialCases[name];
  }
  
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
};

// Helper to format group titles from property names
export const formatGroupTitle = (name: string): string => {
  const groupTitles: Record<string, string> = {
    // Visual-specific properties
    'annotationTemplate': 'Annotation Templates',
    'anomalyDetection': 'Anomaly Detection',
    'categoryAxis': 'X Axis',
    'dataPoint': 'Data Colors',
    'error': 'Error Bars',
    'filters': 'Filters',
    'forecast': 'Forecast',
    'labels': 'Data Labels',
    'layout': 'Layout',
    'legend': 'Legend',
    'lineStyles': 'Line Styles',
    'markers': 'Markers',
    'plotArea': 'Plot Area',
    'referenceLine': 'Reference Line',
    'seriesLabels': 'Series Labels',
    'smallMultiplesLayout': 'Small Multiples Layout',
    'subheader': 'Small Multiple Title',
    'trend': 'Trend Line',
    'valueAxis': 'Y Axis',
    'xAxisReferenceLine': 'X-Axis Reference Line',
    'y1AxisReferenceLine': 'Y-Axis Reference Line',
    'y2Axis': 'Secondary Y Axis',
    'zoom': 'Zoom Slider',
    
    // Common properties
    'general': 'General',
    'title': 'Title',
    'subTitle': 'Subtitle',
    'background': 'Background',
    'border': 'Border',
    'padding': 'Padding',
    'visualHeader': 'Visual Header',
    'visualTooltip': 'Tooltip',
    'spacing': 'Spacing',
  };
  
  if (groupTitles[name]) {
    return groupTitles[name];
  }
  
  // If not in special cases, format normally
  return formatPropertyName(name);
};

// Check if a schema is a color property
export const isColorProperty = (schema: SchemaProperty, propertyName?: string): boolean => {
  if (propertyName && propertyName.toLowerCase().includes('color')) {
    return true;
  }
  
  if (schema.title?.toLowerCase().includes('color')) {
    return true;
  }
  
  // Check if it has the structure of a color (solid color object)
  if (
    schema.type === 'object' &&
    schema.properties?.color &&
    schema.properties.color.type === 'string'
  ) {
    return true;
  }
  
  return false;
};

// Check if this is a Power BI visual property section
export const isVisualPropertySection = (schema: SchemaProperty): boolean => {
  return schema.type === 'array' && 
         schema.items?.type === 'object' &&
         schema.items.properties !== undefined &&
         !schema.items.properties.$id; // Exclude state-based arrays
};

// Helper to sort properties with 'show' property first
export const sortPropertiesWithShowFirst = (properties: Record<string, any>): Array<[string, any]> => {
  const entries = Object.entries(properties);
  
  // Sort to put 'show' first, then maintain original order
  return entries.sort(([keyA], [keyB]) => {
    if (keyA === 'show') return -1;
    if (keyB === 'show') return 1;
    return 0;
  });
};

// Check if schema has state support (contains $id property)
export const hasStateSupport = (schema: SchemaProperty): boolean => {
  return schema.type === 'array' && 
         schema.items?.type === 'object' &&
         schema.items.properties?.$id !== undefined;
};

// Get important sections for visual types
export const getImportantSections = (): string[] => {
  return ['dataPoint', 'legend', 'categoryAxis', 'valueAxis', 'labels', 'plotArea'];
};

// Check if property is a percentage
export const isPercentageProperty = (schema: SchemaProperty): boolean => {
  return schema.title?.toLowerCase().includes('transparency') ||
         schema.title?.toLowerCase().includes('percent') ||
         (schema.minimum === 0 && schema.maximum === 100);
};

// Add contextual title for known references
export const getContextualTitle = (schema: SchemaProperty, propertyName: string, path?: string[]): string => {
  // Special case for the "*" property which represents default/wildcard settings
  if (propertyName === '*') {
    return 'Default Settings';
  }
  
  // Check if we're in a visual property section (like legend, labels, etc.)
  const isInVisualSection = path && path.length >= 4 && path[0] === 'visualStyles';
  
  // List of generic titles that should be replaced with property names in sections
  const genericTitles = [
    'Title', 'Show', 'Color', 'Size', 'Font Size', 'Font Family', 
    'Bold', 'Italic', 'Position', 'Text', 'Alignment', 'Style',
    'Width', 'Height', 'Visible', 'Enable', 'Disable', 'Value',
    'Label', 'Name', 'Description', 'Underline'
  ];
  
  // If we have a title but it's generic and we're in a visual section, prefer the property name
  if (isInVisualSection && schema.title && genericTitles.includes(schema.title)) {
    // Format the property name for better readability
    return formatPropertyName(propertyName);
  }
  
  let contextualTitle = schema.title || formatPropertyName(propertyName);
  
  if (schema.$ref) {
    const refName = schema.$ref.split('/').pop();
    if (refName === 'image' && !schema.title) {
      contextualTitle = 'Image Settings';
    } else if (refName === 'fill' && propertyName === 'fillColor') {
      contextualTitle = 'Fill Color';
    }
  }
  
  return contextualTitle;
};