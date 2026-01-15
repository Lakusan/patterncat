import { create } from "zustand";
import { persist } from "zustand/middleware";
import { zustandStorage } from "./storage";

console.log(">>> UI-Store LOADED");

type UIState = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;

  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;

  gridColumns: number;
  setGridColumns: (n: number) => void;
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }),

      selectedCategory: null,
      setSelectedCategory: (cat) => set({ selectedCategory: cat }),

      gridColumns: 3,
      setGridColumns: (n) => set({ gridColumns: n }),
    }),
    {
      name: "ui-store",
      storage: zustandStorage,
    }
  )
);
