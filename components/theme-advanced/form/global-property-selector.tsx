'use client';

import { useState, useMemo } from 'react';
import { SchemaLoader } from '@/lib/theme-advanced/services/schema-loader';
import { SchemaProperty } from '@/lib/theme-advanced/types/schema';
import { cn } from '@/lib/utils';
import { X, Plus, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SchemaForm } from './schema-form';
import { CollapsibleSection } from '../ui/collapsible-section';

interface GlobalPropertySelectorProps {
  value: any;
  onChange: (value: any) => void;
  schemaLoader: SchemaLoader;
  // Parent component should provide the full visualStyles object
  visualStyles?: any;
  onVisualStylesChange?: (visualStyles: any) => void;
}

// Categorized common properties for better organization
const propertyCategories: Record<string, { label: string; icon: string; properties: string[] }> = {
  spacing: {
    label: 'Spacing',
    icon: '↔️',
    properties: [
      'customizeSpacing',
      'spaceBelowTitle',
      'spaceBelowSubTitle',
      'spaceBelowTitleArea',
      'spacing'
    ]
  },
  padding: {
    label: 'Padding',
    icon: '⬜',
    properties: [
      'top',
      'bottom',
      'left',
      'right',
      'padding'
    ]
  },
  text: {
    label: 'Text',
    icon: '🔤',
    properties: [
      'fontFamily',
      'fontSize',
      'fontColor',
      'bold',
      'italic',
      'underline',
      'strikethrough'
    ]
  },
  border: {
    label: 'Border',
    icon: '🔲',
    properties: [
      'border',
      'borderColor',
      'borderRadius',
      'borderStyle',
      'borderWidth'
    ]
  },
  background: {
    label: 'Background',
    icon: '🎨',
    properties: [
      'background',
      'backgroundColor',
      'transparency'
    ]
  },
  visualHeader: {
    label: 'Visual Header',
    icon: '📊',
    properties: [
      'show',
      'foreground',
      'background',
      'border',
      'transparency'
    ]
  },
  other: {
    label: 'Other',
    icon: '⚙️',
    properties: []
  }
};

function formatPropertyName(name: string): string {
  const specialCases: Record<string, string> = {
    'spaceBelowTitle': 'Space Below Title',
    'spaceBelowSubTitle': 'Space Below Subtitle',
    'spaceBelowTitleArea': 'Space Below Title Area',
    'customizeSpacing': 'Customize Spacing',
    'fontFamily': 'Font Family',
    'fontSize': 'Font Size',
    'fontColor': 'Font Color',
    'backgroundColor': 'Background Color',
    'borderColor': 'Border Color',
    'borderRadius': 'Border Radius',
    'borderStyle': 'Border Style',
    'borderWidth': 'Border Width',
  };
  
  return specialCases[name] || 
    name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
}

