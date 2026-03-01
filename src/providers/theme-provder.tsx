import { themeTokens } from "@/src/constants/ui/tokens";
import { ThemeContext, ThemeMode } from "@/src/contexts/use-theme-context";
import { useEffect, useState } from "react";
import { Appearance } from "react-native";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const system = Appearance.getColorScheme();
    if (system) setTheme(system as ThemeMode);
  }, []);

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) setTheme(colorScheme as ThemeMode);
    });
    return () => listener.remove();
  }, []);

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
