import { PlatformContext } from "@/src/providers/platform-provider";
import { useContext } from "react";

export const usePlatformInfo = () => {
  const ctx = useContext(PlatformContext);
  if (!ctx) {
    throw new Error('usePlatformInfo must be used inside PlatformProvider');
  }
  return ctx;
}