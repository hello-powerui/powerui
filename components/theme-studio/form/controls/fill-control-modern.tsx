'use client';

import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { UnifiedColorPicker } from '@/components/ui/unified-color-picker';

interface FillControlProps {
  label: string;
  value: any;
  onChange: (value: any) => void;
  description?: string;
  required?: boolean;
  path: string[];
}

export function FillControl({
  label,
  value,
  onChange,
  description,
  required,
  path,
}: FillControlProps) {
  const theme = useThemeStudioStore((state) => state.theme);
  const neutralPalette = useThemeStudioStore((state) => state.resolved.neutralPalette);
  
  // Ensure we have a valid PowerBI color format
  const colorValue = value || { solid: { color: '' } };
  
  return (
    <UnifiedColorPicker
      label={label}
      description={description}
      value={colorValue}
      onChange={onChange}
      format="powerbi"
      enableTokens={true}
      enableThemeColors={true}
      mode={theme.mode || 'light'}
      neutralPalette={Object.values(neutralPalette?.shades || {}) as string[]}
    />
  );
}