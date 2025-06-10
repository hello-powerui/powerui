'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { useThemeAdvancedStore } from '@/lib/stores/theme-advanced-store';

interface FillControlProps {
  label: string;
  value: any;
  onChange: (value: any) => void;
  description?: string;
  required?: boolean;
  path: string[];
}

type FillType = 'solid' | 'gradient' | 'pattern' | 'theme';

export function FillControl({
  label,
  value,
  onChange,
  description,
  required,
  path,
}: FillControlProps) {
  // Determine current fill type
  const getFillType = (): FillType => {
    if (!value || typeof value !== 'object') return 'solid';
    if (value.solid) return 'solid';
    if (value.gradient) return 'gradient';
    if (value.pattern) return 'pattern';
    if (value.expr?.ThemeDataColor) return 'theme';
    return 'solid';
  };

  const [fillType, setFillType] = useState<FillType>(getFillType());
  const currentTheme = useThemeAdvancedStore((state) => state.currentTheme);
  const themeColors = currentTheme.dataColors || [];

  // Get current color value
  const getCurrentColor = (): string => {
    if (!value) return '#000000';
    
    if (fillType === 'solid' && value.solid?.color) {
      // Check if it's a theme reference
      if (typeof value.solid.color === 'object' && value.solid.color.expr?.ThemeDataColor) {
        const colorId = value.solid.color.expr.ThemeDataColor.ColorId;
        return themeColors[colorId] || '#000000';
      }
      return value.solid.color;
    }
    
    if (fillType === 'theme' && value.expr?.ThemeDataColor) {
      const colorId = value.expr.ThemeDataColor.ColorId;
      return themeColors[colorId] || '#000000';
    }
    
    return '#000000';
  };

  const handleFillTypeChange = (newType: FillType) => {
    setFillType(newType);
    
    switch (newType) {
      case 'solid':
        onChange({ solid: { color: '#000000' } });
        break;
      case 'theme':
        onChange({ solid: { color: { expr: { ThemeDataColor: { ColorId: 0 } } } } });
        break;
      case 'gradient':
        onChange({ gradient: { startColor: '#000000', endColor: '#FFFFFF' } });
        break;
      case 'pattern':
        onChange({ pattern: { patternKind: 'dotted', color: '#000000' } });
        break;
    }
  };

  const handleColorChange = (color: string) => {
    if (fillType === 'solid') {
      onChange({ solid: { color } });
    }
  };

  const handleThemeColorSelect = (colorIndex: number) => {
    onChange({ 
      solid: { 
        color: { 
          expr: { 
            ThemeDataColor: { 
              ColorId: colorIndex 
            } 
          } 
        } 
      } 
    });
  };

  const handleGradientChange = (field: 'startColor' | 'endColor', color: string) => {
    if (fillType === 'gradient' && value.gradient) {
      onChange({
        gradient: {
          ...value.gradient,
          [field]: color,
        },
      });
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium">{label}</Label>
        {required && (
          <span className="text-xs text-red-500">*</span>
        )}
      </div>

      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}

      {/* Fill Type Selector */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded">
        <button
          type="button"
          onClick={() => handleFillTypeChange('theme')}
          className={`flex-1 px-2 py-1 text-xs rounded transition-colors ${
            fillType === 'theme' 
              ? 'bg-white shadow-sm text-gray-900' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Theme
        </button>
        <button
          type="button"
          onClick={() => handleFillTypeChange('solid')}
          className={`flex-1 px-2 py-1 text-xs rounded transition-colors ${
            fillType === 'solid' 
              ? 'bg-white shadow-sm text-gray-900' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Solid
        </button>
        <button
          type="button"
          onClick={() => handleFillTypeChange('gradient')}
          className={`flex-1 px-2 py-1 text-xs rounded transition-colors ${
            fillType === 'gradient' 
              ? 'bg-white shadow-sm text-gray-900' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Gradient
        </button>
      </div>

      {/* Theme Color Selector */}
      {fillType === 'theme' && (
        <div>
          <p className="text-xs text-gray-600 mb-2">Select from theme colors:</p>
          <div className="grid grid-cols-8 gap-2">
            {themeColors.map((color, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleThemeColorSelect(index)}
                className={`w-8 h-8 rounded border-2 transition-all ${
                  value?.solid?.color?.expr?.ThemeDataColor?.ColorId === index
                    ? 'border-gray-900 scale-110'
                    : 'border-gray-300 hover:border-gray-500'
                }`}
                style={{ backgroundColor: color }}
                title={`Theme color ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Solid Color Picker */}
      {fillType === 'solid' && (
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={getCurrentColor()}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={getCurrentColor()}
            onChange={(e) => handleColorChange(e.target.value)}
            placeholder="#000000"
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      )}

      {/* Gradient Picker */}
      {fillType === 'gradient' && value.gradient && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label className="text-xs w-16">Start:</Label>
            <input
              type="color"
              value={value.gradient.startColor || '#000000'}
              onChange={(e) => handleGradientChange('startColor', e.target.value)}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={value.gradient.startColor || '#000000'}
              onChange={(e) => handleGradientChange('startColor', e.target.value)}
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-xs w-16">End:</Label>
            <input
              type="color"
              value={value.gradient.endColor || '#FFFFFF'}
              onChange={(e) => handleGradientChange('endColor', e.target.value)}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={value.gradient.endColor || '#FFFFFF'}
              onChange={(e) => handleGradientChange('endColor', e.target.value)}
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}