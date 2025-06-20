import { useCallback } from 'react';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { useThemeChanges } from './use-theme-changes';
import { toast } from 'sonner';

/**
 * Hook for theme persistence operations (save, load, export)
 * Isolates save state to prevent unnecessary re-renders
 */
export function useThemePersistence() {
  // Only subscribe to persistence-related state
  const isSaving = useThemeStudioStore((state) => state.isSaving);
  const isDirty = useThemeStudioStore((state) => state.isDirty);
  
  // Get actions without subscribing to state changes
  const saveThemeAction = useThemeStudioStore((state) => state.saveTheme);
  const loadThemeAction = useThemeStudioStore((state) => state.loadTheme);
  const resetThemeAction = useThemeStudioStore((state) => state.resetTheme);
  const createNewThemeAction = useThemeStudioStore((state) => state.createNewTheme);
  const exportTheme = useThemeStudioStore((state) => state.exportTheme);

  // Get change tracking functions from the changes store
  const { clearChanges } = useThemeChanges();

  // Enhanced save with proper error handling
  const saveTheme = useCallback(async () => {
    try {
      const result = await saveThemeAction();
      if (clearChanges) {
        clearChanges();
      }
      toast.success('Theme saved successfully');
      return result;
    } catch (error) {
      console.error('Failed to save theme:', error);
      toast.error('Failed to save theme');
      throw error;
    }
  }, [saveThemeAction, clearChanges]);

  // Enhanced load with change clearing
  const loadTheme = useCallback((themeData: any) => {
    if (clearChanges) {
      clearChanges();
    }
    loadThemeAction(themeData);
  }, [loadThemeAction, clearChanges]);

  // Enhanced reset with change clearing
  const resetTheme = useCallback(() => {
    if (clearChanges) {
      clearChanges();
    }
    resetThemeAction();
  }, [resetThemeAction, clearChanges]);

  // Enhanced create new with change clearing
  const createNewTheme = useCallback(() => {
    if (clearChanges) {
      clearChanges();
    }
    createNewThemeAction();
  }, [createNewThemeAction, clearChanges]);

  return {
    // State
    isSaving,
    isDirty,
    
    // Actions
    saveTheme,
    loadTheme,
    resetTheme,
    createNewTheme,
    exportTheme
  };
}