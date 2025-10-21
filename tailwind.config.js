// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}",
  ],
  darkMode: "class", // important: class-based dark mode
  theme: {
    extend: {
      colors: {
        // contoh custom color token, modify later
        primary: {
          50: "#f5faff",
          500: "#2563eb",
          700: "#1e40af",
        },
      },
      spacing: {
        "9/16": "56.25%",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
