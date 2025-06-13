'use client';

import { useState } from 'react';
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
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Plus, Palette, Grid3x3 } from 'lucide-react';
import { usePaletteStore } from '@/lib/stores/palette-store';
import { UnifiedPaletteEditor } from './UnifiedPaletteEditor';
import type { ColorPalette, NeutralPalette } from '@/lib/types/palette';

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
  } = usePaletteStore();

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
      onSelectNeutralPalette?.({
        ...palette,
        shades: palette.shades as Record<string, string>
      });
      onOpenChange(false);
    } else {
      setEditingPalette({ type: 'neutral', palette: {
        ...palette,
        shades: palette.shades as Record<string, string>
      } });
    }
  };

  const renderColorPalettes = () => (
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
        <div className="grid gap-2 pr-4">
          {colorPalettes.map((palette) => (
            <Card
              key={palette.id}
              className={cn(
                "p-3 cursor-pointer transition-all hover:shadow-md",
                selectedColorPaletteId === palette.id && "ring-2 ring-primary"
              )}
              onClick={() => handleColorPaletteClick({
                ...palette,
                colors: palette.colors as string[]
              })}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{palette.name}</h4>
                  {palette.isBuiltIn && (
                    <Badge variant="secondary" className="text-xs">Built-in</Badge>
                  )}
                </div>
                <div className="flex gap-1">
                  {(palette.colors as string[]).map((color, index) => (
                    <div
                      key={index}
                      className="h-6 w-6 rounded border border-gray-200"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  const renderNeutralPalettes = () => (
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
        <div className="grid gap-2 pr-4">
          {neutralPalettes.map((palette) => (
            <Card
              key={palette.id}
              className={cn(
                "p-3 cursor-pointer transition-all hover:shadow-md",
                selectedNeutralPaletteId === palette.id && "ring-2 ring-primary"
              )}
              onClick={() => handleNeutralPaletteClick({
                ...palette,
                shades: palette.shades as Record<string, string>
              })}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{palette.name}</h4>
                  {palette.isBuiltIn && (
                    <Badge variant="secondary" className="text-xs">Built-in</Badge>
                  )}
                </div>
                <div className="flex gap-0.5">
                  {Object.entries(palette.shades as Record<string, string>)
                    .sort(([a], [b]) => parseInt(a) - parseInt(b))
                    .slice(0, 8)
                    .map(([shade, color]) => (
                      <div
                        key={shade}
                        className="h-6 w-3 first:rounded-l last:rounded-r"
                        style={{ backgroundColor: color }}
                        title={`${shade}: ${color}`}
                      />
                    ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

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
        <UnifiedPaletteEditor
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