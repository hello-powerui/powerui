'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  StudioLabel as Label,
  StudioInput as Input,
  StudioSelect as Select,
  StudioSelectContent as SelectContent,
  StudioSelectItem as SelectItem,
  StudioSelectTrigger as SelectTrigger,
  StudioSelectValue as SelectValue
} from '@/components/theme-studio/ui/form-controls';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { FONT_WEIGHTS, getAvailableWeights, AVAILABLE_FONTS } from '@/lib/theme-studio/font-registry';
import { resolveToken } from '@/lib/theme-generation/token-registry';
import { CollapsibleSection } from '@/components/theme-studio/ui/collapsible-section';
import { hasActualContent } from '@/lib/utils/theme-helpers';
import { ConnectedProperty } from '@/components/theme-studio/ui/connected-property';
import { PropertyWrapper } from '@/components/theme-studio/form/property-wrapper';
import { FillControl } from '@/components/theme-studio/form/controls/fill-control-modern';
import { THEME_STUDIO_SPACING } from '@/components/theme-studio/constants/layout';
import { TextClasses } from '@/lib/theme-generation/types';

type ThemeDataColor = string | { color: string } | { dataColorIndex: number };

interface TextClass {
  fontFace?: string;
  fontSize?: number;
  fontWeight?: string;
  color?: ThemeDataColor;
}

interface TextClassInfo {
  name: string;
  description: string;
  usage: string;
}

const TEXT_CLASS_INFO: TextClassInfo[] = [
  {
    name: 'title',
    description: 'Main titles for sections and axes',
    usage: 'Category axis title, Value axis title, Multi-row card title, Slicer header'
  },
  {
    name: 'label',
    description: 'Standard text for data and headers',
    usage: 'Table and matrix column/row headers, grid values'
  },
  {
    name: 'callout',
    description: 'Large, prominent text for emphasis',
    usage: 'Card data labels, KPI indicators'
  },
  {
    name: 'header',
    description: 'Section headers and important text',
    usage: 'Key influencers headers'
  },
  {
    name: 'largeTitle',
    description: 'Extra large titles for major sections',
    usage: 'Report titles, Dashboard headers'
  },
  {
    name: 'dataTitle',
    description: 'Titles for data-focused elements',
    usage: 'Data card titles, Metric headers'
  },
  {
    name: 'boldLabel',
    description: 'Bold version of standard labels',
    usage: 'Matrix subtotals, Table totals, Important values'
  },
  {
    name: 'largeLabel',
    description: 'Larger version of standard labels',
    usage: 'Multi-row card data labels'
  },
  {
    name: 'largeLightLabel',
    description: 'Large, light-weight text',
    usage: 'Secondary large text, Subtitle elements'
  },
  {
    name: 'lightLabel',
    description: 'Light-weight version of standard labels',
    usage: 'Legend text, Button text, Category axis labels'
  },
  {
    name: 'semiboldLabel',
    description: 'Semi-bold text for moderate emphasis',
    usage: 'Key influencers profile text'
  },
  {
    name: 'smallLabel',
    description: 'Smaller text for secondary information',
    usage: 'Reference line labels, Slicer date range labels'
  },
  {
    name: 'smallLightLabel',
    description: 'Small, light-weight text',
    usage: 'Tertiary information, Subtle labels'
  },
  {
    name: 'smallDataLabel',
    description: 'Small text for data values',
    usage: 'Compact data displays, Small metrics'
  }
];

const DEFAULT_TEXT_CLASSES: Record<string, TextClass> = {
  title: { fontSize: 12, fontWeight: "600" },
  label: { fontSize: 10, fontWeight: "400" },
  callout: { fontSize: 45, fontWeight: "700" },
  header: { fontSize: 12, fontWeight: "600" },
  largeTitle: { fontSize: 20, fontWeight: "700" },
  dataTitle: { fontSize: 14, fontWeight: "600" },
  boldLabel: { fontSize: 10, fontWeight: "700" },
  largeLabel: { fontSize: 12, fontWeight: "400" },
  largeLightLabel: { fontSize: 12, fontWeight: "300" },
  lightLabel: { fontSize: 10, fontWeight: "300" },
  semiboldLabel: { fontSize: 10, fontWeight: "600" },
  smallLabel: { fontSize: 9, fontWeight: "400" },
  smallLightLabel: { fontSize: 9, fontWeight: "300" },
  smallDataLabel: { fontSize: 9, fontWeight: "400" }
};

