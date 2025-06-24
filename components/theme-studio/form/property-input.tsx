'use client';

import { 
  StudioInput as Input, 
  StudioLabel as Label,
  StudioTextarea as Textarea,
  StudioSelect as Select,
  StudioSelectContent as SelectContent,
  StudioSelectItem as SelectItem,
  StudioSelectTrigger as SelectTrigger,
  StudioSelectValue as SelectValue
} from '@/components/theme-studio/ui/form-controls';
import { Badge } from '@/components/ui/badge';

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
    <div className="space-y-0.5">
      <div className="flex items-center gap-1">
        <Label htmlFor={inputId}>
          {label}
        </Label>
        {required && (
          <span className="text-[10px] text-red-500">*</span>
        )}
      </div>

      {props.type === 'text' && (
        props.multiline ? (
          <Textarea
            id={inputId}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={props.placeholder}
            className="w-full h-16 resize-none px-3 py-2"
            title={description}
          />
        ) : (
          <Input
            id={inputId}
            type="text"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={props.placeholder}
            className="w-full px-3"
            title={description}
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
          className="w-full h-8 text-sm px-3"
          title={description}
        />
      )}

      {props.type === 'boolean' && (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={inputId}
            checked={props.value}
            onChange={(e) => props.onChange(e.target.checked)}
            className="h-3 w-3 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
          />
          <Label htmlFor={inputId} className="text-gray-600 cursor-pointer" title={description}>
            {props.value ? 'Enabled' : 'Disabled'}
          </Label>
        </div>
      )}

      {props.type === 'select' && (
        <Select value={props.value} onValueChange={props.onChange}>
          <SelectTrigger id={inputId} className="w-full" title={description}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {props.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {error && (
        <p className="text-[10px] text-red-500">{error}</p>
      )}
    </div>
  );
}