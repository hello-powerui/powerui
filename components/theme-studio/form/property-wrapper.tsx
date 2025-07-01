'use client';

import { ChangeIndicator } from '../ui/change-indicator';
import { useThemeChanges } from '@/lib/hooks/use-theme-changes';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  
  // Get property source information for visual styles
  const { selectedVisual, selectedVariant, getPropertySource } = useThemeStudioStore();
  let propertySource: 'inherited' | 'overridden' | 'new' | null = null;
  
  // Check if this is a visual style property path
  if (path[0] === 'visualStyles' && path.length >= 4 && selectedVisual && selectedVariant !== '*') {
    const propertyName = path.slice(3).join('.');
    propertySource = getPropertySource(selectedVisual, selectedVariant, propertyName);
  }
  
  if (inline) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <label className="text-sm font-medium text-gray-700 w-[110px] flex-shrink-0 flex items-center gap-1">
          {label}
          {propertySource && <PropertySourceIndicator source={propertySource} />}
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
          <label className="text-sm font-medium text-gray-700">{label}</label>
          {propertySource && <PropertySourceIndicator source={propertySource} />}
          <ChangeIndicator hasChanged={hasChanged} />
        </div>
      )}
      {children}
    </div>
  );
}

// Component to show property source indicator
function PropertySourceIndicator({ source }: { source: 'inherited' | 'overridden' | 'new' }) {
  const config = {
    inherited: {
      icon: '↓',
      label: 'Inherited from default (*) variant',
      className: 'text-gray-400'
    },
    overridden: {
      icon: '✓',
      label: 'Overriding default variant',
      className: 'text-purple-500'
    },
    new: {
      icon: '+',
      label: 'New property (not in default)',
      className: 'text-green-500'
    }
  };

  const { icon, label, className } = config[source];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`text-xs font-bold ${className} cursor-help`}>
            {icon}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}