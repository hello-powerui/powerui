'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Label from '@radix-ui/react-label';
import { usePaletteStore } from '@/lib/stores/palette-store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface NeutralPaletteEditorProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingPalette?: any;
}

const XIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export function NeutralPaletteEditor({ isOpen, onOpenChange, editingPalette }: NeutralPaletteEditorProps) {
  const { createNeutralPalette, updateNeutralPalette } = usePaletteStore();
  const [paletteName, setPaletteName] = useState(editingPalette?.name || '');
  const [hexColor, setHexColor] = useState('#6B7280');
  const [generatedPalette, setGeneratedPalette] = useState<Record<string, string> | null>(
    editingPalette?.shades || null
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGeneratePalette = async () => {
    try {
      setIsGenerating(true);
      setError('');

      // Validate hex color
      const cleanHex = hexColor.trim().replace('#', '');
      if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
        setError('Please enter a valid hex color code');
        return;
      }

      const response = await fetch('/api/generate-neutral-palette', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hexColor: cleanHex }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate palette');
      }

      const data = await response.json();
      setGeneratedPalette(data.palette);
    } catch (error) {
      console.error('Error generating palette:', error);
      setError('Failed to generate palette. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!paletteName.trim()) {
      setError('Please enter a palette name');
      return;
    }

    if (!generatedPalette) {
      setError('Please generate a palette first');
      return;
    }

    try {
      setError('');
      
      if (editingPalette) {
        await updateNeutralPalette(editingPalette.id, {
          name: paletteName,
          shades: generatedPalette,
        });
      } else {
        await createNeutralPalette({
          name: paletteName,
          shades: generatedPalette,
        });
      }
      
      onOpenChange(false);
      // Reset form
      setPaletteName('');
      setHexColor('#6B7280');
      setGeneratedPalette(null);
    } catch (error) {
      console.error('Error saving palette:', error);
      setError('Failed to save palette. Please try again.');
    }
  };

  const shadeOrder = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-lg shadow-xl animate-scale-in p-6">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              {editingPalette ? 'Edit' : 'Create'} Neutral Palette
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-600 transition-colors">
              <XIcon />
            </Dialog.Close>
          </div>

          <div className="space-y-4">
            <div>
              <Label.Root htmlFor="palette-name" className="text-sm font-medium text-gray-700 block mb-1">
                Palette Name
              </Label.Root>
              <Input
                id="palette-name"
                value={paletteName}
                onChange={(e) => setPaletteName(e.target.value)}
                placeholder="e.g., Custom Gray"
                className="w-full"
              />
            </div>

            <div>
              <Label.Root htmlFor="hex-color" className="text-sm font-medium text-gray-700 block mb-1">
                Base Color (Hex)
              </Label.Root>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    id="hex-color"
                    value={hexColor}
                    onChange={(e) => setHexColor(e.target.value)}
                    placeholder="#6B7280"
                    className="w-full pl-10"
                  />
                  <div 
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded border border-gray-300"
                    style={{ backgroundColor: hexColor }}
                  />
                </div>
                <Button
                  onClick={handleGeneratePalette}
                  disabled={isGenerating}
                  className="px-4"
                >
                  {isGenerating ? 'Generating...' : 'Generate'}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Enter a hex color to generate a full neutral palette
              </p>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 rounded-md p-3">
                {error}
              </div>
            )}

            {generatedPalette && (
              <div>
                <Label.Root className="text-sm font-medium text-gray-700 block mb-2">
                  Generated Palette Preview
                </Label.Root>
                <div className="grid grid-cols-6 gap-2">
                  {shadeOrder.map((shade) => (
                    <div key={shade} className="text-center">
                      <div
                        className="w-full h-12 rounded-md border border-gray-200 mb-1"
                        style={{ backgroundColor: generatedPalette[shade] }}
                      />
                      <span className="text-xs text-gray-600">{shade}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!paletteName.trim() || !generatedPalette}
            >
              {editingPalette ? 'Update' : 'Create'} Palette
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}