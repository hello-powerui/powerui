'use client';

import { useThemeStudioStore, useThemeBuilderStore } from '@/lib/stores/theme-studio-store';
import { ModernColorPicker } from '@/components/ui/modern-color-picker';

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
  const neutralPalette = useThemeBuilderStore((state) => state.theme.neutralPalette);
  
  return (
    <ModernColorPicker
      label={label}
      description={description}
      value={value}
      onChange={onChange}
      dataColors={currentTheme.dataColors || []}
      mode={currentTheme.mode || 'light'}
      neutralPalette={neutralPalette?.shades as Record<string, string> | undefined}
    />
  );
}