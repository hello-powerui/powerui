'use client';

import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface ButtonSlicerStatesProps {
  selectedState: string;
  onSelectedStateChange: (state: string) => void;
  visualType: string;
}

// Define the available states for button slicer
const BUTTON_SLICER_STATES = {
  basic: [
    { value: 'default', label: 'Default', description: 'Normal state' },
    { value: 'selection:selected', label: 'Selected', description: 'When item is selected' },
    { value: 'selection:unselected', label: 'Unselected', description: 'When item is not selected' },
    { value: 'hover', label: 'Hover', description: 'Mouse hover' },
    { value: 'press', label: 'Press', description: 'Mouse click/press' },
  ],
  expansion: [
    { value: 'expansion:expanded', label: 'Expanded', description: 'When expanded' },
    { value: 'expansion:collapsed', label: 'Collapsed', description: 'When collapsed' },
  ],
  series: [
    { value: 'series:selectall', label: 'Select All', description: 'Select all button' },
  ],
  combinations: [
    { value: 'selection:selected-interaction:hover', label: 'Selected + Hover', description: 'Selected item being hovered' },
    { value: 'selection:unselected-interaction:hover', label: 'Unselected + Hover', description: 'Unselected item being hovered' },
    { value: 'selection:selected-interaction:press', label: 'Selected + Press', description: 'Selected item being pressed' },
    { value: 'selection:unselected-interaction:press', label: 'Unselected + Press', description: 'Unselected item being pressed' },
  ]
};

// Simple states for other visuals
const SIMPLE_STATES = [
  { value: 'default', label: 'Default' },
  { value: 'hover', label: 'Hover' },
  { value: 'selected', label: 'Selected' },
  { value: 'disabled', label: 'Disabled' },
];

export function ButtonSlicerStates({ 
  selectedState, 
  onSelectedStateChange,
  visualType
}: ButtonSlicerStatesProps) {
  // Check if this is a button slicer
  const isButtonSlicer = visualType === 'advancedSlicerVisual' || visualType === 'buttonSlicer';
  
  if (!isButtonSlicer) {
    // For other visuals, show simple states
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
            {SIMPLE_STATES.map((state) => (
              <button
                key={state.value}
                onClick={() => onSelectedStateChange(state.value)}
                className={`
                  px-3 py-1.5 text-xs font-medium rounded transition-all
                  ${selectedState === state.value
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                {state.label}
              </button>
            ))}
          </div>
        </div>
      </Card>
    );
  }
  
  // For button slicer, show advanced state selector
  return (
    <Card className="mb-3 p-4 border-gray-200 shadow-sm">
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Button Slicer States</h3>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            Configure appearance for different interaction and selection states.
          </p>
        </div>
        
        <Select value={selectedState} onValueChange={onSelectedStateChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a state">
              <div className="flex items-center gap-2">
                <span>{BUTTON_SLICER_STATES.basic.find(s => s.value === selectedState)?.label || 
                       BUTTON_SLICER_STATES.expansion.find(s => s.value === selectedState)?.label ||
                       BUTTON_SLICER_STATES.series.find(s => s.value === selectedState)?.label ||
                       BUTTON_SLICER_STATES.combinations.find(s => s.value === selectedState)?.label ||
                       selectedState}</span>
                {selectedState !== 'default' && (
                  <Badge variant="secondary" className="text-xs">
                    {selectedState.includes(':') ? 'Complex' : 'Simple'}
                  </Badge>
                )}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <div className="p-1">
              <div className="text-xs font-semibold text-gray-500 px-2 py-1">Basic States</div>
              {BUTTON_SLICER_STATES.basic.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  <div className="flex flex-col">
                    <span className="font-medium">{state.label}</span>
                    <span className="text-xs text-gray-500">{state.description}</span>
                  </div>
                </SelectItem>
              ))}
              
              <div className="text-xs font-semibold text-gray-500 px-2 py-1 mt-2">Expansion States</div>
              {BUTTON_SLICER_STATES.expansion.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  <div className="flex flex-col">
                    <span className="font-medium">{state.label}</span>
                    <span className="text-xs text-gray-500">{state.description}</span>
                  </div>
                </SelectItem>
              ))}
              
              <div className="text-xs font-semibold text-gray-500 px-2 py-1 mt-2">Series States</div>
              {BUTTON_SLICER_STATES.series.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  <div className="flex flex-col">
                    <span className="font-medium">{state.label}</span>
                    <span className="text-xs text-gray-500">{state.description}</span>
                  </div>
                </SelectItem>
              ))}
              
              <div className="text-xs font-semibold text-gray-500 px-2 py-1 mt-2">Combined States</div>
              {BUTTON_SLICER_STATES.combinations.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  <div className="flex flex-col">
                    <span className="font-medium">{state.label}</span>
                    <span className="text-xs text-gray-500">{state.description}</span>
                  </div>
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
        
        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
          <strong>Tip:</strong> States can be combined for complex interactions. For example, "Selected + Hover" 
          defines how a selected item looks when hovered.
        </div>
      </div>
    </Card>
  );
}