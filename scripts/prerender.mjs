// Runs after `vite build`. Renders every route to its own HTML file with the
// right <title>, description, social tags and structured data, then writes
// robots.txt and sitemap.xml. Search engines and link previews get real pages;
// React takes over in the browser.
//
// Set SITE_URL (for example https://www.your-domain.com) so canonical links,
// social image links and the sitemap can be written. On Vercel the production
// domain is picked up automatically.

import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

try {
  process.loadEnvFile();
} catch {
  // no .env file
}

const root = process.cwd();
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, routes, getMeta, structuredData } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);

const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
)
  .trim()
  .replace(/\/+$/, '');

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-html-->') || !/<!--seo-->[\s\S]*?<!--\/seo-->/.test(template)) {
  throw new Error('dist/index.html is missing the <!--app-html--> or <!--seo--> markers.');
}

const escape = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function headTags(meta) {
  const url = siteUrl ? `${siteUrl}${meta.path === '/' ? '/' : meta.path}` : '';
  const tags = [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
    meta.notFound ? '<meta name="robots" content="noindex" />' : '',
    url && !meta.notFound ? `<link rel="canonical" href="${escape(url)}" />` : '',
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="ISOFORM" />',
    '<meta property="og:locale" content="en_IN" />',
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    url && !meta.notFound ? `<meta property="og:url" content="${escape(url)}" />` : '',
    siteUrl ? `<meta property="og:image" content="${escape(siteUrl)}/og.jpg" />` : '',
    siteUrl ? '<meta property="og:image:width" content="1200" />' : '',
    siteUrl ? '<meta property="og:image:height" content="630" />' : '',
    siteUrl ? '<meta property="og:image:alt" content="ISOFORM. Designed to be chosen." />' : '',
    `<meta name="twitter:card" content="${siteUrl ? 'summary_large_image' : 'summary'}" />`,
    meta.notFound
      ? ''
      : `<script type="application/ld+json">${JSON.stringify(structuredData(meta, siteUrl)).replace(/</g, '\\u003c')}</script>`,
  ];
  return tags.filter(Boolean).join('\n    ');
}

async function writePage(url, file) {
  const meta = getMeta(url);
  const html = template
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, () => headTags(meta))
    .replace('<!--app-html-->', () => render(url));
  const target = path.join(dist, file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, html);
  return file;
}

const written = [];
for (const route of routes) {
  written.push(await writePage(route, route === '/' ? 'index.html' : `${route.slice(1)}.html`));
}
written.push(await writePage('/404', '404.html'));

// robots.txt and sitemap.xml
const robots = ['User-agent: *', 'Allow: /'];
if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    routes
      .map((route) => `  <url><loc>${escape(siteUrl + (route === '/' ? '/' : route))}</loc><lastmod>${today}</lastmod></url>`)
      .join('\n') +
    '\n</urlset>\n';
  await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap);
  robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`);
}
await fs.writeFile(path.join(dist, 'robots.txt'), robots.join('\n') + '\n');

await fs.rm(ssrDir, { recursive: true, force: true });

console.log(`\nPrerendered ${written.length} pages into dist/`);
if (siteUrl) {
  console.log(`Site URL: ${siteUrl} (canonical links, social image and sitemap.xml written)`);
} else {
  console.warn(
    'SITE_URL is not set: canonical links, the social preview image link and sitemap.xml were skipped.\n' +
      'Add SITE_URL=https://your-domain to .env (or your host\'s environment) and build again.'
  );
}
