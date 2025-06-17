'use client';

import { useState, useEffect, useRef } from 'react';
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
import { cn } from '@/lib/utils';
import { Plus, Trash2, Download, Upload, AlertCircle, Loader2, Palette, Sparkles, Copy, Check } from 'lucide-react';
import { usePaletteStore } from '@/lib/stores/palette-store';
import type { ColorPalette, NeutralPalette } from '@/lib/types/palette';

interface ModernPaletteEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'color' | 'neutral';
  palette?: ColorPalette | NeutralPalette;
  onSave?: () => void;
}

const NEUTRAL_SHADES = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

const PRESET_PALETTES = [
  { name: 'Ocean', colors: ['#0891b2', '#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc'] },
  { name: 'Forest', colors: ['#14532d', '#166534', '#16a34a', '#22c55e', '#4ade80'] },
  { name: 'Sunset', colors: ['#dc2626', '#ea580c', '#f59e0b', '#fbbf24', '#fde68a'] },
  { name: 'Purple', colors: ['#581c87', '#6b21a8', '#7c3aed', '#8b5cf6', '#a78bfa'] },
  { name: 'Monochrome', colors: ['#18181b', '#3f3f46', '#71717a', '#a1a1aa', '#e4e4e7'] },
];

export function ModernPaletteEditor({
  open,
  onOpenChange,
  type,
  palette,
  onSave,
}: ModernPaletteEditorProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [colors, setColors] = useState<string[]>(['#3B82F6']);
  const [baseColor, setBaseColor] = useState('#6B7280');
  const [neutralShades, setNeutralShades] = useState<Record<string, string>>({});
  const [importUrl, setImportUrl] = useState('');
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeColorIndex, setActiveColorIndex] = useState<number | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

  const { createColorPalette, updateColorPalette, createNeutralPalette, updateNeutralPalette } = usePaletteStore();

  useEffect(() => {
    if (palette) {
      setName(palette.name);
      if (type === 'color' && 'colors' in palette) {
        setDescription(palette.description || '');
        setColors(palette.colors);
      } else if (type === 'neutral' && 'shades' in palette) {
        setNeutralShades(palette.shades);
        setBaseColor(palette.shades['500'] || '#6B7280');
      }
    } else {
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
      setError(err instanceof Error ? err.message : 'Failed to generate neutral palette');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImportFromCoolors = () => {
    try {
      const match = importUrl.match(/coolors\.co\/(?:palette\/)?([a-fA-F0-9-]+)/);
      if (!match) {
        setError('Invalid Coolors URL');
        return;
      }
      
      const colorCodes = match[1].split('-');
      const importedColors = colorCodes.map(code => `#${code}`);
      
      setColors(importedColors);
      setImportUrl('');
      setError('');
    } catch (err) {
      setError('Failed to import colors');
    }
  };

  const handleExportToCoolors = () => {
    const colorCodes = colors.map(c => c.replace('#', '')).join('-');
    const url = `https://coolors.co/${colorCodes}`;
    window.open(url, '_blank');
  };

  const handleAddColor = () => {
    if (colors.length < 20) {
      const newColors = [...colors, '#000000'];
      setColors(newColors);
      setActiveColorIndex(newColors.length - 1);
      setTimeout(() => colorInputRef.current?.focus(), 100);
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
      setActiveColorIndex(null);
    }
  };

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const handleApplyPreset = (preset: typeof PRESET_PALETTES[0]) => {
    setColors(preset.colors);
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
      setError('Failed to save palette');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-gray-50/50">
          <DialogTitle className="text-base font-semibold flex items-center gap-2">
            <Palette className="h-4 w-4" />
            {palette ? 'Edit' : 'Create'} {type === 'color' ? 'Color' : 'Neutral'} Palette
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {type === 'color' 
              ? 'Design a custom color palette for your visualizations'
              : 'Generate a neutral color scale for UI elements'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto max-h-[calc(80vh-200px)]">
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-medium text-gray-700">
                  Palette Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={`My ${type === 'color' ? 'Color' : 'Neutral'} Palette`}
                  className="h-9 text-sm"
                />
              </div>
              {type === 'color' && (
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-xs font-medium text-gray-700">
                    Description <span className="text-gray-400">(optional)</span>
                  </Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your palette..."
                    className="h-9 text-sm"
                  />
                </div>
              )}
            </div>

            {type === 'color' && (
              <>
                {/* Quick Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-700">Quick Start</span>
                    <div className="flex gap-1">
                      {PRESET_PALETTES.map((preset) => (
                        <Button
                          key={preset.name}
                          variant="ghost"
                          size="sm"
                          onClick={() => handleApplyPreset(preset)}
                          className="h-7 px-2 text-xs hover:bg-gray-100"
                        >
                          {preset.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleExportToCoolors}
                    disabled={colors.length === 0}
                    className="h-7 text-xs hover:bg-gray-100"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Export
                  </Button>
                </div>

                {/* Import from Coolors */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-700">Import from Coolors</Label>
                  <div className="flex gap-2">
                    <Input
                      value={importUrl}
                      onChange={(e) => setImportUrl(e.target.value)}
                      placeholder="https://coolors.co/palette/..."
                      className="h-9 text-sm"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleImportFromCoolors}
                      className="h-9 px-3 hover:bg-gray-50"
                    >
                      <Upload className="h-3.5 w-3.5 mr-1.5" />
                      Import
                    </Button>
                  </div>
                </div>

                {/* Color Grid */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium text-gray-700">
                      Colors <span className="text-gray-400">({colors.length}/20)</span>
                    </Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddColor}
                      disabled={colors.length >= 20}
                      className="h-7 text-xs hover:bg-gray-50"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Color
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {colors.map((color, index) => (
                      <div
                        key={index}
                        className={cn(
                          "group relative rounded-lg border-2 transition-all",
                          activeColorIndex === index 
                            ? "border-gray-900 shadow-lg" 
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <div
                          className="aspect-square rounded-t-md cursor-pointer relative overflow-hidden"
                          style={{ backgroundColor: color }}
                          onClick={() => setActiveColorIndex(index)}
                        >
                          <input
                            ref={activeColorIndex === index ? colorInputRef : undefined}
                            type="color"
                            value={color}
                            onChange={(e) => handleUpdateColor(index, e.target.value)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        </div>
                        
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-b-md">
                          <button
                            onClick={() => handleCopyColor(color)}
                            className="flex items-center gap-1 text-xs font-mono text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            {copiedColor === color ? (
                              <>
                                <Check className="h-3 w-3" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                {color}
                              </>
                            )}
                          </button>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveColor(index)}
                            disabled={colors.length === 1}
                            className="h-6 w-6 text-gray-400 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {type === 'neutral' && (
              <>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs font-medium text-gray-700">Base Color</Label>
                    <p className="text-xs text-gray-500 mt-1">Choose a color to generate a complete neutral scale</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 flex gap-2">
                      <div
                        className="w-10 h-10 rounded-md border-2 border-gray-200 cursor-pointer"
                        style={{ backgroundColor: baseColor }}
                      >
                        <input
                          type="color"
                          value={baseColor}
                          onChange={(e) => setBaseColor(e.target.value)}
                          className="w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <Input
                        type="text"
                        value={baseColor}
                        onChange={(e) => {
                          if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) {
                            setBaseColor(e.target.value);
                          }
                        }}
                        placeholder="#6B7280"
                        className="font-mono text-sm"
                      />
                    </div>
                    <Button 
                      onClick={handleGenerateNeutralPalette}
                      disabled={isGenerating}
                      className="h-10"
                    >
                      {isGenerating ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4 mr-2" />
                      )}
                      Generate Scale
                    </Button>
                  </div>
                </div>

                {Object.keys(neutralShades).length > 0 && (
                  <div className="space-y-3">
                    <Label className="text-xs font-medium text-gray-700">Generated Scale</Label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                      {NEUTRAL_SHADES.map((shade) => (
                        <div key={shade} className="text-center">
                          <div
                            className={cn(
                              "aspect-square rounded-md border-2 transition-all",
                              neutralShades[shade] ? "border-gray-200" : "border-gray-100 bg-gray-50"
                            )}
                            style={{ 
                              backgroundColor: neutralShades[shade] || undefined 
                            }}
                          />
                          <span className="text-xs text-gray-500 mt-1 block font-medium">{shade}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t bg-gray-50/50">
          <div className="flex items-center justify-between w-full">
            <div>
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>{error}</span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onOpenChange(false)} 
                className="h-9 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                onClick={handleSave} 
                disabled={isSaving} 
                className="h-9 min-w-[100px]"
              >
                {isSaving && <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />}
                {palette ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}