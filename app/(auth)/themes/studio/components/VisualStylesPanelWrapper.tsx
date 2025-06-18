'use client';

import { useThemeVisualStore } from '@/lib/stores/theme-visual-store';
import { useVisualEditingStore } from '@/lib/stores/visual-editing-store';
import { useUIStateStore } from '@/lib/stores/ui-state-store';
import { VisualStylesPanel } from './VisualStylesPanel';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VisualStylesPanelWrapperProps {
  selectedSection: string;
  onSectionChange: (section: any) => void;
}

export function VisualStylesPanelWrapper({ 
  selectedSection,
  onSectionChange 
}: VisualStylesPanelWrapperProps) {
  const { showVisualStyles, toggleVisualStyles } = useUIStateStore();
  const visualStore = useThemeVisualStore();
  const editingStore = useVisualEditingStore();

  if (!showVisualStyles) {
    return (
      <div className="h-full flex flex-col items-center py-6 bg-gray-50 border-l border-gray-200 w-12">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleVisualStyles}
          className="mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div className="flex flex-col items-center gap-2 text-gray-600">
          <Layers className="w-5 h-5" />
          <span className="writing-mode-vertical text-xs">Visual Styles</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "h-full bg-gray-50 border-l border-gray-200 transition-all duration-300",
      showVisualStyles ? "w-[400px]" : "w-12"
    )}>
      <VisualStylesPanel
        theme={{}}
        visualSettings={visualStore.visualStyles}
        selectedVisual={visualStore.selectedVisualType || ''}
        selectedVariant={visualStore.selectedVariant || '*'}
        selectedState={editingStore.selectedState}
        selectedSection={selectedSection as any}
        onVisualSettingsChange={(settings) => {
          // Update visual styles in store
          Object.entries(settings).forEach(([visual, variants]) => {
            Object.entries(variants as any).forEach(([variant, value]) => {
              visualStore.updateVariant(visual, variant, value);
            });
          });
        }}
        onVisualStyleChange={(visual, variant, value) => {
          visualStore.updateVariant(visual, variant, value);
        }}
        onSelectedVisualChange={visualStore.setSelectedVisualType}
        onSelectedVariantChange={visualStore.setSelectedVariant}
        onSelectedStateChange={editingStore.setSelectedState}
        onSelectedSectionChange={onSectionChange}
        onCreateVariant={visualStore.addVariant}
        onDeleteVariant={visualStore.deleteVariant}
        getVisualVariants={(visual) => visualStore.getVisualVariants(visual)}
        trackChange={() => {}}
        isVisible={showVisualStyles}
        onToggleVisibility={toggleVisualStyles}
      />
    </div>
  );
}