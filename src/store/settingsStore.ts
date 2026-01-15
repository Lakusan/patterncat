// src/store/settingsStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { zustandStorage } from "./storage";

console.log(">>> Settings-Store LOADED");


type SettingsState = {
  language: string;
  setLanguage: (lang: string) => void;

  notificationsEnabled: boolean;
  setNotificationsEnabled: (value: boolean) => void;

  onboardingCompleted: boolean;
  setOnboardingCompleted: (value: boolean) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: "de",
      setLanguage: (language) => set({ language }),

      notificationsEnabled: true,
      setNotificationsEnabled: (value) =>
        set({ notificationsEnabled: value }),

      onboardingCompleted: false,
      setOnboardingCompleted: (value) =>
        set({ onboardingCompleted: value }),
    }),
    {
      name: "settings-store",
      storage: zustandStorage,
    }
  )
);
