import { useState, useCallback, useEffect } from 'react';

export interface FormFieldOptions<T> {
  name: string;
  defaultValue: T;
  validate?: (value: T) => string | undefined;
  required?: boolean;
  requiredMessage?: string;
}

export interface FormFieldResult<T> {
  value: T;
  error: string | undefined;
  touched: boolean;
  isDirty: boolean;
  isValid: boolean;
  setValue: (value: T) => void;
  setError: (error: string | undefined) => void;
  setTouched: (touched: boolean) => void;
  validate: () => boolean;
  reset: () => void;
  bind: {
    value: T;
    onChange: (value: T) => void;
    onBlur: () => void;
    name: string;
    'aria-invalid': boolean;
    'aria-describedby': string | undefined;
  };
}

export function useFormField<T>({
  name,
  defaultValue,
  validate,
  required,
  requiredMessage = 'This field is required',
}: FormFieldOptions<T>): FormFieldResult<T> {
  const [value, setValue] = useState<T>(defaultValue);
  const [error, setError] = useState<string | undefined>();
  const [touched, setTouched] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Validate on value change
  useEffect(() => {
    if (touched) {
      validateField();
    }
  }, [value, touched]);

  const validateField = useCallback((): boolean => {
    // Required validation
    if (required && !value) {
      setError(requiredMessage);
      return false;
    }

    // Custom validation
    if (validate) {
      const validationError = validate(value);
      setError(validationError);
      return !validationError;
    }

    setError(undefined);
    return true;
  }, [value, validate, required, requiredMessage]);

  const handleChange = useCallback((newValue: T) => {
    setValue(newValue);
    setIsDirty(true);
  }, []);

  const handleBlur = useCallback(() => {
    setTouched(true);
  }, []);

  const reset = useCallback(() => {
    setValue(defaultValue);
    setError(undefined);
    setTouched(false);
    setIsDirty(false);
  }, [defaultValue]);

  const isValid = !error;
  const errorId = error ? `${name}-error` : undefined;

  return {
    value,
    error,
    touched,
    isDirty,
    isValid,
    setValue,
    setError,
    setTouched,
    validate: validateField,
    reset,
    bind: {
      value,
      onChange: handleChange,
      onBlur: handleBlur,
      name,
      'aria-invalid': !!error,
      'aria-describedby': errorId,
    },
  };
}

// Validation helpers
export const validators = {
  required: (message = 'This field is required') => 
    (value: any) => !value ? message : undefined,

  minLength: (min: number, message?: string) => 
    (value: string) => value.length < min 
      ? message || `Must be at least ${min} characters` 
      : undefined,

  maxLength: (max: number, message?: string) => 
    (value: string) => value.length > max 
      ? message || `Must be at most ${max} characters` 
      : undefined,

  pattern: (pattern: RegExp, message: string) => 
    (value: string) => !pattern.test(value) ? message : undefined,

  email: (message = 'Invalid email address') => 
    (value: string) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) 
      ? message 
      : undefined,

  hexColor: (message = 'Invalid hex color') => 
    (value: string) => !/^#[0-9A-Fa-f]{6}$/.test(value) 
      ? message 
      : undefined,

  number: (min?: number, max?: number) => 
    (value: number) => {
      if (min !== undefined && value < min) {
        return `Must be at least ${min}`;
      }
      if (max !== undefined && value > max) {
        return `Must be at most ${max}`;
      }
      return undefined;
    },

  compose: (...validators: Array<(value: any) => string | undefined>) => 
    (value: any) => {
      for (const validator of validators) {
        const error = validator(value);
        if (error) return error;
      }
      return undefined;
    },
};