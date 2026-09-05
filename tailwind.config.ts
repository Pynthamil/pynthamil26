import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#536df8",
          indigo: "#4e5df8",
          bg: "#F7F6F4",
          darkBg: "#0B0C0F",
          purple: "#6666FF",
          purpleDark: "#9999FF",
          pink: "#FF42FF",
          pinkDark: "#FF94FF",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"SF Pro"',
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        cal: ['"Cal Sans"', "sans-serif"],
        mono: [
          '"SF Mono"',
          '"Geist Mono"',
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
