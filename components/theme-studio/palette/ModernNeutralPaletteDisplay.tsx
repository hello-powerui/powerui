'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { neutralColorsToShadeMap, NEUTRAL_SHADE_KEYS } from '@/lib/types/unified-palette';

interface ModernNeutralPaletteDisplayProps {
  shades?: Record<string, string>;
  colors?: string[];
  name: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const SHADE_ORDER = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

export function ModernNeutralPaletteDisplay({
  shades: shadesInput,
  colors,
  name,
  isSelected = false,
  onClick,
}: ModernNeutralPaletteDisplayProps) {
  const [copiedShade, setCopiedShade] = useState<string | null>(null);

  // Convert colors array to shades map if needed
  const shades = colors ? neutralColorsToShadeMap(colors) : shadesInput || {};

  const handleCopyColor = (e: React.MouseEvent, shade: string, color: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(color);
    setCopiedShade(shade);
    setTimeout(() => setCopiedShade(null), 2000);
  };

  const sortedShades = Object.entries(shades)
    .sort(([a], [b]) => {
      const indexA = SHADE_ORDER.indexOf(a);
      const indexB = SHADE_ORDER.indexOf(b);
      if (indexA === -1 && indexB === -1) return parseInt(a) - parseInt(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

  return (
    <div
      className={cn(
        "p-4 rounded-lg border-2 cursor-pointer transition-all",
        isSelected 
          ? "border-gray-900 shadow-sm bg-gray-50/50" 
          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
      )}
      onClick={onClick}
    >
      <div className="space-y-3">
        <h4 className="font-medium text-sm text-gray-900">{name}</h4>
        
        {/* Display first 6 shades in a row for preview */}
        <div className="flex gap-1">
          {sortedShades.slice(0, 6).map(([shade, color]) => (
            <div
              key={shade}
              className="flex-1 h-8 rounded-md border border-gray-200"
              style={{ backgroundColor: color }}
              title={`${shade}: ${color}`}
            />
          ))}
        </div>

        {/* Full palette grid on hover/selection */}
        <div className="grid grid-cols-6 gap-2">
          <TooltipProvider>
            {sortedShades.map(([shade, color]) => (
              <Tooltip key={shade} delayDuration={300}>
                <TooltipTrigger asChild>
                  <div className="group relative">
                    <div
                      className={cn(
                        "aspect-square rounded-md border transition-all",
                        shade === '50' || shade === '100' || shade === '200' 
                          ? "border-gray-300" 
                          : "border-gray-200"
                      )}
                      style={{ backgroundColor: color }}
                    >
                      <button
                        onClick={(e) => handleCopyColor(e, shade, color)}
                        className={cn(
                          "absolute inset-0 rounded-md flex items-center justify-center",
                          "opacity-0 group-hover:opacity-100 transition-opacity",
                          "bg-black/20 hover:bg-black/30"
                        )}
                      >
                        {copiedShade === shade ? (
                          <Check className="h-3 w-3 text-white" />
                        ) : (
                          <Copy className="h-3 w-3 text-white" />
                        )}
                      </button>
                    </div>
                    <span className="text-xs text-gray-500 text-center mt-1 block font-mono">
                      {shade}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  <div className="space-y-1">
                    <div className="font-mono">{color}</div>
                    <div className="text-gray-400">Click to copy</div>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}