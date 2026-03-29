import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type SafeAreaContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SafeAreaContainer({ children, className }: SafeAreaContainerProps) {
  return (
    <SafeAreaView
      className={className}
      edges={["top", "right", "bottom", "left"]}
    >
      {children}
    </SafeAreaView>
  );
}
