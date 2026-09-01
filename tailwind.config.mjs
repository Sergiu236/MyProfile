/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* ── Deep space: near-black, neutral grey. Never pure #000 —
              that reads flat and cheap; a soft charcoal reads deep. ── */
        void: {
          DEFAULT: "#0A0A0C",
          soft: "#0D0D10",
          lift: "#111114",
        },
        surface: {
          DEFAULT: "#18181B",
          hi: "#1F1F23",
          hover: "#27272B",
        },
        /* Structural grey — borders, chips, dividers */
        amethyst: {
          DEFAULT: "#3F3F46",
          deep: "#2E2E33",
          lift: "#59595F",
          mist: "#8A8A91",
        },
        /* Brushed silver — the only "accent" on the page.
           Restraint is what makes it read as expensive. */
        glow: {
          DEFAULT: "#E4E4E7",
          faint: "#F4F4F5",
          soft: "#A1A1AA",
          deep: "#71717A",
        },
        /* Pale spark, for live/status signals only */
        nebula: "#C4C4CC",
        /* Text ramp */
        starlight: "#F7F7F8",
        mist: "#A1A1AA",
        dim: "#71717A",
      },
      fontFamily: {
        /* One family, used everywhere — clarity over variety */
        sans: ["Poppins", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["Poppins", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        /* Code only — a system stack, so no extra webfont to download */
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      fontSize: {
        /* Fluid and generous — nothing here needs zooming in to read */
        eyebrow: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.2em" }],
        micro: ["0.85rem", { lineHeight: "1.5" }],
        body: ["1.0625rem", { lineHeight: "1.75" }],
        "body-lg": ["1.1875rem", { lineHeight: "1.7" }],
        lead: ["clamp(1.15rem, 0.95rem + 0.8vw, 1.5rem)", { lineHeight: "1.6" }],
        h3: ["clamp(1.25rem, 1.05rem + 0.7vw, 1.6rem)", { lineHeight: "1.3", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.75rem, 1.35rem + 1.7vw, 2.75rem)", { lineHeight: "1.12", letterSpacing: "-0.03em" }],
        h1: ["clamp(2.1rem, 1.55rem + 2.6vw, 3.8rem)", { lineHeight: "1.08", letterSpacing: "-0.035em" }],
        hero: ["clamp(2.8rem, 1.5rem + 6vw, 7rem)", { lineHeight: "0.98", letterSpacing: "-0.045em" }],
      },
      maxWidth: {
        prose: "68ch",
        shell: "78rem",
      },
      backgroundImage: {
        hairline: "linear-gradient(90deg, transparent, rgba(228,228,231,.4), transparent)",
      },
      boxShadow: {
        /* Flat elevation, never a coloured halo — grey shadows read as
           depth, not as a glow. */
        neon: "0 0 0 1px rgba(228,228,231,.16), 0 12px 40px -12px rgba(0,0,0,.6)",
        "neon-lg": "0 0 0 1px rgba(228,228,231,.22), 0 24px 70px -18px rgba(0,0,0,.7)",
        halo: "0 0 60px -10px rgba(0,0,0,.55)",
      },
      transitionTimingFunction: {
        portal: "cubic-bezier(.22,1,.36,1)",
      },
      animation: {
        "spin-slow": "spin 26s linear infinite",
        "spin-reverse": "spin-reverse 40s linear infinite",
        float: "float 7s ease-in-out infinite",
      },
      keyframes: {
        "spin-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
