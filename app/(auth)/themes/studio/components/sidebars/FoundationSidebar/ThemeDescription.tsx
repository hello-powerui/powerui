import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ThemeDescriptionProps {
  description: string;
  onChange: (description: string) => void;
}

export function ThemeDescription({ description, onChange }: ThemeDescriptionProps) {
  return (
    <div className="space-y-2">
      <Label>Description</Label>
      <Textarea
        value={description}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe your theme..."
        rows={3}
        className="resize-none"
      />
    </div>
  );
}