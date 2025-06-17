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
      className={`bg-white rounded-md border border-gray-200 mb-3 ${className}`}
    >
      <Collapsible.Trigger asChild>
        <button className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 rounded-t-md transition-colors group text-left">
          <div className="flex items-center gap-3 flex-1">
            {icon && (
              <div className="w-5 h-5 text-gray-500">{icon}</div>
            )}
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-gray-900">{title}</h3>
              {hasChanges && (
                <div className="relative">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" title={`${changedCount || ''} ${changedCount === 1 ? 'change' : 'changes'}`} />
                </div>
              )}
            </div>
            {badge !== undefined && (
              <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                {badge}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {headerAction && (
              <div 
                className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                {headerAction}
              </div>
            )}
            <ChevronDownIcon 
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                isOpen ? 'transform rotate-180' : ''
              }`} 
            />
          </div>
        </button>
      </Collapsible.Trigger>
      
      <Collapsible.Content className="border-t border-gray-100">
        <div className="p-4">
          {children}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}