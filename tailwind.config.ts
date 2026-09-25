import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pixel: {
          dark: "#1e1e2e",
          purple: "#7c3aed",
          yellow: "#fbbf24",
          green: "#10b981",
          blue: "#3b82f6",
          red: "#ef4444",
          pink: "#ec4899",
          orange: "#f97316",
          bg: "#0f172a",
          card: "#1e293b",
        },
      },
      fontFamily: {
        pixel: ["'Press Start 2P'", "monospace", "system-ui"],
        fun: ["'Fredoka'", "'Comic Sans MS'", "sans-serif"],
      },
      keyframes: {
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.6))' },
          '50%': { filter: 'drop-shadow(0 0 5px rgba(251, 191, 36, 0.2))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      animation: {
        bounceSubtle: 'bounceSubtle 2s infinite ease-in-out',
        pulseGlow: 'pulseGlow 2s infinite ease-in-out',
        float: 'float 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};

export default config;
