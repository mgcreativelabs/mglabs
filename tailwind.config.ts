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
          blue: "#3B82F6",
          purple: "#8B5CF6",
        },
        surface: {
          DEFAULT: "#0A0A0A",
          1: "#111111",
          2: "#1A1A1A",
          3: "#222222",
          4: "#2A2A2A",
        },
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
        "gradient-brand-subtle": "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.15) 100%)",
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