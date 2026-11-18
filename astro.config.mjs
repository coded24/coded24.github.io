import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://coded24.github.io',
  output: 'static',
  integrations: [sitemap()],
});