/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{html,js,jsx,ts,tsx,mdx}',
    './components/**/*.{html,js,jsx,ts,tsx,mdx}',
    './utils/**/*.{html,js,jsx,ts,tsx,mdx}',
    './*.{html,js,jsx,ts,tsx,mdx}',
    './src/**/*.{html,js,jsx,ts,tsx,mdx}',
  ],
  presets: [require('nativewind/preset')],
  important: 'html',
  darkMode: "class",
  theme: {
    colors: {
      primary: "rgb(var(--color-primary) / <alpha-value>)",
      secondary: "rgb(var(--color-secondary) / <alpha-value>)",
      background: "rgb(var(--color-background) / <alpha-value>)",
      foreground: "rgb(var(--color-foreground) / <alpha-value>)"
    },
  },
  plugins: [
    ({ addBase }) =>
      addBase({
         ":root": { 
          "--color-primary": "255 0 0",
          "--color-secondary": "0 0 0",
          "--color-background": "255 255 255",
          "--color-foreground": "20 20 20",
         },
        ".dark":
         { "--color-primary": "0 128 255",
          "--color-secondary": "255 255 255",
          "--color-background": "20 20 20",
          "--color-foreground": "230 230 230",
          }, 
      }),
  ],
};
