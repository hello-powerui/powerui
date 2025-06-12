import { create } from 'zustand';

interface ThemeChangesState {
  // Set of changed property paths (e.g., "visualStyles.lineChart.*.categoryAxis.0.fontSize")
  changedPaths: Set<string>;
  // Original theme state when tracking started
  originalTheme: any;
  
  // Actions
  trackChange: (path: string[]) => void;
  clearChanges: () => void;
  hasChanges: (path: string[]) => boolean;
  hasChangesInSection: (sectionPath: string[]) => boolean;
  setOriginalTheme: (theme: any) => void;
  getChangedPropertiesCount: (sectionPath: string[]) => number;
}

export const useThemeChanges = create<ThemeChangesState>((set, get) => ({
  changedPaths: new Set(),
  originalTheme: null,
  
  trackChange: (path: string[]) => {
    const pathString = path.join('.');
    set((state) => ({
      changedPaths: new Set([...state.changedPaths, pathString])
    }));
  },
  
  clearChanges: () => {
    set({ changedPaths: new Set() });
  },
  
  hasChanges: (path: string[]) => {
    const pathString = path.join('.');
    return get().changedPaths.has(pathString);
  },
  
  hasChangesInSection: (sectionPath: string[]) => {
    const sectionPathString = sectionPath.join('.');
    const changedPaths = Array.from(get().changedPaths);
    const hasChanges = changedPaths.some(path => path.startsWith(sectionPathString));
    return hasChanges;
  },
  
  setOriginalTheme: (theme: any) => {
    set({ originalTheme: theme, changedPaths: new Set() });
  },
  
  getChangedPropertiesCount: (sectionPath: string[]) => {
    const sectionPathString = sectionPath.join('.');
    const changedPaths = Array.from(get().changedPaths);
    return changedPaths.filter(path => path.startsWith(sectionPathString)).length;
  }
}));

