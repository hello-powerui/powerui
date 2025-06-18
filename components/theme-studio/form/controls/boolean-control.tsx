'use client';

import { Label } from '@/components/ui/label';

interface BooleanControlProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  description?: string;
  required?: boolean;
  path: string[];
  inline?: boolean;
}

export function BooleanControl({
  label,
  value,
  onChange,
  description,
  required,
  path,
  inline = false,
}: BooleanControlProps) {
  // Ensure value is a boolean
  const isChecked = Boolean(value);
  
  const handleToggle = () => {
    onChange(!isChecked);
  };
  
  if (inline) {
    return (
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={path.join('-')} className="text-[11px] font-medium text-gray-700 w-[120px] flex-shrink-0 cursor-pointer">
          {label}
          {required && <span className="text-[10px] text-red-500 ml-0.5">*</span>}
        </Label>
        <button
          id={path.join('-')}
          type="button"
          role="switch"
          aria-checked={isChecked}
          onClick={handleToggle}
          title={description}
          className={`
            relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0
            ${isChecked ? 'bg-gray-900' : 'bg-gray-200'}
          `}
        >
          <span
            className={`
              inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-sm
              ${isChecked ? 'translate-x-[18px]' : 'translate-x-0.5'}
            `}
          />
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <Label htmlFor={path.join('-')} className="text-[11px] font-medium cursor-pointer">
          {label}
          {required && <span className="text-[10px] text-red-500 ml-0.5">*</span>}
        </Label>
        <button
          id={path.join('-')}
          type="button"
          role="switch"
          aria-checked={isChecked}
          onClick={handleToggle}
          className={`
            relative inline-flex h-5 w-9 items-center rounded-full transition-colors
            ${isChecked ? 'bg-gray-900' : 'bg-gray-200'}
          `}
        >
          <span
            className={`
              inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-sm
              ${isChecked ? 'translate-x-[18px]' : 'translate-x-0.5'}
            `}
          />
        </button>
      </div>

      {description && (
        <p className="text-[10px] text-gray-500">{description}</p>
      )}
    </div>
  );
}