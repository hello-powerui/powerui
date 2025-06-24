'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HorizontalColorItemProps {
  id: number;
  color: string;
  onRemove: () => void;
  onColorChange: (color: string) => void;
  disabled?: boolean;
}

export function HorizontalColorItem({
  id,
  color,
  onRemove,
  onColorChange,
  disabled
}: HorizontalColorItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? undefined : 'none',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative flex flex-col items-center gap-2",
        isDragging && "opacity-50"
      )}
    >
      <div className="relative">
        <div
          className="w-14 h-14 rounded-lg border-2 border-gray-200 cursor-grab active:cursor-grabbing hover:border-gray-400 transition-all hover:shadow-md"
          style={{ backgroundColor: color }}
          {...attributes}
          {...listeners}
        >
          <input
            type="color"
            value={color}
            onChange={(e) => onColorChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-lg"
          />
        </div>
        
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
          disabled={disabled}
          className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-white border border-gray-200 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:border-red-200 flex items-center justify-center"
          style={{ zIndex: 10 }}
        >
          <X className="h-3 w-3 text-gray-600" />
        </button>
      </div>
      
      <span className="text-xs font-mono text-gray-600">{color}</span>
    </div>
  );
}