'use client';

import { Card } from '@/components/ui/card';

interface VisualStatesProps {
  selectedState: string;
  onSelectedStateChange: (state: string) => void;
  hasStateDrivenProperties: boolean;
  children?: React.ReactNode;
}

const states = ['default', 'hover', 'selected', 'disabled'] as const;

export function VisualStates({ 
  selectedState, 
  onSelectedStateChange,
  hasStateDrivenProperties,
  children 
}: VisualStatesProps) {
  if (!hasStateDrivenProperties) {
    return null;
  }

  return (
    <Card className="mb-3 p-4 border-gray-200 shadow-sm">
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Visual States</h3>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            Configure how this visual appears in different interaction states.
          </p>
        </div>
        <div className="flex gap-1.5">
          {states.map((state) => (
            <button
              key={state}
              onClick={() => onSelectedStateChange(state)}
              className={`
                px-3 py-1.5 text-xs font-medium rounded transition-all
                ${selectedState === state
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                }
              `}
            >
              {state.charAt(0).toUpperCase() + state.slice(1)}
            </button>
          ))}
        </div>
        {children && (
          <div className="pt-3 border-t border-gray-200">
            {children}
          </div>
        )}
      </div>
    </Card>
  );
}