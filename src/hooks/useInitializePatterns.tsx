import { usePatternStore } from "@/src/store/patternStore";
import { useEffect } from "react";

export function useInitializePatterns() {
  console.log(">>> useInitializePatterns LOADED");
  //Load persisted state from AsyncStorage / localStorage into the store.
  const hasHydrated = usePatternStore.persist.hasHydrated();
  console.log(`hasHydrated: ${hasHydrated}`);

  useEffect(() => {
    if (!hasHydrated) return;

    usePatternStore.getState().initializeStore();
  }, [hasHydrated]);
}
