# Site Configuration

This directory contains the site configuration files used to customize the appearance and text content of the site.

## Files

- `site.js` - ES Module version (used by Astro components)
- `site.cjs` - CommonJS version (used by tools like Tailwind)

Both files contain the same configuration options, just in different formats. When making changes, be sure to update both files to keep them in sync.

## Configuration Options

The configuration includes:

- **Brand Colors**: Main and secondary colors used throughout the site
- **Logo Path**: Path to the site logo (relative to public directory)
- **Social Links**: Links to social media profiles for the footer
- **Forms**: URLs for lead capture forms (job seekers and employers)
- **Text Content**: All customizable text strings throughout the site

## Documentation

For detailed documentation on how to use and customize the site configuration, see:

- [Site Configuration Guide](../../docs/site-configuration.md)
