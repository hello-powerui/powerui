import React from 'react';
import { createFormField } from '@/components/common/forms/BaseField';
import { Input } from '@/components/ui/input';

export interface TextFieldProps {
  placeholder?: string;
  maxLength?: number;
  pattern?: string;
}

// Wrapper to adapt Input's onChange to our field interface
const TextInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  id?: string;
} & TextFieldProps> = ({ onChange, ...props }) => {
  return (
    <Input
      {...props}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export const TextField = createFormField<string, TextFieldProps>(TextInput);