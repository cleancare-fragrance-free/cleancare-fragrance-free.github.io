import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL || 'https://cleancare-fragrance-free.github.io',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
});
