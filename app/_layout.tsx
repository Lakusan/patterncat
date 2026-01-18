import React from "react";
import "../global.css";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SplashScreenController } from "@/src/components/splash-screen-controller";

import { useAuthContext } from "@/src/hooks/use-auth-context";
import AuthProvider from "@/src/providers/auth-provider";

import { debugClearPatternStore } from "@/src/debug/clearPatternStore";
import { useInitializeMetadata } from "@/src/hooks/useInitializeMetadata";
import { useInitializePatterns } from "@/src/hooks/useInitializePatterns";
import { Stack } from "expo-router";

export default function RootLayout() {
  console.log(">>> RootLayout LOADED");
  if (__DEV__) {
    debugClearPatternStore();
  }
  useInitializePatterns();
  useInitializeMetadata();
  return (
    <AuthProvider>
      <InnerRootLayout />
    </AuthProvider>
  );
}

function InnerRootLayout() {
  console.log(">>> InnerRootLayout LOADED");
  const { isLoggedIn, isLoading } = useAuthContext();
  console.log("Auth Status:", { isLoggedIn });
  return (
    <GluestackUIProvider>
      <SplashScreenController />

      <Stack screenOptions={{ headerShown: false }}>
        {/* Protected routes → only visible when logged in */}
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(main)" />
        </Stack.Protected>

        {/* Public routes → login, register, landing page */}
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(public)" />
        </Stack.Protected>
      </Stack>
    </GluestackUIProvider>
  );
}
