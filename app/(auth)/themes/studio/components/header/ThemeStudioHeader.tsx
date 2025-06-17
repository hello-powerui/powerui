'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Save, 
  Download, 
  Upload, 
  RotateCcw, 
  Eye, 
  EyeOff 
} from 'lucide-react';

interface ThemeStudioHeaderProps {
  themeName: string;
  onThemeNameChange: (name: string) => void;
  onSave: () => void;
  onExport: () => void;
  onImport: () => void;
  onReset: () => void;
  hasChanges: boolean;
  isSaving: boolean;
  showFoundation: boolean;
  showVisualStyles: boolean;
  onToggleFoundation: () => void;
  onToggleVisualStyles: () => void;
}

export function ThemeStudioHeader({
  themeName,
  onThemeNameChange,
  onSave,
  onExport,
  onImport,
  onReset,
  hasChanges,
  isSaving,
  showFoundation,
  showVisualStyles,
  onToggleFoundation,
  onToggleVisualStyles,
}: ThemeStudioHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-background">
      <div className="flex items-center gap-3">
        <Input
          value={themeName}
          onChange={(e) => onThemeNameChange(e.target.value)}
          className="w-64 font-medium"
          placeholder="Theme Name"
        />
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFoundation}
            className={showFoundation ? '' : 'opacity-50'}
          >
            {showFoundation ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            <span className="ml-2">Foundation</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleVisualStyles}
            className={showVisualStyles ? '' : 'opacity-50'}
          >
            {showVisualStyles ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            <span className="ml-2">Visual Styles</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onImport}
          disabled={isSaving}
        >
          <Upload className="h-4 w-4 mr-2" />
          Import
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          disabled={isSaving}
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          disabled={!hasChanges || isSaving}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={onSave}
          disabled={!hasChanges || isSaving}
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </div>
  );
}