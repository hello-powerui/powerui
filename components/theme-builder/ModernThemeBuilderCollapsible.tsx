'use client';

import * as Collapsible from '@radix-ui/react-collapsible';
import { useState } from 'react';
import { ColorTab } from './tabs/ColorTab';
import { StylingSection } from './sections/StylingSection';
import { TypographySection } from './sections/TypographySection';

// Icons
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const PaletteIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a6 6 0 00-3-5.197M9 3v12" />
  </svg>
);

const StyleIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const TypographyIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
  </svg>
);

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function CollapsibleSection({ title, icon, defaultOpen = true, children }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible.Root open={isOpen} onOpenChange={setIsOpen} className="border-b border-gray-200 last:border-b-0">
      <Collapsible.Trigger className="flex items-center justify-between w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors group">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 text-gray-400">{icon}</div>
          <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        </div>
        <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </Collapsible.Trigger>
      
      <Collapsible.Content className="px-6 pb-6">
        <div className="pt-3">
          {children}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export function ModernThemeBuilderCollapsible() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      
      <CollapsibleSection
        title="Colors"
        icon={<PaletteIcon />}
        defaultOpen={true}
      >
        <ColorTab />
      </CollapsibleSection>

      <CollapsibleSection
        title="Styling"
        icon={<StyleIcon />}
        defaultOpen={false}
      >
        <StylingSection />
      </CollapsibleSection>

      <CollapsibleSection
        title="Typography"
        icon={<TypographyIcon />}
        defaultOpen={false}
      >
        <TypographySection />
      </CollapsibleSection>
    </div>
  );
}