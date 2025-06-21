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
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={path.join('-')} className="text-sm font-medium text-gray-700 min-w-[100px] flex-shrink-0 cursor-pointer">
          {label}
          {required && <span className="text-xs text-red-500 ml-0.5">*</span>}
        </Label>
        <button
          id={path.join('-')}
          type="button"
          role="switch"
          aria-checked={isChecked}
          onClick={handleToggle}
          title={description}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 flex-shrink-0
            focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
            ${isChecked ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-200 hover:bg-gray-300'}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm
              ${isChecked ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <Label htmlFor={path.join('-')} className="text-sm font-medium cursor-pointer">
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
            relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
            ${isChecked ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-200 hover:bg-gray-300'}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm
              ${isChecked ? 'translate-x-6' : 'translate-x-1'}
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