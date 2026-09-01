/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* ── Deep space: near-black, violet-tinted. Never pure #000 —
              that reads flat and cheap; a tinted near-black reads deep. ── */
        void: {
          DEFAULT: "#08060E",
          soft: "#0C0916",
          lift: "#100C1B",
        },
        surface: {
          DEFAULT: "#120D1F",
          hi: "#191227",
          hover: "#211833",
        },
        /* Cosmic Amethyst — the structural tone: borders, chips, dividers */
        amethyst: {
          DEFAULT: "#4C3D52",
          deep: "#372B3C",
          lift: "#6B5675",
          mist: "#9083A0",
        },
        /* Neon violet — the only saturated colour on the page.
           Restraint is what makes it read as expensive. */
        glow: {
          DEFAULT: "#B14EFF",
          faint: "#DDB4FF",
          soft: "#9A3BEA",
          deep: "#7A2BD4",
        },
        /* Rare cyan spark, for live/status signals only */
        nebula: "#6BE9FF",
        /* Text ramp */
        starlight: "#F4F0FA",
        mist: "#A99DBE",
        dim: "#766B8A",
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
        hairline: "linear-gradient(90deg, transparent, rgba(177,78,255,.4), transparent)",
      },
      boxShadow: {
        /* Glow via box-shadow, never filter: blur() — orders of magnitude
           cheaper in GPU memory on large elements. */
        neon: "0 0 0 1px rgba(177,78,255,.22), 0 12px 40px -12px rgba(177,78,255,.55)",
        "neon-lg": "0 0 0 1px rgba(177,78,255,.3), 0 24px 70px -18px rgba(177,78,255,.7)",
        halo: "0 0 60px -10px rgba(177,78,255,.45)",
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
