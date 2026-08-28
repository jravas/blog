// This is the single source of truth for the site's origin — the canonical
// tags, OG tags, RSS feed, and sitemap all derive from it via `site` in
// astro.config.mjs. Do not hardcode the domain anywhere else
// (public/robots.txt is the one unavoidable exception — keep it in sync).
export const SITE_URL = 'https://jravas.dev';

// The site's own source, public on purpose: every essay links to its
// full commit history here. Walking the talk of the provenance essay.
export const REPO_URL = 'https://github.com/jravas/blog';

export const SITE_TITLE = 'Josip Ravas';

// Author identity for structured data (JSON-LD) and OG author tags.
export const AUTHOR_GITHUB = 'https://github.com/jravas';
export const AUTHOR_JOB_TITLE = 'DevOps & Architecture Lead';

export const SITE_DESCRIPTION =
  'Essays on infrastructure and reliability, and on whether the controls a system relies on actually fire.';
