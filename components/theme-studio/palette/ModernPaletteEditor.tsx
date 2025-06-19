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
import { cn } from '@/lib/utils';
import { Plus, Upload, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { usePaletteStore } from '@/lib/stores/palette-store';
import type { ColorPalette, NeutralPalette } from '@/lib/types/unified-palette';
import { neutralColorsToShadeMap } from '@/lib/types/unified-palette';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { HorizontalColorItem } from './HorizontalColorItem';

interface ModernPaletteEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'color' | 'neutral';
  palette?: ColorPalette | NeutralPalette;
  onSave?: (savedPalette?: ColorPalette | NeutralPalette) => void;
}

const NEUTRAL_SHADES = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];


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
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { createColorPalette, updateColorPalette, createNeutralPalette, updateNeutralPalette } = usePaletteStore();

  useEffect(() => {
    if (palette) {
      setName(palette.name);
      if (type === 'color' && 'colors' in palette) {
        setDescription(palette.description || '');
        setColors(palette.colors);
      } else if (type === 'neutral' && 'colors' in palette) {
        // Convert colors array to shades format for the editor
        const shades = neutralColorsToShadeMap(palette.colors);
        setNeutralShades(shades);
        setBaseColor(shades['500'] || '#6B7280');
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


  const handleAddColor = () => {
    if (colors.length < 20) {
      // Generate a random color for variety
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
      const newColors = [...colors, randomColor];
      setColors(newColors);
    }
  };

  const handleUpdateColor = (index: number, color: string) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    
    if (over && active.id !== over.id) {
      setColors((items) => {
        const oldIndex = items.findIndex((_, i) => i === active.id);
        const newIndex = items.findIndex((_, i) => i === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
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
      let savedPalette;
      
      if (type === 'color') {
        const colorPalette = {
          name: name.trim(),
          description: description.trim(),
          colors,
        };

        if (palette && 'id' in palette) {
          await updateColorPalette(palette.id, colorPalette);
          savedPalette = { ...palette, ...colorPalette };
        } else {
          savedPalette = await createColorPalette(colorPalette);
        }
      } else {
        const neutralPalette = {
          name: name.trim(),
          colors: NEUTRAL_SHADES.map(shade => neutralShades[shade] || '#000000'),
        };

        if (palette && 'id' in palette) {
          await updateNeutralPalette(palette.id, neutralPalette);
          savedPalette = { ...palette, ...neutralPalette };
        } else {
          savedPalette = await createNeutralPalette(neutralPalette);
        }
      }

      onSave?.(savedPalette);
      onOpenChange(false);
    } catch (err) {
      setError('Failed to save palette');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 gap-0 overflow-hidden bg-white border-gray-200">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
          <DialogTitle className="text-lg font-medium tracking-tight">
            {palette ? 'Edit' : 'Create'} {type === 'color' ? 'Color' : 'Neutral'} Palette
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 font-normal">
            {type === 'color' 
              ? 'Design a custom color palette for your data visualizations'
              : 'Generate a neutral color scale for UI elements'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto max-h-[calc(80vh-160px)]">
          <div className="px-6 py-5 space-y-5">
            {/* Basic Info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={`${type === 'color' ? 'Color' : 'Neutral'} Palette`}
                  className="h-9 text-sm border-gray-200 focus:border-gray-400 focus:ring-0"
                />
              </div>
              {type === 'color' && (
                <div className="space-y-1.5">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add a description..."
                    className="h-9 text-sm border-gray-200 focus:border-gray-400 focus:ring-0"
                  />
                </div>
              )}
            </div>

            {type === 'color' && (
              <>
                {/* Import from Coolors */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">Import from Coolors</Label>
                  <div className="flex gap-2">
                    <Input
                      value={importUrl}
                      onChange={(e) => setImportUrl(e.target.value)}
                      placeholder="https://coolors.co/palette/..."
                      className="h-9 text-sm border-gray-200 focus:border-gray-400 focus:ring-0"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleImportFromCoolors}
                      className="h-9 px-3 hover:bg-gray-50 border-gray-200"
                    >
                      <Upload className="h-3.5 w-3.5 mr-1.5" />
                      Import
                    </Button>
                  </div>
                </div>

                {/* Color Management */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-gray-700">
                      Colors <span className="text-gray-500">({colors.length}/20)</span>
                    </Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddColor}
                      disabled={colors.length >= 20}
                      className="h-8 px-3 text-sm hover:bg-gray-50 border-gray-200"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      Add
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={colors.map((_, i) => i)}
                        strategy={horizontalListSortingStrategy}
                      >
                        <div className="flex gap-3 overflow-x-auto pb-2">
                          {colors.map((color, index) => (
                            <HorizontalColorItem
                              key={index}
                              id={index}
                              color={color}
                              onRemove={() => handleRemoveColor(index)}
                              onColorChange={(newColor) => handleUpdateColor(index, newColor)}
                              disabled={colors.length === 1}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  </div>
                </div>
              </>
            )}

            {type === 'neutral' && (
              <>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Base Color</h3>
                    <p className="text-sm text-gray-500 mt-0.5">Choose a color to generate a complete neutral scale</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex gap-2">
                      <div
                        className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors"
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
                        className="w-32 font-mono text-sm border-gray-200 focus:border-gray-400 focus:ring-0"
                      />
                    </div>
                    <Button 
                      onClick={handleGenerateNeutralPalette}
                      disabled={isGenerating}
                      className="h-12 px-6 bg-black text-white hover:bg-gray-800"
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
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-900">Generated Scale</h3>
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                      {NEUTRAL_SHADES.map((shade) => (
                        <div key={shade} className="space-y-1">
                          <div
                            className={cn(
                              "aspect-square w-full rounded-lg border transition-all",
                              neutralShades[shade] ? "border-gray-200 hover:border-gray-300" : "border-gray-100 bg-gray-50"
                            )}
                            style={{ 
                              backgroundColor: neutralShades[shade] || undefined 
                            }}
                          />
                          <span className="text-xs text-gray-600 text-center block font-medium">{shade}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
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
                className="h-9 px-3 hover:bg-gray-50 border-gray-200 font-normal"
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                onClick={handleSave} 
                disabled={isSaving} 
                className="h-9 px-4 bg-black text-white hover:bg-gray-800 font-normal min-w-[100px]"
              >
                {isSaving && <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />}
                {palette ? 'Save' : 'Create'}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}