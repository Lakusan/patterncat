import React from "react";
import "../global.css";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SplashScreenController } from "@/src/components/splash-screen-controller";

import { useAuthContext } from "@/src/hooks/use-auth-context";
import AuthProvider from "@/src/providers/auth-provider";

import { Stack } from "expo-router";

export default function RootLayout() {
  console.log(">>> RootLayout LOADED");
  return (
    <AuthProvider>
      <InnerRootLayout />
    </AuthProvider>
  );
}

function InnerRootLayout() {
  console.log(">>> InnerRootLayout LOADED");
  const { isLoggedIn, isLoading } = useAuthContext();

  return (
    <GluestackUIProvider>
      <SplashScreenController />

      <Stack screenOptions={{ headerShown: false }}>
        {/* Protected routes → only visible when logged in */}
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(main)" />
        </Stack.Protected>

        {/* Public routes → login, register, landing page */}
        <Stack.Screen name="(public)" />
      </Stack>
    </GluestackUIProvider>
  );
}
