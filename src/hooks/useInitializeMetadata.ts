import { useMetadataStore } from "@/src/store/metaDataStore";
import { useEffect } from "react";

export function useInitializeMetadata() {
  // Zustand persistence hydration flag
  const hasHydrated = useMetadataStore.persist.hasHydrated();

  useEffect(() => {
    if (!hasHydrated) return;

    // Call the store's initialization logic
    useMetadataStore.getState().initializeMetadata();
  }, [hasHydrated]);
}
