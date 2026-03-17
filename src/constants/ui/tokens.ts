export const themeTokens = {
  light: {
    background: "rgb(248 247 250)",
    primary: "rgb(155 107 195)",
    secondary: "rgb(207 203 214)",
    accent: "rgb(203 183 166)",
    text_background: "rgb(210 189 174)", 

    text_primary: "rgb(0 0 0)",
    text_secondary: "rgb(255 255 255)",
    text_accent: "rgb(0 0 0)",
  },

  dark: {
    background: "rgb(39 39 43)",
    primary: "rgb(109 86 132)",
    secondary: "rgb(130 130 130)",
    accent: "rgb(236 213 180)",
    text_background: "rgb(210 189 174)", 
 

    text_primary: "rgb(255 255 255)",
    text_secondary: "rgb(255 255 255)",
    text_accent: "rgb(0 0 0)",
  },
} as const;

export type ThemeColors = (typeof themeTokens)[keyof typeof themeTokens];
