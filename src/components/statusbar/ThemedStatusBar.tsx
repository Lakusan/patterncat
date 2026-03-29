import { useTheme } from "@/src/contexts/use-theme-context";
import { StatusBar } from "expo-status-bar";

export function ThemedStatusBar() {
  const { theme } = useTheme();

  return (
    <StatusBar
      style={theme === "dark" ? "light" : "dark"} 
      backgroundColor="transparent"
      translucent
    />
  );
}
