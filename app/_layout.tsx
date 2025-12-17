import { Stack } from "expo-router";
import React from "react";
import '../global.css';

import { SplashScreenController } from "@/src/components/splash-screen-controller";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { useAuthContext } from "@/src/hooks/use-auth-context";


function RootNavigator() {
  const { isLoggedIn } = useAuthContext();
  return(
    <Stack >
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(main)" options={{ headerShown: true }}></Stack.Screen>
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(anon)" options={{ headerShown: true }}></Stack.Screen>
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  // Here Asset Loading -> Fonts, Stuff, Color Scheme -> App wide config. 
  return (
    <AuthProvider>
      <SplashScreenController/>
      <RootNavigator/>
    </AuthProvider>
  );
}
