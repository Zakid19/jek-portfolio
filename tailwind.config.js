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
      /* ==========================================================
         COLORS
      ========================================================== */

      colors: {
        // Background tokens
        bg: {
          DEFAULT: "rgb(var(--bg) / <alpha-value>)",
          soft: "rgb(var(--bg-soft) / <alpha-value>)",
          elev: "rgb(var(--bg-elev) / <alpha-value>)",
        },

        // Text tokens
        fg: {
          DEFAULT: "rgb(var(--fg) / <alpha-value>)",
          soft: "rgb(var(--fg-soft) / <alpha-value>)",
          muted: "rgb(var(--muted) / <alpha-value>)",

          // Legacy alias mapped to an existing token
          disabled: "rgb(var(--muted) / <alpha-value>)",
        },

        // Border tokens
        border: {
          DEFAULT: "rgb(var(--border) / <alpha-value>)",
          soft: "rgb(var(--border-soft) / <alpha-value>)",

          // Legacy alias mapped to the primary border
          strong: "rgb(var(--border) / <alpha-value>)",
        },

        // Focus ring
        ring: "rgb(var(--ring) / <alpha-value>)",

        // Primary palette
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },

        // Accent palette
        neon: {
          cyan: "rgb(var(--neon-cyan) / <alpha-value>)",
          green: "rgb(var(--neon-green) / <alpha-value>)",

          // Legacy aliases mapped to the new accent system
          purple: "rgb(var(--neon-green) / <alpha-value>)",
          pink: "rgb(var(--neon-green) / <alpha-value>)",
          blue: "rgb(var(--neon-cyan) / <alpha-value>)",
        },

        // Legacy secondary aliases
        secondary: {
          purple: "rgb(var(--neon-green) / <alpha-value>)",
          green: "rgb(var(--neon-green) / <alpha-value>)",
          blue: "rgb(var(--neon-cyan) / <alpha-value>)",
        },
      },

      /* ==========================================================
   TYPOGRAPHY
========================================================== */

      /*
       * Full Monospace Typography
       *
       * All typography uses JetBrains Mono to maintain
       * the portfolio's developer-oriented visual identity.
       *
       * The Next.js font variable is provided by:
       * --font-mono
       */

      fontFamily: {
        sans: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],

        display: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],

        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },

      fontSize: {
        "display-1": [
          "clamp(2.25rem, 5.5vw, 4.5rem)",
          {
            lineHeight: "1.12",
            letterSpacing: "-0.055em",
          },
        ],

        "display-2": [
          "clamp(1.875rem, 4vw, 3.25rem)",
          {
            lineHeight: "1.15",
            letterSpacing: "-0.045em",
          },
        ],
      },

      /* ==========================================================
         SHADOWS
      ========================================================== */

      boxShadow: {
        // Neutral shadows only; no neon glow
        glow: "0 12px 32px -20px rgb(0 0 0 / 0.35)",

        "glow-soft": "0 8px 24px -18px rgb(0 0 0 / 0.25)",

        // Legacy aliases retained without colored glow
        "glow-purple": "0 8px 24px -18px rgb(0 0 0 / 0.25)",

        "glow-green": "0 8px 24px -18px rgb(0 0 0 / 0.25)",

        inset: "inset 0 1px 0 rgb(255 255 255 / 0.035)",
      },

      /* ==========================================================
         BACKGROUND IMAGES
      ========================================================== */

      backgroundImage: {
        // Generic utilities retained for compatibility
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",

        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

        // Brand gradient intentionally disabled
        "brand-gradient": "none",

        // Decorative grid background disabled
        "grid-fade": "none",
      },

      /* ==========================================================
         ANIMATIONS
      ========================================================== */

      animation: {
        // Legacy aliases retained as static-compatible definitions
        gradient: "none",
        float: "float 4.5s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(.4,0,.6,1) infinite",
        marquee: "marquee 28s linear infinite",
        shimmer: "none",

        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      },

      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },

          "50%": {
            transform: "translateY(-8px)",
          },
        },

        // Neutral pulse without neon shadow
        "pulse-ring": {
          "0%": {
            outline: "1px solid rgb(var(--neon-green) / 0.35)",
            outlineOffset: "0px",
          },

          "100%": {
            outline: "1px solid rgb(var(--neon-green) / 0)",
            outlineOffset: "12px",
          },
        },

        marquee: {
          to: {
            transform: "translateX(-50%)",
          },
        },

        fadeInUp: {
          from: {
            opacity: 0,
            transform: "translateY(16px)",
          },

          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },

      /* ==========================================================
         TRANSITIONS
      ========================================================== */

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },

      /* ==========================================================
         BORDER RADIUS
      ========================================================== */

      borderRadius: {
        "4xl": "2rem",
      },

      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
    },
  },

  plugins: [require("@tailwindcss/typography")],
};
