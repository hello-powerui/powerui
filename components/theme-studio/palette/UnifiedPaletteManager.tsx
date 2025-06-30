'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Plus, Palette, Grid3x3, Trash2 } from 'lucide-react';
import { usePaletteStore } from '@/lib/stores/palette-store';
import { ModernPaletteEditor } from './ModernPaletteEditor';
import { CompactPaletteDisplayWithActions } from './CompactPaletteDisplayWithActions';
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

type ColorPaletteTab = 'my' | 'trending' | 'organization';

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
  const [colorPaletteTab, setColorPaletteTab] = useState<ColorPaletteTab>('my');
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

  const handleEditPalette = (palette: ColorPalette | NeutralPalette, type: 'color' | 'neutral') => {
    if (type === 'color') {
      setEditingPalette({ type: 'color', palette: palette as ColorPalette });
    } else {
      setEditingPalette({ type: 'neutral', palette: palette as NeutralPalette });
    }
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

    // Filter palettes based on active tab
    let displayPalettes: ColorPalette[] = [];
    if (colorPaletteTab === 'my') {
      displayPalettes = userPalettes;
    } else if (colorPaletteTab === 'trending') {
      displayPalettes = builtInPalettes;
    } else if (colorPaletteTab === 'organization') {
      // For now, organization palettes will be empty
      // This can be implemented when org features are added
      displayPalettes = [];
    }

    return (
      <div className="space-y-3">
        {/* Tab switcher for color palettes */}
        <div className="flex items-center gap-1 border-b border-gray-100 -mx-6 px-6">
          <button
            onClick={() => setColorPaletteTab('my')}
            className={cn(
              "px-3 py-2 text-sm font-medium transition-colors relative",
              colorPaletteTab === 'my'
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            My Palettes
            {colorPaletteTab === 'my' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
            )}
          </button>
          <button
            onClick={() => setColorPaletteTab('trending')}
            className={cn(
              "px-3 py-2 text-sm font-medium transition-colors relative",
              colorPaletteTab === 'trending'
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            Trending
            {colorPaletteTab === 'trending' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
            )}
          </button>
          <button
            onClick={() => setColorPaletteTab('organization')}
            className={cn(
              "px-3 py-2 text-sm font-medium transition-colors relative",
              colorPaletteTab === 'organization'
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            Organization
            {colorPaletteTab === 'organization' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between">
          {colorPaletteTab === 'my' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCreatingType('color')}
              className="h-8 -ml-1 text-xs"
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              New palette
            </Button>
          )}
        </div>

        <ScrollArea className="h-[320px] -mx-6 px-6">
          <div className="space-y-1 pr-3 pl-1">
            {displayPalettes.length > 0 ? (
              displayPalettes.map((palette) => (
                <CompactPaletteDisplayWithActions
                  key={palette.id}
                  name={palette.name}
                  colors={palette.colors as string[]}
                  isSelected={selectedColorPaletteId === palette.id}
                  onClick={() => handleColorPaletteClick({
                    ...palette,
                    colors: palette.colors as string[]
                  })}
                  onEdit={() => handleEditPalette(palette, 'color')}
                  onDelete={!palette.isBuiltIn ? async () => {
                    if (confirm(`Delete palette "${palette.name}"? This cannot be undone.`)) {
                      try {
                        await deleteColorPalette(palette.id);
                        toast.success('Palette deleted');
                      } catch (error) {
                        toast.error('Failed to delete palette');
                      }
                    }
                  } : undefined}
                  type="color"
                  showActions={!palette.isBuiltIn}
                />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                {colorPaletteTab === 'my' ? (
                  <>
                    <Palette className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm mb-1">No custom palettes</p>
                    <p className="text-xs text-gray-400">Create your first color palette</p>
                  </>
                ) : colorPaletteTab === 'organization' ? (
                  <>
                    <Palette className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm mb-1">No organization palettes</p>
                    <p className="text-xs text-gray-400">Organization palettes will appear here</p>
                  </>
                ) : null}
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
        <ScrollArea className="h-[380px] -mx-6 px-6">
          <div className="space-y-2 pr-3 pl-1">
            {/* Built-in Palettes */}
            {builtInPalettes.length > 0 && (
              <div className="space-y-2 mb-5">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Built-in</h4>
                {builtInPalettes.map((palette) => (
                  <CompactPaletteDisplayWithActions
                    key={palette.id}
                    name={palette.name}
                    colors={palette.colors}
                    isSelected={selectedNeutralPaletteId === palette.id}
                    onClick={() => handleNeutralPaletteClick(palette)}
                    onEdit={() => handleEditPalette(palette, 'neutral')}
                    type="neutral"
                    showActions={false}
                  />
                ))}
              </div>
            )}

            {/* User Palettes */}
            {userPalettes.length > 0 ? (
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Your Palettes</h4>
                {userPalettes.map((palette) => (
                  <CompactPaletteDisplayWithActions
                    key={palette.id}
                    name={palette.name}
                    colors={palette.colors}
                    isSelected={selectedNeutralPaletteId === palette.id}
                    onClick={() => handleNeutralPaletteClick(palette)}
                    onEdit={() => handleEditPalette(palette, 'neutral')}
                    onDelete={async () => {
                      if (confirm(`Delete palette "${palette.name}"? This cannot be undone.`)) {
                        try {
                          await deleteNeutralPalette(palette.id);
                          toast.success('Palette deleted');
                        } catch (error) {
                          toast.error('Failed to delete palette');
                        }
                      }
                    }}
                    type="neutral"
                    showActions={true}
                  />
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
        <DialogContent className="max-w-xl p-0 gap-0 border-gray-200" aria-describedby="palette-dialog-description">
          <div className="px-6 py-4 border-b border-gray-100">
            <DialogTitle className="text-base font-medium text-gray-900">Palettes</DialogTitle>
            <DialogDescription id="palette-dialog-description" className="text-sm text-gray-500 mt-0.5">Select or create a palette</DialogDescription>
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
          onSave={async (savedPalette) => {
            const wasEditing = editingPalette;
            const wasCreating = creatingType;
            
            setEditingPalette(null);
            setCreatingType(null);
            
            // Reload palettes to include the new one and wait for completion
            await loadPalettes();
            
            // Small delay to ensure store updates are processed
            await new Promise(resolve => setTimeout(resolve, 50));
            
            // Auto-select the palette that was just edited or created
            if (savedPalette) {
              if (savedPalette.hasOwnProperty('colors') && Array.isArray(savedPalette.colors)) {
                // If editing an existing palette, apply the changes immediately
                if (wasEditing && wasEditing.type === 'color' && onSelectColorPalette) {
                  onSelectColorPalette(savedPalette as ColorPalette);
                } else if (wasEditing && wasEditing.type === 'neutral' && onSelectNeutralPalette) {
                  onSelectNeutralPalette(savedPalette as NeutralPalette);
                }
                // If creating a new palette, auto-select it
                else if (wasCreating === 'color' && onSelectColorPalette) {
                  onSelectColorPalette(savedPalette as ColorPalette);
                  onOpenChange(false);
                } else if (wasCreating === 'neutral' && onSelectNeutralPalette) {
                  onSelectNeutralPalette(savedPalette as NeutralPalette);
                  onOpenChange(false);
                }
              }
            }
          }}
        />
      )}
    </>
  );
}