export function GlobalPropertySelector({
  value,
  onChange,
  schemaLoader,
  visualStyles,
  onVisualStylesChange
}: GlobalPropertySelectorProps) {
  const [selectedProperties, setSelectedProperties] = useState<string[]>(() => {
    // Initialize with properties that have values
    const arrayValue = Array.isArray(value) ? value : [{}];
    const itemValue = arrayValue[0] || {};
    return Object.keys(itemValue).filter(key => itemValue[key] !== undefined);
  });
  
  const [showPropertyPicker, setShowPropertyPicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get the schema for global properties
  const { individualProperties: globalSchema, structuredProperties } = useMemo(() => {
    const commonCardsSchema = schemaLoader.resolveRef('#/definitions/commonCards');
    if (commonCardsSchema?.properties) {
      // Individual properties from the "*" wildcard section
      const individualProperties = commonCardsSchema.properties['*']?.items?.properties || {};
      
      // Structured properties (background, border, etc.)
      const structured: Record<string, any> = {};
      if (commonCardsSchema.properties) {
        Object.keys(commonCardsSchema.properties).forEach(key => {
          if (key !== '*' && commonCardsSchema.properties![key]) {
            structured[key] = commonCardsSchema.properties![key];
          }
        });
      }
      
      return { individualProperties, structuredProperties: structured };
    }
    return { individualProperties: {}, structuredProperties: {} };
  }, [schemaLoader]);

  // Get all available properties and categorize them
  const categorizedProperties = useMemo(() => {
    const allProps = Object.keys(globalSchema);
    const categorized: Record<string, string[]> = {};
    
    // Initialize categories
    Object.keys(propertyCategories).forEach(cat => {
      categorized[cat] = [];
    });

    // Categorize properties
    allProps.forEach(prop => {
      let found = false;
      for (const [cat, config] of Object.entries(propertyCategories)) {
        if ((config.properties as string[]).includes(prop)) {
          categorized[cat].push(prop);
          found = true;
          break;
        }
      }
      if (!found) {
        categorized.other.push(prop);
      }
    });

    return categorized;
  }, [globalSchema]);

  const handleAddProperty = (propertyName: string) => {
    if (!selectedProperties.includes(propertyName)) {
      setSelectedProperties([...selectedProperties, propertyName]);
      
      // Update the value to include this property
      const arrayValue = Array.isArray(value) ? value : [{}];
      const itemValue = arrayValue[0] || {};
      const newItemValue = { ...itemValue, [propertyName]: undefined };
      onChange([newItemValue]);
    }
    setShowPropertyPicker(false);
    setSelectedCategory(null);
  };

  const handleRemoveProperty = (propertyName: string) => {
    setSelectedProperties(selectedProperties.filter(p => p !== propertyName));
    
    // Remove the property from the value
    const arrayValue = Array.isArray(value) ? value : [{}];
    const itemValue = arrayValue[0] || {};
    const { [propertyName]: _, ...rest } = itemValue;
    onChange([rest]);
  };

  const handlePropertyChange = (propertyName: string, newValue: any) => {
    const arrayValue = Array.isArray(value) ? value : [{}];
    const itemValue = arrayValue[0] || {};
    const newItemValue = { ...itemValue, [propertyName]: newValue };
    onChange([newItemValue]);
  };

  // Get current values
  const arrayValue = Array.isArray(value) ? value : [{}];
  const itemValue = arrayValue[0] || {};

  return (
    <div className="space-y-6">
      {/* Structured Properties (Background, Border, etc.) */}
      {Object.keys(structuredProperties).length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Global Visual Sections</h4>
          {Object.entries(structuredProperties).map(([key, schema]) => {
            const sectionSchema = schema as any;
            const sectionTitle = sectionSchema.title || formatPropertyName(key);
            
            return (
              <CollapsibleSection
                key={key}
                title={sectionTitle}
                defaultOpen={false}
              >
                <SchemaForm
                  schema={sectionSchema.items || {}}
                  value={visualStyles?.['*']?.['*']?.[key]?.[0] || {}}
                  onChange={(newValue) => {
                    // Update at the *.*.property level
                    if (onVisualStylesChange) {
                      const newVisualStyles = {
                        ...visualStyles,
                        '*': {
                          ...visualStyles?.['*'],
                          '*': {
                            ...visualStyles?.['*']?.['*'],
                            [key]: [newValue]
                          }
                        }
                      };
                      onVisualStylesChange(newVisualStyles);
                    }
                  }}
                  schemaLoader={schemaLoader}
                  path={['visualStyles', '*', '*', key, '0']}
                />
              </CollapsibleSection>
            );
          })}
        </div>
      )}
      
      {/* Divider if we have both types */}
      {Object.keys(structuredProperties).length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Individual Properties</h4>
        </div>
      )}
      
      {/* Selected Individual Properties */}
      {selectedProperties.length > 0 ? (
        <div className="space-y-4">
          {selectedProperties.map(propertyName => {
            const propertySchema = globalSchema[propertyName];
            if (!propertySchema) return null;

            return (
              <div key={propertyName} className="bg-white rounded-md border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <SchemaForm
                      schema={{ ...propertySchema, title: propertySchema.title || formatPropertyName(propertyName) }}
                      value={itemValue[propertyName]}
                      onChange={(newValue) => handlePropertyChange(propertyName, newValue)}
                      schemaLoader={schemaLoader}
                      path={['visualStyles', '*', '*', '*', '0', propertyName]}
                      hideTitle={false}
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveProperty(propertyName)}
                    className="ml-3 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-md">
          <p className="text-gray-500 mb-2">No individual properties configured</p>
          <p className="text-sm text-gray-400">Use the button below to add properties</p>
        </div>
      )}

      {/* Add Individual Property Button */}
      <div className="relative">
        <button
          onClick={() => setShowPropertyPicker(!showPropertyPicker)}
          className="w-full px-4 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Individual Property
        </button>

        {/* Property Picker Dropdown */}
        {showPropertyPicker && (
          <>
            {/* Close on click outside - moved outside dropdown container */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => {
                setShowPropertyPicker(false);
                setSelectedCategory(null);
              }}
            />
            
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
              {/* Categories */}
              <div className="p-2 border-b border-gray-100">
                <div className="grid grid-cols-3 gap-1">
                  {Object.entries(propertyCategories).map(([key, config]) => {
                    const count = categorizedProperties[key]?.length || 0;
                    if (count === 0 && key === 'other') return null;
                    
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
                        className={cn(
                          "px-3 py-2 rounded-md text-xs font-medium transition-colors flex items-center justify-between",
                          selectedCategory === key
                            ? "bg-gray-900 text-white"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        )}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{config.icon}</span>
                          <span>{config.label}</span>
                        </span>
                        <Badge variant="secondary" className="ml-1 px-1 py-0 text-xs">
                          {count}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Properties List */}
              <div className="max-h-64 overflow-y-auto">
                {selectedCategory ? (
                  <div className="p-2">
                    <div className="mb-2 px-2">
                      <p className="text-xs font-medium text-gray-500">
                        {propertyCategories[selectedCategory].label} Properties
                      </p>
                    </div>
                    <div className="space-y-1">
                      {categorizedProperties[selectedCategory].map(propertyName => {
                        const isSelected = selectedProperties.includes(propertyName);
                        const propertySchema = globalSchema[propertyName];
                        
                        return (
                          <button
                            key={propertyName}
                            onClick={() => !isSelected && handleAddProperty(propertyName)}
                            disabled={isSelected}
                            className={cn(
                              "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                              isSelected
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "hover:bg-gray-50 text-gray-700"
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <span>{formatPropertyName(propertyName)}</span>
                              {isSelected && (
                                <Badge variant="secondary" className="text-xs">Added</Badge>
                              )}
                            </div>
                            {propertySchema?.description && (
                              <p className="text-xs text-gray-500 mt-0.5">{propertySchema.description}</p>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-sm text-gray-500">
                    Select a category to view properties
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
            <p className="text-sm text-gray-700 font-medium">How Global Settings Work</p>
            <p className="text-xs text-gray-600 mt-1">
              <strong>Global Visual Sections</strong> (Background, Border, etc.) provide structured styling options that apply to all visuals.
              <strong> Individual Properties</strong> let you set specific values across all visuals. 
              Both use the pattern <code className="bg-gray-100 px-1 rounded">visualStyles.*.*.*</code> and can be overridden by individual visuals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}