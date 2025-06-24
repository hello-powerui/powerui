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
  // For inline layout
  inline?: boolean;
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
  inline = false,
}: NumberControlProps) {
  const handleChange = (newValue: string) => {
    const parsed = parseFloat(newValue);
    if (!isNaN(parsed)) {
      // Always pass the literal value entered by the user
      onChange(parsed);
    }
  };

  const displayValue = value?.toString() || '0';

  if (inline) {
    return (
      <div className="flex items-center gap-3">
        <Label htmlFor={path.join('-')} className="text-sm font-medium text-gray-700 min-w-[100px] flex-shrink-0">
          {label}
          {required && <span className="text-xs text-red-500 ml-0.5">*</span>}
        </Label>
        <div className="flex items-center gap-1.5 flex-1">
          <Input
            id={path.join('-')}
            type="number"
            value={displayValue}
            onChange={(e) => handleChange(e.target.value)}
            min={isPercentage ? 0 : min}
            max={isPercentage ? 100 : max}
            step={isPercentage ? 1 : step}
            className="h-8 text-sm px-2.5 hover:border-gray-400 focus:ring-2 focus:ring-black focus:border-blue-500 transition-colors"
            title={description}
          />
          {isPercentage && (
            <span className="text-sm text-gray-600">%</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1">
        <Label htmlFor={path.join('-')} className="text-sm font-medium text-gray-700">
          {label}
        </Label>
        {required && (
          <span className="text-[10px] text-red-500">*</span>
        )}
      </div>

      {description && (
        <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
      )}

      <div className="flex items-center gap-1.5">
        <Input
          id={path.join('-')}
          type="number"
          value={displayValue}
          onChange={(e) => handleChange(e.target.value)}
          min={isPercentage ? 0 : min}
          max={isPercentage ? 100 : max}
          step={isPercentage ? 1 : step}
          className="flex-1 h-8 text-sm px-2.5 hover:border-gray-400 focus:ring-2 focus:ring-black focus:border-blue-500 transition-colors"
        />
        {isPercentage && (
          <span className="text-sm text-gray-600">%</span>
        )}
      </div>

      {/* Optional slider for bounded values */}
      {min !== undefined && max !== undefined && (
        <input
          type="range"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          min={isPercentage ? 0 : min}
          max={isPercentage ? 100 : max}
          step={isPercentage ? 1 : step}
          className="w-full h-1"
        />
      )}
    </div>
  );
}