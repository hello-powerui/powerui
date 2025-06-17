import React from 'react';
import { BaseField } from '@/components/common/forms/BaseField';
import { Switch } from '@/components/ui/switch';

export interface BooleanFieldProps {
  label: string;
  name: string;
  value: boolean;
  onChange: (value: boolean) => void;
  error?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
}

export const BooleanField: React.FC<BooleanFieldProps> = ({
  label,
  name,
  value,
  onChange,
  disabled,
  ...props
}) => {
  return (
    <BaseField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      {...props}
    >
      <div className="flex items-center space-x-2">
        <Switch
          id={name}
          checked={value}
          onCheckedChange={onChange}
          disabled={disabled}
        />
        <label
          htmlFor={name}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {value ? 'Enabled' : 'Disabled'}
        </label>
      </div>
    </BaseField>
  );
};