// SafeAreaContainer.tsx
import React from "react";
import { ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  className?: string;
} & ViewProps;

export default function SafeAreaContainer({ children, className, ...props }: Props) {
  return (
    <SafeAreaView
      className={className}
      edges={["top", "right", "bottom", "left"]}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
}
