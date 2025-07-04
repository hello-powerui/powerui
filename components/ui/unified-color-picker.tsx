'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ChevronDown, Search } from 'lucide-react';
import { TOKEN_REGISTRY } from '@/lib/theme-generation/token-registry';
import { resolveToken } from '@/lib/theme-generation/token-registry';

// Types for different value formats
export type SimpleColorValue = string;
export type PowerBIColorValue = { solid: { color: any } };
export type ThemeStudioColorValue = { color?: string; themeColor?: { id: number; shade?: number } };
export type UnifiedColorValue = SimpleColorValue | PowerBIColorValue | ThemeStudioColorValue;

export interface UnifiedColorPickerProps {
  value?: UnifiedColorValue;
  onChange?: (value: UnifiedColorValue) => void;
  label?: string;
  description?: string;
  required?: boolean;
  format?: 'simple' | 'powerbi' | 'themestudio';
  enableTokens?: boolean;
  enableThemeColors?: boolean;
  enableShades?: boolean;
  mode?: 'light' | 'dark';
  neutralPalette?: string[];
  brandPalette?: Record<string, string>;
  successPalette?: Record<string, string>;
  warningPalette?: Record<string, string>;
  errorPalette?: Record<string, string>;
  themeColors?: string[];
  className?: string;
  placeholder?: string;
}

const PRESET_COLORS = [
  '#000000', '#FFFFFF', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF',
  '#6B7280', '#4B5563', '#374151', '#1F2937', '#111827', '#030712',
  '#DC2626', '#EF4444', '#F87171', '#F59E0B', '#FDE047', '#84CC16',
  '#22C55E', '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9', '#3B82F6',
  '#6366F1', '#8B5CF6', '#A855F7', '#D946EF', '#EC4899', '#F43F5E',
];

const DEFAULT_THEME_COLORS = [
  '#3B82F6',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#EC4899',
  '#06B6D4',
  '#F97316',
];

const SHADE_OPTIONS = [
  { value: -0.5, label: '-50%' },
  { value: -0.25, label: '-25%' },
  { value: 0, label: 'Base' },
  { value: 0.25, label: '+25%' },
  { value: 0.5, label: '+50%' },
];

