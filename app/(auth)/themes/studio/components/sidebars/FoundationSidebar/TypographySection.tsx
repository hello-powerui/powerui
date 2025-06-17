import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Type } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TypographySectionProps {
  textClasses: any;
  onToggleTextClassesEditor: () => void;
}

export function TypographySection({ 
  textClasses, 
  onToggleTextClassesEditor 
}: TypographySectionProps) {
  const textClassCount = textClasses ? Object.keys(textClasses).length : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label>Typography</Label>
          {textClassCount > 0 && (
            <Badge variant="secondary">{textClassCount} classes</Badge>
          )}
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={onToggleTextClassesEditor}
        >
          <Type className="h-4 w-4 mr-2" />
          Edit Text Classes
        </Button>
      </div>
      {textClassCount === 0 && (
        <p className="text-sm text-muted-foreground">
          No text classes defined. Click edit to add typography styles.
        </p>
      )}
    </div>
  );
}