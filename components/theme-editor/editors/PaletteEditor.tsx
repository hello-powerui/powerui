'use client';

import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ColorPicker } from '@/components/forms/controls/ColorPicker';
import { useFoundationStore } from '@/lib/stores/foundation-store';
import { usePaletteStore } from '@/lib/stores/palette-store';
import { ColorPalette, NeutralPalette } from '@/lib/types/theme';
import { cn } from '@/lib/utils';
import { Trash2, Plus, Save } from 'lucide-react';

interface PaletteEditorProps {
  type: 'color' | 'neutral';
  className?: string;
  onSave?: (palette: ColorPalette | NeutralPalette) => void;
}

export const PaletteEditor: React.FC<PaletteEditorProps> = ({
  type,
  className,
  onSave,
}) => {
  const { palette, neutralPalette, setPalette, setNeutralPalette } = useFoundationStore();
  const { 
    userColorPalettes, 
    userNeutralPalettes,
    createColorPalette,
    createNeutralPalette,
    deleteColorPalette,
    deleteNeutralPalette,
  } = usePaletteStore();

  const currentPalette = type === 'color' ? palette : neutralPalette;
  const userPalettes = type === 'color' ? userColorPalettes : userNeutralPalettes;
  const setPaletteFn = type === 'color' ? setPalette : setNeutralPalette;
  const colorCount = type === 'color' ? 8 : 14;

  const [editingPalette, setEditingPalette] = useState<string[]>(currentPalette.colors);
  const [paletteName, setPaletteName] = useState('');
  const [savingNew, setSavingNew] = useState(false);

  const handleColorChange = useCallback((index: number, color: string) => {
    const newColors = [...editingPalette];
    newColors[index] = color;
    setEditingPalette(newColors);
    
    // Update the foundation store immediately
    const updatedPalette = { ...currentPalette, colors: newColors };
    setPaletteFn(updatedPalette as any);
  }, [editingPalette, currentPalette, setPaletteFn]);

  const handleSelectPalette = useCallback((palette: ColorPalette | NeutralPalette) => {
    setEditingPalette(palette.colors);
    setPaletteFn(palette as any);
  }, [setPaletteFn]);

  const handleSaveNew = useCallback(async () => {
    if (!paletteName.trim()) return;

    try {
      const newPalette = {
        name: paletteName,
        colors: editingPalette,
      };

      if (type === 'color') {
        await createColorPalette(newPalette as any);
      } else {
        await createNeutralPalette(newPalette as any);
      }

      setPaletteName('');
      setSavingNew(false);
      onSave?.(newPalette as any);
    } catch (error) {
      console.error('Failed to save palette:', error);
    }
  }, [paletteName, editingPalette, type, createColorPalette, createNeutralPalette, onSave]);

  const handleDelete = useCallback(async (paletteId: string) => {
    try {
      if (type === 'color') {
        await deleteColorPalette(paletteId);
      } else {
        await deleteNeutralPalette(paletteId);
      }
    } catch (error) {
      console.error('Failed to delete palette:', error);
    }
  }, [type, deleteColorPalette, deleteNeutralPalette]);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Current Palette Editor */}
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-4">
          Current {type === 'color' ? 'Color' : 'Neutral'} Palette
        </h3>
        
        <div className="grid grid-cols-4 gap-3 mb-4">
          {editingPalette.map((color, index) => (
            <div key={index} className="space-y-2">
              <Label className="text-xs">
                {type === 'color' ? `Color ${index + 1}` : `Neutral ${index + 1}`}
              </Label>
              <ColorPicker
                value={color}
                onChange={(newColor) => handleColorChange(index, newColor)}
                variant="compact"
              />
              <div className="text-xs text-muted-foreground font-mono">
                {color}
              </div>
            </div>
          ))}
        </div>

        {/* Save New Palette */}
        {savingNew ? (
          <div className="flex gap-2">
            <Input
              placeholder="Palette name"
              value={paletteName}
              onChange={(e) => setPaletteName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSaveNew()}
            />
            <Button size="sm" onClick={handleSaveNew} disabled={!paletteName.trim()}>
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={() => setSavingNew(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSavingNew(true)}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-1" />
            Save as New Palette
          </Button>
        )}
      </Card>

      {/* Saved Palettes */}
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-4">Saved Palettes</h3>
        
        <div className="space-y-2">
          {userPalettes.map((pal) => (
            <div
              key={pal.id}
              className={cn(
                'p-3 rounded-lg border cursor-pointer hover:bg-accent',
                currentPalette.id === pal.id && 'border-primary bg-accent'
              )}
              onClick={() => handleSelectPalette(pal)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{pal.name}</span>
                {!pal.isDefault && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(pal.id!);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex gap-1">
                {pal.colors.slice(0, 8).map((color, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                ))}
                {pal.colors.length > 8 && (
                  <span className="text-xs text-muted-foreground self-center ml-1">
                    +{pal.colors.length - 8}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};