export function UnifiedColorPicker({
  value,
  onChange,
  label,
  description,
  required,
  format = 'simple',
  enableTokens = true,
  enableThemeColors = true,
  enableShades = false,
  mode = 'light',
  neutralPalette,
  brandPalette,
  successPalette,
  warningPalette,
  errorPalette,
  themeColors = DEFAULT_THEME_COLORS,
  className,
  placeholder = 'Select color',
}: UnifiedColorPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Initialize tab based on current value
  const getInitialTab = () => {
    const displayValue = getDisplayValueInternal();
    if (displayValue.startsWith('@') && enableTokens) return 'tokens';
    if (displayValue.startsWith('Theme') && enableThemeColors) return 'theme';
    return 'custom';
  };
  
  const [selectedTab, setSelectedTab] = React.useState<string>(() => getInitialTab());
  
  // Initialize theme color selection based on current value
  const getInitialThemeColor = React.useCallback((): number | null => {
    if (!value) return null;
    
    if (typeof value === 'object' && 'solid' in value && value.solid) {
      const color = value.solid.color;
      if (typeof color === 'object' && color.expr?.ThemeDataColor?.ColorId !== undefined) {
        // Convert ColorId back to 0-based index
        const colorId = color.expr.ThemeDataColor.ColorId;
        return colorId >= 2 ? colorId - 2 : null;
      }
    } else if (typeof value === 'object' && 'themeColor' in value && value.themeColor) {
      return value.themeColor.id;
    }
    return null;
  }, [value]);
  
  const getInitialShade = React.useCallback((): number => {
    if (!value) return 0;
    
    if (typeof value === 'object' && 'solid' in value && value.solid) {
      const color = value.solid.color;
      if (typeof color === 'object' && color.expr?.ThemeDataColor?.Percent !== undefined) {
        return color.expr.ThemeDataColor.Percent;
      }
    } else if (typeof value === 'object' && 'themeColor' in value && value.themeColor) {
      return value.themeColor.shade || 0;
    }
    return 0;
  }, [value]);
  
  const [selectedThemeColor, setSelectedThemeColor] = React.useState<number | null>(() => getInitialThemeColor());
  const [selectedShade, setSelectedShade] = React.useState(() => getInitialShade());
  
  // Helper function to get display value (internal use before component functions are defined)
  function getDisplayValueInternal(): string {
    if (!value) return '';
    
    if (typeof value === 'string') {
      return value;
    } else if (typeof value === 'object' && 'solid' in value && value.solid) {
      const color = value.solid.color;
      if (color === undefined || color === null || color === '') return '';
      if (typeof color === 'string') return color;
      if (typeof color === 'object' && color.expr?.ThemeDataColor?.ColorId !== undefined) {
        const colorId = color.expr.ThemeDataColor.ColorId;
        const percent = color.expr.ThemeDataColor.Percent || 0;
        const colorIndex = colorId - 2; // ColorId 2 corresponds to first data color (index 0)
        if (colorIndex >= 0 && colorIndex < themeColors.length) {
          return `Theme Color ${colorIndex + 1}${percent !== 0 ? ` (${percent > 0 ? '+' : ''}${percent * 100}%)` : ''}`;
        }
        return '';
      }
      // Handle other object formats
      if (typeof color === 'object' && 'color' in color) {
        return color.color || '';
      }
      return '';
    } else if (typeof value === 'object' && 'color' in value && value.color) {
      return value.color;
    } else if (typeof value === 'object' && 'themeColor' in value && value.themeColor) {
      const colorId = value.themeColor.id;
      const shade = value.themeColor.shade || 0;
      return colorId < themeColors.length ? `Theme Color ${colorId + 1}${shade !== 0 ? ` (${shade > 0 ? '+' : ''}${shade * 100}%)` : ''}` : '';
    }
    return '';
  }

  // Extract display value based on format
  const getDisplayValue = React.useCallback((): string => {
    if (!value) {
      return '';
    }
    
    if (typeof value === 'string') {
      return value;
    } else if (typeof value === 'object' && 'solid' in value && value.solid) {
      const color = value.solid.color;
      if (color === undefined || color === null || color === '') return '';
      if (typeof color === 'string') return color;
      if (typeof color === 'object' && color.expr?.ThemeDataColor?.ColorId !== undefined) {
        const colorId = color.expr.ThemeDataColor.ColorId;
        const percent = color.expr.ThemeDataColor.Percent || 0;
        const colorIndex = colorId - 2; // ColorId 2 corresponds to first data color (index 0)
        if (colorIndex >= 0 && colorIndex < themeColors.length) {
          return `Theme Color ${colorIndex + 1}${percent !== 0 ? ` (${percent > 0 ? '+' : ''}${percent * 100}%)` : ''}`;
        }
        return '';
      }
      // Handle other object formats
      if (typeof color === 'object' && 'color' in color) {
        return color.color || '';
      }
      return '';
    } else if (typeof value === 'object' && 'color' in value && value.color) {
      return value.color;
    } else if (typeof value === 'object' && 'themeColor' in value && value.themeColor) {
      const colorId = value.themeColor.id;
      const shade = value.themeColor.shade || 0;
      return colorId < themeColors.length ? `Theme Color ${colorId + 1}${shade !== 0 ? ` (${shade > 0 ? '+' : ''}${shade * 100}%)` : ''}` : '';
    }
    return '';
  }, [value, themeColors]);

  // Get preview color
  const getPreviewColor = (): string => {
    const displayValue = getDisplayValue();
    if (!displayValue) {
      // Try to extract color directly from value if display value is empty
      if (value && typeof value === 'object' && 'solid' in value && value.solid?.color) {
        const color = value.solid.color;
        if (typeof color === 'string' && color.startsWith('#')) {
          return color;
        }
      }
      return '#E5E7EB'; // Light gray for empty/undefined
    }
    if (displayValue.startsWith('#')) return displayValue;
    if (displayValue.startsWith('@')) {
      // Convert neutralPalette array to proper shade keys
      const shadeKeys = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
      const neutralObj = neutralPalette && neutralPalette.length > 0
        ? Object.fromEntries(neutralPalette.slice(0, shadeKeys.length).map((color, i) => [shadeKeys[i], color]))
        : {};
      const resolved = resolveToken(displayValue, mode, { 
        neutral: neutralObj, 
        brand: brandPalette || null,
        success: successPalette || null,
        warning: warningPalette || null,
        error: errorPalette || null,
        dataColors: themeColors || [] 
      });
      return resolved || '#000000';
    }
    if (displayValue.startsWith('Theme')) {
      const match = displayValue.match(/Color (\d+)/);
      if (match) {
        const colorIndex = parseInt(match[1]) - 1;
        const baseColor = themeColors[colorIndex] || '#000000';
        
        // Check if there's a shade/percent adjustment
        const shadeMatch = displayValue.match(/\(([+-]?\d+)%\)/);
        if (shadeMatch) {
          const percent = parseInt(shadeMatch[1]) / 100;
          // Apply simple shade adjustment (this is approximate)
          // In production, you'd want to use proper color manipulation
          return baseColor;
        }
        return baseColor;
      }
    }
    return '#E5E7EB'; // Light gray as fallback
  };

  // Format value based on format prop
  const formatValue = (rawValue: any): UnifiedColorValue => {
    if (rawValue === null || rawValue === undefined || rawValue === '') {
      return format === 'simple' ? '' : format === 'powerbi' ? { solid: { color: '' } } : { color: '' };
    }
    
    switch (format) {
      case 'simple':
        return typeof rawValue === 'string' ? rawValue : '';
      case 'powerbi':
        if (typeof rawValue === 'string') {
          if (rawValue.startsWith('@')) {
            return { solid: { color: rawValue } };
          } else {
            return { solid: { color: rawValue } };
          }
        } else if (typeof rawValue === 'number') {
          // rawValue is the theme color index (0-based), convert to ColorId (2+ for data colors)
          return { solid: { color: { expr: { ThemeDataColor: { ColorId: rawValue + 2, Percent: 0 } } } } };
        } else if (typeof rawValue === 'object' && rawValue.themeColor) {
          // Handle theme color with shade
          const colorId = rawValue.themeColor.id + 2; // Convert 0-based index to ColorId
          const percent = rawValue.themeColor.shade || 0;
          return { solid: { color: { expr: { ThemeDataColor: { ColorId: colorId, Percent: percent } } } } };
        }
        return { solid: { color: rawValue } };
      case 'themestudio':
        if (typeof rawValue === 'string') {
          return { color: rawValue };
        } else if (typeof rawValue === 'object' && rawValue.themeColor) {
          return rawValue;
        }
        return { color: rawValue };
      default:
        return rawValue;
    }
  };

  const handleColorChange = (newValue: any) => {
    const formatted = formatValue(newValue);
    onChange?.(formatted);
    setOpen(false);
  };

  const handleThemeColorSelect = (colorIndex: number) => {
    setSelectedThemeColor(colorIndex);
    if (enableShades) {
      // Stay on theme tab to allow shade selection
      setSelectedTab('theme');
    } else {
      // Immediately apply the theme color selection
      if (format === 'powerbi') {
        // For Power BI format, pass the index which will be converted to ColorId
        handleColorChange(colorIndex);
      } else if (format === 'themestudio') {
        handleColorChange({ themeColor: { id: colorIndex, shade: 0 } });
      } else {
        handleColorChange(colorIndex);
      }
    }
  };

  const handleShadeSelect = (shade: number) => {
    setSelectedShade(shade);
    if (selectedThemeColor !== null) {
      if (format === 'powerbi') {
        // For Power BI format, include shade as Percent
        handleColorChange({ themeColor: { id: selectedThemeColor, shade } });
      } else {
        handleColorChange({ themeColor: { id: selectedThemeColor, shade } });
      }
    }
  };

  const filteredTokens = React.useMemo(() => {
    const query = searchQuery.toLowerCase();
    const grouped: Record<string, string[]> = {};
    
    Object.entries(TOKEN_REGISTRY).forEach(([token, definition]) => {
      if (!searchQuery || 
          token.toLowerCase().includes(query) || 
          definition.name.toLowerCase().includes(query) ||
          token.replace(/@|-/g, ' ').toLowerCase().includes(query)) {
        
        if (!grouped[definition.category]) {
          grouped[definition.category] = [];
        }
        grouped[definition.category].push(token);
      }
    });
    
    return grouped;
  }, [searchQuery]);

  const availableTabs = React.useMemo(() => {
    const tabs = ['custom'];
    if (enableTokens) tabs.unshift('tokens');
    if (enableThemeColors) tabs.push('theme');
    return tabs;
  }, [enableTokens, enableThemeColors]);

  React.useEffect(() => {
    if (!availableTabs.includes(selectedTab)) {
      setSelectedTab(availableTabs[0]);
    }
  }, [availableTabs, selectedTab]);
  
  // Update selected theme color and tab when value changes
  React.useEffect(() => {
    const displayValue = getDisplayValue();
    
    // Update tab based on new value
    if (displayValue.startsWith('@') && enableTokens) {
      setSelectedTab('tokens');
    } else if (displayValue.startsWith('Theme') && enableThemeColors) {
      setSelectedTab('theme');
      
      // Extract theme color index from display value
      const match = displayValue.match(/Color (\d+)/);
      if (match) {
        const colorIndex = parseInt(match[1]) - 1;
        setSelectedThemeColor(colorIndex);
      }
    } else if (displayValue.startsWith('#')) {
      setSelectedTab('custom');
    }
    
    // Update theme color selection
    const themeColorId = getInitialThemeColor();
    if (themeColorId !== null) {
      setSelectedThemeColor(themeColorId);
      // Also ensure we're on the theme tab if we have a theme color selected
      if (enableThemeColors) {
        setSelectedTab('theme');
      }
    }
    
    // Update shade
    const shade = getInitialShade();
    setSelectedShade(shade);
  }, [value, enableTokens, enableThemeColors, getDisplayValue, getInitialShade, getInitialThemeColor]);

  return (
    <div className={cn("space-y-2", className)}>
      {(label || required) && (
        <div className="flex items-center gap-2">
          {label && <Label>{label}</Label>}
          {required && <Badge variant="secondary" className="text-xs">Required</Badge>}
        </div>
      )}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      <Popover open={open} onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (newOpen) {
          // When opening, ensure tab matches current value
          const displayValue = getDisplayValue();
          if (displayValue.startsWith('@') && enableTokens) {
            setSelectedTab('tokens');
          } else if (displayValue.startsWith('Theme') && enableThemeColors) {
            setSelectedTab('theme');
          } else if (displayValue.startsWith('#')) {
            setSelectedTab('custom');
          }
        }
      }}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between font-normal", className)}
            suppressHydrationWarning
          >
            <div className="flex items-center gap-1.5">
              <div
                className="h-3.5 w-3.5 rounded border border-gray-300 flex-shrink-0"
                style={{ backgroundColor: getPreviewColor() }}
              />
              <span className="truncate text-left flex-1">
                {getDisplayValue() || placeholder}
              </span>
            </div>
            <ChevronDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[340px] p-0" align="start" sideOffset={4}>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <div className="px-1 pt-1 pb-0">
              <TabsList className="grid w-full h-10 p-1 bg-gray-100/80" style={{ gridTemplateColumns: `repeat(${availableTabs.length}, 1fr)` }}>
                {enableTokens && <TabsTrigger value="tokens" className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">Tokens</TabsTrigger>}
                <TabsTrigger value="custom" className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">Custom</TabsTrigger>
                {enableThemeColors && <TabsTrigger value="theme" className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">Theme</TabsTrigger>}
              </TabsList>
            </div>
            
            {enableTokens && (
              <TabsContent value="tokens" className="mt-0 space-y-0">
                <div className="p-3 pb-0">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-400" />
                    <Input
                      placeholder="Search tokens..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-8 pl-8 text-sm bg-gray-50 border-gray-200 focus:bg-white"
                    />
                  </div>
                </div>
                <div className="max-h-[320px] overflow-y-auto p-3 pt-2">
                  <div className="space-y-4">
                    {Object.entries(filteredTokens).length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-8">No tokens found</p>
                    ) : (
                      Object.entries(filteredTokens).map(([category, tokens]) => (
                        <div key={category}>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                            {category}
                          </p>
                          <div className="grid grid-cols-2 gap-1">
                            {tokens.map((token) => {
                              // Convert neutralPalette array to proper shade keys
                              const shadeKeys = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
                              const neutralObj = neutralPalette && neutralPalette.length > 0
                                ? Object.fromEntries(neutralPalette.slice(0, shadeKeys.length).map((color, i) => [shadeKeys[i], color]))
                                : {};
                              const resolvedColor = resolveToken(token, mode, { 
                                neutral: neutralObj, 
                                brand: brandPalette || null,
                                success: successPalette || null,
                                warning: warningPalette || null,
                                error: errorPalette || null,
                                dataColors: themeColors || [] 
                              });
                              const displayValue = getDisplayValue();
                              const isSelected = displayValue === token;
                              
                              return (
                                <button
                                  key={token}
                                  className={cn(
                                    "flex items-center gap-2 h-8 px-2 rounded text-xs hover:bg-gray-100 transition-colors w-full text-left",
                                    isSelected && "bg-gray-100 font-medium"
                                  )}
                                  onClick={() => handleColorChange(token)}
                                  type="button"
                                >
                                  <div
                                    className="h-4 w-4 rounded border border-gray-200 shrink-0"
                                    style={{ backgroundColor: resolvedColor || '#000' }}
                                  />
                                  <span className="truncate">{token}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </TabsContent>
            )}
            
            <TabsContent value="custom" className="mt-0 p-4 space-y-4">
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Hex Color</Label>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Input
                        type="color"
                        value={(() => {
                          const display = getDisplayValue();
                          return display.startsWith('#') ? display : '#000000';
                        })()}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="w-12 h-9 p-1 cursor-pointer border-gray-200"
                      />
                    </div>
                    <Input
                      type="text"
                      placeholder="#000000"
                      value={(() => {
                        const display = getDisplayValue();
                        return display.startsWith('#') ? display : '';
                      })()}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.match(/^#[0-9A-Fa-f]{0,6}$/)) {
                          handleColorChange(value);
                        }
                      }}
                      className="flex-1 h-9 text-sm font-mono"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Preset Colors</Label>
                  <div className="grid grid-cols-12 gap-1">
                    {PRESET_COLORS.map((color) => {
                      const displayValue = getDisplayValue();
                      const isSelected = displayValue === color;
                      return (
                        <button
                          key={color}
                          className={cn(
                            "h-7 w-full rounded border-2 transition-all",
                            isSelected 
                              ? "border-gray-900 scale-110 shadow-sm" 
                              : "border-gray-200 hover:border-gray-400"
                          )}
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorChange(color)}
                          title={color}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {enableThemeColors && (
              <TabsContent value="theme" className="mt-0 p-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">Theme Colors</Label>
                    {themeColors.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">No theme colors available</p>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {themeColors.map((color, index) => {
                          const isSelected = selectedThemeColor === index;
                          return (
                            <button
                              key={index}
                              className={cn(
                                "flex items-center gap-2 h-9 px-3 rounded text-sm transition-all",
                                isSelected 
                                  ? "bg-gray-900 text-white" 
                                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                              )}
                              onClick={() => handleThemeColorSelect(index)}
                              type="button"
                            >
                              <div
                                className={cn(
                                  "h-4 w-4 rounded border",
                                  isSelected ? "border-white/30" : "border-gray-300"
                                )}
                                style={{ backgroundColor: color }}
                              />
                              <span>Color {index + 1}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  {enableShades && selectedThemeColor !== null && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">Shade Adjustment</Label>
                      <div className="grid grid-cols-5 gap-1">
                        {SHADE_OPTIONS.map((option) => {
                          const isSelected = selectedShade === option.value;
                          return (
                            <button
                              key={option.value}
                              className={cn(
                                "h-8 px-2 rounded text-xs font-medium transition-all",
                                isSelected 
                                  ? "bg-gray-900 text-white" 
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              )}
                              onClick={() => handleShadeSelect(option.value)}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
}