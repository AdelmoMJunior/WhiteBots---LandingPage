import type {Config} from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: "#050508",
          900: "#090a10",
          850: "#0d0f17",
          800: "#121620",
          700: "#1b2130"
        },
        violet: {
          brand: "#8b5cf6",
          pulse: "#a78bfa",
          deep: "#5b2fb8"
        },
        silver: {
          50: "#f8fafc",
          100: "#e7ebf2",
          300: "#b7bfcc",
          500: "#7d8797"
        }
      },
      boxShadow: {
        "violet-soft": "0 0 42px rgba(139, 92, 246, 0.28)",
        "panel": "0 24px 70px rgba(0, 0, 0, 0.34)"
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"]
      },
      backgroundImage: {
        "grid-line":
          "linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
