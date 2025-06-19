'use client';

import * as Collapsible from '@radix-ui/react-collapsible';
import { useState, useEffect } from 'react';

// Icons
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

interface CollapsibleSectionProps {
  id?: string;
  title: string;
  tooltip?: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
  badge?: string | number;
  className?: string;
  headerAction?: React.ReactNode;
  hasChanges?: boolean;
  changedCount?: number;
}

export function CollapsibleSection({ 
  id,
  title, 
  tooltip,
  icon, 
  defaultOpen = false, 
  children,
  badge,
  className = "",
  headerAction,
  hasChanges = false,
  changedCount
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  // Force re-render when props change
  useEffect(() => {
    // This will help debug if the component is receiving prop updates
  }, [hasChanges, title]);

  return (
    <Collapsible.Root 
      open={isOpen} 
      onOpenChange={setIsOpen} 
      className={`${className}`}
    >
      <div className="flex items-center justify-between w-full px-2 py-1.5 hover:bg-gray-50 transition-colors group">
        <Collapsible.Trigger asChild>
          <button className="flex items-center gap-1.5 flex-1 text-left">
            <ChevronDownIcon 
              className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${
                isOpen ? 'transform rotate-180' : ''
              }`} 
            />
            {icon && (
              <div className="w-3.5 h-3.5 text-gray-500">{icon}</div>
            )}
            <h3 className={`text-[11px] text-gray-700 ${isOpen ? 'font-semibold' : 'font-medium'}`}>{title}</h3>
            {hasChanges && (
              <div className="w-1 h-1 bg-blue-500 rounded-full" title={`${changedCount || ''} ${changedCount === 1 ? 'change' : 'changes'}`} />
            )}
            {badge !== undefined && (
              <span className="px-1 py-0 text-[10px] text-gray-500">
                ({badge})
              </span>
            )}
          </button>
        </Collapsible.Trigger>
        {headerAction && (
          <div className="flex items-center gap-1">
            {headerAction}
          </div>
        )}
      </div>
      
      <Collapsible.Content className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
        <div className="relative pl-6 pr-2 pb-3">
          {/* Content with connection points */}
          <div className="relative pt-1">
            {children}
          </div>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}