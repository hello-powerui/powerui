'use client';

import { cn } from '@/lib/utils';
import { Check, MoreVertical, Edit, ExternalLink, Trash2 } from 'lucide-react';
import { generateCoolorsUrl } from '@/lib/utils/coolors-parser';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface CompactPaletteDisplayWithActionsProps {
  name: string;
  colors: string[];
  isSelected?: boolean;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  type?: 'color' | 'neutral';
  showActions?: boolean;
}

export function CompactPaletteDisplayWithActions({
  name,
  colors,
  isSelected,
  onClick,
  onEdit,
  onDelete,
  type = 'color',
  showActions = false
}: CompactPaletteDisplayWithActionsProps) {
  const displayColors = type === 'color' ? colors : colors.slice(0, 12);
  
  const handleOpenInCoolors = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (type === 'color') {
      const url = generateCoolorsUrl(colors);
      window.open(url, '_blank');
    }
  };

  return (
    <div className="group relative flex items-center gap-2">
      <button
        onClick={onClick}
        className={cn(
          "flex-1 flex items-center gap-3 p-3 rounded-lg transition-all text-left",
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
        <div className="flex-1 flex justify-end items-center gap-0.5 pr-2">
          {type === 'color' ? (
            // Color palette - overlapping circles
            <div className="flex items-center pr-1">
              {displayColors.slice(0, 6).map((color, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full border border-gray-200 shadow-sm relative"
                  style={{ 
                    backgroundColor: color,
                    marginLeft: i === 0 ? 0 : '-6px',
                    zIndex: displayColors.length - i
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

      {/* Actions dropdown */}
      {showActions && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 flex-shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => onEdit?.()}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            {type === 'color' && (
              <DropdownMenuItem onClick={handleOpenInCoolors}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Open in Coolors.co
              </DropdownMenuItem>
            )}
            {onDelete && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => onDelete()}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}