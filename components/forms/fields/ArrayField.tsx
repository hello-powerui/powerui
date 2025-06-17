import React from 'react';
import { BaseField } from '@/components/common/forms/BaseField';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ArrayFieldProps {
  label: string;
  name: string;
  value: any[];
  onChange: (value: any[]) => void;
  error?: string;
  description?: string;
  itemSchema?: any;
  minItems?: number;
  maxItems?: number;
  renderItem?: (value: any, index: number, onChange: (value: any) => void) => React.ReactNode;
}

export const ArrayField: React.FC<ArrayFieldProps> = ({
  label,
  name,
  value = [],
  onChange,
  itemSchema,
  minItems = 0,
  maxItems,
  renderItem,
  ...props
}) => {
  const handleAdd = () => {
    const newItem = itemSchema?.default ?? '';
    onChange([...value, newItem]);
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, newValue: any) => {
    const updated = [...value];
    updated[index] = newValue;
    onChange(updated);
  };

  const canAdd = !maxItems || value.length < maxItems;
  const canRemove = value.length > minItems;

  return (
    <BaseField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...props}
    >
      <div className="space-y-2">
        {value.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex-1">
              {renderItem ? (
                renderItem(item, index, (v) => handleItemChange(index, v))
              ) : (
                <input
                  type="text"
                  value={String(item)}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  className={cn(
                    'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm',
                    'shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium',
                    'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1',
                    'focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                  )}
                />
              )}
            </div>
            {canRemove && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => handleRemove(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
        
        {canAdd && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleAdd}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Item
          </Button>
        )}
      </div>
    </BaseField>
  );
};