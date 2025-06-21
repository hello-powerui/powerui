'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface FieldGroupCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
  isLast?: boolean;
  showConnector?: boolean;
}

export function FieldGroupCard({
  title,
  children,
  className,
  accentColor = 'text-blue-600',
  isLast = false,
  showConnector = false,
}: FieldGroupCardProps) {
  return (
    <div className={cn("relative bg-gray-50 rounded-md p-3 border border-gray-100", className)}>
      {/* Title with improved styling */}
      {title && (
        <div className="mb-2.5">
          <h5 className={cn("text-sm font-semibold", accentColor)}>{title}</h5>
        </div>
      )}
      
      {/* Children with proper spacing */}
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}