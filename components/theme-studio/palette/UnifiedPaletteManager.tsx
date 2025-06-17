'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Plus, Palette, Grid3x3, Trash2 } from 'lucide-react';
import { usePaletteStore } from '@/lib/stores/palette-store';
import { ModernPaletteEditor } from './ModernPaletteEditor';
import { ModernNeutralPaletteDisplay } from './ModernNeutralPaletteDisplay';
import type { ColorPalette, NeutralPalette } from '@/lib/types/unified-palette';
import { toast } from 'sonner';

interface UnifiedPaletteManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'select' | 'manage';
  paletteType?: 'color' | 'neutral' | 'both';
  onSelectColorPalette?: (palette: ColorPalette) => void;
  onSelectNeutralPalette?: (palette: NeutralPalette) => void;
  selectedColorPaletteId?: string;
  selectedNeutralPaletteId?: string;
}

export function UnifiedPaletteManager({
  open,
  onOpenChange,
  mode = 'select',
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
    if (mode === 'select') {
      onSelectColorPalette?.({
        ...palette,
        colors: palette.colors as string[]
      });
      onOpenChange(false);
    } else {
      setEditingPalette({ type: 'color', palette: {
        ...palette,
        colors: palette.colors as string[]
      } });
    }
  };

  const handleNeutralPaletteClick = (palette: NeutralPalette) => {
    if (mode === 'select') {
      onSelectNeutralPalette?.(palette);
      onOpenChange(false);
    } else {
      setEditingPalette({ type: 'neutral', palette });
    }
  };

  const renderColorPalettes = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3"></div>
            <p className="text-sm text-muted-foreground">Loading palettes...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-[400px]">
          <div className="text-center text-muted-foreground">
            <p className="text-sm mb-2">Failed to load palettes</p>
            <p className="text-xs">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadPalettes()}
              className="mt-3"
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
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-medium text-muted-foreground">Color Palettes</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCreatingType('color')}
            className="h-8"
          >
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
        </div>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4 pr-4">
            {/* Built-in Palettes */}
            {builtInPalettes.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground px-1">Built-in Palettes</h4>
                <div className="grid gap-2">
                  {builtInPalettes.map((palette) => (
                    <div
                      key={palette.id}
                      className={cn(
                        "p-4 rounded-lg border-2 cursor-pointer transition-all",
                        selectedColorPaletteId === palette.id 
                          ? "border-gray-900 shadow-sm bg-gray-50/50" 
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
                      )}
                      onClick={() => handleColorPaletteClick({
                        ...palette,
                        colors: palette.colors as string[]
                      })}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm text-gray-900">{palette.name}</h4>
                          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600 border-0">Built-in</Badge>
                        </div>
                        <div className="flex gap-1">
                          {(palette.colors as string[]).map((color, index) => (
                            <div
                              key={index}
                              className="h-6 w-6 rounded-md border-2 border-gray-200 shadow-sm"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* User Palettes */}
            {userPalettes.length > 0 ? (
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground px-1">Your Palettes</h4>
                <div className="grid gap-2">
                  {userPalettes.map((palette) => (
                    <div
                      key={palette.id}
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all group relative",
                        selectedColorPaletteId === palette.id 
                          ? "border-gray-900 shadow-sm bg-gray-50/50" 
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
                      )}
                    >
                      <div 
                        className="space-y-2 cursor-pointer"
                        onClick={() => handleColorPaletteClick({
                          ...palette,
                          colors: palette.colors as string[]
                        })}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{palette.name}</h4>
                          {mode === 'manage' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0"
                              onClick={async (e) => {
                                e.stopPropagation();
                                if (confirm(`Delete palette "${palette.name}"? This cannot be undone.`)) {
                                  try {
                                    await deleteColorPalette(palette.id);
                                    toast.success('Palette deleted', {
                                      description: `"${palette.name}" has been removed`
                                    });
                                  } catch (error) {
                                    toast.error('Failed to delete palette', {
                                      description: error instanceof Error ? error.message : 'Unknown error'
                                    });
                                  }
                                }
                              }}
                            >
                              <Trash2 className="h-3.5 w-3.5 text-red-600" />
                            </Button>
                          )}
                        </div>
                        <div className="flex gap-1">
                          {(palette.colors as string[]).map((color, index) => (
                            <div
                              key={index}
                              className="h-6 w-6 rounded-md border-2 border-gray-200 shadow-sm"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground px-1">Your Palettes</h4>
                <div className="text-center py-8 px-4 text-muted-foreground">
                  <Palette className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm mb-1">No custom palettes yet</p>
                  <p className="text-xs">Click "New" to create your first color palette</p>
                </div>
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
        <div className="flex items-center justify-center h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3"></div>
            <p className="text-sm text-muted-foreground">Loading palettes...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-[400px]">
          <div className="text-center text-muted-foreground">
            <p className="text-sm mb-2">Failed to load palettes</p>
            <p className="text-xs">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadPalettes()}
              className="mt-3"
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
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-medium text-muted-foreground">Neutral Palettes</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCreatingType('neutral')}
            className="h-8"
          >
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
        </div>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4 pr-4">
            {/* Built-in Palettes */}
            {builtInPalettes.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground px-1">Built-in Palettes</h4>
                <div className="grid gap-2">
                  {builtInPalettes.map((palette) => (
                    <div key={palette.id} className="relative">
                      <ModernNeutralPaletteDisplay
                        colors={palette.colors}
                        name={palette.name}
                        isSelected={selectedNeutralPaletteId === palette.id}
                        onClick={() => handleNeutralPaletteClick(palette)}
                      />
                      <Badge 
                        variant="secondary" 
                        className="absolute top-4 right-4 text-xs bg-gray-100 text-gray-600 border-0"
                      >
                        Built-in
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* User Palettes */}
            {userPalettes.length > 0 ? (
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground px-1">Your Palettes</h4>
                <div className="grid gap-2">
                  {userPalettes.map((palette) => (
                    <div key={palette.id} className="relative group">
                      <ModernNeutralPaletteDisplay
                        colors={palette.colors}
                        name={palette.name}
                        isSelected={selectedNeutralPaletteId === palette.id}
                        onClick={() => handleNeutralPaletteClick(palette)}
                      />
                      {mode === 'manage' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0 bg-white/80 hover:bg-white"
                          onClick={async (e) => {
                            e.stopPropagation();
                            if (confirm(`Delete palette "${palette.name}"? This cannot be undone.`)) {
                              try {
                                await deleteNeutralPalette(palette.id);
                                toast.success('Palette deleted', {
                                  description: `"${palette.name}" has been removed`
                                });
                              } catch (error) {
                                toast.error('Failed to delete palette', {
                                  description: error instanceof Error ? error.message : 'Unknown error'
                                });
                              }
                            }
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-red-600" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground px-1">Your Palettes</h4>
                <div className="text-center py-8 px-4 text-muted-foreground">
                  <Grid3x3 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm mb-1">No custom palettes yet</p>
                  <p className="text-xs">Click "New" to create your first neutral palette</p>
                </div>
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {mode === 'select' ? 'Select Palette' : 'Manage Palettes'}
            </DialogTitle>
            <DialogDescription>
              {mode === 'select' 
                ? 'Choose a palette for your theme' 
                : 'Create, edit, and manage your color and neutral palettes'}
            </DialogDescription>
          </DialogHeader>

          {paletteType === 'both' ? (
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'color' | 'neutral')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="color" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Colors
                </TabsTrigger>
                <TabsTrigger value="neutral" className="flex items-center gap-2">
                  <Grid3x3 className="h-4 w-4" />
                  Neutrals
                </TabsTrigger>
              </TabsList>
              <TabsContent value="color" className="mt-4">
                {renderColorPalettes()}
              </TabsContent>
              <TabsContent value="neutral" className="mt-4">
                {renderNeutralPalettes()}
              </TabsContent>
            </Tabs>
          ) : (
            <div className="mt-4">
              {paletteType === 'color' ? renderColorPalettes() : renderNeutralPalettes()}
            </div>
          )}
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
          onSave={() => {
            setEditingPalette(null);
            setCreatingType(null);
          }}
        />
      )}
    </>
  );
}