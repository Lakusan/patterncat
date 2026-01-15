import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { createJSONStorage } from "zustand/middleware";

console.log(">>> Storage LOADED");

const secureStorage =
  Platform.OS === "web"
    ? {
        getItem: (name: string) =>
          Promise.resolve(localStorage.getItem(name)),
        setItem: (name: string, value: string) =>
          Promise.resolve(localStorage.setItem(name, value)),
        removeItem: (name: string) =>
          Promise.resolve(localStorage.removeItem(name)),
      }
    : {
        getItem: (key: string) => SecureStore.getItemAsync(key),
        setItem: (key: string, value: string) =>
          SecureStore.setItemAsync(key, value),
        removeItem: (key: string) => SecureStore.deleteItemAsync(key),
      };

export const zustandStorage = createJSONStorage(() => secureStorage);
