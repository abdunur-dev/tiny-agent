import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        foreground: "#FAFAFA",
        card: {
          DEFAULT: "#0A0A0A",
          foreground: "#FAFAFA",
        },
        popover: {
          DEFAULT: "#0A0A0A",
          foreground: "#FAFAFA",
        },
        primary: {
          DEFAULT: "#FAFAFA",
          foreground: "#0A0A0A",
        },
        secondary: {
          DEFAULT: "#171717",
          foreground: "#FAFAFA",
        },
        muted: {
          DEFAULT: "#171717",
          foreground: "#737373",
        },
        accent: {
          DEFAULT: "#FFD60A",
          foreground: "#0A0A0A",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FAFAFA",
        },
        border: "#262626",
        input: "#262626",
        ring: "#FAFAFA",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
