'use client';

import { useState } from 'react';
import { PropertyWrapper } from '../property-wrapper';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { StudioSelect, StudioSelectContent, StudioSelectItem, StudioSelectTrigger, StudioSelectValue } from '@/components/theme-studio/ui/form-controls';
import { StudioInput } from '@/components/theme-studio/ui/form-controls';
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
      inline={true}
    >
      <div className="flex items-center gap-2 flex-1">
        {!isCustom ? (
          <StudioSelect 
            value={String(currentValue)} 
            onValueChange={handlePresetChange}
          >
            <StudioSelectTrigger className="w-full">
              <StudioSelectValue />
            </StudioSelectTrigger>
            <StudioSelectContent>
              {PRESET_SIZES.map(size => (
                <StudioSelectItem key={size.value} value={String(size.value)} className="text-xs">
                  {size.label}
                </StudioSelectItem>
              ))}
              <StudioSelectItem value="custom" className="text-xs">Custom...</StudioSelectItem>
            </StudioSelectContent>
          </StudioSelect>
        ) : (
          <div className="flex gap-1 flex-1">
            <StudioInput
              type="number"
              min="1"
              max="100"
              value={currentValue}
              onChange={handleCustomChange}
              className="flex-1 px-2"
              title={`${currentValue}pt (${pixelValue}px)`}
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
              className="h-8 px-2 text-sm"
            >
              Presets
            </Button>
          </div>
        )}
        <span className="text-[10px] text-gray-500 flex-shrink-0">
          {pixelValue}px
        </span>
      </div>
    </PropertyWrapper>
  );
}