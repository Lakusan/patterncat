import type { PlatformContextType } from "@/src/contexts/PlatformContext";
import { PlatformContext } from "@/src/contexts/PlatformContext";
import { useContext } from "react";

export function usePlatform(): PlatformContextType {
  const ctx = useContext(PlatformContext);

  if (!ctx) {
    throw new Error("usePlatform must be used inside a PlatformProvider");
  }

  return ctx;
}
