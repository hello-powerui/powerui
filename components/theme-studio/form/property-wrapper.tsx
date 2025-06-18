'use client';

import { ChangeIndicator } from '../ui/change-indicator';
import { useThemeChanges } from '@/lib/hooks/use-theme-changes';

interface PropertyWrapperProps {
  label: string;
  path: string[];
  children: React.ReactNode;
  className?: string;
  inline?: boolean;
}

export function PropertyWrapper({ label, path, children, className = '', inline = false }: PropertyWrapperProps) {
  const hasChanges = useThemeChanges(state => state.hasChanges);
  const hasChanged = hasChanges(path);
  
  if (inline) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <label className="text-[11px] font-medium text-gray-700 w-[110px] flex-shrink-0 flex items-center gap-1">
          {label}
          {hasChanged && <div className="w-1 h-1 bg-blue-500 rounded-full" />}
        </label>
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    );
  }
  
  return (
    <div className={`relative ${className}`}>
      {label && (
        <div className="flex items-center gap-1 mb-0.5">
          <label className="text-[11px] font-medium text-gray-700">{label}</label>
          <ChangeIndicator hasChanged={hasChanged} />
        </div>
      )}
      {children}
    </div>
  );
}