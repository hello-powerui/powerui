import { SchemaLoader } from '../services/schema-loader';
import { SchemaProperty } from '../types/schema';

interface ExtractedProperty {
  name: string;
  title: string;
  description?: string;
  category: string;
  schema: SchemaProperty;
}

interface PropertyInfo {
  [key: string]: {
    title: string;
    category: string;
    commonIn: string[];
  };
}

export async function extractCommonVisualProperties(): Promise<PropertyInfo> {
  const loader = SchemaLoader.getInstance();
  await loader.loadSchema();
  
  const visualTypes = loader.getAllVisualTypes();
  const propertyMap: Map<string, { visuals: Set<string>; schema: SchemaProperty; title?: string }> = new Map();
  
  // Extract properties from each visual type
  for (const visualType of visualTypes) {
    const visualDef = loader.getDefinition(`visual-${visualType}`);
    if (!visualDef || !visualDef.allOf) continue;
    
    // Visual properties are typically in allOf[1].properties
    const visualProps = visualDef.allOf[1]?.properties || {};
    
    for (const [propName, propSchema] of Object.entries(visualProps)) {
      if (!propertyMap.has(propName)) {
        propertyMap.set(propName, {
          visuals: new Set(),
          schema: propSchema as SchemaProperty,
          title: (propSchema as any).title
        });
      }
      propertyMap.get(propName)!.visuals.add(visualType);
    }
  }
  
  // Filter to get properties that appear in multiple visuals
  const commonProperties: PropertyInfo = {};
  const minVisualsThreshold = 3; // Property must appear in at least 3 visuals to be considered common
  
  for (const [propName, info] of propertyMap.entries()) {
    if (info.visuals.size >= minVisualsThreshold) {
      commonProperties[propName] = {
        title: info.title || formatPropertyName(propName),
        category: categorizeProperty(propName),
        commonIn: Array.from(info.visuals)
      };
    }
  }
  
  return commonProperties;
}

export function categorizeProperty(propName: string): string {
  const categoryMappings: Record<string, string[]> = {
    'axis': ['categoryAxis', 'valueAxis', 'xAxis', 'yAxis', 'sharedAxis', 'axis'],
    'data': ['dataPoint', 'dataLabels', 'dataColors', 'data'],
    'visual': ['background', 'border', 'dropShadow', 'visual', 'visualHeader', 'visualLink'],
    'text': ['title', 'labels', 'fontFamily', 'fontSize', 'fontColor', 'wordWrap'],
    'layout': ['padding', 'spacing', 'divider', 'plotArea', 'legend'],
    'interaction': ['tooltips', 'zoom', 'selection', 'highlights', 'crosshair'],
    'style': ['outline', 'fillPoint', 'line', 'lineStyles', 'gradient', 'shapes']
  };
  
  for (const [category, patterns] of Object.entries(categoryMappings)) {
    if (patterns.some(pattern => propName.toLowerCase().includes(pattern.toLowerCase()))) {
      return category;
    }
  }
  
  return 'other';
}

function formatPropertyName(name: string): string {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

// Get properties that are specifically designed to be global
export async function getGlobalVisualProperties(): Promise<ExtractedProperty[]> {
  const loader = SchemaLoader.getInstance();
  await loader.loadSchema();
  
  const propertyMap = new Map<string, ExtractedProperty>();
  
  // Get structured properties from commonCards to exclude them
  const commonCardsDef = loader.getDefinition('commonCards');
  const excludedProps = new Set<string>();
  if (commonCardsDef?.properties) {
    Object.keys(commonCardsDef.properties).forEach(key => {
      if (key !== '*') {
        excludedProps.add(key);
      }
    });
  }
  
  // Extract properties from all visual types
  const visualTypes = loader.getAllVisualTypes();
  
  for (const visualType of visualTypes) {
    const visualDef = loader.getDefinition(`visual-${visualType}`);
    if (!visualDef?.allOf?.[1]?.properties) continue;
    
    const visualProps = visualDef.allOf[1].properties;
    
    for (const [propName, propSchema] of Object.entries(visualProps)) {
      // Skip if it's a structured property from commonCards
      if (excludedProps.has(propName)) continue;
      
      // Skip stylePreset as it's not a user-configurable property
      if (propName === 'stylePreset') continue;
      
      // Only add if we haven't seen this property before, or update if this one has a better description
      if (!propertyMap.has(propName) || (propSchema as any).description) {
        propertyMap.set(propName, {
          name: propName,
          title: formatPropertyName(propName),
          description: (propSchema as any).description,
          category: 'other', // We're removing categories, but keeping for compatibility
          schema: propSchema as SchemaProperty
        });
      }
    }
  }
  
  // Convert to array and sort alphabetically
  return Array.from(propertyMap.values()).sort((a, b) => 
    a.title.localeCompare(b.title)
  );
}