'use client';

import { forwardRef } from 'react';
import { Input, InputProps } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea, TextareaProps } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type LabelProps = React.ComponentPropsWithoutRef<typeof Label>;

// Theme Studio specific form controls with consistent styling

export const StudioInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <Input
      ref={ref}
      className={cn("h-8 text-sm", className)}
      {...props}
    />
  )
);
StudioInput.displayName = 'StudioInput';

export const StudioLabel = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <Label
      ref={ref}
      className={cn("text-xs font-medium text-gray-700", className)}
      {...props}
    />
  )
);
StudioLabel.displayName = 'StudioLabel';

// Re-export Select components with consistent styling applied at usage
export { Select as StudioSelect } from '@/components/ui/select';
export { SelectContent as StudioSelectContent } from '@/components/ui/select';
export { SelectItem as StudioSelectItem } from '@/components/ui/select';
export { SelectValue as StudioSelectValue } from '@/components/ui/select';

// StudioSelectTrigger with consistent styling
export const StudioSelectTrigger = forwardRef<
  React.ElementRef<typeof SelectTrigger>,
  React.ComponentPropsWithoutRef<typeof SelectTrigger>
>(({ className, ...props }, ref) => (
  <SelectTrigger
    ref={ref}
    className={cn("h-8 text-sm", className)}
    {...props}
  />
));
StudioSelectTrigger.displayName = 'StudioSelectTrigger';

export const StudioTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <Textarea
      ref={ref}
      className={cn("text-sm", className)}
      {...props}
    />
  )
);
StudioTextarea.displayName = 'StudioTextarea';