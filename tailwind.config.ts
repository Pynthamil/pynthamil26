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
          blue: "#802962",
          indigo: "#095F76",
          bg: "#F7F6F4",
          darkBg: "#0E0E0F",
          purple: "#802962",
          purpleDark: "#EBB8D5",
          pink: "#095F76",
          pinkDark: "#74B1C3",
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
        serif: ['"Instrument Serif"', "serif"],
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
