import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "Arial", "sans-serif"],
        display: ["var(--font-inter)", "Inter Display", "Arial", "sans-serif"],
      },
      colors: {
        black: "#000000",
        white: "#ffffff",
        brand: {
          black: "#000000",
          white: "#ffffff",
          bg: "#f7f7f7",
        },
        text: {
          primary: "#000000",
          secondary: "#636363",
          muted: "#aeaeae",
          light: "#b3b3b3",
        },
        border: {
          DEFAULT: "#e0e0e0",
          dark: "#453f3f",
          light: "#d9d9d9",
        },
      },
      fontSize: {
        "display-1": ["84px", { lineHeight: "1em", letterSpacing: "-1.2px" }],
        "display-2": ["60px", { lineHeight: "1.13em", letterSpacing: "-1.2px" }],
        "heading-3": ["48px", { lineHeight: "1.25em", letterSpacing: "-1.2px" }],
        "heading-4": ["32px", { lineHeight: "1.25em", letterSpacing: "-1px" }],
        "heading-5": ["24px", { lineHeight: "1.33em", letterSpacing: "0" }],
        "body-lg": ["18px", { lineHeight: "1.55em" }],
        "body-md": ["16px", { lineHeight: "1.62em" }],
        "body-sm": ["12px", { lineHeight: "1.66em", letterSpacing: "0.48px" }],
      },
      spacing: {
        "4.5": "1.125rem",
        "13": "3.25rem",
        "15": "3.75rem",
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "112": "28rem",
        "128": "32rem",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "fade-in": "fade-in 0.4s ease forwards",
        "slide-in-left": "slide-in-left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      aspectRatio: {
        "3/2": "3 / 2",
        "4/3": "4 / 3",
        "16/10": "16 / 10",
      },
    },
  },
  plugins: [],
};

export default config;
