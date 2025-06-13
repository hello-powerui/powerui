'use client';

import { ChangeIndicator } from '../ui/change-indicator';
import { useThemeChanges } from '@/lib/hooks/use-theme-changes';

interface PropertyWrapperProps {
  label: string;
  path: string[];
  children: React.ReactNode;
  className?: string;
}

export function PropertyWrapper({ label, path, children, className = '' }: PropertyWrapperProps) {
  const hasChanges = useThemeChanges(state => state.hasChanges);
  const hasChanged = hasChanges(path);
  
  return (
    <div className={`relative ${className}`}>
      {label && (
        <div className="flex items-center gap-1.5 mb-1">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <ChangeIndicator hasChanged={hasChanged} />
        </div>
      )}
      {children}
    </div>
  );
}