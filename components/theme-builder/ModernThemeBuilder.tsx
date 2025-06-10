'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { ColorTab } from './tabs/ColorTab';
import { TypographyLayoutTab } from './tabs/TypographyLayoutTab';

// Icons as simple SVG components
const PaletteIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a6 6 0 00-3-5.197M9 3v12" />
  </svg>
);

const TypographyLayoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
  </svg>
);

export function ModernThemeBuilder() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <Tabs.Root defaultValue="color" className="w-full">
        {/* Tab Navigation */}
        <Tabs.List className="flex border-b border-gray-200 bg-white">
          <Tabs.Trigger
            value="color"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-primary/5"
          >
            <PaletteIcon />
            <span>Colors</span>
          </Tabs.Trigger>
          
          <Tabs.Trigger
            value="typography-layout"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-primary/5"
          >
            <TypographyLayoutIcon />
            <span>Typography & Layout</span>
          </Tabs.Trigger>
        </Tabs.List>

        {/* Tab Content */}
        <Tabs.Content value="color" className="p-6 bg-white">
          <ColorTab />
        </Tabs.Content>
        
        <Tabs.Content value="typography-layout" className="p-6 bg-white max-h-[calc(100vh-12rem)] overflow-y-auto">
          <TypographyLayoutTab />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}