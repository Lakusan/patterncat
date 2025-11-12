import { Stack } from "expo-router";
import React from "react";
import '../global.css';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
      name ="login"
      options ={{
        headerTitle: "Welcome to Patterncat 🐱",
        animation:"none",
      }}
      />
    </Stack>
  );
}
