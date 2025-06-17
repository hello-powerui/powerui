import React from 'react';
import { createFormField } from '@/components/common/forms/BaseField';
import { ColorPicker } from '@/components/forms/controls/ColorPicker';

export interface ColorFieldProps {
  presets?: string[];
  showAlpha?: boolean;
  variant?: 'compact' | 'full' | 'inline';
}

export const ColorField = createFormField<string, ColorFieldProps>(ColorPicker);

// Example usage:
// <ColorField
//   label="Background Color"
//   name="backgroundColor"
//   value={color}
//   onChange={setColor}
//   description="Choose a background color for the visual"
//   required
//   presets={['#FF0000', '#00FF00', '#0000FF']}
// />