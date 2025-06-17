'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ModernNeutralPaletteDisplayProps {
  shades?: Record<string, string>;
  colors?: string[];
  name: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export function ModernNeutralPaletteDisplay({
  colors,
  name,
  isSelected = false,
  onClick,
}: ModernNeutralPaletteDisplayProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopyColor = (e: React.MouseEvent, color: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <div
      className={cn(
        "group relative p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm",
        isSelected 
          ? "border-gray-900 bg-gray-50 ring-1 ring-gray-900/10" 
          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
      )}
      onClick={onClick}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
      
      <div className="space-y-2.5">
        {/* Palette name */}
        <h4 className="font-medium text-sm text-gray-900">{name}</h4>
        
        {/* Compact color strip */}
        <div className="h-6 rounded-md overflow-hidden flex border border-gray-200">
          {(colors || []).map((color, index) => (
            <div
              key={index}
              className="flex-1 relative group/color transition-all hover:scale-110 hover:z-10 hover:shadow-sm"
              style={{ backgroundColor: color }}
              onClick={(e) => handleCopyColor(e, color)}
              title={`${color} • Click to copy`}
            >
              {/* Copy feedback */}
              {copiedColor === color && (
                <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}