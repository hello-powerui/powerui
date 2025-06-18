'use client';

import { useState } from 'react';
import { PropertyWrapper } from '../property-wrapper';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FONT_SIZE_PRESETS, pointsToPixels } from '@/lib/theme-studio/font-registry';

interface FontSizeFieldProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  path: string[];
}

const PRESET_SIZES = [
  { value: 8, label: 'XS (8pt)' },
  { value: 9, label: 'Small (9pt)' },
  { value: 10, label: 'Base (10pt)' },
  { value: 12, label: 'Medium (12pt)' },
  { value: 14, label: 'Large (14pt)' },
  { value: 16, label: 'XL (16pt)' },
  { value: 20, label: 'XXL (20pt)' },
  { value: 45, label: 'Display (45pt)' },
];

export function FontSizeField({ schema, value, onChange, path }: FontSizeFieldProps) {
  const [isCustom, setIsCustom] = useState(() => {
    const numValue = Number(value);
    return numValue && !PRESET_SIZES.some(preset => preset.value === numValue);
  });

  const handlePresetChange = (selectedValue: string) => {
    if (selectedValue === 'custom') {
      setIsCustom(true);
    } else {
      setIsCustom(false);
      onChange(Number(selectedValue));
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(e.target.value);
    if (!isNaN(numValue) && numValue > 0) {
      onChange(numValue);
    }
  };

  const currentValue = Number(value) || 12;
  const pixelValue = pointsToPixels(currentValue);

  return (
    <PropertyWrapper 
      label={schema.title || 'Font Size'} 
      path={path}
      description={schema.description}
    >
      <div className="space-y-2">
        {!isCustom ? (
          <Select 
            value={String(currentValue)} 
            onValueChange={handlePresetChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PRESET_SIZES.map(size => (
                <SelectItem key={size.value} value={String(size.value)}>
                  {size.label}
                </SelectItem>
              ))}
              <SelectItem value="custom">Custom...</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <div className="flex gap-2">
            <Input
              type="number"
              min="1"
              max="100"
              value={currentValue}
              onChange={handleCustomChange}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsCustom(false);
                // Find closest preset
                const closest = PRESET_SIZES.reduce((prev, curr) => 
                  Math.abs(curr.value - currentValue) < Math.abs(prev.value - currentValue) ? curr : prev
                );
                onChange(closest.value);
              }}
            >
              Presets
            </Button>
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          {currentValue}pt ({pixelValue}px)
        </p>
      </div>
    </PropertyWrapper>
  );
}