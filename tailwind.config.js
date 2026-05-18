/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/pages/**/*.{ts,tsx,js,jsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // CSS-variable driven so light/dark stays in sync with globals.css
        bg: {
          DEFAULT: "rgb(var(--bg) / <alpha-value>)",
          soft: "rgb(var(--bg-soft) / <alpha-value>)",
          elev: "rgb(var(--bg-elev) / <alpha-value>)",
        },
        fg: {
          DEFAULT: "rgb(var(--fg) / <alpha-value>)",
          soft: "rgb(var(--fg-soft) / <alpha-value>)",
          muted: "rgb(var(--muted) / <alpha-value>)",
        },
        border: "rgb(var(--border) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
        neon: {
          cyan: "rgb(var(--neon-cyan) / <alpha-value>)",
          green: "rgb(var(--neon-green) / <alpha-value>)",
          purple: "rgb(var(--neon-purple) / <alpha-value>)",
          pink: "rgb(var(--neon-pink) / <alpha-value>)",
          blue: "rgb(var(--neon-blue) / <alpha-value>)",
        },
        // legacy aliases kept so older class names still resolve
        secondary: {
          purple: "rgb(var(--neon-purple) / <alpha-value>)",
          green: "rgb(var(--neon-green) / <alpha-value>)",
          blue: "rgb(var(--neon-blue) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display-1": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-2": ["clamp(2rem, 4.5vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      boxShadow: {
        glow: "0 0 0 1px rgb(34 211 238 / 0.18), 0 10px 40px -10px rgb(34 211 238 / 0.35), 0 24px 60px -20px rgb(153 69 255 / 0.35)",
        "glow-soft": "0 8px 30px -12px rgb(34 211 238 / 0.45), 0 0 24px -8px rgb(153 69 255 / 0.25)",
        "glow-purple": "0 0 30px -8px rgb(153 69 255 / 0.55)",
        "glow-green": "0 0 30px -8px rgb(20 241 149 / 0.55)",
        inset: "inset 0 1px 0 rgb(255 255 255 / 0.06)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "brand-gradient":
          "linear-gradient(110deg, rgb(var(--neon-green)) 0%, rgb(var(--neon-cyan)) 50%, rgb(var(--neon-purple)) 100%)",
        "grid-fade":
          "radial-gradient(ellipse 60% 50% at 50% 30%, rgb(0 0 0 / 0.9), transparent 70%)",
      },
      animation: {
        gradient: "gradientShift 8s linear infinite",
        float: "float 4.5s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(.4,0,.6,1) infinite",
        marquee: "marquee 28s linear infinite",
        shimmer: "shimmer 2.4s linear infinite",
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgb(34 211 238 / 0.55)" },
          "100%": { boxShadow: "0 0 0 18px rgb(34 211 238 / 0)" },
        },
        marquee: {
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeInUp: {
          from: { opacity: 0, transform: "translateY(16px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
