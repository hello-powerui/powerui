'use client';

import { useCallback } from 'react';
import { SchemaProperty } from '@/lib/theme-advanced/types/schema';
import { SchemaLoader } from '@/lib/theme-advanced/services/schema-loader';
import { PropertyInput } from './property-input';
import { AdvancedColorPicker } from './advanced-color-picker';
import { CollapsibleSection } from '../ui/collapsible-section';
import { Card } from '@/components/ui/card';
import { FillControl, NumberControl, BooleanControl } from './controls';

interface SchemaFormProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  schemaLoader: SchemaLoader;
  path?: string[];
  level?: number;
  hideTitle?: boolean;
}

// Helper to format property names
const formatPropertyName = (name: string): string => {
  const specialCases: Record<string, string> = {
    'solid': 'Solid Color',
    'gradient': 'Gradient',
    'pattern': 'Pattern',
    'fontFamily': 'Font Family',
    'fontSize': 'Font Size',
    'fontColor': 'Font Color',
    'backgroundColor': 'Background Color',
    'borderColor': 'Border Color',
    'transparency': 'Transparency',
    'bold': 'Bold',
    'italic': 'Italic',
    'underline': 'Underline',
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
const formatGroupTitle = (name: string): string => {
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
    
    // Common properties (for future reference)
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
const isColorProperty = (schema: SchemaProperty, propertyName?: string): boolean => {
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
const isVisualPropertySection = (schema: SchemaProperty): boolean => {
  return schema.type === 'array' && 
         schema.items?.type === 'object' &&
         schema.items.properties !== undefined &&
         !schema.items.properties.$id; // Exclude state-based arrays
};

// Render visual properties following schema structure (allOf[1].properties only)
const renderVisualProperties = (
  schema: SchemaProperty,
  value: any,
  onChange: (value: any) => void,
  schemaLoader: SchemaLoader,
  path: string[],
  level: number
) => {
  // For visual definitions, we want to process allOf[1].properties
  // Skip commonCards (allOf[0]) and focus on visual-specific properties
  let visualProperties: Record<string, SchemaProperty> = {};
  
  if (schema.allOf && schema.allOf.length > 1) {
    // Get visual-specific properties from allOf[1]
    const visualSchema = schema.allOf[1];
    if (visualSchema.properties) {
      visualProperties = visualSchema.properties;
    }
  } else if (schema.properties) {
    // Fallback if not allOf structure
    visualProperties = schema.properties;
  }
  
  const sections: { name: string; schema: SchemaProperty; title: string }[] = [];
  
  // Collect visual-specific property sections
  Object.entries(visualProperties).forEach(([propName, propSchema]) => {
    // Skip the '*' property (dynamic properties)
    if (propName === '*') return;
    
    // Each property should be an array with items containing the actual form fields
    if (propSchema.type === 'array' && propSchema.items?.type === 'object') {
      sections.push({
        name: propName,
        schema: propSchema,
        title: propSchema.title || formatGroupTitle(propName)
      });
    }
  });
  
  // Sort sections by importance for the visual type
  const importantSections = ['dataPoint', 'legend', 'categoryAxis', 'valueAxis', 'labels', 'plotArea'];
  const sortedSections = sections.sort((a, b) => {
    const aIndex = importantSections.indexOf(a.name);
    const bIndex = importantSections.indexOf(b.name);
    
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.title.localeCompare(b.title);
  });
  
  return (
    <div className="space-y-1">
      {sortedSections.map(({ name, schema: sectionSchema, title }) => {
        const isDefaultOpen = importantSections.slice(0, 3).includes(name);
        // Get the value for this section - it should be an array with one object
        const sectionValue = Array.isArray(value[name]) ? value[name] : [{}];
        const itemValue = sectionValue.length > 0 ? sectionValue[0] : {};
        
        return (
          <CollapsibleSection
            key={name}
            id={`${path.join('-')}-${name}`}
            title={title}
            defaultOpen={isDefaultOpen}
          >
            <div className="space-y-4">
              {/* Render the properties from the items.properties */}
              {sectionSchema.items?.properties && (
                <div className="space-y-4">
                  {Object.entries(sectionSchema.items.properties)
                    .filter(([propName, propSchema]) => {
                      // Filter out properties with complex/mixed types that are confusing
                      // "end" property has type ["number", "string"] which is not well supported
                      if (propName === 'end' && Array.isArray(propSchema.type)) {
                        return false;
                      }
                      // Also filter out "start" for consistency
                      if (propName === 'start' && Array.isArray(propSchema.type)) {
                        return false;
                      }
                      return true;
                    })
                    .map(([propName, propSchema]) => (
                      <SchemaForm
                        key={propName}
                        schema={{ ...propSchema, title: propSchema.title || formatPropertyName(propName) }}
                        value={itemValue[propName]}
                        onChange={(newValue) => {
                          const newItemValue = { ...itemValue, [propName]: newValue };
                          onChange({ ...value, [name]: [newItemValue] });
                        }}
                        schemaLoader={schemaLoader}
                        path={[...path, name, '0', propName]}
                        level={level + 2}
                        hideTitle={false}
                      />
                    ))
                  }
                </div>
              )}
            </div>
          </CollapsibleSection>
        );
      })}
    </div>
  );
};

// Render property fields (from array items)
const renderPropertyFields = (
  schema: SchemaProperty,
  value: any,
  onChange: (value: any) => void,
  schemaLoader: SchemaLoader,
  path: string[],
  level: number
) => {
  return (
    <div className="space-y-4">
      {Object.entries(schema.properties || {}).map(([fieldName, fieldSchema]) => (
        <SchemaForm
          key={fieldName}
          schema={{ ...fieldSchema, title: fieldSchema.title || formatPropertyName(fieldName) }}
          value={value[fieldName]}
          onChange={(newValue) => {
            onChange({ ...value, [fieldName]: newValue });
          }}
          schemaLoader={schemaLoader}
          path={[...path, fieldName]}
          level={level + 1}
          hideTitle={false}
        />
      ))}
    </div>
  );
};

// Default object rendering (fallback)
const renderDefaultObject = (
  schema: SchemaProperty,
  value: any,
  onChange: (value: any) => void,
  schemaLoader: SchemaLoader,
  path: string[],
  level: number
) => {
  return (
    <div className="space-y-4">
      {Object.entries(schema.properties || {}).map(([propName, propSchema]) => (
        <SchemaForm
          key={propName}
          schema={{ ...propSchema, title: propSchema.title || formatPropertyName(propName) }}
          value={value[propName]}
          onChange={(newValue) => {
            onChange({ ...value, [propName]: newValue });
          }}
          schemaLoader={schemaLoader}
          path={[...path, propName]}
          level={level + 1}
          hideTitle={false}
        />
      ))}
    </div>
  );
};

export function SchemaForm({
  schema,
  value,
  onChange,
  schemaLoader,
  path = [],
  level = 0,
  hideTitle = false,
}: SchemaFormProps) {
  // Handle value updates
  const handleChange = useCallback((newValue: any) => {
    onChange(newValue);
  }, [onChange]);


  // Handle visual style wrapper (e.g., { properties: { "*": { "$ref": "#/definitions/visual-lineChart" } } })
  if (schema.type === 'object' && schema.properties?.['*'] && Object.keys(schema.properties).length === 1) {
    const starProperty = schema.properties['*'];
    if (starProperty.$ref) {
      const resolvedSchema = schemaLoader.resolveRef(starProperty.$ref);
      if (resolvedSchema) {
        // Check if this is a visual definition with allOf
        if (resolvedSchema.allOf && resolvedSchema.allOf.length > 1) {
          // Render visual properties directly
          return renderVisualProperties(
            resolvedSchema, 
            value['*'] || value || {}, 
            (newValue) => {
              // When updating, wrap in the * property if needed
              if (path.length >= 2 && path[0] === 'visualStyles') {
                handleChange({ '*': newValue });
              } else {
                handleChange(newValue);
              }
            }, 
            schemaLoader, 
            [...path, '*'], 
            level
          );
        } else {
          // Not a visual definition, render normally
          return (
            <SchemaForm
              schema={resolvedSchema}
              value={value['*'] || value || {}}
              onChange={(newValue) => {
                // When updating, wrap in the * property if needed
                if (path.length >= 2 && path[0] === 'visualStyles') {
                  handleChange({ '*': newValue });
                } else {
                  handleChange(newValue);
                }
              }}
              schemaLoader={schemaLoader}
              path={[...path, '*']}
              level={level}
              hideTitle={hideTitle}
            />
          );
        }
      } else {
        console.error('Failed to resolve visual schema:', starProperty.$ref);
      }
    }
  }

  // Handle $ref resolution
  if (schema.$ref) {
    // Check if this is a fill reference
    if (schema.$ref === '#/definitions/fill') {
      return (
        <FillControl
          label={schema.title || 'Color'}
          value={value}
          onChange={handleChange}
          description={schema.description}
          required={schema.required?.includes(path[path.length - 1])}
          path={path}
        />
      );
    }
    
    const resolvedSchema = schemaLoader.resolveRef(schema.$ref);
    if (!resolvedSchema) {
      return <div className="text-red-500 text-sm">Unable to resolve reference: {schema.$ref}</div>;
    }
    
    // Merge title and description from the reference
    const mergedSchema = {
      ...resolvedSchema,
      title: schema.title || resolvedSchema.title,
      description: schema.description || resolvedSchema.description,
    };
    
    return (
      <SchemaForm
        schema={mergedSchema}
        value={value}
        onChange={handleChange}
        schemaLoader={schemaLoader}
        path={path}
        level={level}
        hideTitle={hideTitle}
      />
    );
  }

  // Handle allOf
  if (schema.allOf) {
    const mergedProperties: Record<string, SchemaProperty> = {};
    
    for (const subSchema of schema.allOf) {
      let resolvedSubSchema = subSchema;
      
      if (subSchema.$ref) {
        const resolved = schemaLoader.resolveRef(subSchema.$ref);
        if (resolved) {
          resolvedSubSchema = resolved;
        }
      }
      
      if (resolvedSubSchema.properties) {
        Object.assign(mergedProperties, resolvedSubSchema.properties);
      }
    }
    
    const mergedSchema: SchemaProperty = {
      type: 'object',
      properties: mergedProperties,
      required: schema.required,
    };
    
    return (
      <SchemaForm
        schema={mergedSchema}
        value={value}
        onChange={handleChange}
        schemaLoader={schemaLoader}
        path={path}
        level={level}
        hideTitle={hideTitle}
      />
    );
  }

  // Handle oneOf - but not for simple string enums (those are handled in the string type section)
  if (schema.oneOf && schema.type !== 'string') {
    // Determine which schema to use based on the current value
    let selectedIndex = 0;
    let selectedSchema = schema.oneOf[0];
    
    // Try to match the value to the appropriate schema
    schema.oneOf?.forEach((option, index) => {
      if (option.type === 'array' && Array.isArray(value)) {
        selectedIndex = index;
        selectedSchema = option;
      } else if (option.type === 'object' && typeof value === 'object' && !Array.isArray(value)) {
        selectedIndex = index;
        selectedSchema = option;
      } else if (option.type === typeof value) {
        selectedIndex = index;
        selectedSchema = option;
      }
    });
    
    // Show a selector for oneOf options
    return (
      <div className="space-y-2">
        {!hideTitle && schema.title && (
          <h4 className="text-sm font-medium text-gray-700">{schema.title}</h4>
        )}
        {schema.description && (
          <p className="text-xs text-gray-500">{schema.description}</p>
        )}
        <PropertyInput
          type="select"
          label="Option"
          value={String(selectedIndex)}
          onChange={(newIndex) => {
            const index = parseInt(newIndex as string);
            const newSchema = schema.oneOf?.[index];
            if (!newSchema) return;
            // Reset value when switching options
            if (newSchema.type === 'array') {
              handleChange([]);
            } else if (newSchema.type === 'object') {
              handleChange({});
            } else if (newSchema.type === 'string') {
              handleChange('');
            } else if (newSchema.type === 'number') {
              handleChange(0);
            } else if (newSchema.type === 'boolean') {
              handleChange(false);
            }
          }}
          options={schema.oneOf?.map((option, index) => ({
            value: String(index),
            label: option.title || (option.type ? formatPropertyName(Array.isArray(option.type) ? option.type[0] : option.type) : `Option ${index + 1}`),
          })) || []}
          path={[...path, '_option']}
        />
        <SchemaForm
          schema={selectedSchema}
          value={value}
          onChange={handleChange}
          schemaLoader={schemaLoader}
          path={path}
          level={level}
          hideTitle={true}
        />
      </div>
    );
  }

  // Handle anyOf
  if (schema.anyOf) {
    // Determine which schema to use based on the current value
    let selectedIndex = 0;
    let selectedSchema = schema.anyOf[0];
    
    // Try to match the value to the appropriate schema
    schema.anyOf?.forEach((option, index) => {
      if (option.type === 'array' && Array.isArray(value)) {
        selectedIndex = index;
        selectedSchema = option;
      } else if (option.type === 'object' && typeof value === 'object' && !Array.isArray(value)) {
        selectedIndex = index;
        selectedSchema = option;
      } else if (option.type === typeof value) {
        selectedIndex = index;
        selectedSchema = option;
      }
    });
    
    // If we have multiple options with different types, show a selector
    const hasMultipleTypes = schema.anyOf.length > 1 && 
      new Set(schema.anyOf.map(s => s.type)).size > 1;
    
    return (
      <div className="space-y-2">
        {!hideTitle && schema.title && (
          <h4 className="text-sm font-medium text-gray-700">{schema.title}</h4>
        )}
        {schema.description && (
          <p className="text-xs text-gray-500">{schema.description}</p>
        )}
        {hasMultipleTypes && (
          <PropertyInput
            type="select"
            label="Type"
            value={String(selectedIndex)}
            onChange={(newIndex) => {
              const index = parseInt(newIndex as string);
              const newSchema = schema.anyOf?.[index];
              if (!newSchema) return;
              // Reset value when switching types
              if (newSchema.type === 'array') {
                handleChange([]);
              } else if (newSchema.type === 'object') {
                handleChange({});
              } else if (newSchema.type === 'string') {
                handleChange('');
              } else if (newSchema.type === 'number') {
                handleChange(0);
              } else if (newSchema.type === 'boolean') {
                handleChange(false);
              }
            }}
            options={schema.anyOf?.map((option, index) => ({
              value: String(index),
              label: option.type ? formatPropertyName(Array.isArray(option.type) ? option.type[0] : option.type) : `Option ${index + 1}`,
            })) || []}
            path={[...path, '_type']}
          />
        )}
        <SchemaForm
          schema={selectedSchema}
          value={value}
          onChange={handleChange}
          schemaLoader={schemaLoader}
          path={path}
          level={level}
          hideTitle={true}
        />
      </div>
    );
  }

  // Handle property section arrays (Power BI schema pattern)
  if (schema.type === 'array' && schema.items?.type === 'object' && schema.items.properties) {
    const arrayValue = Array.isArray(value) ? value : [{}];
    const itemValue = arrayValue.length > 0 ? arrayValue[0] : {};
    
    // Property sections in Power BI are single-item arrays containing configuration objects
    return (
      <SchemaForm
        schema={schema.items}
        value={itemValue}
        onChange={(newItemValue) => handleChange([newItemValue])}
        schemaLoader={schemaLoader}
        path={path}
        level={level}
        hideTitle={hideTitle}
      />
    );
  }

  // Handle true multi-item arrays (not property sections)
  if (schema.type === 'array' && schema.items && !isVisualPropertySection(schema)) {
    const arrayValue = Array.isArray(value) ? value : [];
    
    return (
      <div className="space-y-2">
        {!hideTitle && schema.title && (
          <h4 className="text-sm font-medium text-gray-700">{schema.title}</h4>
        )}
        {schema.description && (
          <p className="text-xs text-gray-500">{schema.description}</p>
        )}
        <div className="space-y-2">
          {arrayValue.map((item, index) => (
            <Card key={index} className="p-3">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium">Item {index + 1}</span>
                <button
                  type="button"
                  onClick={() => {
                    const newArray = arrayValue.filter((_, i) => i !== index);
                    handleChange(newArray);
                  }}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
              {schema.items && (
                <SchemaForm
                  schema={schema.items}
                  value={item}
                  onChange={(newItem) => {
                    const newArray = [...arrayValue];
                    newArray[index] = newItem;
                    handleChange(newArray);
                  }}
                  schemaLoader={schemaLoader}
                  path={[...path, String(index)]}
                  level={level + 1}
                  hideTitle
                />
              )}
            </Card>
          ))}
          <button
            type="button"
            onClick={() => {
              const newArray = [...arrayValue, {}];
              handleChange(newArray);
            }}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            + Add Item
          </button>
        </div>
      </div>
    );
  }

  // Handle objects
  if (schema.type === 'object' && schema.properties) {
    const objectValue = typeof value === 'object' && value !== null ? value : {};
    
    // Check if this is a visual style object with a "*" property that has a $ref
    const starProperty = schema.properties['*'];
    if (starProperty && starProperty.$ref) {
      // This is likely a visual style wrapper - resolve the reference and render the actual visual
      const resolvedVisualSchema = schemaLoader.resolveRef(starProperty.$ref);
      if (resolvedVisualSchema) {
        // The value should be under the "*" key
        const starValue = objectValue['*'] || {};
        // Check if the resolved schema has allOf with visual properties
        if (resolvedVisualSchema.allOf && resolvedVisualSchema.allOf.length > 1) {
          // This is a visual definition - render the visual properties
          return renderVisualProperties(resolvedVisualSchema, starValue, (newValue) => handleChange({ ...objectValue, '*': newValue }), schemaLoader, [...path, '*'], level + 1);
        } else {
          return (
            <SchemaForm
              schema={resolvedVisualSchema}
              value={starValue}
              onChange={(newValue) => handleChange({ ...objectValue, '*': newValue })}
              schemaLoader={schemaLoader}
              path={[...path, '*']}
              level={level + 1}
              hideTitle={hideTitle}
            />
          );
        }
      } else {
        console.error('Failed to resolve visual schema:', starProperty.$ref);
      }
    }
    
    // Check if this is a visual definition (has allOf with visual-specific properties)
    const hasVisualAllOf = schema.allOf && 
                          Array.isArray(schema.allOf) && 
                          schema.allOf.length > 1 && 
                          schema.allOf[1] &&
                          'properties' in schema.allOf[1] &&
                          schema.allOf[1].properties &&
                          !schema.allOf[1].properties['*']; // Exclude the wrapper level
    
    if (hasVisualAllOf) {
      // Render visual properties using schema-defined sections
      return renderVisualProperties(schema, objectValue, handleChange, schemaLoader, path, level);
    }
    
    // Check if this is a property section (array items with properties)
    const isPropertySection = path.length >= 2 && level >= 2;
    
    if (isPropertySection) {
      // Render individual property fields inline
      return renderPropertyFields(schema, objectValue, handleChange, schemaLoader, path, level);
    }
    
    // Default object rendering for other cases
    return renderDefaultObject(schema, objectValue, handleChange, schemaLoader, path, level);
  }

  // Handle color properties
  if (isColorProperty(schema, path[path.length - 1])) {
    return (
      <AdvancedColorPicker
        label={schema.title || formatPropertyName(path[path.length - 1])}
        value={value}
        onChange={handleChange}
        description={schema.description}
        required={schema.required?.includes(path[path.length - 1])}
        path={path}
      />
    );
  }

  // Handle primitive types
  if (schema.type === 'string') {
    // Check for oneOf pattern (common in Power BI schemas)
    if (schema.oneOf && Array.isArray(schema.oneOf)) {
      return (
        <PropertyInput
          type="select"
          label={schema.title || ''}
          value={value || ''}
          onChange={handleChange}
          options={schema.oneOf.map(option => ({
            value: option.const || option.enum?.[0] || '',
            label: option.title || option.const || option.enum?.[0] || '',
          }))}
          description={schema.description}
          path={path}
        />
      );
    }
    
    if (schema.enum) {
      // Enum - render as select
      return (
        <PropertyInput
          type="select"
          label={schema.title || ''}
          value={value || ''}
          onChange={handleChange}
          options={schema.enum.map(val => ({
            value: String(val),
            label: String(val),
          }))}
          description={schema.description}
          path={path}
        />
      );
    }
    
    // Regular string
    return (
      <PropertyInput
        type="text"
        label={schema.title || ''}
        value={value || ''}
        onChange={handleChange}
        description={schema.description}
        path={path}
      />
    );
  }

  if (schema.type === 'number' || schema.type === 'integer') {
    // Check if this is a transparency/percentage field
    const isPercentage = schema.title?.toLowerCase().includes('transparency') ||
                        schema.minimum === 0 && schema.maximum === 1;
    
    return (
      <NumberControl
        label={schema.title || ''}
        value={value || 0}
        onChange={handleChange}
        min={schema.minimum}
        max={schema.maximum}
        step={schema.type === 'integer' ? 1 : 0.01}
        description={schema.description}
        path={path}
        isPercentage={isPercentage}
      />
    );
  }

  if (schema.type === 'boolean') {
    return (
      <BooleanControl
        label={schema.title || ''}
        value={value || false}
        onChange={handleChange}
        description={schema.description}
        path={path}
      />
    );
  }

  // Handle mixed type arrays (e.g., ["number", "string"])
  if (Array.isArray(schema.type)) {
    // For mixed types, default to string input
    // This handles cases like "end" which can be number or string
    return (
      <PropertyInput
        type="text"
        label={schema.title || ''}
        value={value?.toString() || ''}
        onChange={(newValue) => {
          // Try to parse as number first
          const numValue = parseFloat(newValue);
          if (!isNaN(numValue) && schema.type.includes('number')) {
            handleChange(numValue);
          } else {
            handleChange(newValue);
          }
        }}
        description={schema.description}
        path={path}
      />
    );
  }

  // Try to infer type from schema structure if no explicit type
  if (!schema.type) {
    // Check if it has properties (object-like)
    if (schema.properties) {
      return (
        <SchemaForm
          schema={{ ...schema, type: 'object' }}
          value={value}
          onChange={handleChange}
          schemaLoader={schemaLoader}
          path={path}
          level={level}
          hideTitle={hideTitle}
        />
      );
    }
    
    // Check if it has items (array-like)
    if (schema.items) {
      return (
        <SchemaForm
          schema={{ ...schema, type: 'array' }}
          value={value}
          onChange={handleChange}
          schemaLoader={schemaLoader}
          path={path}
          level={level}
          hideTitle={hideTitle}
        />
      );
    }
    
    // Check if it has enum (likely string)
    if (schema.enum) {
      return (
        <SchemaForm
          schema={{ ...schema, type: 'string' }}
          value={value}
          onChange={handleChange}
          schemaLoader={schemaLoader}
          path={path}
          level={level}
          hideTitle={hideTitle}
        />
      );
    }
  }

  // Unsupported type
  return (
    <div className="text-gray-500 text-sm">
      Unsupported schema type: {JSON.stringify(schema.type || 'undefined')}
      {schema.title && <div className="text-xs">Property: {schema.title}</div>}
    </div>
  );
}