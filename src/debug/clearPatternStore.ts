import { usePatternStore } from "@/src/store/patternStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function debugClearPatternStore() {
  console.log("=== DEBUG: BEFORE CLEAR ===");

  // 1. Zustand in-memory state
  console.log("BEFORE: Zustand state:", usePatternStore.getState());

  // 2. Persistence (AsyncStorage)
  const persisted = await AsyncStorage.getItem("pattern-store");
  console.log("BEFORE: Persisted storage:", persisted);

  console.log("=== CLEARING STORAGE ===");

  // Clear persistence
  await usePatternStore.persist.clearStorage();

  // Reset Zustand state
  usePatternStore.setState({
    patterns: [],
    selectedPattern: null,
    cachedPatterns: {},
    dirtyPatterns: {},
    lastSyncedAt: null,
  });

  // Rehydrate (so Zustand reloads empty state)
  await usePatternStore.persist.rehydrate();

  console.log("=== DEBUG: AFTER CLEAR ===");

  // Zustand state after clearing
  console.log("AFTER: Zustand state:", usePatternStore.getState());

  // Persistence after clearing
  const persistedAfter = await AsyncStorage.getItem("pattern-store");
  console.log("AFTER: Persisted storage:", persistedAfter);
}
