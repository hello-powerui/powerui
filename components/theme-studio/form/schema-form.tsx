'use client';

import { useCallback, useState } from 'react';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { PropertyInput } from './property-input';
import { AdvancedColorPicker } from './advanced-color-picker';
import { CollapsibleSection } from '../ui/collapsible-section';
import { Card } from '@/components/ui/card';
import { FillControl, NumberControl, BooleanControl } from './controls';
import { PropertyWithInheritance } from './property-with-inheritance';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { useThemeChanges } from '@/lib/hooks/use-theme-changes';
import { PropertyWrapper } from './property-wrapper';

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

// Visual Properties Component - converted from function to component to properly use hooks
const VisualPropertiesRenderer: React.FC<{
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  schemaLoader: SchemaLoader;
  path: string[];
  level: number;
}> = ({ schema, value, onChange, schemaLoader, path, level }) => {
  const [activeTab, setActiveTab] = useState<'specific' | 'general'>('specific');
  const hasChangesInSection = useThemeChanges(state => state.hasChangesInSection);
  const getChangedPropertiesCount = useThemeChanges(state => state.getChangedPropertiesCount);
  const trackChangeRef = useThemeChanges(state => state.trackChange);
  // For visual definitions, we want to process both commonCards and visual-specific properties
  let commonProperties: Record<string, SchemaProperty> = {};
  let visualProperties: Record<string, SchemaProperty> = {};
  
  if (schema.allOf && schema.allOf.length > 1) {
    // Get common properties from allOf[0] (commonCards)
    const commonSchema = schema.allOf[0];
    if (commonSchema.$ref === '#/definitions/commonCards') {
      // Resolve the commonCards reference
      const resolvedCommon = schemaLoader.resolveRef(commonSchema.$ref);
      if (resolvedCommon?.properties) {
        commonProperties = resolvedCommon.properties;
      }
    } else if (commonSchema.properties) {
      commonProperties = commonSchema.properties;
    }
    
    // Get visual-specific properties from allOf[1]
    const visualSchema = schema.allOf[1];
    if (visualSchema.properties) {
      visualProperties = visualSchema.properties;
    }
  } else if (schema.properties) {
    // Fallback if not allOf structure
    visualProperties = schema.properties;
  }
  
  const sections: { name: string; schema: SchemaProperty; title: string; isCommon?: boolean }[] = [];
  
  // Collect common property sections (from commonCards)
  Object.entries(commonProperties).forEach(([propName, propSchema]) => {
    // Skip the '*' property - we'll handle it separately
    if (propName === '*') return;
    
    // Each property should be an array with items containing the actual form fields
    if (propSchema.type === 'array' && propSchema.items?.type === 'object') {
      sections.push({
        name: propName,
        schema: propSchema,
        title: propSchema.title || formatGroupTitle(propName),
        isCommon: true
      });
    }
  });
  
  // Collect visual-specific property sections
  Object.entries(visualProperties).forEach(([propName, propSchema]) => {
    // Skip the '*' property (dynamic properties)
    if (propName === '*') return;
    
    // Each property should be an array with items containing the actual form fields
    if (propSchema.type === 'array' && propSchema.items?.type === 'object') {
      sections.push({
        name: propName,
        schema: propSchema,
        title: propSchema.title || formatGroupTitle(propName),
        isCommon: false
      });
    }
  });
  
  // Sort sections by importance for the visual type
  const importantSections = ['dataPoint', 'legend', 'categoryAxis', 'valueAxis', 'labels', 'plotArea'];
  const sortedSections = sections.sort((a, b) => {
    // Common properties go last
    if (a.isCommon && !b.isCommon) return 1;
    if (!a.isCommon && b.isCommon) return -1;
    
    const aIndex = importantSections.indexOf(a.name);
    const bIndex = importantSections.indexOf(b.name);
    
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.title.localeCompare(b.title);
  });
  
  // Split sections by type
  const specificSections = sortedSections.filter(s => !s.isCommon);
  const generalSections = sortedSections.filter(s => s.isCommon);
  
  return (
    <div className="space-y-4">
      {/* Tab navigation */}
      <div className="bg-gray-100 p-1 rounded-md">
        <nav className="flex space-x-1" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('specific')}
            className={`
              flex-1 whitespace-nowrap py-2 px-3 rounded-md font-medium text-sm transition-all
              ${activeTab === 'specific'
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }
            `}
          >
            Visual Properties
            {specificSections.length > 0 && (
              <span className={`ml-2 text-xs ${activeTab === 'specific' ? 'text-gray-300' : 'text-gray-500'}`}>({specificSections.length})</span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('general')}
            className={`
              flex-1 whitespace-nowrap py-2 px-3 rounded-md font-medium text-sm transition-all
              ${activeTab === 'general'
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }
            `}
          >
            General Properties
            {generalSections.length > 0 && (
              <span className={`ml-2 text-xs ${activeTab === 'general' ? 'text-gray-300' : 'text-gray-500'}`}>({generalSections.length})</span>
            )}
          </button>
        </nav>
      </div>
      
      {/* Tab content */}
      <div className="mt-4">
        {activeTab === 'specific' ? (
          <div className="space-y-1">
            {specificSections.length > 0 ? (
              specificSections.map(({ name, schema: sectionSchema, title }) => {
            const isDefaultOpen = false; // Changed: all sections start collapsed
            // Get the value for this section - it should be an array with one object
            const sectionValue = Array.isArray(value[name]) ? value[name] : [{}];
            const itemValue = sectionValue.length > 0 ? sectionValue[0] : {};
            
            const handleSectionReset = () => {
              // Reset the entire section to inherit from global/defaults
              onChange({ ...value, [name]: undefined });
            };
            
            const sectionPath = [...path, name];
            const hasChanges = hasChangesInSection(sectionPath);
            const changedCount = getChangedPropertiesCount(sectionPath);
            
            return (
              <CollapsibleSection
                key={name}
                id={`${path.join('-')}-${name}`}
                title={title}
                defaultOpen={isDefaultOpen}
                hasChanges={hasChanges}
                changedCount={changedCount}
                headerAction={
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSectionReset();
                    }}
                    className="text-xs text-gray-600 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-100"
                  >
                    Reset Section
                  </button>
                }
              >
                <div className="space-y-4">
                  {/* Show state indicator if this section has state support */}
                  {sectionSchema.items?.properties?.$id && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        State: {useThemeStudioStore.getState().selectedState || 'default'}
                      </span>
                      <span className="text-xs text-gray-500">This section uses the visual state selector</span>
                    </div>
                  )}
                  
                  {/* Check if this section has state support */}
                  {sectionSchema.items?.properties?.$id ? (
                    // This is a state-driven property - pass the entire schema
                    <SchemaForm
                      schema={sectionSchema}
                      value={value[name]}
                      onChange={(newValue) => {
                        onChange({ ...value, [name]: newValue });
                      }}
                      schemaLoader={schemaLoader}
                      path={[...path, name]}
                      level={level + 1}
                      hideTitle={true}
                    />
                  ) : (
                    // Regular properties - render them individually
                    sectionSchema.items?.properties && (
                      <div className="space-y-4">
                        {(() => {
                          const hasShow = sectionSchema.items.properties.show !== undefined;
                          const showValue = hasShow ? itemValue?.show ?? true : true;
                          
                          const sorted = sortPropertiesWithShowFirst(sectionSchema.items.properties);
                          return sorted
                            .filter(([propName, propSchema]) => {
                              // Filter out properties with complex/mixed types that are confusing
                              if ((propName === 'end' || propName === 'start') && Array.isArray(propSchema.type)) {
                                return false;
                              }
                              // Always show the 'show' property
                              if (propName === 'show') return true;
                              // Conditionally show other properties based on 'show' value
                              if (hasShow && !showValue) return false;
                              return true;
                            })
                            .map(([propName, propSchema]) => {
                              // Add contextual title for known references
                              let contextualTitle = propSchema.title || formatPropertyName(propName);
                              if (propSchema.$ref) {
                                const refName = propSchema.$ref.split('/').pop();
                                if (refName === 'image' && !propSchema.title) {
                                  contextualTitle = 'Image Settings';
                                }
                              }
                              
                              return (
                                <SchemaForm
                                  key={propName}
                                  schema={{ ...propSchema, title: contextualTitle }}
                                  value={itemValue[propName]}
                                  onChange={(newValue) => {
                                    const newItemValue = { ...itemValue, [propName]: newValue };
                                    onChange({ ...value, [name]: [newItemValue] });
                                    // Also track this specific change
                                    trackChangeRef([...path, name, '0', propName]);
                                  }}
                                  schemaLoader={schemaLoader}
                                  path={[...path, name, '0', propName]}
                                  level={level + 2}
                                  hideTitle={false}
                                />
                              );
                            });
                        })()}
                      </div>
                    )
                  )}
                </div>
              </CollapsibleSection>
            );
          })
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">
                No visual-specific properties available for this visual type.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-1">
            {generalSections.length > 0 ? (
              generalSections.map(({ name, schema: sectionSchema, title }) => {
            const isDefaultOpen = false; // Changed: all sections start collapsed
            // Get the value for this section - it should be an array with one object
            const sectionValue = Array.isArray(value[name]) ? value[name] : [{}];
            const itemValue = sectionValue.length > 0 ? sectionValue[0] : {};
        
        const handleSectionReset = () => {
          // Reset the entire section to inherit from global/defaults
          onChange({ ...value, [name]: undefined });
        };
        
        const sectionPath = [...path, name];
        const hasChanges = hasChangesInSection(sectionPath);
        const changedCount = getChangedPropertiesCount(sectionPath);
        
        return (
          <CollapsibleSection
            key={name}
            id={`${path.join('-')}-${name}`}
            title={title}
            defaultOpen={isDefaultOpen}
            hasChanges={hasChanges}
            changedCount={changedCount}
            headerAction={
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSectionReset();
                }}
                className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50"
              >
                Reset Section
              </button>
            }
          >
            <div className="space-y-4">
              {/* Show state indicator if this section has state support */}
              {sectionSchema.items?.properties?.$id && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    State: {useThemeStudioStore.getState().selectedState || 'default'}
                  </span>
                  <span className="text-xs text-gray-500">This section uses the visual state selector</span>
                </div>
              )}
              
              {/* Check if this section has state support */}
              {sectionSchema.items?.properties?.$id ? (
                // This is a state-driven property - pass the entire schema
                <SchemaForm
                  schema={sectionSchema}
                  value={value[name]}
                  onChange={(newValue) => {
                    onChange({ ...value, [name]: newValue });
                  }}
                  schemaLoader={schemaLoader}
                  path={[...path, name]}
                  level={level + 1}
                  hideTitle={true}
                />
              ) : (
                // Regular properties - render them individually
                sectionSchema.items?.properties && (
                  <div className="space-y-4">
                    {(() => {
                      const hasShow = sectionSchema.items.properties.show !== undefined;
                      const showValue = hasShow ? itemValue?.show ?? true : true;
                      
                      return sortPropertiesWithShowFirst(sectionSchema.items.properties)
                        .filter(([propName, propSchema]) => {
                          // Filter out properties with complex/mixed types that are confusing
                          if ((propName === 'end' || propName === 'start') && Array.isArray(propSchema.type)) {
                            return false;
                          }
                          // Always show the 'show' property
                          if (propName === 'show') return true;
                          // Conditionally show other properties based on 'show' value
                          if (hasShow && !showValue) return false;
                          return true;
                        })
                        .map(([propName, propSchema]) => {
                          // Add contextual title for known references
                          let contextualTitle = propSchema.title || formatPropertyName(propName);
                          if (propSchema.$ref) {
                            const refName = propSchema.$ref.split('/').pop();
                            if (refName === 'image' && !propSchema.title) {
                              contextualTitle = 'Image Settings';
                            }
                          }
                          
                          return (
                            <SchemaForm
                              key={propName}
                              schema={{ ...propSchema, title: contextualTitle }}
                              value={itemValue[propName]}
                              onChange={(newValue) => {
                                const newItemValue = { ...itemValue, [propName]: newValue };
                                onChange({ ...value, [name]: [newItemValue] });
                                // Also track this specific change
                                trackChangeRef([...path, name, '0', propName]);
                              }}
                              schemaLoader={schemaLoader}
                              path={[...path, name, '0', propName]}
                              level={level + 2}
                              hideTitle={false}
                            />
                          );
                        });
                    })()}
                  </div>
                )
              )}
            </div>
          </CollapsibleSection>
            );
          })
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">
                No general properties available for this visual type.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper to check if a property should be conditionally shown
const hasShowProperty = (properties: Record<string, SchemaProperty> | undefined): boolean => {
  return properties?.show !== undefined;
};

// Helper to sort properties with 'show' first
const sortPropertiesWithShowFirst = (properties: Record<string, SchemaProperty>): Array<[string, SchemaProperty]> => {
  const entries = Object.entries(properties);
  return entries.sort(([nameA], [nameB]) => {
    if (nameA === 'show') return -1;
    if (nameB === 'show') return 1;
    return 0;
  });
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
  const hasShow = hasShowProperty(schema.properties);
  const showValue = hasShow ? value?.show ?? true : true;
  const sortedProperties = sortPropertiesWithShowFirst(schema.properties || {});

  return (
    <div className="space-y-4">
      {sortedProperties.map(([fieldName, fieldSchema]) => {
        // Always show the 'show' property
        if (fieldName === 'show') {
          return (
            <SchemaForm
              key={fieldName}
              schema={{ ...fieldSchema, title: fieldSchema.title || 'Show' }}
              value={value[fieldName]}
              onChange={(newValue) => {
                onChange({ ...value, [fieldName]: newValue });
              }}
              schemaLoader={schemaLoader}
              path={[...path, fieldName]}
              level={level + 1}
              hideTitle={false}
            />
          );
        }

        // Conditionally show other properties based on 'show' value
        if (hasShow && !showValue) {
          return null;
        }

        // Check if this is a referenced object that needs context
        let contextualTitle = fieldSchema.title || formatPropertyName(fieldName);
        if (fieldSchema.$ref) {
          // Add context for known references
          const refName = fieldSchema.$ref.split('/').pop();
          if (refName === 'image' && !fieldSchema.title) {
            contextualTitle = 'Image Settings';
          } else if (refName === 'fill' && fieldName === 'fillColor') {
            contextualTitle = 'Fill Color';
          }
        }

        return (
          <SchemaForm
            key={fieldName}
            schema={{ ...fieldSchema, title: contextualTitle }}
            value={value[fieldName]}
            onChange={(newValue) => {
              onChange({ ...value, [fieldName]: newValue });
            }}
            schemaLoader={schemaLoader}
            path={[...path, fieldName]}
            level={level + 1}
            hideTitle={false}
          />
        );
      })}
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
  const hasShow = hasShowProperty(schema.properties);
  const showValue = hasShow ? value?.show ?? true : true;
  const sortedProperties = sortPropertiesWithShowFirst(schema.properties || {});

  return (
    <div className="space-y-4">
      {sortedProperties.map(([propName, propSchema]) => {
        // Always show the 'show' property
        if (propName === 'show') {
          return (
            <SchemaForm
              key={propName}
              schema={{ ...propSchema, title: propSchema.title || 'Show' }}
              value={value[propName]}
              onChange={(newValue) => {
                onChange({ ...value, [propName]: newValue });
              }}
              schemaLoader={schemaLoader}
              path={[...path, propName]}
              level={level + 1}
              hideTitle={false}
            />
          );
        }

        // Conditionally show other properties based on 'show' value
        if (hasShow && !showValue) {
          return null;
        }

        // Check if this is a referenced object that needs context
        let contextualTitle = propSchema.title || formatPropertyName(propName);
        if (propSchema.$ref) {
          const refName = propSchema.$ref.split('/').pop();
          if (refName === 'image' && !propSchema.title) {
            contextualTitle = 'Image Settings';
          }
        }

        return (
          <SchemaForm
            key={propName}
            schema={{ ...propSchema, title: contextualTitle }}
            value={value[propName]}
            onChange={(newValue) => {
              onChange({ ...value, [propName]: newValue });
            }}
            schemaLoader={schemaLoader}
            path={[...path, propName]}
            level={level + 1}
            hideTitle={false}
          />
        );
      })}
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
  const trackChangeRef = useThemeChanges(state => state.trackChange);
  
  // Handle value updates
  const handleChange = useCallback((newValue: any) => {
    onChange(newValue);
    // Track the change
    if (path.length > 0) {
      trackChangeRef(path);
    }
  }, [onChange, path, trackChangeRef]);

  // Get context from store to determine if we should show inheritance
  const { selectedVisual, selectedVariant, selectedState } = useThemeStudioStore();
  
  // Check if we're in a visual context (editing visual properties)
  const isVisualContext = path.length > 0 && (path[0] === 'visualStyles' || path.includes('*'));
  const shouldShowInheritance = isVisualContext && selectedVisual && selectedVisual !== '*';


  // Handle visual style wrapper (e.g., { properties: { "*": { "$ref": "#/definitions/visual-lineChart" } } })
  if (schema.type === 'object' && schema.properties?.['*'] && Object.keys(schema.properties).length === 1) {
    const starProperty = schema.properties['*'];
    if (starProperty.$ref) {
      const resolvedSchema = schemaLoader.resolveRef(starProperty.$ref);
      if (resolvedSchema) {
        // Check if this is a visual definition with allOf
        if (resolvedSchema.allOf && resolvedSchema.allOf.length > 1) {
          // Render visual properties directly
          return (
            <VisualPropertiesRenderer
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
            />
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
    
    // Check if this is an image reference that needs special handling
    const refName = schema.$ref.split('/').pop();
    const isImageRef = refName === 'image';
    
    // Merge title and description from the reference
    const mergedSchema = {
      ...resolvedSchema,
      title: schema.title || (isImageRef && !schema.title ? 'Image Settings' : resolvedSchema.title),
      description: schema.description || resolvedSchema.description,
    };
    
    // If this is an image object, wrap it in a card for better visual grouping
    if (isImageRef && resolvedSchema.properties?.name && resolvedSchema.properties?.url) {
      return (
        <Card className="p-4 border-l-4 border-l-blue-500">
          <div className="space-y-4">
            <h5 className="text-sm font-medium text-gray-700 mb-3">Image Settings</h5>
            <SchemaForm
              schema={mergedSchema}
              value={value}
              onChange={handleChange}
              schemaLoader={schemaLoader}
              path={path}
              level={level}
              hideTitle={true}
            />
          </div>
        </Card>
      );
    }
    
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
    
    // Check if this is a state-driven property (has $id field)
    const hasStateSupport = schema.items.properties.$id !== undefined;
    
    if (hasStateSupport) {
      // Handle state-driven properties using global state from store
      const globalSelectedState = useThemeStudioStore.getState().selectedState || 'default';
      
      // Normalize array to ensure all items have $id
      const normalizedArray = arrayValue.map(item => {
        if (!item.$id) {
          return { ...item, $id: 'default' };
        }
        return item;
      });
      
      // Get or create the item for the selected state
      let stateItem = normalizedArray.find(item => item.$id === globalSelectedState);
      if (!stateItem) {
        stateItem = { $id: globalSelectedState };
      }
      
      const handleStateItemChange = (updates: any) => {
        // Ensure we always have $id field for all items
        const normalizedArray = arrayValue.map(item => {
          // Add $id: 'default' to items without $id
          if (!item.$id) {
            return { ...item, $id: 'default' };
          }
          return item;
        });
        
        // Update or add the item for the current state
        const existingIndex = normalizedArray.findIndex(item => item.$id === globalSelectedState);
        
        if (existingIndex >= 0) {
          // Update existing item
          normalizedArray[existingIndex] = { 
            ...normalizedArray[existingIndex], 
            ...updates, 
            $id: globalSelectedState 
          };
        } else {
          // Add new item for this state
          normalizedArray.push({ ...updates, $id: globalSelectedState });
        }
        
        handleChange(normalizedArray);
      };
      
      return (
        <div className="space-y-4">
          {!hideTitle && schema.title && (
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700">{schema.title}</h4>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                State: {globalSelectedState}
              </span>
            </div>
          )}
          {schema.description && (
            <p className="text-xs text-gray-500">{schema.description}</p>
          )}
          
          <div className="space-y-4">
            {(() => {
              const hasShow = schema.items.properties.show !== undefined;
              const showValue = hasShow ? stateItem?.show ?? true : true;
              
              const sorted = sortPropertiesWithShowFirst(schema.items.properties);
              
              return sorted
                .filter(([propName]) => propName !== '$id')
                .filter(([propName]) => {
                  // Always show the 'show' property
                  if (propName === 'show') return true;
                  // Conditionally show other properties based on 'show' value
                  if (hasShow && !showValue) return false;
                  return true;
                })
                .map(([propName, propSchema]) => {
                  // Add contextual title for known references
                  let contextualTitle = propSchema.title || formatPropertyName(propName);
                  if (propSchema.$ref) {
                    const refName = propSchema.$ref.split('/').pop();
                    if (refName === 'image' && !propSchema.title) {
                      contextualTitle = 'Image Settings';
                    }
                  }
                  
                  return (
                    <SchemaForm
                      key={`${globalSelectedState}-${propName}`}
                      schema={{ ...propSchema, title: contextualTitle }}
                      value={stateItem[propName]}
                      onChange={(newValue) => {
                        handleStateItemChange({ [propName]: newValue });
                      }}
                      schemaLoader={schemaLoader}
                      path={[...path, globalSelectedState, propName]}
                      level={level + 1}
                      hideTitle={false}
                    />
                  );
                });
            })()}
          </div>
        </div>
      );
    } else {
      // Non-state-driven property sections (single-item arrays)
      const itemValue = arrayValue.length > 0 ? arrayValue[0] : {};
      
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
          return (
            <VisualPropertiesRenderer
              schema={resolvedVisualSchema}
              value={starValue}
              onChange={(newValue) => handleChange({ ...objectValue, '*': newValue })}
              schemaLoader={schemaLoader}
              path={[...path, '*']}
              level={level + 1}
            />
          );
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
                          (schema.allOf as any[]).length > 1 && 
                          (schema.allOf as any)[1] &&
                          'properties' in (schema.allOf as any)[1] &&
                          (schema.allOf as any)[1].properties &&
                          !(schema.allOf as any)[1].properties['*']; // Exclude the wrapper level
    
    if (hasVisualAllOf) {
      // Render visual properties using schema-defined sections
      return (
        <VisualPropertiesRenderer
          schema={schema}
          value={objectValue}
          onChange={handleChange}
          schemaLoader={schemaLoader}
          path={path}
          level={level}
        />
      );
    }
    
    // Check if this is a property section (array items with properties)
    const isPropertySection = path.length >= 2 && level >= 2;
    
    // Check if this object needs special visual grouping (like image properties)
    const needsVisualGrouping = schema.properties && (
      (schema.properties.name && schema.properties.url) || // Image object
      (schema.required?.includes('name') && schema.required?.includes('url'))
    );
    
    if (isPropertySection) {
      // Render individual property fields inline
      return renderPropertyFields(schema, objectValue, handleChange, schemaLoader, path, level);
    }
    
    // If this needs visual grouping, wrap in a card
    if (needsVisualGrouping && !hideTitle) {
      return (
        <Card className="p-4 border-l-4 border-l-blue-500">
          <div className="space-y-4">
            {schema.title && (
              <h5 className="text-sm font-medium text-gray-700 mb-3">{schema.title}</h5>
            )}
            {renderDefaultObject(schema, objectValue, handleChange, schemaLoader, path, level)}
          </div>
        </Card>
      );
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
      <PropertyWrapper label={schema.title || ''} path={path}>
        <PropertyInput
          type="text"
          label=""
          value={value || ''}
          onChange={handleChange}
          description={schema.description}
          path={path}
        />
      </PropertyWrapper>
    );
  }

  if (schema.type === 'number' || schema.type === 'integer') {
    // Check if this is a transparency/percentage field
    const isPercentage = schema.title?.toLowerCase().includes('transparency') ||
                        schema.minimum === 0 && schema.maximum === 1;
    
    // Use inheritance wrapper in visual context
    if (shouldShowInheritance && path.length > 0) {
      // Extract the property path relative to the visual section
      // Path might be like: ['*', 'categoryAxis', '0', 'fontSize']
      // We want just ['fontSize'] for the property lookup
      const propertyPath = path.filter((segment, index) => {
        // Skip array indices and wildcard segments
        return segment !== '*' && segment !== '0' && !(/^\d+$/.test(segment));
      });
      
      return (
        <PropertyWithInheritance
          propertyName={path[path.length - 1]}
          propertyPath={propertyPath}
          value={value}
          onChange={handleChange}
          schema={schema}
          visualType={selectedVisual}
          variant={selectedVariant}
        />
      );
    }
    
    return (
      <PropertyWrapper label="" path={path}>
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
      </PropertyWrapper>
    );
  }

  if (schema.type === 'boolean') {
    // Use inheritance wrapper in visual context
    if (shouldShowInheritance && path.length > 0) {
      // Extract the property path relative to the visual section
      // Path might be like: ['*', 'categoryAxis', '0', 'fontSize']
      // We want just ['fontSize'] for the property lookup
      const propertyPath = path.filter((segment, index) => {
        // Skip array indices and wildcard segments
        return segment !== '*' && segment !== '0' && !(/^\d+$/.test(segment));
      });
      
      return (
        <PropertyWithInheritance
          propertyName={path[path.length - 1]}
          propertyPath={propertyPath}
          value={value}
          onChange={handleChange}
          schema={schema}
          visualType={selectedVisual}
          variant={selectedVariant}
        />
      );
    }
    
    return (
      <PropertyWrapper label="" path={path}>
        <BooleanControl
          label={schema.title || ''}
          value={value || false}
          onChange={handleChange}
          description={schema.description}
          path={path}
        />
      </PropertyWrapper>
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
          if (!isNaN(numValue) && schema.type?.includes('number')) {
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