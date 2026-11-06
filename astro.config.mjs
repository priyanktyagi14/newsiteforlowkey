import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import cloudflare from '@astrojs/cloudflare';
import node from '@astrojs/node';

const isDev = process.env.NODE_ENV === 'development' || process.argv.includes('dev') || process.argv.includes('start');
const isCloudflare = Boolean(process.env.CLOUDFLARE || process.env.CF_PAGES);

function getAdapter() {
  if (isDev) {
    return node({ mode: 'standalone' });
  }
  if (isCloudflare) {
    return cloudflare();
  }
  return vercel();
}

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: getAdapter(),
});
