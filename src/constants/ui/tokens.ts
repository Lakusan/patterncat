export const themeTokens = {
  light: {
    background: "rgb(255 255 255)",
    primary: "rgb(153 135 220)",
    secondary: "rgb(229 224 219)",
    accent: "rgb(252 240 224)",

    text_background: "rgb(0 0 0)",
    text_primary: "rgb(255 255 255)",
    text_secondary: "rgb(0 0 0)",
    text_accent: "rgb(0 0 0)",
  },

  dark: {
    background: "rgb(39 39 43)",
    primary: "rgb(109 86 132)",
    secondary: "rgb(42 36 46)",
    accent: "rgb(236 213 180)",

    text_background: "rgb(255 255 255)",
    text_primary: "rgb(255 255 255)",
    text_secondary: "rgb(255 255 255)",
    text_accent: "rgb(0 0 0)",
  },
} as const;

export type ThemeColors = (typeof themeTokens)[keyof typeof themeTokens];
