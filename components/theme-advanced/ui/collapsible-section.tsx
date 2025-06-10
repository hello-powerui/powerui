'use client';

import * as Collapsible from '@radix-ui/react-collapsible';
import { useState } from 'react';

// Icons
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

interface CollapsibleSectionProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
  badge?: string | number;
  className?: string;
}

export function CollapsibleSection({ 
  id,
  title, 
  icon, 
  defaultOpen = false, 
  children,
  badge,
  className = ""
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible.Root 
      open={isOpen} 
      onOpenChange={setIsOpen} 
      className={`border-b border-gray-200 last:border-b-0 ${className}`}
    >
      <Collapsible.Trigger className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors group">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-5 h-5 text-gray-400">{icon}</div>
          )}
          <h3 className="text-sm font-medium text-gray-700">{title}</h3>
          {badge !== undefined && (
            <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <ChevronDownIcon 
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`} 
        />
      </Collapsible.Trigger>
      
      <Collapsible.Content className="px-4 pb-4">
        <div className="pt-2">
          {children}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}