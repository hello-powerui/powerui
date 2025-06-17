import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

interface NeutralPaletteSectionProps {
  neutralColors: any;
  onToggleNeutralPaletteManager: () => void;
}

export function NeutralPaletteSection({ 
  neutralColors, 
  onToggleNeutralPaletteManager 
}: NeutralPaletteSectionProps) {
  const neutralShades = neutralColors && typeof neutralColors === 'object' 
    ? Object.entries(neutralColors).sort(([a], [b]) => Number(a) - Number(b))
    : [];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Neutral Palette</Label>
        <Button
          size="sm"
          variant="outline"
          onClick={onToggleNeutralPaletteManager}
        >
          <Palette className="h-4 w-4 mr-2" />
          Manage
        </Button>
      </div>
      {neutralShades.length > 0 && (
        <div className="flex gap-1">
          {neutralShades.map(([shade, color]) => (
            <div
              key={shade}
              className="flex-1 h-8 rounded border border-border"
              style={{ backgroundColor: color as string }}
              title={`${shade}: ${color}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}