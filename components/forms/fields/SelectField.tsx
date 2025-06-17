import React from 'react';
import { createFormField } from '@/components/common/forms/BaseField';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface SelectFieldProps {
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

const SelectInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  id?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}> = ({ value, onChange, disabled, options, placeholder }) => {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const SelectField = createFormField<string, SelectFieldProps>(SelectInput);