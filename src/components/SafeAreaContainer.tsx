// SafeAreaContainer.tsx
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type SafeAreaContainerProps = {
  children: React.ReactNode;
};

export default function SafeAreaContainer({ children }: SafeAreaContainerProps) {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        className="flex-1 bg-red-500"
        edges={["top", "right", "bottom", "left"]} 
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
