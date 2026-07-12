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
          blue: "#0071E3",
          "blue-hover": "#005BB5",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          1: "#FAFAFA",
          2: "#F5F5F7",
          3: "#EFEFF1",
          4: "#E5E5E7",
        },
        ink: {
          DEFAULT: "#111111",
          2: "#6E6E73",
          muted: "#8E8E93",
        },
        status: {
          success: "#34C759",
          warning: "#FF9F0A",
          danger: "#FF3B30",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;