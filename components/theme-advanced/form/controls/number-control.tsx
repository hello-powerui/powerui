'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface NumberControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  description?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  path: string[];
  // For percentage values
  isPercentage?: boolean;
}

export function NumberControl({
  label,
  value,
  onChange,
  description,
  required,
  min,
  max,
  step = 1,
  path,
  isPercentage = false,
}: NumberControlProps) {
  const handleChange = (newValue: string) => {
    const parsed = parseFloat(newValue);
    if (!isNaN(parsed)) {
      if (isPercentage) {
        // Convert percentage to decimal (0-100 -> 0-1)
        onChange(parsed / 100);
      } else {
        onChange(parsed);
      }
    }
  };

  const displayValue = isPercentage ? (value * 100).toFixed(0) : value?.toString() || '0';

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={path.join('-')} className="text-sm font-medium">
          {label}
        </Label>
        {required && (
          <span className="text-xs text-red-500">*</span>
        )}
      </div>

      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}

      <div className="flex items-center gap-2">
        <Input
          id={path.join('-')}
          type="number"
          value={displayValue}
          onChange={(e) => handleChange(e.target.value)}
          min={isPercentage ? 0 : min}
          max={isPercentage ? 100 : max}
          step={isPercentage ? 1 : step}
          className="flex-1"
        />
        {isPercentage && (
          <span className="text-sm text-gray-600">%</span>
        )}
      </div>

      {/* Optional slider for bounded values */}
      {min !== undefined && max !== undefined && (
        <input
          type="range"
          value={isPercentage ? value * 100 : value}
          onChange={(e) => handleChange(e.target.value)}
          min={isPercentage ? 0 : min}
          max={isPercentage ? 100 : max}
          step={isPercentage ? 1 : step}
          className="w-full"
        />
      )}
    </div>
  );
}