// GitHub Pages has no SPA rewrites: any path without a matching file is served
// from 404.html with an HTTP 404 status, even though React then renders the page.
// Emit a copy of index.html for every static route in src/App.tsx so each one
// is served with HTTP 200. Both `route.html` and `route/index.html` are written
// so the path resolves with or without a trailing slash.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const dist = 'dist';
const indexHtml = join(dist, 'index.html');
const appSource = readFileSync('src/App.tsx', 'utf8');

const routes = [...appSource.matchAll(/<Route\s+path="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((p) => p !== '/' && !p.includes(':') && !p.includes('*'));

if (routes.length === 0) {
  throw new Error('No routes found in src/App.tsx; route regex is out of date.');
}

const html = readFileSync(indexHtml, 'utf8');
for (const route of routes) {
  const rel = route.replace(/^\/+|\/+$/g, '');
  for (const file of [join(dist, `${rel}.html`), join(dist, rel, 'index.html')]) {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
  }
}

// Unknown paths still fall back to the SPA (with a genuine 404 status).
copyFileSync(indexHtml, join(dist, '404.html'));

console.log(`Emitted HTML for ${routes.length} routes.`);
