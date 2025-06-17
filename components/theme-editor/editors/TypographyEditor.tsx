'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { ColorPicker } from '@/components/forms/controls/ColorPicker';
import { useThemeDataStore } from '@/lib/stores/theme-data-store';
import { useFoundationStore } from '@/lib/stores/foundation-store';
import { TextClasses } from '@/lib/types/theme';
import { cn } from '@/lib/utils';

type ThemeDataColor = string | { color: string } | { dataColorIndex: number };

interface TextClass {
  fontFace?: string;
  fontSize?: number;
  fontColor?: ThemeDataColor;
  bold?: boolean;
}

interface TypographyEditorProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  mode?: 'dialog' | 'inline';
  showDescriptions?: boolean;
  className?: string;
}

interface TextClassInfo {
  name: keyof TextClasses;
  description: string;
  usage: string;
  defaultSize: number;
  defaultBold?: boolean;
}

const TEXT_CLASS_INFO: TextClassInfo[] = [
  {
    name: 'title',
    description: 'Main titles for sections and axes',
    usage: 'Category axis title, Value axis title, Multi-row card title, Slicer header',
    defaultSize: 16,
    defaultBold: true,
  },
  {
    name: 'label',
    description: 'Standard text for data and headers',
    usage: 'Table and matrix column/row headers, grid values',
    defaultSize: 12,
  },
  {
    name: 'callout',
    description: 'Large, prominent text for emphasis',
    usage: 'Card data labels, KPI indicators',
    defaultSize: 14,
  },
  {
    name: 'header',
    description: 'Section headers and visual titles',
    usage: 'Visual headers, legend titles',
    defaultSize: 14,
    defaultBold: true,
  },
];

const FONT_FAMILIES = [
  { value: 'wf_standard-font, helvetica, arial, sans-serif', label: 'Default (Segoe UI)' },
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: '"Helvetica Neue", Helvetica, sans-serif', label: 'Helvetica' },
  { value: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', label: 'Segoe UI' },
  { value: 'Roboto, sans-serif', label: 'Roboto' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: '"Times New Roman", Times, serif', label: 'Times New Roman' },
  { value: 'Consolas, "Courier New", monospace', label: 'Consolas (Monospace)' },
];

export const TypographyEditor: React.FC<TypographyEditorProps> = ({
  open = false,
  onOpenChange,
  mode = 'dialog',
  showDescriptions = true,
  className,
}) => {
  const { currentTheme, updateThemeProperty } = useThemeDataStore();
  const { fontFamily, setFontFamily } = useFoundationStore();
  
  const [localTextClasses, setLocalTextClasses] = useState<Record<string, TextClass>>(
    currentTheme.textClasses || {}
  );

  // Sync with theme store
  useEffect(() => {
    setLocalTextClasses(currentTheme.textClasses || {});
  }, [currentTheme.textClasses]);

  const handleTextClassChange = (className: string, property: keyof TextClass, value: any) => {
    const updated = {
      ...localTextClasses,
      [className]: {
        ...localTextClasses[className],
        [property]: value,
      },
    };
    setLocalTextClasses(updated);
  };

  const handleApply = () => {
    updateThemeProperty(['textClasses'], localTextClasses);
    onOpenChange?.(false);
  };

  const handleReset = () => {
    const defaultClasses = TEXT_CLASS_INFO.reduce((acc, info) => {
      acc[info.name] = {
        fontSize: info.defaultSize,
        bold: info.defaultBold,
      };
      return acc;
    }, {} as Record<string, TextClass>);
    
    setLocalTextClasses(defaultClasses);
  };

  const getColorValue = (color: ThemeDataColor | undefined): string => {
    if (!color) return '#000000';
    if (typeof color === 'string') return color;
    if ('color' in color) return color.color;
    return '#000000';
  };

  const content = (
    <div className={cn('space-y-6', className)}>
      {/* Global Font Family */}
      <div className="space-y-2">
        <Label>Global Font Family</Label>
        <Select value={fontFamily} onValueChange={setFontFamily}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FONT_FAMILIES.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Text Classes */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Text Classes</h3>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Reset to Defaults
          </Button>
        </div>

        {TEXT_CLASS_INFO.map((info) => {
          const textClass = localTextClasses[info.name] || {};
          
          return (
            <div key={info.name} className="space-y-3 p-4 border rounded-lg">
              <div className="space-y-1">
                <h4 className="font-medium capitalize">{info.name}</h4>
                {showDescriptions && (
                  <>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                    <p className="text-xs text-muted-foreground">Used in: {info.usage}</p>
                  </>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <Input
                    type="number"
                    value={textClass.fontSize || info.defaultSize}
                    onChange={(e) => handleTextClassChange(info.name, 'fontSize', parseInt(e.target.value))}
                    min={8}
                    max={48}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Font Color</Label>
                  <ColorPicker
                    value={getColorValue(textClass.fontColor)}
                    onChange={(color) => handleTextClassChange(info.name, 'fontColor', color)}
                    variant="full"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${info.name}-bold`}
                    checked={textClass.bold ?? info.defaultBold ?? false}
                    onCheckedChange={(checked) => handleTextClassChange(info.name, 'bold', checked)}
                  />
                  <Label htmlFor={`${info.name}-bold`}>Bold</Label>
                </div>

                <div className="space-y-2">
                  <Label>Font Override</Label>
                  <Select
                    value={textClass.fontFace || ''}
                    onValueChange={(value) => handleTextClassChange(info.name, 'fontFace', value || undefined)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Use global font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Use global font</SelectItem>
                      {FONT_FAMILIES.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Preview */}
              <div className="p-3 bg-muted rounded">
                <span
                  style={{
                    fontFamily: textClass.fontFace || fontFamily,
                    fontSize: `${textClass.fontSize || info.defaultSize}px`,
                    fontWeight: (textClass.bold ?? info.defaultBold) ? 'bold' : 'normal',
                    color: getColorValue(textClass.fontColor),
                  }}
                >
                  Preview Text
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (mode === 'inline') {
    return content;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Typography Settings</DialogTitle>
        </DialogHeader>
        {content}
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange?.(false)}>
            Cancel
          </Button>
          <Button onClick={handleApply}>Apply</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { TypographyEditor };