'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

interface BasePropertyInputProps {
  label: string;
  description?: string;
  required?: boolean;
  error?: string;
  path: string[];
}

interface TextPropertyInputProps extends BasePropertyInputProps {
  type: 'text';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}

interface NumberPropertyInputProps extends BasePropertyInputProps {
  type: 'number';
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

interface BooleanPropertyInputProps extends BasePropertyInputProps {
  type: 'boolean';
  value: boolean;
  onChange: (value: boolean) => void;
}

interface SelectPropertyInputProps extends BasePropertyInputProps {
  type: 'select';
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}

type PropertyInputProps = 
  | TextPropertyInputProps 
  | NumberPropertyInputProps 
  | BooleanPropertyInputProps 
  | SelectPropertyInputProps;

export function PropertyInput(props: PropertyInputProps) {
  const { label, description, required, error, path } = props;
  const inputId = path.join('-');

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={inputId} className="text-sm font-medium">
          {label}
        </Label>
        {required && (
          <Badge variant="secondary" className="text-xs px-1 py-0">
            Required
          </Badge>
        )}
      </div>

      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}

      {props.type === 'text' && (
        props.multiline ? (
          <Textarea
            id={inputId}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={props.placeholder}
            className="w-full"
          />
        ) : (
          <Input
            id={inputId}
            type="text"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={props.placeholder}
            className="w-full"
          />
        )
      )}

      {props.type === 'number' && (
        <Input
          id={inputId}
          type="number"
          value={props.value}
          onChange={(e) => props.onChange(parseFloat(e.target.value) || 0)}
          min={props.min}
          max={props.max}
          step={props.step}
          className="w-full"
        />
      )}

      {props.type === 'boolean' && (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={inputId}
            checked={props.value}
            onChange={(e) => props.onChange(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor={inputId} className="text-sm text-gray-600 cursor-pointer">
            {props.value ? 'Enabled' : 'Disabled'}
          </Label>
        </div>
      )}

      {props.type === 'select' && (
        <select
          id={inputId}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}