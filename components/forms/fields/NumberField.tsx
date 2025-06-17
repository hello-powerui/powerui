import React from 'react';
import { createFormField } from '@/components/common/forms/BaseField';
import { Input } from '@/components/ui/input';

export interface NumberFieldProps {
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

const NumberInput: React.FC<{
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  id?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}> = ({ value, onChange, ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <Input
      type="number"
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
};

export const NumberField = createFormField<number, NumberFieldProps>(NumberInput);