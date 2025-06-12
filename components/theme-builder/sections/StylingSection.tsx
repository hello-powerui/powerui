'use client';

import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Label from '@radix-ui/react-label';
import * as Slider from '@radix-ui/react-slider';
import { useThemeBuilderStore } from '@/lib/stores/theme-builder-store';

const backgroundStyles = [
  { id: 'default', name: 'Default', description: 'Standard background' },
  { id: 'subtle-contrast', name: 'Subtle', description: 'Light contrast' },
  { id: 'inversed-contrast', name: 'Inversed', description: 'High contrast' },
];

const borderStyles = [
  { id: 'default', name: 'Default', description: 'Standard borders' },
  { id: 'subtle', name: 'Subtle', description: 'Light borders' },
  { id: 'none', name: 'None', description: 'No borders' },
];

const paddingOptions = [
  { id: 'default', name: 'Default', size: 16, description: '16px spacing' },
  { id: 'large', name: 'Large', size: 20, description: '20px spacing' },
];

export function StylingSection() {
  const { theme, setBorderRadius, setSpacing, setBgStyle, setBorderStyle } = useThemeBuilderStore();

  // Snap values for border radius
  const snapValues = [0, 4, 8, 12];
  
  // Find closest snap value
  const snapToValue = (value: number) => {
    return snapValues.reduce((prev, curr) => 
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
  };

  return (
    <div className="space-y-5">
      {/* Background Style */}
      <div className="space-y-2">
        <Label.Root className="text-sm font-medium text-gray-700">
          Background Style
        </Label.Root>

        <div className="grid grid-cols-3 gap-2">
          {backgroundStyles.map((style) => (
            <label
              key={style.id}
              className={`relative flex flex-col items-center p-2.5 rounded-md border cursor-pointer transition-all hover:border-gray-300 ${
                (theme.bgStyle || 'default') === style.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200'
              }`}
            >
              <input
                type="radio"
                name="bgStyle"
                value={style.id}
                checked={(theme.bgStyle || 'default') === style.id}
                onChange={() => setBgStyle(style.id)}
                className="sr-only"
              />
              <span className="text-xs font-medium text-gray-900">{style.name}</span>
              <span className="text-xs text-gray-500 mt-0.5">{style.description}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Border Style */}
      <div className="space-y-2">
        <Label.Root className="text-sm font-medium text-gray-700">
          Border Style
        </Label.Root>

        <div className="grid grid-cols-3 gap-2">
          {borderStyles.map((style) => (
            <label
              key={style.id}
              className={`relative flex flex-col items-center p-2.5 rounded-md border cursor-pointer transition-all hover:border-gray-300 ${
                (theme.borderStyle || 'default') === style.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200'
              }`}
            >
              <input
                type="radio"
                name="borderStyle"
                value={style.id}
                checked={(theme.borderStyle || 'default') === style.id}
                onChange={() => {
                  setBorderStyle(style.id);
                  // Note: showBorders property is not available in current theme builder store
                }}
                className="sr-only"
              />
              <span className="text-xs font-medium text-gray-900">{style.name}</span>
              <span className="text-xs text-gray-500 mt-0.5">{style.description}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Border Radius - Only show if borders are visible */}
      {theme.borderStyle !== 'none' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label.Root className="text-sm font-medium text-gray-700">
              Border Radius
            </Label.Root>
            <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
              {theme.borderRadius}px
            </span>
          </div>

          <div className="space-y-2">
            <Slider.Root
              value={[theme.borderRadius]}
              onValueChange={([value]) => {
                const snappedValue = snapToValue(value);
                setBorderRadius(snappedValue);
              }}
              max={12}
              min={0}
              step={1}
              className="relative flex items-center select-none touch-none w-full h-5"
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-primary rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-5 h-5 bg-primary shadow-lg rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" />
            </Slider.Root>
            
            {/* Snap points indicators */}
            <div className="relative h-2 -mt-1">
              {snapValues.map((value) => (
                <div
                  key={value}
                  className="absolute w-0.5 h-2 bg-gray-300"
                  style={{ left: `${(value / 12) * 100}%` }}
                />
              ))}
            </div>
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>0px</span>
              <span>4px</span>
              <span>8px</span>
              <span>12px</span>
            </div>
          </div>

          {/* Visual Preview */}
          <div className="flex gap-3 pt-2">
            {snapValues.map((radius) => (
              <button
                key={radius}
                onClick={() => setBorderRadius(radius)}
                className={`w-12 h-12 bg-gray-300 border-2 transition-all ${
                  theme.borderRadius === radius 
                    ? 'border-primary ring-2 ring-primary ring-offset-2' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ borderRadius: `${radius}px` }}
                aria-label={`${radius}px radius`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Spacing */}
      <div className="space-y-2">
        <Label.Root className="text-sm font-medium text-gray-700">
          Spacing
        </Label.Root>

        <div className="grid grid-cols-2 gap-2">
          {paddingOptions.map((option) => (
            <label
              key={option.id}
              className={`relative flex flex-col items-center p-2.5 rounded-md border cursor-pointer transition-all hover:border-gray-300 ${
                (theme.paddingStyle || 'default') === option.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200'
              }`}
            >
              <input
                type="radio"
                name="paddingStyle"
                value={option.id}
                checked={(theme.paddingStyle || 'default') === option.id}
                onChange={() => {
                  // paddingStyle is derived from spacing in the current implementation
                  // This would need a specific setPaddingStyle method in the store
                  console.warn('paddingStyle setting not fully implemented');
                }}
                className="sr-only"
              />
              <span className="text-xs font-medium text-gray-900">{option.name}</span>
              <span className="text-xs text-gray-500">{option.description}</span>
              <div className="mt-1.5 flex items-center justify-center">
                <div 
                  className="bg-gray-300 border border-gray-400"
                  style={{ 
                    width: `${option.size * 1.5}px`, 
                    height: `${option.size * 1.5}px`,
                    padding: `${option.size / 5}px`
                  }}
                >
                  <div className="w-full h-full bg-gray-500" />
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}