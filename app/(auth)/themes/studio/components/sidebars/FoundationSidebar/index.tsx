'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DataColorsSection } from './DataColorsSection';
import { ThemeModeSelector } from './ThemeModeSelector';
import { NeutralPaletteSection } from './NeutralPaletteSection';
import { StructuralColorsSection } from './StructuralColorsSection';
import { CanvasLayoutSection } from './CanvasLayoutSection';

interface FoundationSidebarProps {
  dataColors: string[];
  neutralColors: any;
  structuralColors: any;
  canvasLayout: any;
  textClasses: any;
  onTogglePaletteManager: () => void;
  onToggleNeutralPaletteManager: () => void;
  onToggleTextClassesEditor: () => void;
  updateThemeDataField: (path: string, value: any) => void;
}

export function FoundationSidebar({
  dataColors,
  neutralColors,
  structuralColors,
  canvasLayout,
  textClasses,
  onTogglePaletteManager,
  onToggleNeutralPaletteManager,
  onToggleTextClassesEditor,
  updateThemeDataField,
}: FoundationSidebarProps) {
  return (
    <Card className="w-72 border-r rounded-none h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Foundation</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Core theme settings that apply globally
        </p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <DataColorsSection 
            dataColors={dataColors}
            onTogglePaletteManager={onTogglePaletteManager}
          />
          
          <ThemeModeSelector />
          
          <NeutralPaletteSection 
            neutralColors={neutralColors}
            onToggleNeutralPaletteManager={onToggleNeutralPaletteManager}
          />
          
          <StructuralColorsSection 
            structuralColors={structuralColors}
            updateThemeDataField={updateThemeDataField}
          />
          
          <CanvasLayoutSection 
            canvasLayout={canvasLayout}
            updateThemeDataField={updateThemeDataField}
          />
        </div>
      </ScrollArea>
    </Card>
  );
}