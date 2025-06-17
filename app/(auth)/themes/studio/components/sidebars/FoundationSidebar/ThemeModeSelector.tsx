import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Monitor, Moon } from 'lucide-react';
import { useFoundationStore } from '@/lib/stores/foundation-store';

export function ThemeModeSelector() {
  const { themeMode, setThemeMode } = useFoundationStore();

  return (
    <div className="space-y-2">
      <Label>Theme Mode</Label>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant={themeMode === 'light' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setThemeMode('light')}
        >
          <Monitor className="h-4 w-4 mr-2" />
          Light
        </Button>
        <Button
          variant={themeMode === 'dark' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setThemeMode('dark')}
        >
          <Moon className="h-4 w-4 mr-2" />
          Dark
        </Button>
      </div>
    </div>
  );
}