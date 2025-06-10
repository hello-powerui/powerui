'use client';

import { Label } from '@/components/ui/label';

interface BooleanControlProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  description?: string;
  required?: boolean;
  path: string[];
}

export function BooleanControl({
  label,
  value,
  onChange,
  description,
  required,
  path,
}: BooleanControlProps) {
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
        </div>
        
        <button
          id={path.join('-')}
          type="button"
          role="switch"
          aria-checked={value}
          onClick={() => onChange(!value)}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors
            ${value ? 'bg-primary' : 'bg-gray-200'}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white transition-transform
              ${value ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>
      </div>

      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
}