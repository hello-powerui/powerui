'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface BentoCardProps {
  className?: string;
  children: ReactNode;
}

export function BentoCard({ className, children }: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white border border-gray-200/50",
        "shadow-sm hover:shadow-md transition-all duration-300",
        "hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoGridProps {
  className?: string;
  children: ReactNode;
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}