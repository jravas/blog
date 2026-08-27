import fs from 'node:fs';
import path from 'node:path';

// astro.config.mjs runs before the content layer exists, so the sitemap
// hooks can't use getCollection(). This scans the same frontmatter the
// content schema validates (src/content.config.ts) with plain fs instead.
// Only the fields the sitemap needs are read.

const BLOG_DIR = 'src/content/blog';

interface SitemapPostData {
  /** `updatedDate ?? pubDate`, for <lastmod>. */
  lastmod?: Date;
  /** True when `canonicalURL` points elsewhere — the canonical isn't ours to list. */
  crossPosted: boolean;
}

function readField(frontmatter: string, field: string): string | undefined {
  const match = frontmatter.match(new RegExp(`^${field}:\\s*(.+?)\\s*$`, 'm'));
  return match?.[1].replace(/^['"]|['"]$/g, '');
}

/** Map of post URL pathname (`/writing/<id>/`) to its sitemap data. */
export function scanBlogSitemapData(root: string): Map<string, SitemapPostData> {
  const dir = path.join(root, BLOG_DIR);
  const entries = new Map<string, SitemapPostData>();

  for (const file of fs.readdirSync(dir, { recursive: true, encoding: 'utf-8' })) {
    if (!file.endsWith('.md')) continue;
    // Mirrors the glob loader: the extension-less relative path is the id.
    const id = file.slice(0, -'.md'.length);

    const source = fs.readFileSync(path.join(dir, file), 'utf-8');
    const frontmatter = source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';

    const date = readField(frontmatter, 'updatedDate') ?? readField(frontmatter, 'pubDate');
    entries.set(`/writing/${id}/`, {
      lastmod: date ? new Date(date) : undefined,
      crossPosted: Boolean(readField(frontmatter, 'canonicalURL')),
    });
  }

  return entries;
}
