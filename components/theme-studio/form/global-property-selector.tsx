'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { cn } from '@/lib/utils';
import { X, Plus, Search, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SchemaForm } from './schema-form';
import { CollapsibleSection } from '../ui/collapsible-section';
import { hasActualContent, cleanupVisualStyles } from '@/lib/utils/theme-helpers';

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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<'above' | 'below'>('below');

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
    return hasActualContent(value);
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
      onVisualStylesChange(cleanupVisualStyles(newVisualStyles));
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

  // Calculate dropdown position when opening
  useEffect(() => {
    if (showPropertyPicker && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = 400; // Approximate height of dropdown
      
      // Check if there's enough space below
      const spaceBelow = viewportHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;
      
      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        setDropdownPosition('above');
      } else {
        setDropdownPosition('below');
      }
    }
  }, [showPropertyPicker]);

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
        onVisualStylesChange(cleanupVisualStyles(newVisualStyles));
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
      onVisualStylesChange(cleanupVisualStyles(newVisualStyles));
    }
  };

  return (
    <div className="space-y-6">
      {/* Structured Properties (Background, Border, etc.) */}
      {Object.keys(structuredProperties).length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Global Visual Sections</h4>
          <div className="-space-y-px">
            {Object.entries(structuredProperties).map(([key, schema]) => {
              const sectionSchema = schema as any;
              // Use the title from the schema if available, otherwise format the key
              const sectionTitle = sectionSchema.title || 
                key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim();
              
              const hasContent = hasActualContent(visualStyles?.['*']?.['*']?.[key]);
              
              return (
                <CollapsibleSection
                  key={key}
                  title={sectionTitle}
                  defaultOpen={false}
                  hasContent={hasContent}
                  onClear={() => {
                    // Clear this structured property
                    if (onVisualStylesChange) {
                      const newGlobalProps = { ...visualStyles?.['*']?.['*'] };
                      delete newGlobalProps[key];
                      
                      // Check if global props is now empty
                      if (Object.keys(newGlobalProps).length === 0) {
                        // Remove the entire * visual if no global props remain
                        const newVisualStyles = { ...visualStyles };
                        delete newVisualStyles['*'];
                        onVisualStylesChange(newVisualStyles);
                      } else {
                        const newVisualStyles = {
                          ...visualStyles,
                          '*': {
                            ...visualStyles?.['*'],
                            '*': newGlobalProps
                          }
                        };
                        onVisualStylesChange(newVisualStyles);
                      }
                    }
                  }}
                  clearMessage={`Clear all ${sectionTitle.toLowerCase()} settings?`}
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
                        onVisualStylesChange(cleanupVisualStyles(newVisualStyles));
                      }
                    }}
                    schemaLoader={schemaLoader}
                    path={['visualStyles', '*', '*', key]}
                    hideTitle={true}
                  />
                </CollapsibleSection>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Global Properties (Complex Properties - CategoryAxis, ValueAxis, etc.) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-700">Custom Global Properties</h4>
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={() => setShowPropertyPicker(!showPropertyPicker)}
              className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              title="Add global property"
            >
              <Plus className="w-4 h-4" />
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
                
                <div className={cn(
                  "absolute right-0 bg-white rounded-md shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden w-80",
                  dropdownPosition === 'above' ? "bottom-full mb-2" : "top-full mt-2"
                )}>
                  {/* Search bar */}
                  <div className="p-3 border-b border-gray-200">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search properties..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-blue-500"
                        onClick={(e) => e.stopPropagation()}
                        autoFocus
                      />
                    </div>
                  </div>
                  
                  {/* Property list */}
                  <div className="max-h-80 overflow-y-auto">
                    {Object.entries(complexProperties)
                      .filter(([name]) => 
                        name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                        !selectedComplexProperties.includes(name)
                      )
                      .map(([name, schema]) => (
                        <button
                          key={name}
                          onClick={() => {
                            handleAddComplexProperty(name);
                            setShowPropertyPicker(false);
                            setSearchQuery('');
                          }}
                          className="w-full px-4 py-2.5 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
                        >
                          <div className="font-medium text-sm text-gray-900">{name}</div>
                          {(schema as any).description && (
                            <div className="text-xs text-gray-500 mt-0.5">{(schema as any).description}</div>
                          )}
                        </button>
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        {selectedComplexProperties.length > 0 ? (
          <div className="-space-y-px">
          {selectedComplexProperties.map(propertyName => {
            const schema = complexProperties[propertyName];
            if (!schema) return null;
            
            const sectionSchema = schema as any;
            const hasPropertyContent = hasPropertyChanges(propertyName);
            
            return (
              <CollapsibleSection
                key={propertyName}
                title={propertyName}  // Always use property name
                defaultOpen={false}
                onClear={() => handleResetProperty(propertyName)}
                hasContent={hasPropertyContent}
                clearMessage={`Clear all ${propertyName} settings?`}
                headerAction={
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
                    title="Remove property"
                  >
                    <X className="w-4 h-4" />
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
                      onVisualStylesChange(cleanupVisualStyles(newVisualStyles));
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
          <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-md">
            <p className="text-sm text-gray-500 mb-1">No custom global properties configured</p>
            <p className="text-xs text-gray-400">Click the + button above to add properties</p>
          </div>
        )}
      </div>

    </div>
  );
}