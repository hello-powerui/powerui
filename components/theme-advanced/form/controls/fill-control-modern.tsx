'use client';

import { useThemeAdvancedStore } from '@/lib/stores/theme-advanced-store';
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
  const currentTheme = useThemeAdvancedStore((state) => state.currentTheme);
  
  return (
    <ModernColorPicker
      label={label}
      description={description}
      value={value}
      onChange={onChange}
      dataColors={currentTheme.dataColors || []}
      mode={currentTheme.mode || 'light'}
    />
  );
}