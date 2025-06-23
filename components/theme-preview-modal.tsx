'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PowerBIPreview } from '@/components/theme-studio/preview/PowerBIPreview';
import { useEffect, useState, useCallback } from 'react';
import { getPreviewGenerator } from '@/lib/theme-generation/client-preview-generator';
import { usePaletteStore } from '@/lib/stores/palette-store';
import type { PowerBITheme } from '@/lib/types/theme';

interface ThemePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeName: string;
  themeData: any;
}

export function ThemePreviewModal({ isOpen, onClose, themeName, themeData }: ThemePreviewModalProps) {
  const [previewTheme, setPreviewTheme] = useState<PowerBITheme | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { colorPalettes, neutralPalettes, loadPalettes } = usePaletteStore();

  const generatePreview = useCallback(() => {
    setIsGenerating(true);
    try {
      // Find the color and neutral palettes
      const colorPalette = colorPalettes.find(p => p.id === themeData.colorPaletteId);
      const neutralPalette = neutralPalettes.find(p => p.id === themeData.neutralPaletteId);

      // If palettes not found, use defaults
      if (!colorPalette || !neutralPalette) {
        console.warn('Palettes not found, using defaults');
        return;
      }

      // Prepare theme input matching the theme studio format
      const themeInput = {
        name: themeData.name || themeName,
        mode: themeData.mode || 'light',
        dataColors: colorPalette.colors,
        neutralPalette: neutralPalette.colors,
        fontFamily: themeData.fontFamily || 'Segoe UI',
        visualStyles: themeData.visualStyles || {},
        structuralColors: themeData.structuralColors || {},
        textClasses: themeData.textClasses || {}
      };

      // Use the same preview generator as theme studio
      const generator = getPreviewGenerator();
      const preview = generator.generatePreview(themeInput);
      setPreviewTheme(preview);
    } catch (error) {
      console.error('Failed to generate theme preview:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [themeData, themeName, colorPalettes, neutralPalettes]);

  useEffect(() => {
    // Ensure palettes are loaded
    if (colorPalettes.length === 0 || neutralPalettes.length === 0) {
      loadPalettes();
    }
  }, [colorPalettes.length, neutralPalettes.length, loadPalettes]);

  useEffect(() => {
    if (isOpen && themeData && colorPalettes.length > 0 && neutralPalettes.length > 0) {
      generatePreview();
    }
  }, [isOpen, themeData, colorPalettes.length, neutralPalettes.length, generatePreview]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Preview: {themeName}</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          {isGenerating ? (
            <div className="flex items-center justify-center h-[600px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Generating preview...</p>
              </div>
            </div>
          ) : previewTheme ? (
            <div className="border border-gray-200 rounded-lg overflow-hidden h-[600px]">
              <PowerBIPreview 
                generatedTheme={previewTheme}
                selectedVisualType="*"
                selectedVariant="*"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-[600px] text-gray-500">
              Unable to generate preview
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}