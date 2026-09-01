import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
  // TODO: point this at your real domain before deploying — it drives
  // canonical URLs, the sitemap, RSS and Open Graph image URLs.
  site: "https://sergiumocan.dev",
  integrations: [sitemap(), tailwind({ applyBaseStyles: false })],
  markdown: {
    shikiConfig: {
      theme: "poimandres",
      wrap: true,
    },
  },
})
