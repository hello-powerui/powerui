'use client';

import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Select from '@radix-ui/react-select';
import * as Switch from '@radix-ui/react-switch';
import * as Label from '@radix-ui/react-label';
import * as Slider from '@radix-ui/react-slider';
import * as Separator from '@radix-ui/react-separator';
import { useThemeBuilderStore } from '@/lib/stores/theme-builder-store';

const ChevronDownIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const CheckIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export function ModernStyleTab() {
  const { theme, updateThemeProperty } = useThemeBuilderStore();

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
    { id: 'default', name: 'Default (16px)' },
    { id: 'large', name: 'Large (20px)' },
  ];

  return (
    <div className="space-y-6">
      {/* Show Borders Toggle */}
      <div className="space-y-3">
        <div>
          <Label.Root className="text-sm font-medium text-gray-700">
            Borders
          </Label.Root>
          <p className="text-xs text-gray-500 mt-1">
            Control border visibility and style
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Switch.Root
            checked={theme.showBorders}
            onCheckedChange={(checked) => updateThemeProperty('showBorders', checked)}
            className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-primary outline-none cursor-pointer"
          >
            <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
          <Label.Root className="text-sm text-gray-700">
            Show borders on visuals
          </Label.Root>
        </div>

        {theme.showBorders && (
          <div className="pl-4 border-l-2 border-gray-100 space-y-3">
            <Label.Root className="text-sm font-medium text-gray-700">
              Border Style
            </Label.Root>
            <RadioGroup.Root
              value={theme.borderStyle || 'default'}
              onValueChange={(value) => updateThemeProperty('borderStyle', value)}
              className="space-y-2"
            >
              {borderStyles.map((style) => (
                <div key={style.id} className="flex items-center space-x-3">
                  <RadioGroup.Item
                    value={style.id}
                    className="w-4 h-4 rounded-full border border-gray-300 bg-white data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:border-2 outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:w-1.5 after:h-1.5 after:rounded-full after:bg-white" />
                  </RadioGroup.Item>
                  <div>
                    <Label.Root className="text-sm font-medium text-gray-700 cursor-pointer">
                      {style.name}
                    </Label.Root>
                    <p className="text-xs text-gray-500">{style.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup.Root>
          </div>
        )}
      </div>

      <Separator.Root className="bg-gray-200 h-px" />

      {/* Background Style */}
      <div className="space-y-3">
        <div>
          <Label.Root className="text-sm font-medium text-gray-700">
            Background Style
          </Label.Root>
          <p className="text-xs text-gray-500 mt-1">
            Control visual background appearance
          </p>
        </div>

        <RadioGroup.Root
          value={theme.bgStyle || 'default'}
          onValueChange={(value) => updateThemeProperty('bgStyle', value)}
          className="space-y-2"
        >
          {backgroundStyles.map((style) => (
            <div key={style.id} className="flex items-center space-x-3">
              <RadioGroup.Item
                value={style.id}
                className="w-4 h-4 rounded-full border border-gray-300 bg-white data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:border-2 outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:w-1.5 after:h-1.5 after:rounded-full after:bg-white" />
              </RadioGroup.Item>
              <div>
                <Label.Root className="text-sm font-medium text-gray-700 cursor-pointer">
                  {style.name}
                </Label.Root>
                <p className="text-xs text-gray-500">{style.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup.Root>
      </div>

      <Separator.Root className="bg-gray-200 h-px" />

      {/* Border Radius */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <Label.Root className="text-sm font-medium text-gray-700">
              Border Radius
            </Label.Root>
            <p className="text-xs text-gray-500 mt-1">
              Corner roundness for visual elements
            </p>
          </div>
          <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
            {theme.borderRadius}px
          </span>
        </div>

        <div className="space-y-2">
          <Slider.Root
            value={[theme.borderRadius]}
            onValueChange={([value]) => updateThemeProperty('borderRadius', value)}
            max={20}
            min={0}
            step={1}
            className="relative flex items-center select-none touch-none w-full h-5"
          >
            <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
              <Slider.Range className="absolute bg-primary rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-primary shadow-lg rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" />
          </Slider.Root>
          <div className="flex justify-between text-xs text-gray-500">
            <span>0px (Sharp)</span>
            <span>20px (Very Round)</span>
          </div>
        </div>

        {/* Visual Preview */}
        <div className="flex gap-2 pt-2">
          {[0, 4, 8, 12].map((radius) => (
            <div
              key={radius}
              className={`w-8 h-8 bg-gray-300 border ${theme.borderRadius === radius ? 'ring-2 ring-primary' : ''}`}
              style={{ borderRadius: `${radius}px` }}
            />
          ))}
        </div>
      </div>

      <Separator.Root className="bg-gray-200 h-px" />

      {/* Padding */}
      <div className="space-y-3">
        <div>
          <Label.Root className="text-sm font-medium text-gray-700">
            Spacing
          </Label.Root>
          <p className="text-xs text-gray-500 mt-1">
            Internal padding for visual elements
          </p>
        </div>

        <Select.Root
          value={theme.paddingStyle || 'default'}
          onValueChange={(value) => updateThemeProperty('paddingStyle', value)}
        >
          <Select.Trigger className="flex h-9 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <Select.Value />
            <Select.Icon asChild>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          
          <Select.Portal>
            <Select.Content className="relative z-50 min-w-[8rem] overflow-hidden rounded-lg border bg-white text-gray-950 shadow-md animate-in fade-in-80">
              <Select.Viewport className="p-1 h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]">
                {paddingOptions.map((option) => (
                  <Select.Item
                    key={option.id}
                    value={option.id}
                    className="relative flex w-full cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                      <Select.ItemIndicator>
                        <CheckIcon />
                      </Select.ItemIndicator>
                    </span>
                    <Select.ItemText>{option.name}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  );
}