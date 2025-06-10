'use client';

import * as Select from '@radix-ui/react-select';
import * as Label from '@radix-ui/react-label';
import * as RadioGroup from '@radix-ui/react-radio-group';
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

export function TypographySection() {
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
    <div className="space-y-5">
      {/* Font Family */}
      <div className="space-y-2">
        <Label.Root className="text-sm font-medium text-gray-700">
          Font Family
        </Label.Root>

        <Select.Root
          value={theme.fontFamily}
          onValueChange={(value) => updateThemeProperty('fontFamily', value)}
        >
          <Select.Trigger className="flex h-9 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 hover:border-gray-300 transition-colors">
            <Select.Value />
            <Select.Icon asChild>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          
          <Select.Portal>
            <Select.Content className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white text-gray-950 shadow-md animate-in fade-in-80">
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
          className="p-3 bg-gray-50 rounded-md border text-sm"
          style={{ fontFamily: getFontFamily(theme.fontFamily) }}
        >
          <div className="font-medium text-gray-900 mb-1">Sample Text</div>
          <div className="text-gray-600">
            The quick brown fox jumps over the lazy dog.
          </div>
        </div>
      </div>

    </div>
  );
}