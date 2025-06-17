'use client';

import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { getContextualTitle } from '@/lib/theme-studio/utils/schema-form-utils';

interface PropertySectionProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  schemaLoader: SchemaLoader;
  path: string[];
  level: number;
  hideTitle?: boolean;
  SchemaForm: React.ComponentType<any>;
}

export function PropertySection({
  schema,
  value,
  onChange,
  schemaLoader,
  path,
  level,
  hideTitle,
  SchemaForm
}: PropertySectionProps) {
  const arrayValue = Array.isArray(value) ? value : [{}];
  const itemValue = arrayValue.length > 0 ? arrayValue[0] : {};
  
  return (
    <div className="space-y-4">
      {!hideTitle && schema.title && (
        <h4 className="text-sm font-medium text-gray-700">{schema.title}</h4>
      )}
      {schema.description && (
        <p className="text-xs text-gray-500">{schema.description}</p>
      )}
      
      {/* Render the properties from the items schema */}
      <div className="space-y-4">
        {Object.entries(schema.items?.properties || {}).map(([propName, propSchema]) => {
          const contextualTitle = getContextualTitle(propSchema, propName);
          
          return (
            <SchemaForm
              key={propName}
              schema={{ ...propSchema, title: contextualTitle }}
              value={itemValue[propName]}
              onChange={(newValue: any) => {
                const newItemValue = { ...itemValue, [propName]: newValue };
                onChange([newItemValue]);
              }}
              schemaLoader={schemaLoader}
              path={[...path, '0', propName]}
              level={level + 1}
              hideTitle={false}
            />
          );
        })}
      </div>
    </div>
  );
}