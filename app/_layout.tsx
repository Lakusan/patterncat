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

import { useAuthContext } from "@/src/contexts/use-auth-context";
import { Stack } from "expo-router";
import { View } from "react-native";

// Theme Wrapper
interface ThemeWrapperProps {
  children: ReactNode;
}

function ThemeWrapper({ children }: ThemeWrapperProps): JSX.Element {
  const { theme } = useTheme();

  return (
    <View className={theme === "dark" ? "dark h-full w-full" : "h-full w-full"}>
      {children}
    </View>
  );
}


// Root Layout
export default function RootLayout(): JSX.Element {
  const { isLoggedIn, userId, session } = useAuthContext();
  console.log(`rootlayout isLoggedIn: ${isLoggedIn}`);
  console.log( userId );
  console.log( session );
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <ThemeWrapper>
          <GluestackUIProvider>
            <AuthProvider>
              <SafeAreaProvider>
                <AlertProvider>
                  <AuthFlowProvider>
                    <SplashScreenController />
                    {/* Expo Router */}
                    <Stack screenOptions={{ headerShown: false }}>
                      
                      <Stack.Protected guard={isLoggedIn}>
                        <Stack.Screen name="(main)" />
                      </Stack.Protected>
                      <Stack.Protected guard={!isLoggedIn}>
                        <Stack.Screen name="(public)" />
                      </Stack.Protected>

                    </Stack>

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
