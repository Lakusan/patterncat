import { Slot, useRouter } from "expo-router";
import React from "react";
import '../global.css';

import SafeAreaContainer from "@/src/components/SafeAreaContainer";
import { SplashScreenController } from "@/src/components/splash-screen-controller";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { PlatformProvider } from "@/src/contexts/PlatformContext";
import { useAuthContext } from "@/src/hooks/use-auth-context";


function RootNavigator() {
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();
  
  React.useEffect(() => {
    if (isLoggedIn) {
      router.replace("/(main)");
    } 
  }, [isLoggedIn]);
  
  return null;
}

export default function RootLayout() {
  console.log("rootLayout")
  return (
    <AuthProvider>
      <PlatformProvider>
        <SafeAreaContainer>
          <SplashScreenController />
          <RootNavigator />
          <Slot />
        </SafeAreaContainer>
      </PlatformProvider>
    </AuthProvider>
  );
}
