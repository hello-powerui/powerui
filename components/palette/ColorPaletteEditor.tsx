'use client';

import { useState, useEffect } from 'react';
import { Plus, Minus, Link2, Copy, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { parseCoolorsUrl, isValidHexColor, generateCoolorsUrl } from '@/lib/utils/coolors-parser';
import { ColorPalette } from '@prisma/client';

interface ColorPaletteEditorProps {
  palette?: ColorPalette;
  onSave: (palette: Partial<ColorPalette>) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export function ColorPaletteEditor({
  palette,
  onSave,
  onCancel,
  isOpen,
}: ColorPaletteEditorProps) {
  const [name, setName] = useState(palette?.name || '');
  const [description, setDescription] = useState(palette?.description || '');
  const [colors, setColors] = useState<string[]>(
    palette?.colors as string[] || ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57']
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingColor, setEditingColor] = useState('');
  const [coolorsUrl, setCoolorsUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (palette) {
      setName(palette.name);
      setDescription(palette.description || '');
      setColors(palette.colors as string[]);
    }
  }, [palette]);

  const handleColorEdit = (index: number) => {
    setEditingIndex(index);
    setEditingColor(colors[index]);
  };

  const handleColorUpdate = () => {
    if (editingIndex !== null) {
      const normalizedColor = editingColor.trim().toUpperCase();
      
      // Auto-add # if missing
      const colorToValidate = normalizedColor.startsWith('#') 
        ? normalizedColor 
        : `#${normalizedColor}`;
      
      if (isValidHexColor(colorToValidate)) {
        const newColors = [...colors];
        newColors[editingIndex] = colorToValidate;
        setColors(newColors);
        setEditingIndex(null);
        setEditingColor('');
        setError('');
      } else {
        setError('Please enter a valid hex color (e.g., #FF6B6B or FF6B6B)');
      }
    }
  };

  const handleAddColor = () => {
    if (colors.length < 20) {
      const lastColor = colors[colors.length - 1];
      setColors([...colors, lastColor]);
    }
  };

  const handleRemoveColor = (index: number) => {
    if (colors.length > 1) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  const handleImportFromCoolors = () => {
    const parsedColors = parseCoolorsUrl(coolorsUrl);
    if (parsedColors) {
      setColors(parsedColors);
      setCoolorsUrl('');
      setError('');
    } else {
      setError('Invalid Coolors.co URL. Please use a URL like: https://coolors.co/palette/780000-c1121f-fdf0d5-003049-669bbc');
    }
  };

  const handleCopyUrl = async () => {
    const url = generateCoolorsUrl(colors);
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    // Validate palette name
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Please enter a palette name');
      return;
    }
    
    if (trimmedName.length > 50) {
      setError('Palette name must be less than 50 characters');
      return;
    }
    
    // Validate colors
    if (colors.length === 0) {
      setError('Palette must have at least one color');
      return;
    }
    
    if (colors.length > 20) {
      setError('Palette cannot have more than 20 colors');
      return;
    }
    
    // Validate all colors are valid hex
    const invalidColors = colors.filter(color => !isValidHexColor(color));
    if (invalidColors.length > 0) {
      setError('All colors must be valid hex colors');
      return;
    }

    onSave({
      name: trimmedName,
      description: description.trim().slice(0, 200), // Limit description length
      colors: colors,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{palette ? 'Edit' : 'Create'} Color Palette</DialogTitle>
          <DialogDescription>
            Create a custom color palette for your data visualizations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Palette Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Custom Palette"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A vibrant palette for charts and graphs"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Colors</Label>
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyUrl}
                      >
                        {copied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                        Export to Coolors
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy Coolors.co URL to clipboard</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {colors.map((color, index) => (
                <div key={index} className="relative group">
                  <button
                    className="w-20 h-20 rounded-lg border-2 border-gray-200 relative overflow-hidden transition-all hover:scale-105"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorEdit(index)}
                  >
                    <span className="absolute inset-x-0 bottom-0 bg-black/70 text-white text-xs py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {color}
                    </span>
                  </button>
                  {colors.length > 1 && (
                    <button
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      onClick={() => handleRemoveColor(index)}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                  )}
                </div>
              ))}
              {colors.length < 20 && (
                <button
                  className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                  onClick={handleAddColor}
                >
                  <Plus className="h-6 w-6 text-gray-400" />
                </button>
              )}
            </div>
          </div>

          {editingIndex !== null && (
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <Label htmlFor="color-input">Edit Color</Label>
                <Input
                  id="color-input"
                  value={editingColor}
                  onChange={(e) => setEditingColor(e.target.value)}
                  placeholder="#FF6B6B"
                />
              </div>
              <Button onClick={handleColorUpdate}>Update</Button>
              <Button variant="outline" onClick={() => setEditingIndex(null)}>
                Cancel
              </Button>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="coolors-url">Import from Coolors.co</Label>
            <div className="flex gap-2">
              <Input
                id="coolors-url"
                value={coolorsUrl}
                onChange={(e) => setCoolorsUrl(e.target.value)}
                placeholder="https://coolors.co/palette/780000-c1121f-fdf0d5-003049-669bbc"
              />
              <Button
                variant="outline"
                onClick={handleImportFromCoolors}
                disabled={!coolorsUrl}
              >
                <Link2 className="h-4 w-4 mr-2" />
                Import
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {palette ? 'Update' : 'Create'} Palette
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}