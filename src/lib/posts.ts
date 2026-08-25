import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

// Drafts are excluded from production builds entirely (they are never
// rendered, so they can't leak into the sitemap either), but stay
// previewable in `astro dev`.
export function isPublished(post: Post): boolean {
  return !(import.meta.env.PROD && post.data.draft);
}

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', isPublished);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

const WORDS_PER_MINUTE = 220;

export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
