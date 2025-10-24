/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/pages/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#121212", // main dark tone
          50: "#f9f9f9",
          100: "#f3f3f3",
          200: "#e0e0e0",
          300: "#c6c6c6",
          400: "#a0a0a0",
          500: "#6e6e6e",
          600: "#4b4b4b",
          700: "#323232",
          800: "#232323",
          900: "#1a1a1a",
        },
        secondary: {
          purple: "#9945FF",
          green: "#14F195",
          blue: "#0075FF",
        },
        accent: {
          light: "#9945FF",
          dark: "#14F195",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      spacing: {
        "9/16": "56.25%",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
