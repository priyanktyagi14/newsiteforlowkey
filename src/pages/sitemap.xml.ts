import type { APIRoute } from 'astro';

export const prerender = true;

const BASE_URL = 'https://lowkeydevs.com';

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().split('T')[0];

  const pages = [
    { url: `${BASE_URL}/`, priority: '1.0', changefreq: 'weekly' },
    { url: `${BASE_URL}/services`, priority: '0.9', changefreq: 'weekly' },
    { url: `${BASE_URL}/agency`, priority: '0.8', changefreq: 'monthly' },
    { url: `${BASE_URL}/contact`, priority: '0.9', changefreq: 'monthly' },
    { url: `${BASE_URL}/privacy`, priority: '0.4', changefreq: 'yearly' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
