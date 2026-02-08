import { useAuthFlow } from "@/src/contexts/use-auth-flow-context";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function PublicSearch() {
    const authFlow = useAuthFlow();
  useFocusEffect(
    useCallback(() => {
      authFlow.openAuthNative();
    }, [])
  );

  return null; 
}
