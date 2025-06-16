'use client';

import { Label } from '@/components/ui/label';

interface BooleanControlProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  description?: string;
  required?: boolean;
  path: string[];
  inheritanceIndicator?: React.ReactNode;
  onReset?: () => void;
}

export function BooleanControl({
  label,
  value,
  onChange,
  description,
  required,
  path,
  inheritanceIndicator,
  onReset,
}: BooleanControlProps) {
  // Ensure value is a boolean
  const isChecked = Boolean(value);
  
  const handleToggle = () => {
    onChange(!isChecked);
  };
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label htmlFor={path.join('-')} className="text-sm font-medium cursor-pointer">
            {label}
          </Label>
          {required && (
            <span className="text-xs text-red-500">*</span>
          )}
          {inheritanceIndicator}
        </div>
        
        <div className="flex items-center gap-2">
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="text-xs text-gray-600 hover:text-gray-900 mr-2"
            >
              Reset
            </button>
          )}
          <button
          id={path.join('-')}
          type="button"
          role="switch"
          aria-checked={isChecked}
          onClick={handleToggle}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors
            ${isChecked ? 'bg-gray-900' : 'bg-gray-200'}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm
              ${isChecked ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
          </button>
        </div>
      </div>

      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
}