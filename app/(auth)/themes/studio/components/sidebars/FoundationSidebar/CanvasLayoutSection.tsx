import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Slider } from '@/components/ui/slider';

interface CanvasLayoutSectionProps {
  canvasLayout: any;
  updateThemeDataField: (path: string, value: any) => void;
}

export function CanvasLayoutSection({ 
  canvasLayout, 
  updateThemeDataField 
}: CanvasLayoutSectionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Canvas Layout</Label>
        <Select
          value={canvasLayout?.layoutType || 'fitToWidth'}
          onValueChange={(value) => updateThemeDataField('general.canvasLayout.layoutType', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fitToWidth">Fit to Width</SelectItem>
            <SelectItem value="fitToHeight">Fit to Height</SelectItem>
            <SelectItem value="fitToCanvas">Fit to Canvas</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Outer Spacing Slider - temporarily disabled
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Outer Spacing</Label>
          <span className="text-xs text-muted-foreground">
            {canvasLayout?.outerSpacing || 0}px
          </span>
        </div>
        <Slider
          value={[canvasLayout?.outerSpacing || 0]}
          onValueChange={([value]) => updateThemeDataField('general.canvasLayout.outerSpacing', value)}
          min={0}
          max={50}
          step={5}
        />
      </div>
      */}
    </div>
  );
}