import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PowerBITheme } from '@/lib/theme-studio/types';

interface HistoryState {
  // History stack
  history: PowerBITheme[];
  historyIndex: number;
  maxHistorySize: number;
  
  // Actions
  addToHistory: (theme: PowerBITheme) => void;
  undo: () => PowerBITheme | null;
  redo: () => PowerBITheme | null;
  canUndo: () => boolean;
  canRedo: () => boolean;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  devtools(
    (set, get) => ({
      // Initial state
      history: [],
      historyIndex: -1,
      maxHistorySize: 50,

      // Actions
      addToHistory: (theme) => {
        set((state) => {
          const newHistory = [...state.history.slice(0, state.historyIndex + 1), { ...theme }];
          
          // Trim history if it exceeds max size
          if (newHistory.length > state.maxHistorySize) {
            newHistory.shift();
            return {
              history: newHistory,
              historyIndex: newHistory.length - 1,
            };
          }
          
          return {
            history: newHistory,
            historyIndex: newHistory.length - 1,
          };
        });
      },

      undo: () => {
        const state = get();
        if (state.historyIndex > 0) {
          set({ historyIndex: state.historyIndex - 1 });
          return state.history[state.historyIndex - 1];
        }
        return null;
      },

      redo: () => {
        const state = get();
        if (state.historyIndex < state.history.length - 1) {
          set({ historyIndex: state.historyIndex + 1 });
          return state.history[state.historyIndex + 1];
        }
        return null;
      },

      canUndo: () => {
        const state = get();
        return state.historyIndex > 0;
      },

      canRedo: () => {
        const state = get();
        return state.historyIndex < state.history.length - 1;
      },

      clearHistory: () => {
        set({
          history: [],
          historyIndex: -1,
        });
      },
    }),
    {
      name: 'history-store',
    }
  )
);