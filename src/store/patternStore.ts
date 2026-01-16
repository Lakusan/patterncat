import { patternRepository } from "@/src/repositories/patternRepository";
import { zustandStorage } from "@/src/store/storage";
import { PatternItemState } from "@/src/types/pattern";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePatternStore = create<PatternItemState>()(
  persist(
    (set, get) => ({
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

      dirtyPatterns: {},
      markDirty: (pattern) =>
        set((state) => ({
          dirtyPatterns: {
            ...state.dirtyPatterns,
            [pattern.id]: pattern,
          },
        })),

      lastSyncedAt: null,
      setLastSyncedAt: (ts) => set({ lastSyncedAt: ts }),

      mergeRemotePatterns: (remote) => {
        const local = get().patterns;
        const merged = [...local];

        remote.forEach((r) => {
          const existing = merged.find((p) => p.id === r.id);

          if (!existing) {
            merged.push(r);
          } else if (r.updatedAt > existing.updatedAt) {
            const idx = merged.findIndex((p) => p.id === r.id);
            merged[idx] = r;
          }
        });

        set({ patterns: merged });
      },

      // full sync using repository
      syncWithServer: async () => {
        const { dirtyPatterns, mergeRemotePatterns, setLastSyncedAt } = get();

        const dirtyList = Object.values(dirtyPatterns);
        if (dirtyList.length > 0) {
          await patternRepository.upsert(dirtyList);
        }

        const remote = await patternRepository.getAll();
        mergeRemotePatterns(remote);

        set({ dirtyPatterns: {} });
        setLastSyncedAt(Date.now());
      },

      // initialization entry point
      initializeStore: async () => {
        const current = get().patterns;

        if (!current || current.length === 0) {
          const remote = await patternRepository.getAll();
          set({ patterns: remote });
        }
      },

      clearPersistance: async () => {
        await usePatternStore.persist.clearStorage();

        set({
          patterns: [],
          selectedPattern: null,
          cachedPatterns: {},
          dirtyPatterns: {},
          lastSyncedAt: null,
        });

        await usePatternStore.persist.rehydrate();
      },
    }),
    {
      name: "pattern-store",
      storage: zustandStorage,
    }
  )
);
