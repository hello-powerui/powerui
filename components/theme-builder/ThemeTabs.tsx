'use client';

import { useThemeBuilderStore } from '@/lib/stores/theme-builder-store';
import { ColorTab } from './tabs/ColorTab';
import { TypographyTab } from './tabs/TypographyTab';
import { StyleTab } from './tabs/StyleTab';

export function ThemeTabs() {
  const { activeTab, setActiveTab } = useThemeBuilderStore();

  const tabs = [
    { id: 'color', label: 'Color', icon: '🎨' },
    { id: 'typography', label: 'Typography', icon: '✏️' },
    { id: 'style', label: 'Style', icon: '🎭' },
  ] as const;

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'color' && <ColorTab />}
        {activeTab === 'typography' && <TypographyTab />}
        {activeTab === 'style' && <StyleTab />}
      </div>
    </div>
  );
}