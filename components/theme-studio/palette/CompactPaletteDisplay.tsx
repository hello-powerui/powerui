'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface CompactPaletteDisplayProps {
  name: string;
  colors: string[];
  isSelected?: boolean;
  onClick?: () => void;
  type?: 'color' | 'neutral';
}

export function CompactPaletteDisplay({
  name,
  colors,
  isSelected,
  onClick,
  type = 'color'
}: CompactPaletteDisplayProps) {
  const displayColors = type === 'color' ? colors : colors.slice(0, 12);
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left group",
        "hover:bg-gray-50 hover:shadow-sm",
        isSelected ? "bg-gray-50 shadow-sm ring-1 ring-gray-200" : "bg-white"
      )}
    >
      {/* Selection indicator */}
      <div className={cn(
        "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
        isSelected ? "border-gray-900 bg-gray-900" : "border-gray-300 group-hover:border-gray-400"
      )}>
        {isSelected && <Check className="w-3 h-3 text-white" />}
      </div>
      
      {/* Palette name */}
      <div className="flex-shrink-0 min-w-0">
        <p className={cn(
          "text-sm font-medium truncate",
          isSelected ? "text-gray-900" : "text-gray-700"
        )}>
          {name}
        </p>
      </div>
      
      {/* Color preview */}
      <div className="flex-1 flex justify-end items-center gap-0.5">
        {type === 'color' ? (
          // Color palette - overlapping circles
          <div className="flex items-center">
            {displayColors.slice(0, 6).map((color, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full border border-gray-200 shadow-sm"
                style={{ 
                  backgroundColor: color,
                  marginLeft: i === 0 ? 0 : '-6px',
                  zIndex: i
                }}
              />
            ))}
            {colors.length > 6 && (
              <span className="ml-1.5 text-xs text-gray-500">
                +{colors.length - 6}
              </span>
            )}
          </div>
        ) : (
          // Neutral palette - gradient strip
          <div className="flex h-5 rounded overflow-hidden border border-gray-200 shadow-sm">
            {displayColors.map((color, i) => (
              <div
                key={i}
                className="w-2 h-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </button>
  );
}