'use client';

import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { UnifiedColorPicker } from '@/components/ui/unified-color-picker';
import { Label } from '@/components/ui/label';

interface FillControlProps {
  label: string;
  value: any;
  onChange: (value: any) => void;
  description?: string;
  required?: boolean;
  path: string[];
  inline?: boolean;
}

export function FillControl({
  label,
  value,
  onChange,
  description,
  required,
  path,
  inline = false,
}: FillControlProps) {
  const theme = useThemeStudioStore((state) => state.theme);
  const neutralPalette = useThemeStudioStore((state) => state.resolved.neutralPalette);
  const colorPalette = useThemeStudioStore((state) => state.resolved.colorPalette);
  
  // Ensure we have a valid PowerBI color format
  const colorValue = value || { solid: { color: '' } };
  
  if (inline) {
    return (
      <div className="flex items-center gap-3">
        <Label className="text-sm font-medium text-gray-700 min-w-[100px] flex-shrink-0">
          {label}
          {required && <span className="text-xs text-red-500 ml-0.5">*</span>}
        </Label>
        <div className="flex-1">
          <UnifiedColorPicker
            value={colorValue}
            onChange={onChange}
            format="powerbi"
            enableTokens={true}
            enableThemeColors={true}
            mode={theme.mode || 'light'}
            neutralPalette={(neutralPalette?.colors as string[]) || []}
            themeColors={(colorPalette?.colors as string[]) || []}
            className="[&_button]:h-8 [&_button]:text-sm [&_button]:px-3 [&_button]:hover:border-gray-400 [&_button]:transition-colors"
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-1">
      <Label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-[10px] text-red-500 ml-0.5">*</span>}
      </Label>
      <UnifiedColorPicker
        value={colorValue}
        onChange={onChange}
        format="powerbi"
        enableTokens={true}
        enableThemeColors={true}
        mode={theme.mode || 'light'}
        neutralPalette={(neutralPalette?.colors as string[]) || []}
        themeColors={(colorPalette?.colors as string[]) || []}
        className="[&_button]:h-6 [&_button]:text-[11px] [&_button]:px-2"
      />
    </div>
  );
}