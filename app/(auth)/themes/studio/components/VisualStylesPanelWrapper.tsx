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
  const { showVisualStyles } = useUIStateStore();
  const visualStore = useThemeVisualStore();
  const editingStore = useVisualEditingStore();

  if (!showVisualStyles) {
    return null;
  }

  return (
    <div className="h-full bg-gray-50 border-l border-gray-200 w-[350px]">
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
      />
    </div>
  );
}