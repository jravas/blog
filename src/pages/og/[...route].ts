import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';
import { isPublished } from '../../lib/posts';

// Build-time social cards: one PNG per post at /og/<id>.png, rendered from
// the same frontmatter that feeds the page. Zero runtime cost, matches the
// site palette (src/styles/global.css) and Newsreader — but from static TTF
// instances in src/assets/og/, because CanvasKit can't read woff2.
const posts = await getCollection('blog', isPublished);
const pages = Object.fromEntries(posts.map((post) => [post.id, post.data]));

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getSlug: (id) => `${id}.png`,
  getImageOptions: (_id, page) => ({
    title: page.title,
    description: page.description,
    // --bg → --bg-deep
    bgGradient: [
      [39, 39, 41],
      [30, 30, 32],
    ],
    // --accent (Amethyst Orchid)
    border: { color: [146, 106, 166], width: 10, side: 'block-end' },
    padding: 72,
    font: {
      title: {
        families: ['Newsreader'],
        weight: 'Medium',
        size: 72,
        lineHeight: 1.15,
        // --ink-bright
        color: [252, 252, 255],
      },
      description: {
        families: ['Newsreader'],
        size: 34,
        lineHeight: 1.4,
        // --muted
        color: [178, 178, 187],
      },
    },
    fonts: ['./src/assets/og/newsreader-regular.ttf', './src/assets/og/newsreader-medium.ttf'],
  }),
});
