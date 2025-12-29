import React from "react";
import '../global.css';

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import SafeAreaContainer from "@/src/components/SafeAreaContainer";
import { SplashScreenController } from "@/src/components/splash-screen-controller";
import { PlatformProvider } from "@/src/providers/platform-provider";
import { Stack } from "expo-router";

export default function RootLayout() {
  const isLoggedIn = false;
  return (
    <GluestackUIProvider>
      <PlatformProvider>
        <SafeAreaContainer>
          <SplashScreenController />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={isLoggedIn}>
              <Stack.Screen name="(main)/index" options={{ title: "Protected" }} />
            </Stack.Protected>
            <Stack.Protected guard={!isLoggedIn}>
              <Stack.Screen name="(public)/index" options={{ title: "Public" }} />
            </Stack.Protected>
          </Stack>
        </SafeAreaContainer>
      </PlatformProvider>
    </GluestackUIProvider>
  );
}
