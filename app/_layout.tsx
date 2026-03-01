import "@/global.css";
import React from "react";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SplashScreenController } from "@/src/controller/splash-screen-controller";

import { AlertProvider } from "@/src/providers/alert-provider";
import { AuthFlowProvider } from "@/src/providers/auth-flow-provider";
import AuthProvider from "@/src/providers/auth-provider";

import { useAuthContext } from "@/src/contexts/use-auth-context";
import AuthGate from "@/src/controller/auth-gate";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useTheme } from "@/src/contexts/use-theme-context";
import { ThemeProvider } from "@/src/providers/theme-provder";
import { Stack } from "expo-router";
import { View } from "react-native";


// ⭐ WICHTIG: Dieser Wrapper setzt die "dark"-Klasse für NativeWind
function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <View className={theme === "dark" ? "dark h-full w-full" : "h-full w-full"}>
      {children}
    </View>
  );
}


export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <ThemeWrapper>
          <GluestackUIProvider>
            <AuthProvider>
              <SafeAreaProvider>
                <AlertProvider>
                  <SplashScreenController />
                  <AuthFlowProvider>
                    <AuthGate>
                      <InnerRootLayout />
                    </AuthGate>
                  </AuthFlowProvider>
                </AlertProvider>
              </SafeAreaProvider>
            </AuthProvider>
          </GluestackUIProvider>
        </ThemeWrapper>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}


function InnerRootLayout() {
  const { isLoggedIn } = useAuthContext();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(public)" />
      </Stack.Protected>

      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(main)" />
      </Stack.Protected>
    </Stack>
  );
}
