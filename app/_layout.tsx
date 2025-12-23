import { Stack } from "expo-router";
import React from "react";
import '../global.css';

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import SafeAreaContainer from "@/src/components/SafeAreaContainer";
import { SplashScreenController } from "@/src/components/splash-screen-controller";
import { useAuthContext } from "@/src/hooks/use-auth-context";
import { PlatformProvider } from "@/src/providers/platform-provider";

export default function RootLayout() {
  const { isLoggedIn } = useAuthContext();
  return (
    <GluestackUIProvider>
      <PlatformProvider>
        <SafeAreaContainer>
          <SplashScreenController />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={isLoggedIn}>
              <Stack.Screen name="(main)"></Stack.Screen>
            </Stack.Protected>
            <Stack.Protected guard={!isLoggedIn}>
              <Stack.Screen name="(public)"></Stack.Screen>
            </Stack.Protected>
          </Stack>
        </SafeAreaContainer>
      </PlatformProvider>
    </GluestackUIProvider>
  );
}
