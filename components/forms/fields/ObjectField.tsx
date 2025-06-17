import React from 'react';
import { BaseField } from '@/components/common/forms/BaseField';
import { Card } from '@/components/ui/card';

export interface ObjectFieldProps {
  label: string;
  name: string;
  value: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  error?: string;
  description?: string;
  properties?: Record<string, any>;
  required?: string[];
  renderProperty?: (key: string, schema: any, value: any, onChange: (value: any) => void) => React.ReactNode;
}

export const ObjectField: React.FC<ObjectFieldProps> = ({
  label,
  name,
  value = {},
  onChange,
  properties = {},
  required = [],
  renderProperty,
  ...props
}) => {
  const handlePropertyChange = (key: string, newValue: any) => {
    onChange({
      ...value,
      [key]: newValue,
    });
  };

  return (
    <BaseField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...props}
    >
      <Card className="p-4">
        <div className="space-y-4">
          {Object.entries(properties).map(([key, schema]) => (
            <div key={key}>
              {renderProperty ? (
                renderProperty(
                  key,
                  schema,
                  value[key],
                  (v) => handlePropertyChange(key, v)
                )
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {schema.title || key}
                    {required.includes(key) && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {schema.description && (
                    <p className="text-sm text-muted-foreground">{schema.description}</p>
                  )}
                  <input
                    type="text"
                    value={value[key] || ''}
                    onChange={(e) => handlePropertyChange(key, e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </BaseField>
  );
};