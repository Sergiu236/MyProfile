import rss from "@astrojs/rss"
import type { APIContext } from "astro"
import { SITE, getSection } from "@consts"
import { getPosts } from "@lib/content"

export async function GET(context: APIContext) {
  const posts = await getPosts()

  return rss({
    title: `${SITE.TITLE} — ${SITE.ROLE}`,
    description: SITE.DESCRIPTION,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      categories: [getSection(post.data.section)?.LABEL, ...post.data.tags].filter(
        (value): value is string => Boolean(value),
      ),
      link: `/blog/${post.slug}/`,
    })),
    customData: "<language>en</language>",
  })
}
