/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const siteConfig = require('./src/config/site.cjs');
const { generateColorPalette } = require('./src/utils/colors.cjs');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Use the main color for the blue palette
        blue: generateColorPalette(siteConfig.colors.main),
        // Use the secondary color for the purple palette
        purple: generateColorPalette(siteConfig.colors.secondary),
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
        '6xl': '5rem',
      },
      fontFamily: {
        display: ['Cabinet Grotesk', ...defaultTheme.fontFamily.sans],
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/typography'),
    // ...
  ],
}
