'use client';

import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Select from '@radix-ui/react-select';
import * as Switch from '@radix-ui/react-switch';
import * as Label from '@radix-ui/react-label';
import * as Slider from '@radix-ui/react-slider';
import * as Separator from '@radix-ui/react-separator';
import { useThemeBuilderStore } from '@/lib/stores/theme-builder-store';

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-4 h-4 text-current mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export function TypographyLayoutTab() {
  const { theme, updateThemeProperty } = useThemeBuilderStore();

  const fontFamilies = [
    // Default Power BI Fonts
    { id: 'segoe-ui', name: 'Segoe UI', category: 'default' },
    { id: 'arial', name: 'Arial', category: 'default' },
    { id: 'calibri', name: 'Calibri', category: 'default' },
    { id: 'candara', name: 'Candara', category: 'default' },
    { id: 'corbel', name: 'Corbel', category: 'default' },
    { id: 'tahoma', name: 'Tahoma', category: 'default' },
    { id: 'trebuchet', name: 'Trebuchet MS', category: 'default' },
    // Custom Fonts
    { id: 'public-sans', name: 'Public Sans', category: 'custom' },
    { id: 'space-grotesk', name: 'Space Grotesk', category: 'custom' },
    { id: 'inter', name: 'Inter', category: 'custom' },
  ];

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

  const getFontDisplayName = (fontId: string) => {
    const font = fontFamilies.find(f => f.id === fontId);
    return font ? font.name : fontId;
  };

  const getFontFamily = (fontId: string) => {
    const fontMap: Record<string, string> = {
      'segoe-ui': 'Segoe UI, sans-serif',
      'arial': 'Arial, sans-serif',
      'calibri': 'Calibri, sans-serif',
      'candara': 'Candara, sans-serif',
      'corbel': 'Corbel, sans-serif',
      'tahoma': 'Tahoma, sans-serif',
      'trebuchet': 'Trebuchet MS, sans-serif',
      'public-sans': 'Public Sans, sans-serif',
      'space-grotesk': 'Space Grotesk, sans-serif',
      'inter': 'Inter, sans-serif',
    };
    return fontMap[fontId] || 'Segoe UI, sans-serif';
  };

  return (
    <div className="space-y-8">
      {/* Typography Section */}
      <div className="space-y-6">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="text-sm font-medium text-gray-700">Typography</h3>
          <p className="text-sm text-gray-600 mt-1">Configure fonts and text sizing for your theme</p>
        </div>

        {/* Font Family */}
        <div className="space-y-3">
          <div>
            <Label.Root className="text-sm font-medium text-gray-700">
              Font Family
            </Label.Root>
            <p className="text-xs text-gray-500 mt-1">
              Choose the primary font for your theme
            </p>
          </div>

          <Select.Root
            value={theme.fontFamily}
            onValueChange={(value) => updateThemeProperty('fontFamily', value)}
          >
            <Select.Trigger className="flex h-10 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <Select.Value />
              <Select.Icon asChild>
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>
            
            <Select.Portal>
              <Select.Content 
                className="relative z-50 min-w-[8rem] overflow-hidden rounded-lg border bg-white text-gray-950 shadow-md animate-in fade-in-80"
                position="popper"
                sideOffset={5}
                align="start"
              >
                <Select.Viewport className="p-1 max-h-64 overflow-y-auto">
                  {/* Default Fonts Group */}
                  <Select.Group>
                    <Select.Label className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Default Power BI Fonts
                    </Select.Label>
                    <div className="px-2 py-1 mb-2">
                      <div className="flex items-start gap-2 p-2 bg-blue-50 rounded-md text-blue-600">
                        <InfoIcon />
                        <p className="text-xs text-blue-700">
                          These fonts are included with Power BI and will display consistently across all systems.
                        </p>
                      </div>
                    </div>
                    {fontFamilies.filter(f => f.category === 'default').map((font) => (
                      <Select.Item
                        key={font.id}
                        value={font.id}
                        className="relative flex w-full cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                      >
                        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                          <Select.ItemIndicator>
                            <CheckIcon />
                          </Select.ItemIndicator>
                        </span>
                        <Select.ItemText style={{ fontFamily: getFontFamily(font.id) }}>
                          {font.name}
                        </Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Group>

                  <div className="my-1 h-px bg-gray-200" />

                  {/* Custom Fonts Group */}
                  <Select.Group>
                    <Select.Label className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Custom Fonts
                    </Select.Label>
                    <div className="px-2 py-1 mb-2">
                      <div className="flex items-start gap-2 p-2 bg-amber-50 rounded-md text-amber-600">
                        <InfoIcon />
                        <p className="text-xs text-amber-700">
                          Custom fonts must be installed on all user systems to display correctly. Consider fallbacks.
                        </p>
                      </div>
                    </div>
                    {fontFamilies.filter(f => f.category === 'custom').map((font) => (
                      <Select.Item
                        key={font.id}
                        value={font.id}
                        className="relative flex w-full cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                      >
                        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                          <Select.ItemIndicator>
                            <CheckIcon />
                          </Select.ItemIndicator>
                        </span>
                        <Select.ItemText style={{ fontFamily: getFontFamily(font.id) }}>
                          {font.name}
                        </Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          {/* Font Preview */}
          <div 
            className="p-4 bg-gray-50 rounded-lg border"
            style={{ fontFamily: getFontFamily(theme.fontFamily) }}
          >
            <div className="text-lg font-semibold text-gray-900 mb-2">Sample Text</div>
            <div className="text-sm text-gray-600">
              The quick brown fox jumps over the lazy dog. This preview shows how your chosen font will appear in the theme.
            </div>
          </div>
        </div>

      </div>

      <Separator.Root className="bg-gray-200 h-px" />

      {/* Layout Section */}
      <div className="space-y-6">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="text-sm font-medium text-gray-700">Layout & Styling</h3>
          <p className="text-sm text-gray-600 mt-1">Configure visual appearance and spacing</p>
        </div>

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
              <Select.Content 
                className="relative z-50 min-w-[8rem] overflow-hidden rounded-lg border bg-white text-gray-950 shadow-md animate-in fade-in-80"
                position="popper"
                sideOffset={5}
                align="start"
              >
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
    </div>
  );
}