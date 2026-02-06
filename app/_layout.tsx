import "@/global.css";
import React from "react";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SplashScreenController } from "@/src/components/splash-screen-controller";

import { useAuthContext } from "@/src/contexts/use-auth-context";


import { AlertProvider } from "@/src/providers/alert-provider";
import { AuthFlowProvider } from "@/src/providers/auth-flow-provider";
import AuthProvider from "@/src/providers/auth-provider";
import { Stack } from "expo-router";

export default function RootLayout() {
  if (__DEV__) {
    // debugClearPatternStore();
  }
  // useInitializePatterns();
  // useInitializeMetadata();
  return (
    <AuthProvider>
      <GluestackUIProvider>
        <AlertProvider>
          <SplashScreenController />
          <AuthFlowProvider>
            <InnerRootLayout />
          </AuthFlowProvider>
        </AlertProvider>
      </GluestackUIProvider>
    </AuthProvider>
  );
}

function InnerRootLayout() {
  const { isLoggedIn, isLoading } = useAuthContext();
  return (
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
  );
}
