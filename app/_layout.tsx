import "@/global.css";
import React, { JSX, ReactNode } from "react";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SplashScreenController } from "@/src/controller/splash-screen-controller";

import { AlertProvider } from "@/src/providers/alert-provider";
import { AuthFlowProvider } from "@/src/providers/auth-flow-provider";
import AuthProvider from "@/src/providers/auth-provider";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useTheme } from "@/src/contexts/use-theme-context";
import { ThemeProvider } from "@/src/providers/theme-provder";

import SafeAreaContainer from "@/src/components/container/SafeAreaContainer";
import { useAuthContext } from "@/src/contexts/use-auth-context";
import AuthGate from "@/src/controller/auth-gate";
import { Stack } from "expo-router";

import { ThemedStatusBar } from "@/src/components/statusbar/ThemedStatusBar";

// Theme Wrapper
interface ThemeWrapperProps {
  children: ReactNode;
}

function ThemeWrapper({ children }: ThemeWrapperProps): JSX.Element {
  const { theme } = useTheme();
  
  return (
    <SafeAreaContainer className={theme === "dark" ? "dark flex-1" : "flex-1"}>
        {children}
    </SafeAreaContainer>
  );
}

function AppRouter() {
  const { isLoggedIn } = useAuthContext();
  return (

    <Stack screenOptions={{ headerShown: false }}>

      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(main)" />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(public)" />
      </Stack.Protected>

    </Stack>
  );
}

// Root Layout
export default function RootLayout(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <AuthGate>
          <ThemeProvider>
            <ThemeWrapper>
              <ThemedStatusBar />
              <GluestackUIProvider>
                <SafeAreaProvider>
                  <AlertProvider>
                    <AuthFlowProvider>
                      <SplashScreenController />

                      <AppRouter />

                    </AuthFlowProvider>
                  </AlertProvider>
                </SafeAreaProvider>
              </GluestackUIProvider>
            </ThemeWrapper>
          </ThemeProvider>
        </AuthGate>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
