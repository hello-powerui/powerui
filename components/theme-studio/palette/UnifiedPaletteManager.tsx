'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Plus, Palette, Grid3x3, Trash2 } from 'lucide-react';
import { usePaletteStore } from '@/lib/stores/palette-store';
import { ModernPaletteEditor } from './ModernPaletteEditor';
import { CompactPaletteDisplay } from './CompactPaletteDisplay';
import type { ColorPalette, NeutralPalette } from '@/lib/types/unified-palette';
import { toast } from 'sonner';

interface UnifiedPaletteManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paletteType?: 'color' | 'neutral' | 'both';
  onSelectColorPalette?: (palette: ColorPalette) => void;
  onSelectNeutralPalette?: (palette: NeutralPalette) => void;
  selectedColorPaletteId?: string;
  selectedNeutralPaletteId?: string;
}

export function UnifiedPaletteManager({
  open,
  onOpenChange,
  paletteType = 'both',
  onSelectColorPalette,
  onSelectNeutralPalette,
  selectedColorPaletteId,
  selectedNeutralPaletteId,
}: UnifiedPaletteManagerProps) {
  const [activeTab, setActiveTab] = useState<'color' | 'neutral'>(
    paletteType === 'neutral' ? 'neutral' : 'color'
  );
  const [editingPalette, setEditingPalette] = useState<
    { type: 'color'; palette: ColorPalette } | 
    { type: 'neutral'; palette: NeutralPalette } | 
    null
  >(null);
  const [creatingType, setCreatingType] = useState<'color' | 'neutral' | null>(null);

  const {
    colorPalettes,
    neutralPalettes,
    deleteColorPalette,
    deleteNeutralPalette,
    loadPalettes,
    isLoading,
    error,
  } = usePaletteStore();

  // Load palettes when the modal opens
  useEffect(() => {
    if (open) {
      loadPalettes();
    }
  }, [open, loadPalettes]);

  const handleColorPaletteClick = (palette: ColorPalette) => {
    onSelectColorPalette?.({
      ...palette,
      colors: palette.colors as string[]
    });
    onOpenChange(false);
  };

  const handleNeutralPaletteClick = (palette: NeutralPalette) => {
    onSelectNeutralPalette?.(palette);
    onOpenChange(false);
  };

  const renderColorPalettes = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-[360px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600 mx-auto mb-2"></div>
            <p className="text-xs text-gray-500">Loading palettes...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-[360px]">
          <div className="text-center text-gray-500">
            <p className="text-sm mb-2">Failed to load palettes</p>
            <p className="text-xs text-gray-400">{error}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => loadPalettes()}
              className="mt-3 text-xs"
            >
              Retry
            </Button>
          </div>
        </div>
      );
    }

    const builtInPalettes = colorPalettes.filter(p => p.isBuiltIn);
    const userPalettes = colorPalettes.filter(p => !p.isBuiltIn);

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCreatingType('color')}
            className="h-8 -ml-1 text-xs"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            New palette
          </Button>
        </div>
        <ScrollArea className="h-[360px] -mx-6 px-6">
          <div className="space-y-1 pr-2">
            {/* Built-in Palettes */}
            {builtInPalettes.length > 0 && (
              <div className="space-y-1.5 mb-4">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Built-in</h4>
                {builtInPalettes.map((palette) => (
                  <CompactPaletteDisplay
                    key={palette.id}
                    name={palette.name}
                    colors={palette.colors as string[]}
                    isSelected={selectedColorPaletteId === palette.id}
                    onClick={() => handleColorPaletteClick({
                      ...palette,
                      colors: palette.colors as string[]
                    })}
                    type="color"
                  />
                ))}
              </div>
            )}

            {/* User Palettes */}
            {userPalettes.length > 0 ? (
              <div className="space-y-1.5">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Your Palettes</h4>
                {userPalettes.map((palette) => (
                  <div key={palette.id} className="group relative">
                    <CompactPaletteDisplay
                      name={palette.name}
                      colors={palette.colors as string[]}
                      isSelected={selectedColorPaletteId === palette.id}
                      onClick={() => handleColorPaletteClick({
                        ...palette,
                        colors: palette.colors as string[]
                      })}
                      type="color"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (confirm(`Delete palette "${palette.name}"? This cannot be undone.`)) {
                          try {
                            await deleteColorPalette(palette.id);
                            toast.success('Palette deleted');
                          } catch (error) {
                            toast.error('Failed to delete palette');
                          }
                        }
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-gray-400 hover:text-red-600" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Palette className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                <p className="text-sm mb-1">No custom palettes</p>
                <p className="text-xs text-gray-400">Create your first color palette</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    );
  };

  const renderNeutralPalettes = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-[360px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600 mx-auto mb-2"></div>
            <p className="text-xs text-gray-500">Loading palettes...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-[360px]">
          <div className="text-center text-gray-500">
            <p className="text-sm mb-2">Failed to load palettes</p>
            <p className="text-xs text-gray-400">{error}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => loadPalettes()}
              className="mt-3 text-xs"
            >
              Retry
            </Button>
          </div>
        </div>
      );
    }

    const builtInPalettes = neutralPalettes.filter(p => p.isBuiltIn);
    const userPalettes = neutralPalettes.filter(p => !p.isBuiltIn);

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCreatingType('neutral')}
            className="h-8 -ml-1 text-xs"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            New palette
          </Button>
        </div>
        <ScrollArea className="h-[360px] -mx-6 px-6">
          <div className="space-y-1 pr-2">
            {/* Built-in Palettes */}
            {builtInPalettes.length > 0 && (
              <div className="space-y-1.5 mb-4">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Built-in</h4>
                {builtInPalettes.map((palette) => (
                  <CompactPaletteDisplay
                    key={palette.id}
                    name={palette.name}
                    colors={palette.colors}
                    isSelected={selectedNeutralPaletteId === palette.id}
                    onClick={() => handleNeutralPaletteClick(palette)}
                    type="neutral"
                  />
                ))}
              </div>
            )}

            {/* User Palettes */}
            {userPalettes.length > 0 ? (
              <div className="space-y-1.5">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Your Palettes</h4>
                {userPalettes.map((palette) => (
                  <div key={palette.id} className="group relative">
                    <CompactPaletteDisplay
                      name={palette.name}
                      colors={palette.colors}
                      isSelected={selectedNeutralPaletteId === palette.id}
                      onClick={() => handleNeutralPaletteClick(palette)}
                      type="neutral"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (confirm(`Delete palette "${palette.name}"? This cannot be undone.`)) {
                          try {
                            await deleteNeutralPalette(palette.id);
                            toast.success('Palette deleted');
                          } catch (error) {
                            toast.error('Failed to delete palette');
                          }
                        }
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-gray-400 hover:text-red-600" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Grid3x3 className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                <p className="text-sm mb-1">No custom palettes</p>
                <p className="text-xs text-gray-400">Create your first neutral palette</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-xl p-0 gap-0 border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-medium text-gray-900">Palettes</h2>
            <p className="text-sm text-gray-500 mt-0.5">Select or create a palette</p>
          </div>

          <div className="px-6">
            {paletteType === 'both' ? (
              <>
                <div className="flex items-center gap-1 border-b border-gray-100 -mx-6 px-6">
                  <button
                    onClick={() => setActiveTab('color')}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors relative",
                      activeTab === 'color'
                        ? "text-gray-900"
                        : "text-gray-500 hover:text-gray-700"
                    )}
                  >
                    Colors
                    {activeTab === 'color' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('neutral')}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors relative",
                      activeTab === 'neutral'
                        ? "text-gray-900"
                        : "text-gray-500 hover:text-gray-700"
                    )}
                  >
                    Neutrals
                    {activeTab === 'neutral' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                    )}
                  </button>
                </div>
                <div className="py-4">
                  {activeTab === 'color' ? renderColorPalettes() : renderNeutralPalettes()}
                </div>
              </>
            ) : (
              <div className="py-4">
                {paletteType === 'color' ? renderColorPalettes() : renderNeutralPalettes()}
              </div>
            )}
          </div>
          <div className="h-px bg-gray-100" />
        </DialogContent>
      </Dialog>

      {/* Editor Dialog */}
      {(editingPalette || creatingType) && (
        <ModernPaletteEditor
          open={true}
          onOpenChange={(open) => {
            if (!open) {
              setEditingPalette(null);
              setCreatingType(null);
            }
          }}
          type={editingPalette?.type || creatingType || 'color'}
          palette={editingPalette?.palette}
          onSave={(savedPalette) => {
            setEditingPalette(null);
            setCreatingType(null);
            // Reload palettes to include the new one
            loadPalettes();
            
            // If creating a new palette and we have selection callbacks, auto-select it
            if (creatingType && savedPalette) {
              if (creatingType === 'color' && onSelectColorPalette) {
                onSelectColorPalette(savedPalette);
                onOpenChange(false);
              } else if (creatingType === 'neutral' && onSelectNeutralPalette) {
                onSelectNeutralPalette(savedPalette);
                onOpenChange(false);
              }
            }
          }}
        />
      )}
    </>
  );
}