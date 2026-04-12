import { themeTokens } from "@/src/constants/ui/tokens";
import { ThemeContext, ThemeMode } from "@/src/contexts/use-theme-context";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeMode>(systemTheme ?? "light");

  useEffect(() => {
    if (systemTheme) {
      setTheme(systemTheme as ThemeMode);
    }
  }, [systemTheme]);

  const toggleTheme = () =>
    setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        colors: themeTokens[theme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
