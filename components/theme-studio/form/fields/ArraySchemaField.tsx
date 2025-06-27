'use client';

import { useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { isVisualPropertySection } from '@/lib/theme-studio/utils/schema-form-utils';
import { StateAwarePropertySection } from './StateAwarePropertySection';
import { PropertySection } from './PropertySection';
import { FilterCardStateField } from './FilterCardStateField';

interface ArraySchemaFieldProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  schemaLoader: SchemaLoader;
  path: string[];
  level: number;
  hideTitle?: boolean;
  SchemaForm: React.ComponentType<any>; // Pass SchemaForm to avoid circular dependency
}

export function ArraySchemaField({ 
  schema, 
  value, 
  onChange, 
  schemaLoader, 
  path, 
  level, 
  hideTitle,
  SchemaForm 
}: ArraySchemaFieldProps) {
  const arrayValue = useMemo(() => Array.isArray(value) ? value : [], [value]);
  
  // Memoize the item change handler
  const handleItemChange = useCallback((index: number, newItem: any) => {
    const newArray = [...arrayValue];
    newArray[index] = newItem;
    onChange(newArray);
  }, [arrayValue, onChange]);
  
  // Memoize the remove handler
  const handleRemoveItem = useCallback((index: number) => {
    const newArray = arrayValue.filter((_, i) => i !== index);
    onChange(newArray);
  }, [arrayValue, onChange]);
  
  // Memoize the add handler
  const handleAddItem = useCallback(() => {
    const newArray = [...arrayValue, {}];
    onChange(newArray);
  }, [arrayValue, onChange]);
  
  // Handle property section arrays (Power BI schema pattern)
  if (schema.items?.type === 'object' && schema.items.properties) {
    // Check if this is a state-driven property (has $id field)
    const hasStateSupport = schema.items.properties.$id !== undefined;
    
    if (hasStateSupport) {
      // Check if this is the filterCard property with Available/Applied states
      const isFilterCard = path[path.length - 1] === 'filterCard' && 
        schema.items.properties.$id?.anyOf?.[0]?.enum?.includes('Available');
      
      if (isFilterCard) {
        return (
          <FilterCardStateField
            schema={schema}
            value={value}
            onChange={onChange}
            schemaLoader={schemaLoader}
            path={path}
            level={level}
            hideTitle={hideTitle}
            SchemaForm={SchemaForm}
          />
        );
      } else {
        return (
          <StateAwarePropertySection
            schema={schema}
            value={value}
            onChange={onChange}
            schemaLoader={schemaLoader}
            path={path}
            level={level}
            hideTitle={hideTitle}
            SchemaForm={SchemaForm}
          />
        );
      }
    } else {
      return (
        <PropertySection
          schema={schema}
          value={value}
          onChange={onChange}
          schemaLoader={schemaLoader}
          path={path}
          level={level}
          hideTitle={hideTitle}
          SchemaForm={SchemaForm}
        />
      );
    }
  }
  
  // Handle true multi-item arrays (not property sections)
  if (schema.items && !isVisualPropertySection(schema)) {
    return (
      <div className="space-y-1.5">
        {!hideTitle && schema.title && (
          <h4 className="text-xs font-semibold text-gray-700">{schema.title}</h4>
        )}
        {schema.description && (
          <p className="text-[10px] text-gray-500 leading-relaxed">{schema.description}</p>
        )}
        <div className="space-y-1.5">
          {arrayValue.map((item, index) => (
            <Card key={index} className="p-2.5">
              <div className="flex justify-between items-start mb-1.5">
                <span className="text-xs font-medium">Item {index + 1}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500 hover:text-red-700 text-xs"
                >
                  Remove
                </button>
              </div>
              {schema.items && (
                <SchemaForm
                  schema={schema.items}
                  value={item}
                  onChange={(newItem: any) => handleItemChange(index, newItem)}
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
            onClick={handleAddItem}
            className="px-2.5 py-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded"
          >
            + Add Item
          </button>
        </div>
      </div>
    );
  }
  
  // Fallback for arrays without items schema
  return (
    <div className="text-gray-500 text-sm">
      Array type without items schema
    </div>
  );
}