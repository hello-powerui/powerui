'use client';

import React, { useMemo, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useVisualEditorStore } from '@/lib/stores/visual-editor-store';
import { useThemeDataStore } from '@/lib/stores/theme-data-store';
import { useUIStateStore } from '@/lib/stores/ui-state-store';
import { cn } from '@/lib/utils';
import { ChevronRight, Plus, Trash2 } from 'lucide-react';

// Visual categories for better organization
const VISUAL_CATEGORIES = {
  'Basic': ['barChart', 'columnChart', 'lineChart', 'pieChart', 'donutChart'],
  'Tables': ['tableEx', 'pivotTable', 'matrixEx'],
  'Cards': ['card', 'multiRowCard', 'kpi'],
  'Maps': ['map', 'filledMap', 'shapeMap'],
  'Advanced': ['scatterChart', 'waterfallChart', 'funnelChart', 'gauge'],
  'Filters': ['slicer', 'datePicker', 'relativeDateSlicer'],
  'Other': ['textbox', 'image', 'shape', 'button'],
};

interface VisualStylesPanelProps {
  className?: string;
  onSelectVisual?: (visual: string) => void;
}

export const VisualStylesPanel: React.FC<VisualStylesPanelProps> = ({
  className,
  onSelectVisual,
}) => {
  const { currentTheme } = useThemeDataStore();
  const { 
    selectedVisual, 
    selectedVariant,
    setSelectedVisual,
    setSelectedVariant,
    getVisualVariants,
    createVariant,
    deleteVariant,
  } = useVisualEditorStore();
  const { expandedPanels, togglePanel } = useUIStateStore();

  // Get all visuals from theme
  const availableVisuals = useMemo(() => {
    const visualsInTheme = Object.keys(currentTheme.visualStyles || {});
    const allVisuals = new Set<string>();
    
    // Add all known visuals
    Object.values(VISUAL_CATEGORIES).flat().forEach(v => allVisuals.add(v));
    
    // Add any custom visuals from theme
    visualsInTheme.forEach(v => allVisuals.add(v));
    
    return Array.from(allVisuals).sort();
  }, [currentTheme.visualStyles]);

  // Organize visuals by category
  const visualsByCategory = useMemo(() => {
    const categorized: Record<string, string[]> = {};
    const uncategorized: string[] = [];
    
    availableVisuals.forEach(visual => {
      let found = false;
      for (const [category, visuals] of Object.entries(VISUAL_CATEGORIES)) {
        if (visuals.includes(visual)) {
          if (!categorized[category]) categorized[category] = [];
          categorized[category].push(visual);
          found = true;
          break;
        }
      }
      if (!found) {
        uncategorized.push(visual);
      }
    });
    
    if (uncategorized.length > 0) {
      categorized['Custom'] = uncategorized;
    }
    
    return categorized;
  }, [availableVisuals]);

  const handleSelectVisual = useCallback((visual: string) => {
    setSelectedVisual(visual);
    onSelectVisual?.(visual);
  }, [setSelectedVisual, onSelectVisual]);

  const handleCreateVariant = useCallback(() => {
    if (!selectedVisual) return;
    
    const variantName = prompt('Enter variant name:');
    if (variantName && variantName !== '*') {
      createVariant(selectedVisual, variantName, (theme) => {
        // This will be connected to theme update
        console.log('Creating variant:', variantName);
      });
    }
  }, [selectedVisual, createVariant]);

  const handleDeleteVariant = useCallback((variant: string) => {
    if (!selectedVisual || variant === '*') return;
    
    if (confirm(`Delete variant "${variant}"?`)) {
      deleteVariant(selectedVisual, variant, (theme) => {
        // This will be connected to theme update
        console.log('Deleting variant:', variant);
      });
    }
  }, [selectedVisual, deleteVariant]);

  return (
    <Card className={cn('h-full flex flex-col', className)}>
      <div className="p-4 border-b">
        <h2 className="font-semibold">Visual Styles</h2>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {Object.entries(visualsByCategory).map(([category, visuals]) => {
            const isExpanded = expandedPanels.includes(category);
            
            return (
              <div key={category} className="space-y-1">
                <button
                  onClick={() => togglePanel(category)}
                  className="w-full flex items-center justify-between p-2 hover:bg-accent rounded-md text-sm font-medium"
                >
                  <span>{category}</span>
                  <ChevronRight 
                    className={cn(
                      'w-4 h-4 transition-transform',
                      isExpanded && 'rotate-90'
                    )}
                  />
                </button>
                
                {isExpanded && (
                  <div className="ml-4 space-y-1">
                    {visuals.map(visual => {
                      const variants = getVisualVariants(visual, currentTheme);
                      const hasCustomStyles = !!currentTheme.visualStyles?.[visual];
                      
                      return (
                        <div key={visual} className="space-y-1">
                          <button
                            onClick={() => handleSelectVisual(visual)}
                            className={cn(
                              'w-full text-left p-2 rounded-md text-sm hover:bg-accent',
                              selectedVisual === visual && 'bg-accent font-medium',
                              hasCustomStyles && 'text-primary'
                            )}
                          >
                            {visual}
                            {hasCustomStyles && (
                              <span className="ml-2 text-xs text-muted-foreground">
                                (customized)
                              </span>
                            )}
                          </button>
                          
                          {selectedVisual === visual && variants.length > 0 && (
                            <div className="ml-4 space-y-1">
                              {variants.map(variant => (
                                <div
                                  key={variant}
                                  className="flex items-center justify-between"
                                >
                                  <button
                                    onClick={() => setSelectedVariant(variant)}
                                    className={cn(
                                      'flex-1 text-left p-1 px-2 rounded text-xs hover:bg-accent',
                                      selectedVariant === variant && 'bg-accent font-medium'
                                    )}
                                  >
                                    {variant === '*' ? 'Default' : variant}
                                  </button>
                                  
                                  {variant !== '*' && (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => handleDeleteVariant(variant)}
                                      className="h-6 w-6 p-0"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  )}
                                </div>
                              ))}
                              
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleCreateVariant}
                                className="w-full h-6 text-xs"
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                Add Variant
                              </Button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
};