// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/consts';
import { scanBlogSitemapData } from './src/lib/sitemap-data';

const posts = scanBlogSitemapData(new URL('.', import.meta.url).pathname);
const pathnameOf = (/** @type {string} */ url) => new URL(url).pathname;

export default defineConfig({
  site: SITE_URL,
  integrations: [
    sitemap({
      // A post whose canonical points at another site (published elsewhere
      // first) shouldn't be offered for indexing here — the canonical tag
      // and the sitemap must tell the same story.
      filter: (page) => !posts.get(pathnameOf(page))?.crossPosted,
      serialize: (item) => {
        // <lastmod> is the one sitemap hint Google acts on (changefreq and
        // priority are ignored) — sourced from updatedDate ?? pubDate.
        const lastmod = posts.get(pathnameOf(item.url))?.lastmod;
        if (lastmod) item.lastmod = lastmod.toISOString();
        return item;
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      // Site is dark-only (issue #3); one theme, zero JS.
      theme: 'github-dark',
    },
  },
});
