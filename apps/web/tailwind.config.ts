import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "Arial", "sans-serif"],
        display: ["var(--font-montserrat)", "Montserrat", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Source Serif 4", "Georgia", "serif"],
      },
      colors: {
        /* Fano "Calcite Sand" theme, same as the Fano team app */
        sand: "#E6DFD5",      /* Calcite Sand: page background */
        surface: "#F4EFEA",   /* Warm Bone: cards, panels */
        titan: "#C5BAAB",     /* Desert Titanium: borders, secondary */
        black: "#2B2520",     /* Espresso: text and dark surfaces, never pure black */
        /* Warm taupes in place of the cool greys */
        zinc: {
          50: "#EFE8DF",
          100: "#E9E1D6",
          200: "#DDD3C6",
          300: "#D0C5B6",
          400: "#A39886",
          500: "#7A6E62",
          600: "#62574D",
          700: "#4A413A",
          800: "#3A322B",
          900: "#2B2520",
          950: "#211C18",
        },
        gray: {
          50: "#EFE8DF",
          100: "#E9E1D6",
          200: "#DDD3C6",
          300: "#D0C5B6",
          400: "#A39886",
          500: "#7A6E62",
          600: "#62574D",
          700: "#4A413A",
          800: "#3A322B",
          900: "#2B2520",
        },
        gold: {
          50:  "#FBF4EA",
          100: "#F6E7D2",   /* gold-soft */
          200: "#EFD3AE",
          300: "#E8BE88",
          400: "#E2A862",   /* Amber Champagne */
          500: "#C98F4F",
          600: "#B9824A",
          700: "#8C6A47",   /* bronze */
          800: "#6B5038",
          900: "#4A3828",
        },
        brand: {
          black: "#2B2520",
          white: "#F4EFEA",
          bg: "#E6DFD5",
        },
        text: {
          primary: "#2B2520",
          secondary: "#7A6E62",
          muted: "#A39886",
          light: "#C5BAAB",
        },
        border: {
          DEFAULT: "#D9CFC2",
          dark: "#4A413A",
          light: "#E2D9CD",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
    },
  },
  plugins: [],
};

export default config;
