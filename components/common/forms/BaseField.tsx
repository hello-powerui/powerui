import React from 'react';
import { cn } from '@/lib/utils';

export interface BaseFieldProps<T = unknown> {
  label: string;
  name: string;
  value: T;
  onChange: (value: T) => void;
  error?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function BaseField<T = unknown>({
  label,
  name,
  error,
  description,
  required,
  disabled,
  className,
  children,
}: BaseFieldProps<T>) {
  return (
    <div className={cn('space-y-2', className)}>
      <label 
        htmlFor={name}
        className={cn(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {description && (
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      
      <div className="relative">
        {children}
      </div>
      
      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// Higher-order component for creating form fields
export function createFormField<T, P = {}>(
  Component: React.ComponentType<{
    value: T;
    onChange: (value: T) => void;
    disabled?: boolean;
    id?: string;
  } & P>
) {
  const FormFieldComponent = React.forwardRef<
    HTMLElement,
    Omit<BaseFieldProps<T>, 'children'> & P
  >(({ label, name, value, onChange, error, description, required, disabled, className, ...props }, ref) => {
    return (
      <BaseField
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        error={error}
        description={description}
        required={required}
        disabled={disabled}
        className={className}
      >
        <Component
          ref={ref as any}
          id={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...(props as P)}
        />
      </BaseField>
    );
  });
  
  FormFieldComponent.displayName = `FormField(${Component.displayName || Component.name || 'Component'})`;
  
  return FormFieldComponent;
}