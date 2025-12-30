import React from "react";
import "../global.css";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import SafeAreaContainer from "@/src/components/SafeAreaContainer";
import { SplashScreenController } from "@/src/components/splash-screen-controller";
import { useTestContext } from "@/src/hooks/use-test-context";
import TestProvider from "@/src/providers/test-provider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <TestProvider>
      <InnerRootLayout />
    </TestProvider>
  );
}

function InnerRootLayout() {
  const { isAuthenticated, setIsAuthenticated } = useTestContext();
  console.log(`RootLayout: isAuthenticated: ${isAuthenticated}`)
  return (
    <GluestackUIProvider>
      <SafeAreaContainer>
        <SplashScreenController />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen name="(main)" />
          </Stack.Protected>
          <Stack.Screen name="(public)" />
        </Stack>
      </SafeAreaContainer>
    </GluestackUIProvider>
  );
}
