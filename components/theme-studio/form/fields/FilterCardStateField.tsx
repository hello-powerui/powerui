'use client';

import React from 'react';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { sortPropertiesWithShowFirst, getContextualTitle } from '@/lib/theme-studio/utils/schema-form-utils';
import { useThemeChanges } from '@/lib/hooks/use-theme-changes';
import { ConnectedProperty } from '../../ui/connected-property';
import { Card } from '@/components/ui/card';

interface FilterCardStateFieldProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  schemaLoader: SchemaLoader;
  path: string[];
  level: number;
  hideTitle?: boolean;
  SchemaForm: React.ComponentType<any>;
}

export function FilterCardStateField({
  schema,
  value,
  onChange,
  schemaLoader,
  path,
  level,
  hideTitle,
  SchemaForm
}: FilterCardStateFieldProps) {
  const trackChangeRef = useThemeChanges(state => state.trackChange);
  
  // States for filterCard
  const [selectedState, setSelectedState] = React.useState<'Available' | 'Applied'>('Available');
  
  const arrayValue = Array.isArray(value) ? value : [{}];
  
  // Get or create the item for the selected state
  let stateItem = arrayValue.find(item => item.$id === selectedState);
  const isNewItem = !stateItem;
  if (!stateItem) {
    stateItem = { $id: selectedState };
  }

  const handleStateItemChange = (updates: any) => {
    let workingArray = [...arrayValue];
    
    const existingIndex = workingArray.findIndex(item => item.$id === selectedState);
    
    if (existingIndex >= 0) {
      workingArray[existingIndex] = { 
        ...workingArray[existingIndex], 
        ...updates, 
        $id: selectedState 
      };
    } else {
      workingArray.push({ ...updates, $id: selectedState });
    }
    
    onChange(workingArray);
  };
  
  return (
    <div className="space-y-2">
      {!hideTitle && schema.title && (
        <h4 className="text-sm font-medium text-gray-700">{schema.title}</h4>
      )}
      {schema.description && (
        <p className="text-xs text-gray-500">{schema.description}</p>
      )}
      
      {/* State selector */}
      <Card className="p-3 border-gray-200 shadow-sm">
        <div className="space-y-2">
          <div>
            <h3 className="text-xs font-semibold text-gray-900">Filter Card States</h3>
            <p className="text-xs text-gray-600 mt-0.5">
              Configure appearance for available and applied filters
            </p>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => setSelectedState('Available')}
              className={`
                px-3 py-1.5 text-xs font-medium rounded transition-all
                ${selectedState === 'Available'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                }
              `}
            >
              Available
            </button>
            <button
              onClick={() => setSelectedState('Applied')}
              className={`
                px-3 py-1.5 text-xs font-medium rounded transition-all
                ${selectedState === 'Applied'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                }
              `}
            >
              Applied
            </button>
          </div>
        </div>
      </Card>
      
      <div className="space-y-2">
        {(() => {
          const sorted = sortPropertiesWithShowFirst(schema.items?.properties || {});
          const filtered = sorted.filter(([propName]) => propName !== '$id');

          return filtered
            .map(([propName, propSchema], index) => {
              const fullPath = [...path, selectedState, propName];
              const contextualTitle = getContextualTitle(propSchema, propName, fullPath);
              const isLast = index === filtered.length - 1;

              return (
                <ConnectedProperty key={`${selectedState}-${propName}`} isLast={isLast}>
                  <SchemaForm
                    schema={{ ...propSchema, title: contextualTitle }}
                    value={stateItem[propName]}
                    onChange={(newValue: any) => {
                      handleStateItemChange({ [propName]: newValue });
                    }}
                    schemaLoader={schemaLoader}
                    path={[...path, selectedState, propName]}
                    level={level + 1}
                    hideTitle={false}
                  />
                </ConnectedProperty>
              );
            });
        })()}
      </div>
    </div>
  );
}