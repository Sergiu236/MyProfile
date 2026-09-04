import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
  // Drives canonical URLs, the sitemap, RSS and Open Graph image URLs.
  site: "https://sergiumocan.com",
  integrations: [sitemap(), tailwind({ applyBaseStyles: false })],
  markdown: {
    shikiConfig: {
      theme: "poimandres",
      wrap: true,
    },
  },
})
