'use client';

import React from 'react';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface HelpTooltipProps {
  content: React.ReactNode;
  size?: 'xs' | 'sm' | 'md';
  icon?: React.ElementType;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

export function HelpTooltip({ 
  content, 
  size = 'xs',
  icon: Icon = Info,
  side = 'top',
  align = 'center'
}: HelpTooltipProps) {
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4'
  };
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button 
          type="button" 
          className="inline-flex items-center justify-center p-0 border-0 bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          aria-label="Help information"
        >
          <Icon className={`${sizeClasses[size]} text-muted-foreground/70 cursor-help hover:text-foreground transition-colors`} />
        </button>
      </TooltipTrigger>
      <TooltipContent side={side} align={align} className="max-w-xs">
        {content}
      </TooltipContent>
    </Tooltip>
  );
}