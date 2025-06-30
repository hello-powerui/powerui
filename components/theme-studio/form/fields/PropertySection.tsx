'use client';

import { useCallback, useMemo } from 'react';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { getContextualTitle } from '@/lib/theme-studio/utils/schema-form-utils';
import { ConnectedProperty } from '../../ui/connected-property';
import { THEME_STUDIO_TYPOGRAPHY } from '../../constants/typography';

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
  // Don't memoize these values - let them update on every render
  const arrayValue = Array.isArray(value) ? value : [{}];
  const itemValue = arrayValue.length > 0 ? arrayValue[0] : {};
  
  // Memoize the property change handler
  const handlePropertyChange = useCallback((propName: string, newValue: any) => {
    const currentArrayValue = Array.isArray(value) ? value : [{}];
    const currentItemValue = currentArrayValue.length > 0 ? currentArrayValue[0] : {};
    const newItemValue = { ...currentItemValue, [propName]: newValue };
    onChange([newItemValue]);
  }, [value, onChange]);
  
  return (
    <div className="space-y-2">
      {!hideTitle && schema.title && (
        <h4 className={`${THEME_STUDIO_TYPOGRAPHY.sectionHeader.size} font-semibold text-gray-700`}>{schema.title}</h4>
      )}
      {schema.description && (
        <p className={`${THEME_STUDIO_TYPOGRAPHY.description.size} ${THEME_STUDIO_TYPOGRAPHY.description.color}`}>{schema.description}</p>
      )}
      
      {/* Render the properties from the items schema */}
      <div className="space-y-3">
        {(() => {
          const entries = Object.entries(schema.items?.properties || {});
          return entries.map(([propName, propSchema], index) => {
            const fullPath = [...path, '0', propName];
            const contextualTitle = getContextualTitle(propSchema, propName, fullPath);
            const isLast = index === entries.length - 1;
            
            return (
              <ConnectedProperty key={propName} isLast={isLast}>
                <SchemaForm
                  schema={{ ...propSchema, title: contextualTitle }}
                  value={itemValue[propName]}
                  onChange={(newValue: any) => handlePropertyChange(propName, newValue)}
                  schemaLoader={schemaLoader}
                  path={fullPath}
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