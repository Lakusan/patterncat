const { themeTokens } = require("./src/constants/ui/tokens");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{html,js,jsx,ts,tsx,mdx}",
    "./components/**/*.{html,js,jsx,ts,tsx,mdx}",
    "./utils/**/*.{html,js,jsx,ts,tsx,mdx}",
    "./*.{html,js,jsx,ts,tsx,mdx}",
    "./src/**/*.{html,js,jsx,ts,tsx,mdx}",
  ],

  presets: [require("nativewind/preset")],
  important: "html",
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",

        text_primary: "rgb(var(--color-text-primary) / <alpha-value>)",
        text_secondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
        text_accent: "rgb(var(--color-text-accent) / <alpha-value>)",
      },

    },
  },

  plugins: [
    ({ addBase }) =>
      addBase({
        ":root": convertTokensToCssVars(themeTokens.light),
        ".dark": convertTokensToCssVars(themeTokens.dark),
      }),
  ],
};

/**
 * Wandelt Tokens in CSS-Variablen um
 * z.B. background → --color-background
 */
function convertTokensToCssVars(tokenSet) {
  const cssVars = {};

  Object.entries(tokenSet).forEach(([key, value]) => {
    cssVars[`--color-${key.replace(/_/g, "-")}`] = value
      .replace("rgb(", "")
      .replace(")", "");
  });

  return cssVars;
}
