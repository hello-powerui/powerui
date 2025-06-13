'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UnifiedColorPicker } from '@/components/ui/unified-color-picker';
import { cn } from '@/lib/utils';
import { Plus, Trash2, Download, Upload, AlertCircle, Loader2 } from 'lucide-react';
import { usePaletteStore } from '@/lib/stores/palette-store';
import type { ColorPalette, NeutralPalette } from '@/lib/types/palette';

interface UnifiedPaletteEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'color' | 'neutral';
  palette?: ColorPalette | NeutralPalette;
  onSave?: () => void;
}

const NEUTRAL_SHADES = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

export function UnifiedPaletteEditor({
  open,
  onOpenChange,
  type,
  palette,
  onSave,
}: UnifiedPaletteEditorProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [colors, setColors] = useState<string[]>(['#3B82F6']);
  const [baseColor, setBaseColor] = useState('#6B7280');
  const [neutralShades, setNeutralShades] = useState<Record<string, string>>({});
  const [importUrl, setImportUrl] = useState('');
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { createColorPalette, updateColorPalette, createNeutralPalette, updateNeutralPalette } = usePaletteStore();

  useEffect(() => {
    if (palette) {
      setName(palette.name);
      if (type === 'color' && 'colors' in palette) {
        setDescription(palette.description || '');
        setColors(palette.colors);
      } else if (type === 'neutral' && 'shades' in palette) {
        setNeutralShades(palette.shades);
        // Try to guess base color from 500 shade
        setBaseColor(palette.shades['500'] || '#6B7280');
      }
    } else {
      // Reset for new palette
      setName('');
      setDescription('');
      setColors(['#3B82F6']);
      setBaseColor('#6B7280');
      setNeutralShades({});
    }
  }, [palette, type]);

  const handleGenerateNeutralPalette = async () => {
    setIsGenerating(true);
    setError('');
    
    // Validate hex color format
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    if (!hexRegex.test(baseColor)) {
      setError('Please enter a valid hex color (e.g., #FF0000)');
      setIsGenerating(false);
      return;
    }
    
    try {
      const response = await fetch('/api/generate-neutral-palette', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hexColor: baseColor }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate palette');
      }
      
      const data = await response.json();
      setNeutralShades(data.palette);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate neutral palette. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImportFromCoolors = () => {
    try {
      // Support both old and new Coolors URL formats
      const match = importUrl.match(/coolors\.co\/(?:palette\/)?([a-fA-F0-9-]+)/);
      if (!match) {
        setError('Invalid Coolors URL. Please use a URL like: https://coolors.co/palette/ffffff-000000');
        return;
      }
      
      const colorCodes = match[1].split('-');
      const importedColors = colorCodes.map(code => `#${code}`);
      
      if (importedColors.length === 0) {
        setError('No colors found in the URL');
        return;
      }
      
      setColors(importedColors);
      setImportUrl('');
      setError('');
    } catch (err) {
      setError('Failed to import colors from URL');
    }
  };

  const handleExportToCoolors = () => {
    const colorCodes = colors.map(c => c.replace('#', '')).join('-');
    const url = `https://coolors.co/${colorCodes}`;
    window.open(url, '_blank');
  };

  const handleAddColor = () => {
    if (colors.length < 20) {
      setColors([...colors, '#000000']);
    }
  };

  const handleUpdateColor = (index: number, color: string) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  const handleRemoveColor = (index: number) => {
    if (colors.length > 1) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Palette name is required');
      return;
    }

    if (type === 'color' && colors.length === 0) {
      setError('At least one color is required');
      return;
    }

    if (type === 'neutral' && Object.keys(neutralShades).length === 0) {
      setError('Please generate a neutral palette first');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      if (type === 'color') {
        const colorPalette = {
          name: name.trim(),
          description: description.trim(),
          colors,
        };

        if (palette && 'id' in palette) {
          await updateColorPalette(palette.id, colorPalette);
        } else {
          await createColorPalette(colorPalette);
        }
      } else {
        const neutralPalette = {
          name: name.trim(),
          shades: neutralShades,
        };

        if (palette && 'id' in palette) {
          await updateNeutralPalette(palette.id, neutralPalette);
        } else {
          await createNeutralPalette(neutralPalette);
        }
      }

      onSave?.();
      onOpenChange(false);
    } catch (err) {
      setError('Failed to save palette. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0">
        <div className="p-6 pb-4 border-b">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">
              {palette ? 'Edit' : 'Create'} {type === 'color' ? 'Color' : 'Neutral'} Palette
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {type === 'color' 
                ? 'Create a custom color palette for your data visualizations'
                : 'Generate a neutral palette for backgrounds, borders, and text'}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`My ${type === 'color' ? 'Color' : 'Neutral'} Palette`}
              className="h-9"
            />
          </div>

          {type === 'color' && (
            <>
              <div>
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your palette..."
                  rows={2}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Coolors Integration</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleExportToCoolors}
                    disabled={colors.length === 0}
                    className="h-8 text-xs"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Export to Coolors
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={importUrl}
                    onChange={(e) => setImportUrl(e.target.value)}
                    placeholder="https://coolors.co/palette/..."
                    className="h-9 text-sm"
                  />
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={handleImportFromCoolors}
                    className="h-9 px-3"
                  >
                    <Upload className="h-3.5 w-3.5 mr-1.5" />
                    Import
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Colors</Label>
                    <p className="text-xs text-muted-foreground mt-0.5">{colors.length} of 20 colors</p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleAddColor}
                    disabled={colors.length >= 20}
                    className="h-8"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
                <div className="border rounded-lg p-3 bg-muted/20">
                  <ScrollArea className="h-[180px]">
                    <div className="grid grid-cols-1 gap-2 pr-3">
                      {colors.map((color, index) => (
                        <div key={index} className="group flex items-center gap-2 p-2 rounded-md hover:bg-accent/50 transition-colors">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground font-mono w-4">{index + 1}</span>
                              <div 
                                className="w-8 h-8 rounded-md border shadow-sm"
                                style={{ backgroundColor: color }}
                              />
                            </div>
                            <UnifiedColorPicker
                              value={color}
                              onChange={(value) => handleUpdateColor(index, value as string)}
                              format="simple"
                              enableTokens={false}
                              enableThemeColors={false}
                              className="flex-1"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveColor(index)}
                            disabled={colors.length === 1}
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </>
          )}

          {type === 'neutral' && (
            <>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Base Color</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">Choose a color to generate a complete neutral palette</p>
                </div>
                <div className="flex gap-2">
                  <UnifiedColorPicker
                    value={baseColor}
                    onChange={(value) => setBaseColor(value as string)}
                    format="simple"
                    enableTokens={false}
                    enableThemeColors={false}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleGenerateNeutralPalette}
                    disabled={isGenerating}
                    variant="secondary"
                    className="h-9"
                  >
                    {isGenerating && <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />}
                    Generate
                  </Button>
                </div>
              </div>

              {Object.keys(neutralShades).length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Generated Shades</Label>
                  <div className="border rounded-lg p-4 bg-muted/20">
                    <div className="grid grid-cols-6 gap-3">
                      {NEUTRAL_SHADES.map((shade) => (
                        <div key={shade} className="space-y-2">
                          <div
                            className={cn(
                              "aspect-square rounded-md border shadow-sm transition-transform hover:scale-105",
                              !neutralShades[shade] && "bg-gray-100"
                            )}
                            style={{ 
                              backgroundColor: neutralShades[shade] || undefined 
                            }}
                          />
                          <div className="flex items-center justify-center">
                            <span className="text-xs text-muted-foreground font-mono">{shade}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        <div className="border-t p-6 flex items-center justify-between">
          <div className="flex-1">
            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{error}</span>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)} className="h-9">
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isSaving} className="h-9">
              {isSaving && <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />}
              {palette ? 'Update' : 'Create'} Palette
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}