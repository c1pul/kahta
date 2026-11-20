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
        gold: {
          50: "#fdf8e8",
          100: "#f9edcc",
          200: "#f3db99",
          300: "#edc966",
          400: "#E8C97A",
          500: "#D4A853",
          600: "#b8892e",
          700: "#996d24",
          800: "#7a5620",
          900: "#5c401a",
        },
        navy: {
          50: "#e8eaf4",
          100: "#c5cbe3",
          200: "#9fa9d0",
          300: "#7987bd",
          400: "#5c6daf",
          500: "#3f53a1",
          600: "#374b99",
          700: "#2d408f",
          800: "#1a2744",
          900: "#0F172A",
          950: "#0B1120",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.6s ease-out",
        "fade-in": "fadeIn 0.6s ease-out",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(212, 168, 83, 0.1)" },
          "100%": { boxShadow: "0 0 40px rgba(212, 168, 83, 0.3)" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
