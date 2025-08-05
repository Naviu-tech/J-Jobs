import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';

export default defineConfig({
  output: 'static',
  server: {
    port: 3000,
  },
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: 'css-variables'
    }
  },
  shikiConfig: {
    wrap: true,
    skipInline: false,
    drafts: true
  },
  site: 'https://www.jakesjobs.com',
  trailingSlash: 'never', // Enforce no trailing slash
  integrations: [
    tailwind(), 
    sitemap(), 
    mdx(), 
    icon({
      include: {
        mdi: ['*']  // Include all MDI icons
      }
    })
  ]
});