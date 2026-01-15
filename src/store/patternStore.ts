import { zustandStorage } from '@/src/store/storage';
import { PatternItemState } from '@/src/types/pattern';
import { create } from "zustand";
import { persist } from "zustand/middleware";

console.log(">>> Pattern-Store LOADED");

export const usePatternStore = create<PatternItemState>()(
  persist(
    (set) => ({
      patterns: [],
      setPatterns: (patterns) => set({ patterns }),

      selectedPattern: null,
      setSelectedPattern: (pattern) => set({ selectedPattern: pattern }),

      cachedPatterns: {},
      cachePattern: (pattern) =>
        set((state) => ({
          cachedPatterns: {
            ...state.cachedPatterns,
            [pattern.id]: pattern,
          },
        })),
    }),
    {
      name: "pattern-store",
      storage: zustandStorage,
    }
  )
);
