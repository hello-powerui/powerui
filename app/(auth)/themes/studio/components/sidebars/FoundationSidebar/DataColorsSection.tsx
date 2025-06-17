import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

interface DataColorsSectionProps {
  dataColors: string[];
  onTogglePaletteManager: () => void;
}

export function DataColorsSection({ dataColors, onTogglePaletteManager }: DataColorsSectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Data Colors</Label>
        <Button
          size="sm"
          variant="outline"
          onClick={onTogglePaletteManager}
        >
          <Palette className="h-4 w-4 mr-2" />
          Manage Palettes
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {dataColors.map((color, index) => (
          <div
            key={index}
            className="w-8 h-8 rounded border border-border"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
}