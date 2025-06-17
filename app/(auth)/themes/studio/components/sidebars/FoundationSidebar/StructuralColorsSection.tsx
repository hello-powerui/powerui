import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface StructuralColorsSectionProps {
  structuralColors: any;
  updateThemeDataField: (path: string, value: any) => void;
}

const STRUCTURAL_COLOR_FIELDS = [
  { key: 'mainBackground', label: 'Main Background', tooltip: 'Primary background color for the report' },
  { key: 'secondaryBackground', label: 'Secondary Background', tooltip: 'Background for secondary sections' },
  { key: 'neutralPrimaryBackground', label: 'Neutral Primary', tooltip: 'Primary neutral background' },
  { key: 'neutralSecondaryBackground', label: 'Neutral Secondary', tooltip: 'Secondary neutral background' },
];

export function StructuralColorsSection({ 
  structuralColors, 
  updateThemeDataField 
}: StructuralColorsSectionProps) {
  return (
    <div className="space-y-2">
      <Label>Structural Colors</Label>
      <div className="space-y-3">
        {STRUCTURAL_COLOR_FIELDS.map(({ key, label, tooltip }) => (
          <div key={key} className="space-y-1">
            <div className="flex items-center gap-2">
              <Label className="text-xs">{label}</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex gap-2">
              <div
                className="w-10 h-10 rounded border border-border flex-shrink-0"
                style={{ backgroundColor: structuralColors?.[key] || '#ffffff' }}
              />
              <Input
                type="text"
                value={structuralColors?.[key] || ''}
                onChange={(e) => updateThemeDataField(
                  `general.structuralColors.${key}`,
                  e.target.value
                )}
                placeholder="#RRGGBB"
                className="font-mono text-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}