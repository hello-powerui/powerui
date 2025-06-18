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
  
  const [selectedTab, setSelectedTab] = React.useState(() => getInitialTab());
  
  // Initialize theme color selection based on current value
  const getInitialThemeColor = (): number | null => {
    if (!value) return null;
    
    if (typeof value === 'object' && 'solid' in value && value.solid) {
      const color = value.solid.color;
      if (typeof color === 'object' && color.expr?.ThemeDataColor?.ColorId !== undefined) {
        return color.expr.ThemeDataColor.ColorId;
      }
    } else if (typeof value === 'object' && 'themeColor' in value && value.themeColor) {
      return value.themeColor.id;
    }
    return null;
  };
  
  const getInitialShade = (): number => {
    if (!value) return 0;
    
    if (typeof value === 'object' && 'themeColor' in value && value.themeColor) {
      return value.themeColor.shade || 0;
    }
    return 0;
  };
  
  const [selectedThemeColor, setSelectedThemeColor] = React.useState<number | null>(() => getInitialThemeColor());
  const [selectedShade, setSelectedShade] = React.useState(() => getInitialShade());
  
  // Helper function to get display value (internal use before component functions are defined)
  function getDisplayValueInternal(): string {
    if (!value) return '';
    
    if (typeof value === 'string') {
      return value;
    } else if (typeof value === 'object' && 'solid' in value && value.solid) {
      const color = value.solid.color;
      if (!color) return '';
      if (typeof color === 'string') return color;
      if (typeof color === 'object' && color.expr?.ThemeDataColor?.ColorId !== undefined) {
        const colorId = color.expr.ThemeDataColor.ColorId;
        return colorId < themeColors.length ? `Theme Color ${colorId + 1}` : '';
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
  const getDisplayValue = (): string => {
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
        return colorId < themeColors.length ? `Theme Color ${colorId + 1}` : '';
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
  };

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
      const resolved = resolveToken(displayValue, mode, { neutral: neutralObj, dataColors: [] });
      return resolved || '#000000';
    }
    if (displayValue.startsWith('Theme')) {
      const match = displayValue.match(/Color (\d+)/);
      if (match) {
        const colorIndex = parseInt(match[1]) - 1;
        return themeColors[colorIndex] || '#000000';
      }
    }
    return '#E5E7EB'; // Light gray as fallback
  };

  // Format value based on format prop
  const formatValue = (rawValue: any): UnifiedColorValue => {
    if (!rawValue) return format === 'simple' ? '' : format === 'powerbi' ? { solid: { color: '' } } : { color: '' };
    
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
          return { solid: { color: { expr: { ThemeDataColor: { ColorId: rawValue } } } } };
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

  const handleThemeColorSelect = (colorId: number) => {
    setSelectedThemeColor(colorId);
    if (enableShades) {
      setSelectedTab('theme');
    } else {
      handleColorChange(format === 'themestudio' ? { themeColor: { id: colorId, shade: 0 } } : colorId);
    }
  };

  const handleShadeSelect = (shade: number) => {
    setSelectedShade(shade);
    if (selectedThemeColor !== null) {
      handleColorChange({ themeColor: { id: selectedThemeColor, shade } });
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
      
      // Extract theme color ID from display value
      const match = displayValue.match(/Color (\d+)/);
      if (match) {
        const colorId = parseInt(match[1]) - 1;
        setSelectedThemeColor(colorId);
      }
    } else if (displayValue.startsWith('#')) {
      setSelectedTab('custom');
    }
    
    // Update theme color selection
    const themeColorId = getInitialThemeColor();
    if (themeColorId !== null) {
      setSelectedThemeColor(themeColorId);
    }
    
    // Update shade
    const shade = getInitialShade();
    setSelectedShade(shade);
  }, [value, enableTokens, enableThemeColors]);

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
      <Popover open={open} onOpenChange={setOpen}>
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
        <PopoverContent className="w-[320px] p-0 overflow-hidden" align="start">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${availableTabs.length}, 1fr)` }}>
              {enableTokens && <TabsTrigger value="tokens">Tokens</TabsTrigger>}
              <TabsTrigger value="custom">Custom</TabsTrigger>
              {enableThemeColors && <TabsTrigger value="theme">Theme</TabsTrigger>}
            </TabsList>
            
            {enableTokens && (
              <TabsContent value="tokens" className="p-3 space-y-3 max-h-[400px] flex flex-col">
                <div className="relative flex-shrink-0">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tokens..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-0">
                  {Object.entries(filteredTokens).map(([category, tokens]) => (
                    <div key={category}>
                      <p className="text-xs font-medium text-muted-foreground mb-2">
                        {category}
                      </p>
                      <div className="grid grid-cols-2 gap-1">
                        {tokens.map((token) => {
                          // Convert neutralPalette array to proper shade keys
                          // Standard shade values: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
                          const shadeKeys = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
                          const neutralObj = neutralPalette && neutralPalette.length > 0
                            ? Object.fromEntries(neutralPalette.slice(0, shadeKeys.length).map((color, i) => [shadeKeys[i], color]))
                            : {};
                          const resolvedColor = resolveToken(token, mode, { neutral: neutralObj, dataColors: [] });
                          return (
                            <Button
                              key={token}
                              variant="ghost"
                              size="sm"
                              className="justify-start gap-2 h-8 px-2"
                              onClick={() => handleColorChange(token)}
                            >
                              <div
                                className="h-4 w-4 rounded border border-gray-200 shrink-0"
                                style={{ backgroundColor: resolvedColor || '#000' }}
                              />
                              <span className="text-xs truncate">{token}</span>
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}
            
            <TabsContent value="custom" className="p-3 space-y-3">
              <div className="space-y-2">
                <Label>Hex Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={(() => {
                      const display = getDisplayValue();
                      return display.startsWith('#') ? display : '#000000';
                    })()}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-16 h-9 p-1 cursor-pointer"
                  />
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
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Preset Colors</Label>
                <div className="grid grid-cols-6 gap-1">
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color}
                      className="h-8 w-full rounded border-2 border-gray-200 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(color)}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {enableThemeColors && (
              <TabsContent value="theme" className="p-3 space-y-3">
                <div className="space-y-2">
                  <Label>Theme Colors</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {themeColors.map((color, index) => (
                      <Button
                        key={index}
                        variant={selectedThemeColor === index ? "default" : "outline"}
                        size="sm"
                        className="justify-start gap-2"
                        onClick={() => handleThemeColorSelect(index)}
                      >
                        <div
                          className="h-4 w-4 rounded border border-gray-200"
                          style={{ backgroundColor: color }}
                        />
                        <span>Color {index + 1}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                {enableShades && selectedThemeColor !== null && (
                  <div className="space-y-2">
                    <Label>Shade Adjustment</Label>
                    <div className="grid grid-cols-3 gap-1">
                      {SHADE_OPTIONS.map((option) => (
                        <Button
                          key={option.value}
                          variant={selectedShade === option.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleShadeSelect(option.value)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            )}
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
}