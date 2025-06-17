import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useThemeExportStore } from '@/lib/stores/theme-export-store';
import { toast } from 'sonner';

interface SaveOptions {
  themeId: string | null;
  themeName: string;
  description: string;
  themeData: any;
}

export function useThemePersistence() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const { setOriginalTheme } = useThemeExportStore();

  const handleSave = useCallback(async ({
    themeId,
    themeName,
    description,
    themeData
  }: SaveOptions) => {
    if (!themeName.trim()) {
      toast.error('Please enter a theme name');
      return;
    }

    try {
      setIsSaving(true);
      
      const endpoint = themeId ? `/api/themes/${themeId}` : '/api/themes';
      const method = themeId ? 'PUT' : 'POST';
      
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: themeName,
          description: description,
          themeData: themeData
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save theme');
      }

      const savedTheme = await response.json();
      
      // Update the original theme to reset change tracking
      setOriginalTheme(themeData);
      
      toast.success(themeId ? 'Theme updated successfully' : 'Theme created successfully');
      
      // If creating new theme, redirect to edit mode
      if (!themeId) {
        router.push(`/themes/studio?theme=${savedTheme.id}`);
      }
      
      return savedTheme;
    } catch (error) {
      console.error('Error saving theme:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save theme');
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [router, setOriginalTheme]);

  const handleExport = useCallback(async (themeName: string, themeData: any) => {
    try {
      const blob = new Blob([JSON.stringify(themeData, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${themeName.replace(/\s+/g, '-').toLowerCase()}-theme.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Theme exported successfully');
    } catch (error) {
      console.error('Error exporting theme:', error);
      toast.error('Failed to export theme');
    }
  }, []);

  const handleImport = useCallback((file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const importedTheme = JSON.parse(content);
          toast.success('Theme imported successfully');
          resolve(importedTheme);
        } catch (error) {
          console.error('Error parsing theme file:', error);
          toast.error('Invalid theme file format');
          reject(error);
        }
      };
      
      reader.onerror = () => {
        toast.error('Failed to read theme file');
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsText(file);
    });
  }, []);

  const handleReset = useCallback((originalTheme: any, setThemeData: (data: any) => void) => {
    if (!originalTheme) {
      toast.error('No original theme to reset to');
      return;
    }
    
    setThemeData(originalTheme);
    toast.success('Theme reset to last saved state');
  }, []);

  return {
    isSaving,
    handleSave,
    handleExport,
    handleImport,
    handleReset
  };
}