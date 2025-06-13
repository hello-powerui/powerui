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
  const currentTheme = useThemeStudioStore((state) => state.currentTheme);
  const neutralPalette = useThemeStudioStore((state) => state.theme.neutralPalette);
  
  return (
    <UnifiedColorPicker
      label={label}
      description={description}
      value={value}
      onChange={onChange}
      format="powerbi"
      enableTokens={true}
      enableThemeColors={true}
      mode={currentTheme.mode || 'light'}
      neutralPalette={Object.values(neutralPalette?.shades || {}) as string[]}
    />
  );
}