/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/pages/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  darkMode: "class", // class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5faff",
          100: "#e6f0ff",
          500: "#2563EB",
          700: "#1e40af",
        },
      },
      spacing: {
        "9/16": "56.25%",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
