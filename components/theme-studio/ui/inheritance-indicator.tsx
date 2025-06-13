'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export type PropertySource = 'global' | 'visual' | 'variant' | 'custom' | 'default' | 'state';

interface InheritanceAction {
  label: string;
  onClick: () => void;
}

interface InheritanceIndicatorProps {
  source: PropertySource;
  overriddenValue?: any;
  actions?: InheritanceAction[];
}

function getSourceLabel(source: PropertySource): string {
  switch (source) {
    case 'global':
      return 'Inherited (Global)';
    case 'visual':
      return 'Inherited (Visual)';
    case 'variant':
      return 'Variant Value';
    case 'state':
      return 'State Value';
    case 'custom':
      return 'Modified';
    case 'default':
    default:
      return 'Default';
  }
}

function getSourceColor(source: PropertySource): string {
  switch (source) {
    case 'global':
      return 'text-gray-700 bg-gray-100 hover:bg-gray-200';
    case 'visual':
      return 'text-purple-700 bg-purple-100 hover:bg-purple-200';
    case 'variant':
      return 'text-green-700 bg-green-100 hover:bg-green-200';
    case 'state':
      return 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200';
    case 'custom':
      return 'text-orange-700 bg-orange-100 hover:bg-orange-200';
    case 'default':
    default:
      return 'text-gray-600 bg-gray-50 hover:bg-gray-100';
  }
}

function getSourceIcon(source: PropertySource): string {
  switch (source) {
    case 'global':
      return '🌐';
    case 'visual':
      return '📊';
    case 'variant':
      return '✨';
    case 'state':
      return '⚡';
    case 'custom':
      return '✏️';
    case 'default':
    default:
      return '📋';
  }
}

export function InheritanceIndicator({ source, overriddenValue, actions }: InheritanceIndicatorProps) {
  const getTooltipContent = () => {
    switch (source) {
      case 'global':
        return 'This value is inherited from the global visual settings';
      case 'visual':
        return 'This value is inherited from the visual type defaults';
      case 'variant':
        return 'This value is set for this specific variant';
      case 'state':
        return 'This value is set for the current interaction state';
      case 'custom':
        return 'This value has been customized for this specific context';
      case 'default':
      default:
        return 'This is the default value from the theme schema';
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs cursor-help transition-colors ${getSourceColor(source)}`}>
            <span>{getSourceIcon(source)}</span>
            <span className="text-xs">
              {getSourceLabel(source)}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="max-w-xs">
            <p className="text-xs font-medium mb-1">{getTooltipContent()}</p>
            {overriddenValue !== undefined && (
              <p className="text-xs text-gray-400">
                Overrides: {typeof overriddenValue === 'object' ? 'object' : String(overriddenValue)}
              </p>
            )}
            {actions && actions.length > 0 && (
              <div className="border-t border-gray-200 mt-2 pt-2">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={action.onClick}
                    className="block w-full text-left px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 rounded"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Hook to determine property source
export function usePropertySource(
  propertyPath: string[],
  currentValue: any,
  globalValue: any,
  visualDefault: any,
  variantValue: any
): PropertySource {
  // If value matches variant value, it's from variant
  if (variantValue !== undefined && JSON.stringify(currentValue) === JSON.stringify(variantValue)) {
    return 'variant';
  }
  
  // If value matches visual default, it's from visual
  if (visualDefault !== undefined && JSON.stringify(currentValue) === JSON.stringify(visualDefault)) {
    return 'visual';
  }
  
  // If value matches global value, it's from global
  if (globalValue !== undefined && JSON.stringify(currentValue) === JSON.stringify(globalValue)) {
    return 'global';
  }
  
  // If value exists but doesn't match any source, it's custom
  if (currentValue !== undefined && currentValue !== null) {
    return 'custom';
  }
  
  // Otherwise it's default
  return 'default';
}