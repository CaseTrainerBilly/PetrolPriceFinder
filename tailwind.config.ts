import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f7f5ef",
        ink: "#122117",
        accent: "#196f3d",
        accentSoft: "#dff2e5",
        highlight: "#ffb703",
        storm: "#406882",
        card: "#fffdf8",
        border: "#d6ddcf",
        danger: "#b42318"
      },
      boxShadow: {
        panel: "0 18px 60px rgba(18, 33, 23, 0.12)"
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(18,33,23,0.08) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};

export default config;
