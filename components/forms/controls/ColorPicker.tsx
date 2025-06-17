import React, { useState, useCallback } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  variant?: 'compact' | 'full' | 'inline';
  showAlpha?: boolean;
  presets?: string[];
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  variant = 'full',
  showAlpha = false,
  presets = [],
  disabled = false,
  className,
  placeholder = 'Select color',
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleColorChange = useCallback((color: string) => {
    setInputValue(color);
    onChange(color);
  }, [onChange]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Validate hex color
    if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
      onChange(newValue);
    }
  }, [onChange]);

  // Compact variant - just a color swatch
  if (variant === 'compact') {
    return (
      <button
        className={cn(
          'w-8 h-8 rounded border-2 border-gray-300 cursor-pointer',
          'hover:border-gray-400 transition-colors',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        style={{ backgroundColor: value }}
        onClick={() => !disabled && setOpen(true)}
        disabled={disabled}
        aria-label={`Color: ${value}`}
      />
    );
  }

  // Inline variant - no popover, direct input
  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div
          className="w-10 h-10 rounded border border-gray-300"
          style={{ backgroundColor: value }}
        />
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="#000000"
          disabled={disabled}
          className="font-mono"
          maxLength={7}
        />
      </div>
    );
  }

  // Full variant - popover with color picker
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className
          )}
          disabled={disabled}
        >
          <div className="flex items-center gap-2 w-full">
            <div
              className="w-4 h-4 rounded border border-gray-300"
              style={{ backgroundColor: value || '#ffffff' }}
            />
            <span className="flex-1 truncate">
              {value || placeholder}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <div className="space-y-3">
          {/* Color input */}
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded border border-gray-300"
              style={{ backgroundColor: value }}
            />
            <Input
              value={inputValue}
              onChange={handleInputChange}
              placeholder="#000000"
              className="font-mono"
              maxLength={7}
            />
          </div>

          {/* Native color picker */}
          <input
            type="color"
            value={value}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-full h-32 cursor-pointer"
          />

          {/* Preset colors */}
          {presets.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Presets</p>
              <div className="grid grid-cols-8 gap-1">
                {presets.map((color) => (
                  <button
                    key={color}
                    className={cn(
                      'w-6 h-6 rounded border border-gray-300',
                      'hover:scale-110 transition-transform',
                      value === color && 'ring-2 ring-offset-1 ring-blue-500'
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                    aria-label={`Select ${color}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

// Re-export with legacy names for backward compatibility
export const ModernColorPicker = ColorPicker;
export const UnifiedColorPicker = ColorPicker;