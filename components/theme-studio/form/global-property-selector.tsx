'use client';

import { useState, useMemo, useEffect } from 'react';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { cn } from '@/lib/utils';
import { X, Plus, Search, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SchemaForm } from './schema-form';
import { CollapsibleSection } from '../ui/collapsible-section';

interface GlobalPropertySelectorProps {
  schemaLoader: SchemaLoader;
  // Parent component should provide the full visualStyles object
  visualStyles?: any;
  onVisualStylesChange?: (visualStyles: any) => void;
}

interface ExtractedProperty {
  name: string;
  title: string;
  description?: string;
  schema: SchemaProperty;
}

// Removed formatPropertyName function - we'll use property names directly

export function GlobalPropertySelector({
  schemaLoader,
  visualStyles,
  onVisualStylesChange
}: GlobalPropertySelectorProps) {
  const [showPropertyPicker, setShowPropertyPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComplexProperties, setSelectedComplexProperties] = useState<string[]>([]);

  // Dynamically extract structured and complex properties
  const { structuredProperties, complexProperties } = useMemo(() => {
    const commonCardsSchema = schemaLoader.resolveRef('#/definitions/commonCards');
    const structured: Record<string, any> = {};
    const complex: Record<string, any> = {};
    
    // First, get structured properties from commonCards (background, border, etc.)
    if (commonCardsSchema?.properties) {
      Object.entries(commonCardsSchema.properties).forEach(([key, value]) => {
        if (key !== '*' && key !== 'stylePreset' && value) {
          structured[key] = value;
        }
      });
    }
    
    // Then, extract complex properties from all visual types
    const visualTypes = schemaLoader.getAllVisualTypes();
    const seenProperties = new Set<string>();
    
    // Collect all unique complex properties from all visual types
    visualTypes.forEach(visualType => {
      const visualDef = schemaLoader.getDefinition(`visual-${visualType}`);
      if (visualDef?.allOf?.[1]?.properties) {
        Object.entries(visualDef.allOf[1].properties).forEach(([propName, propSchema]) => {
          // Skip if it's already a structured property from commonCards
          if (!structured[propName] && propSchema && typeof propSchema === 'object') {
            const schema = propSchema as SchemaProperty;
            
            // Check if this is a complex property (array with object items)
            if (schema.type === 'array' && schema.items?.type === 'object') {
              // Add all array properties with object items, not just those with properties
              // This ensures we capture things like gridlineColor, gridlineShow, etc.
              if (!seenProperties.has(propName)) {
                complex[propName] = schema;
                seenProperties.add(propName);
              }
            }
          }
        });
      }
    });
    
    return { structuredProperties: structured, complexProperties: complex };
  }, [schemaLoader]);

  // Helper to check if a property has changes
  const hasPropertyChanges = (propertyName: string): boolean => {
    const value = visualStyles?.['*']?.['*']?.[propertyName];
    return value !== undefined && value !== null;
  };

  // Helper to reset a property
  const handleResetProperty = (propertyName: string) => {
    if (onVisualStylesChange && visualStyles?.['*']?.['*']) {
      const newGlobalProps = { ...visualStyles['*']['*'] };
      delete newGlobalProps[propertyName];
      
      const newVisualStyles = {
        ...visualStyles,
        '*': {
          ...visualStyles['*'],
          '*': newGlobalProps
        }
      };
      onVisualStylesChange(newVisualStyles);
    }
  };

  // Initialize selected complex properties based on what's in visualStyles
  useEffect(() => {
    const globalProps = visualStyles?.['*']?.['*'] || {};
    const complexKeys = Object.keys(complexProperties || {});
    const currentComplexProps = Object.keys(globalProps).filter(key => 
      complexKeys.includes(key) && globalProps[key] !== undefined
    );
    setSelectedComplexProperties(currentComplexProps);
  }, [visualStyles, complexProperties]);

  // Filter complex properties based on search query
  const filteredComplexProperties = useMemo(() => {
    const complexEntries = Object.entries(complexProperties);
    if (!searchQuery.trim()) {
      return complexEntries;
    }
    
    const query = searchQuery.toLowerCase();
    return complexEntries.filter(([propName, schema]) => 
      propName.toLowerCase().includes(query) ||
      (schema as any).title?.toLowerCase().includes(query) ||
      (schema as any).description?.toLowerCase().includes(query)
    );
  }, [complexProperties, searchQuery]);

  const handleAddComplexProperty = (propertyName: string) => {
    if (!selectedComplexProperties.includes(propertyName)) {
      setSelectedComplexProperties([...selectedComplexProperties, propertyName]);
      
      // Update visualStyles to include this property at the global level
      if (onVisualStylesChange) {
        // Initialize with empty object for complex properties
        const newVisualStyles = {
          ...visualStyles,
          '*': {
            ...visualStyles?.['*'],
            '*': {
              ...visualStyles?.['*']?.['*'],
              [propertyName]: [{}]
            }
          }
        };
        onVisualStylesChange(newVisualStyles);
      }
    }
    setShowPropertyPicker(false);
    setSearchQuery('');
  };

  const handleRemoveComplexProperty = (propertyName: string) => {
    setSelectedComplexProperties(selectedComplexProperties.filter(p => p !== propertyName));
    
    // Remove the property from visualStyles
    if (onVisualStylesChange && visualStyles?.['*']?.['*']) {
      const newGlobalProps = { ...visualStyles['*']['*'] };
      delete newGlobalProps[propertyName];
      
      const newVisualStyles = {
        ...visualStyles,
        '*': {
          ...visualStyles['*'],
          '*': newGlobalProps
        }
      };
      onVisualStylesChange(newVisualStyles);
    }
  };

  return (
    <div className="space-y-6">
      {/* Structured Properties (Background, Border, etc.) */}
      {Object.keys(structuredProperties).length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Global Visual Sections</h4>
          {Object.entries(structuredProperties).map(([key, schema]) => {
            const sectionSchema = schema as any;
            const sectionTitle = key; // Use property name directly
            
            return (
              <CollapsibleSection
                key={key}
                title={sectionTitle}
                defaultOpen={false}
              >
                <SchemaForm
                  schema={sectionSchema || {}}
                  value={visualStyles?.['*']?.['*']?.[key] || [{}]}
                  onChange={(newValue) => {
                    // Update at the *.*.property level
                    if (onVisualStylesChange) {
                      const newVisualStyles = {
                        ...visualStyles,
                        '*': {
                          ...visualStyles?.['*'],
                          '*': {
                            ...visualStyles?.['*']?.['*'],
                            [key]: newValue
                          }
                        }
                      };
                      onVisualStylesChange(newVisualStyles);
                    }
                  }}
                  schemaLoader={schemaLoader}
                  path={['visualStyles', '*', '*', key]}
                />
              </CollapsibleSection>
            );
          })}
        </div>
      )}
      
      {/* Global Properties (Complex Properties - CategoryAxis, ValueAxis, etc.) */}
      {selectedComplexProperties.length > 0 ? (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Global Properties</h4>
          {selectedComplexProperties.map(propertyName => {
            const schema = complexProperties[propertyName];
            if (!schema) return null;
            
            const sectionSchema = schema as any;
            const hasChanges = hasPropertyChanges(propertyName);
            
            return (
              <CollapsibleSection
                key={propertyName}
                title={propertyName}  // Always use property name
                defaultOpen={false}
                hasChanges={hasChanges}
                headerAction={
                  <div className="flex items-center gap-2">
                    {hasChanges && (
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResetProperty(propertyName);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            e.stopPropagation();
                            handleResetProperty(propertyName);
                          }
                        }}
                        className="text-xs text-gray-600 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
                      >
                        Reset
                      </div>
                    )}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveComplexProperty(propertyName);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveComplexProperty(propertyName);
                        }
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </div>
                  </div>
                }
              >
                <SchemaForm
                  schema={sectionSchema || {}}
                  value={visualStyles?.['*']?.['*']?.[propertyName] || [{}]}
                  onChange={(newValue) => {
                    // Update at the *.*.property level
                    if (onVisualStylesChange) {
                      const newVisualStyles = {
                        ...visualStyles,
                        '*': {
                          ...visualStyles?.['*'],
                          '*': {
                            ...visualStyles?.['*']?.['*'],
                            [propertyName]: newValue
                          }
                        }
                      };
                      onVisualStylesChange(newVisualStyles);
                    }
                  }}
                  schemaLoader={schemaLoader}
                  path={['visualStyles', '*', '*', propertyName]}
                />
              </CollapsibleSection>
            );
          })}
        </div>
      ) : (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Global Properties</h4>
          <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-md">
            <p className="text-gray-500 mb-2">No global properties configured</p>
            <p className="text-sm text-gray-400">Use the button below to add properties</p>
          </div>
        </div>
      )}

      {/* Add Global Property Button */}
      <div className="relative">
        <button
          onClick={() => setShowPropertyPicker(!showPropertyPicker)}
          className="w-full px-4 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Global Property
        </button>

        {/* Property Picker Dropdown */}
        {showPropertyPicker && (
          <>
            {/* Close on click outside - moved outside dropdown container */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => {
                setShowPropertyPicker(false);
                setSearchQuery('');
              }}
            />
            
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
              {/* Search bar */}
              <div className="p-3 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    autoFocus
                  />
                </div>
              </div>
              
              {/* Properties list */}
              <div className="max-h-80 overflow-y-auto p-3">
                {filteredComplexProperties.length > 0 ? (
                  <div className="space-y-1">
                    {filteredComplexProperties.map(([propName, schema]) => {
                      const isSelected = selectedComplexProperties.includes(propName);
                      
                      return (
                        <button
                          key={propName}
                          onClick={() => !isSelected && handleAddComplexProperty(propName)}
                          disabled={isSelected}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                            isSelected
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "hover:bg-gray-50 text-gray-700"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium font-mono">{propName}</span>
                            {isSelected && (
                              <Badge variant="secondary" className="text-xs">Added</Badge>
                            )}
                          </div>
                          {(schema as any).description && (
                            <p className="text-xs text-gray-500 mt-0.5">{(schema as any).description}</p>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">No properties found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Info box */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
        <div className="flex items-start gap-2">
          <div className="text-gray-600 mt-0.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-700 font-medium">How Global Visual Properties Work</p>
            <p className="text-xs text-gray-600 mt-1">
              Global properties let you define visual styling that applies to all visuals in your report. 
              Complex properties like <strong>categoryAxis</strong>, <strong>valueAxis</strong>, <strong>legend</strong>, and <strong>dataPoint</strong> 
              contain multiple sub-properties (e.g., gridlines, fonts, colors) that can be configured globally.
            </p>
            <p className="text-xs text-gray-600 mt-1">
              These settings use the pattern <code className="bg-gray-100 px-1 rounded">visualStyles.*.*.propertyName</code> in the theme JSON.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}