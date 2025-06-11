'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, AlertTriangle, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ColorPaletteEditor } from './ColorPaletteEditor';
import { usePaletteStore } from '@/lib/stores/palette-store';
import { useThemeStore } from '@/lib/stores/theme-store';
import { ColorPalette } from '@prisma/client';
// import { useToast } from '@/components/ui/use-toast';

interface PaletteManagerProps {
  onSelect?: (palette: ColorPalette) => void;
  selectedPaletteId?: string;
}

export function PaletteManager({ onSelect, selectedPaletteId }: PaletteManagerProps = {}) {
  const { colorPalettes, loadPalettes, createColorPalette, updateColorPalette, deleteColorPalette } = usePaletteStore();
  const { themes } = useThemeStore();
  // const { toast } = useToast();
  
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPalette, setEditingPalette] = useState<ColorPalette | undefined>();
  const [deletingPalette, setDeletingPalette] = useState<ColorPalette | null>(null);
  const [paletteThemeReferences, setPaletteThemeReferences] = useState<string[]>([]);

  useEffect(() => {
    loadPalettes();
  }, [loadPalettes]);

  const handleCreatePalette = () => {
    setEditingPalette(undefined);
    setIsEditorOpen(true);
  };

  const handleEditPalette = (palette: ColorPalette) => {
    setEditingPalette(palette);
    setIsEditorOpen(true);
  };

  const handleDuplicatePalette = async (palette: ColorPalette) => {
    try {
      await createColorPalette({
        name: `${palette.name} (Copy)`,
        description: palette.description,
        colors: palette.colors,
      });
      console.log(`Palette duplicated: Created "${palette.name} (Copy)"`);
    } catch (error) {
      console.error('Failed to duplicate palette');
    }
  };

  const checkPaletteReferences = (paletteId: string) => {
    const referencingThemes = themes.filter(theme => theme.dataPalette === paletteId);
    return referencingThemes.map(theme => theme.name);
  };

  const handleDeleteClick = (palette: ColorPalette) => {
    const references = checkPaletteReferences(palette.id);
    setPaletteThemeReferences(references);
    setDeletingPalette(palette);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingPalette) return;

    try {
      await deleteColorPalette(deletingPalette.id);
      
      // Reset themes that referenced this palette to defaults
      if (paletteThemeReferences.length > 0) {
        console.log(`Palette deleted. Themes using this palette have been reset to defaults: ${paletteThemeReferences.join(', ')}`);
      } else {
        console.log(`Palette deleted: "${deletingPalette.name}" has been removed`);
      }
    } catch (error) {
      console.error('Failed to delete palette');
    }
    
    setDeletingPalette(null);
    setPaletteThemeReferences([]);
  };

  const handleSavePalette = async (paletteData: Partial<ColorPalette>) => {
    try {
      if (editingPalette) {
        await updateColorPalette(editingPalette.id, paletteData);
        console.log(`Palette updated: "${paletteData.name}" has been saved`);
      } else {
        await createColorPalette(paletteData);
        console.log(`Palette created: "${paletteData.name}" has been added to your collection`);
      }
      setIsEditorOpen(false);
      setEditingPalette(undefined);
      // Refresh the palettes list
      await loadPalettes();
    } catch (error) {
      console.error('Failed to save palette:', error);
    }
  };

  const userPalettes = colorPalettes.filter(p => !p.isBuiltIn);
  const builtInPalettes = colorPalettes.filter(p => p.isBuiltIn);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Manage Data Color Palettes</h2>
          <p className="text-sm text-gray-600 mt-1">
            Create and manage color palettes for your data visualizations
          </p>
        </div>
        <Button onClick={handleCreatePalette}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Palette
        </Button>
      </div>

      {userPalettes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Your Palettes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userPalettes.map((palette) => (
              <Card 
                key={palette.id} 
                className={`p-4 space-y-3 transition-all ${onSelect ? 'cursor-pointer hover:border-primary' : ''} ${selectedPaletteId === palette.id ? 'border-primary ring-2 ring-primary/20' : ''}`}
                onClick={() => onSelect?.(palette)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{palette.name}</h4>
                    {palette.description && (
                      <p className="text-sm text-gray-500">{palette.description}</p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditPalette(palette)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit palette</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDuplicatePalette(palette)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Duplicate palette</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(palette)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete palette</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <div className="flex gap-1">
                  {(palette.colors as string[]).map((color, index) => (
                    <div
                      key={index}
                      className="flex-1 h-8 rounded"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {builtInPalettes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Built-in Palettes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {builtInPalettes.map((palette) => (
              <Card 
                key={palette.id} 
                className={`p-4 space-y-3 transition-all ${onSelect ? 'cursor-pointer hover:border-primary' : ''} ${selectedPaletteId === palette.id ? 'border-primary ring-2 ring-primary/20' : ''}`}
                onClick={() => onSelect?.(palette)}
              >
                <div>
                  <h4 className="font-medium">{palette.name}</h4>
                  {palette.description && (
                    <p className="text-sm text-gray-500">{palette.description}</p>
                  )}
                </div>

                <div className="flex gap-1">
                  {(palette.colors as string[]).map((color, index) => (
                    <div
                      key={index}
                      className="flex-1 h-8 rounded"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <ColorPaletteEditor
        palette={editingPalette}
        onSave={handleSavePalette}
        onCancel={() => setIsEditorOpen(false)}
        isOpen={isEditorOpen}
      />

      <AlertDialog open={!!deletingPalette} onOpenChange={() => setDeletingPalette(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Palette</AlertDialogTitle>
            <AlertDialogDescription>
              {paletteThemeReferences.length > 0 ? (
                <div className="space-y-2">
                  <p>This palette is currently being used by the following themes:</p>
                  <ul className="list-disc list-inside text-sm">
                    {paletteThemeReferences.map((themeName) => (
                      <li key={themeName}>{themeName}</li>
                    ))}
                  </ul>
                  <p className="flex items-center gap-2 text-amber-600">
                    <AlertTriangle className="h-4 w-4" />
                    These themes will be reset to use default palettes.
                  </p>
                </div>
              ) : (
                <p>Are you sure you want to delete "{deletingPalette?.name}"? This action cannot be undone.</p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}