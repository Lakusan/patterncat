import { metadataRepository } from "@/src/repositories/metaDataRepository";
import { zustandStorage } from "@/src/store/storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MetadataState = {
  categories: string[];
  setCategories: (cats: string[]) => void;

  initializeMetadata: () => Promise<void>;
};

export const useMetadataStore = create<MetadataState>()(
  persist(
    (set) => ({
      categories: [],
      setCategories: (cats) => set({ categories: cats }),

      initializeMetadata: async () => {
        const meta = await metadataRepository.getMetadata();
        set({ categories: meta.categories });
      },
    }),
    {
      name: "metadata-store",
      storage: zustandStorage,
    }
  )
);