export function TypographyTab() {
  const { theme, setTextClasses, updateTextClassProperty, resolved } = useThemeStudioStore();
  const [localTextClasses, setLocalTextClasses] = useState<Record<string, TextClass>>({});
  
  const textClasses = theme.textClasses;
  const fontFamily = theme.fontFamily;
  const mode = theme.mode || 'light';
  const neutralPalette = resolved.neutralPalette;
  const colorPalette = resolved.colorPalette;
  const dataColors = (resolved.colorPalette as any)?.colors?.dataColors || ['#2568E8', '#8338EC', '#FF006E', '#F95608', '#FFBE0C', '#2ACF56', '#3498DB', '#A66999'];

  useEffect(() => {
    const initialClasses = { ...DEFAULT_TEXT_CLASSES };
    
    if (textClasses) {
      Object.entries(textClasses).forEach(([key, value]) => {
        if (key in initialClasses) {
          initialClasses[key] = { ...initialClasses[key], ...(value as TextClass) };
        }
      });
    }
    
    // Apply the current font family to all text classes
    Object.keys(initialClasses).forEach(key => {
      initialClasses[key].fontFace = fontFamily;
      // If this is a new text class without fontFace, update it in the store
      if (!(textClasses?.[key as keyof TextClasses] as TextClass)?.fontFace) {
        updateTextClassProperty(key as keyof TextClasses, 'fontFace', fontFamily);
      }
    });
    
    setLocalTextClasses(initialClasses);
  }, [textClasses, fontFamily, mode, updateTextClassProperty]);

  const handleFontSizeChange = (className: keyof TextClasses, value: string) => {
    const fontSize = parseInt(value);
    if (!isNaN(fontSize) && fontSize > 0) {
      // Update local state
      setLocalTextClasses(prev => ({
        ...prev,
        [className]: { ...prev[className], fontSize }
      }));
      
      // Use granular update for just the fontSize property
      updateTextClassProperty(className, 'fontSize', fontSize);
    }
  };

  const handleColorChange = (className: keyof TextClasses, value: any) => {
    // FillControl returns PowerBI format { solid: { color: string } }
    let color: ThemeDataColor;
    
    if (value?.solid?.color) {
      const solidColor = value.solid.color;
      if (typeof solidColor === 'string') {
        color = solidColor;
      } else if (solidColor?.expr?.ThemeDataColor?.ColorId !== undefined) {
        color = { dataColorIndex: solidColor.expr.ThemeDataColor.ColorId };
      } else {
        color = '#000000';
      }
    } else if (typeof value === 'string') {
      color = value;
    } else {
      color = '#000000';
    }
    
    // Update local state
    setLocalTextClasses(prev => ({
      ...prev,
      [className]: { ...prev[className], color }
    }));
    
    // Use granular update for just the color property
    updateTextClassProperty(className, 'color', color);
  };

  const handleFontWeightChange = (className: keyof TextClasses, weight: string) => {
    // Update local state
    setLocalTextClasses(prev => ({
      ...prev,
      [className]: { ...prev[className], fontWeight: weight }
    }));
    
    // Use granular update for just the fontWeight property
    updateTextClassProperty(className, 'fontWeight', weight);
  };

  const handleReset = () => {
    const resetClasses = { ...DEFAULT_TEXT_CLASSES };
    Object.keys(resetClasses).forEach(key => {
      resetClasses[key].fontFace = fontFamily;
    });
    setLocalTextClasses(resetClasses);
    setTextClasses(resetClasses);
    // Change tracking is handled at the hook level
  };

  const getColorValue = (color?: ThemeDataColor): string => {
    if (!color) return mode === 'dark' ? '#FFFFFF' : '#000000';
    
    if (typeof color === 'string') {
      if (color.startsWith('@')) {
        const neutralObj = (resolved.neutralPalette as any)?.colors || {};
        const resolvedColor = resolveToken(color, mode, { 
          neutral: neutralObj, 
          brand: null,
          success: null,
          warning: null,
          error: null,
          dataColors: dataColors as string[]
        });
        return resolvedColor || (mode === 'dark' ? '#FFFFFF' : '#000000');
      }
      return color;
    }
    
    if (typeof color === 'object' && 'color' in color) {
      return color.color;
    }
    
    if (typeof color === 'object' && 'dataColorIndex' in color && color.dataColorIndex !== undefined) {
      return (dataColors && Array.isArray(dataColors)) ? (dataColors[color.dataColorIndex] as string) || '#000000' : '#000000';
    }
    
    return mode === 'dark' ? '#FFFFFF' : '#000000';
  };

  return (
    <div>
      <div className="mb-4">
        
        {/* Font Family Selector */}
        <div className="bg-gray-50 rounded-md p-3 mt-3">
          <Label htmlFor="font-family" className="mb-2 block">
            Font Family
          </Label>
          <Select value={fontFamily} onValueChange={(value) => {
            // Update the global font family
            useThemeStudioStore.getState().setFontFamily(value);
            
            // Apply font family to all text classes
            const updatedTextClasses = { ...localTextClasses };
            Object.keys(updatedTextClasses).forEach(key => {
              updatedTextClasses[key].fontFace = value;
              // Update each text class with the new font family
              updateTextClassProperty(key as keyof TextClasses, 'fontFace', value);
            });
            setLocalTextClasses(updatedTextClasses);
          }}>
            <SelectTrigger id="font-family" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {/* Power BI Fonts */}
              <div className="px-2 py-1.5">
                <p className="text-xs font-medium text-gray-500">Power BI Fonts</p>
              </div>
              {AVAILABLE_FONTS.filter(f => f.category === 'powerbi').map(font => (
                <SelectItem key={font.name} value={font.name}>
                  {font.name} {font.name === 'Segoe UI' && '(Default)'}
                </SelectItem>
              ))}
              
              {/* Custom Fonts */}
              <div className="border-t mt-2 pt-2 px-2 pb-1.5">
                <p className="text-xs font-medium text-gray-500">Custom Fonts</p>
                <p className="text-xs text-gray-400 mt-0.5">Requires installation on user devices</p>
              </div>
              {AVAILABLE_FONTS.filter(f => f.category === 'custom').map(font => (
                <SelectItem key={font.name} value={font.name}>
                  <div>
                    <div>{font.name}</div>
                    <div className="text-xs text-gray-500">{font.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500 mt-1">
            This font will be applied to all text classes
          </p>
          
          {/* Show warning for custom fonts */}
          {AVAILABLE_FONTS.find(f => f.name === fontFamily)?.category === 'custom' && (
            <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-xs">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="font-medium text-amber-800">Custom Font Selected</p>
                  <p className="text-amber-700 mt-0.5">
                    Users must have {fontFamily} installed on their device to see this font. 
                    Otherwise, Power BI will use a fallback font.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        {TEXT_CLASS_INFO.map(({ name, description, usage }) => {
          const textClass = (localTextClasses as any)[name] || {};
          const colorValue = getColorValue(textClass.color);
          const availableWeights = getAvailableWeights(fontFamily || 'Segoe UI');
          
          const hasCustomization = hasActualContent((textClasses as any)?.[name]);
          
          return (
            <CollapsibleSection
              key={name}
              title={name}
              tooltip={`${description} - Used in: ${usage}`}
              defaultOpen={false}
              hasContent={hasCustomization}
              onClear={() => {
                // Clear this specific text class
                const updatedTextClasses = { ...textClasses } as any;
                delete updatedTextClasses[name];
                setTextClasses(updatedTextClasses);
                
                // Reset local state to default
                const resetClass = { ...(DEFAULT_TEXT_CLASSES as any)[name] };
                resetClass.fontFace = fontFamily;
                setLocalTextClasses(prev => ({
                  ...prev,
                  [name]: resetClass
                }));
              }}
              clearMessage={`Clear all customizations for the ${name} text class?`}
              headerAction={
                <div
                  style={{
                    fontSize: `${Math.min(textClass.fontSize || 12, 16)}px`,
                    color: colorValue,
                    fontWeight: textClass.fontWeight || '400',
                    fontFamily: fontFamily
                  }}
                >
                  Aa
                </div>
              }
            >
              <div className={`${THEME_STUDIO_SPACING.propertyGap} pt-2`}>
                <ConnectedProperty>
                  <PropertyWrapper label="Font Size" path={['textClasses', name, 'fontSize']} inline={true}>
                    <div className="flex items-center gap-2">
                      <Input
                        id={`${name}-size`}
                        type="number"
                        min="8"
                        max="72"
                        value={textClass.fontSize || 12}
                        onChange={(e) => handleFontSizeChange(name as keyof TextClasses, e.target.value)}
                        className="w-20"
                      />
                      <span className="text-sm text-gray-500">pt</span>
                    </div>
                  </PropertyWrapper>
                </ConnectedProperty>
                
                <ConnectedProperty>
                  <PropertyWrapper label="Font Weight" path={['textClasses', name, 'fontWeight']} inline={true}>
                    <Select 
                      value={textClass.fontWeight || "400"} 
                      onValueChange={(value) => handleFontWeightChange(name as keyof TextClasses, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FONT_WEIGHTS.filter(weight => 
                          availableWeights.includes(weight.value)
                        ).map(weight => (
                          <SelectItem key={weight.value} value={weight.value}>
                            {weight.label} ({weight.value})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </PropertyWrapper>
                </ConnectedProperty>
                
                <ConnectedProperty isLast={true}>
                  <FillControl
                    label="Color"
                    value={textClass.color}
                    onChange={(value) => handleColorChange(name as keyof TextClasses, value)}
                    path={['textClasses', name, 'color']}
                    inline={true}
                    enableThemeColors={false}
                  />
                </ConnectedProperty>
              </div>
            </CollapsibleSection>
          );
        })}
      </div>
    </div>
  );
}