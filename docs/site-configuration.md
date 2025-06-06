# Site Configuration Guide

This document explains how to customize the site's appearance and text content using the configuration files.

## Overview

The site configuration is stored in two files:

- `src/config/site.js` - ES Module version (used by Astro components)
- `src/config/site.cjs` - CommonJS version (used by tools like Tailwind)

Both files contain the same configuration options, just in different formats. When making changes, be sure to update both files to keep them in sync.

## Configuration Options

### Brand Colors

```javascript
colors: {
  /** Primary brand color */
  main: "#077b8a", // Current blue-500
  /** Secondary brand color */
  secondary: "#5c3c92", // Current purple-500
},
```

These colors are used throughout the site for buttons, accents, and other UI elements. Use hex color codes to specify your desired colors.

### Logo

```javascript
logo: "/images/jakes.png",
```

This is the path to the site logo, relative to the `public` directory. To use a different logo, place your image file in the `public/images` directory and update this path.

### Social Links

```javascript
socialLinks: [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/jakesjobs/about/",
  },
  // Additional social links can be added here
],
```

These links appear in the site footer. You can add, remove, or modify social media links as needed.

### Forms

```javascript
forms: {
  /**
   * Form for job seekers
   * Use {{jobId}} as a placeholder to insert the current job ID
   */
  jobSeeker: "https://docs.google.com/forms/d/e/1FAIpQLSfxxxxxxxxxxxxxxxxxxxxxxx/viewform?usp=pp_url&entry.123456789={{jobId}}",
  
  /**
   * Form for employers looking to recruit
   */
  employer: "https://docs.google.com/forms/d/e/1FAIpQLSfyyyyyyyyyyyyyyyyyyy/viewform",
},
```

These are the URLs for the lead capture forms. The `jobSeeker` form can include a `{{jobId}}` placeholder that will be replaced with the current job ID.

### Text Content

The `text` section allows you to customize all text strings displayed on the site:

```javascript
text: {
  /**
   * Site-wide text
   * These are the primary values to change when rebranding the site
   */
  siteName: "Naviu's Jobs",
  siteTagline: "Discover your next job with Naviu",
  companyShortName: "Naviu", // Used in phrases like "job with Naviu"
  
  /**
   * Navigation text
   */
  nav: {
    about: "About",
    jobs: "Jobs"
  },
  
  /**
   * Home page text
   */
  home: {
    title: "Light Industrial Jobs",
    // The description will use siteName dynamically
    description: function(config) { 
      return `Discover your next career opportunity with ${config.text.siteName}. We connect job seekers with rewarding warehouse and light industrial positions across the United States.`;
    },
    headerTagline: "Find your next opportunity",
    // The header title will use siteName dynamically
    headerTitle: function(config) { 
      return config.text.siteName;
    },
    // The header description will use companyShortName dynamically
    headerDescription: function(config) { 
      return `Discover your next job with ${config.text.companyShortName}.`;
    }
  },
  
  /**
   * Headers
   */
  headers: {
    electricians: {
      // The tagline will use siteName dynamically
      tagline: function(config) { 
        return config.text.siteName;
      },
      title: "Find Qualified Electricians Faster",
      description: "Commercial, Residential, and Industrial Electricians. Fire Alarm, Controls, Security, Solar, Voice/Data, and Audio/Visual Jobs."
    }
  },
  
  /**
   * Buttons
   */
  buttons: {
    viewJobs: "View Jobs",
    aboutUs: "About Us",
    applyNow: "Apply for this position"
  },

  /**
   * SEO and accessibility text
   */
  seo: {
    // The logo alt text will use siteName dynamically
    logoAlt: function(config) { 
      return `${config.text.siteName} Logo`;
    },
    // The home title will use siteName dynamically
    homeTitle: function(config) { 
      return `${config.text.siteName} - Light Industrial Jobs`;
    },
    // The home description will use siteName dynamically
    homeDescription: function(config) { 
      return `Discover your next career opportunity with ${config.text.siteName}. We connect job seekers with rewarding positions across the United States.`;
    }
  }
}
```

#### Dynamic Text Values

Many text values can be defined as functions that dynamically generate text based on other configuration values. This allows you to change the site name in one place and have it automatically update throughout the site.

For example, to create a dynamic text value that includes the site name:

```javascript
headerTitle: function(config) { 
  return config.text.siteName;
}
```

The function receives the entire configuration object as a parameter, allowing you to reference any other configuration values.

When using dynamic text values in your components, you need to check if the value is a function and call it if it is:

```astro
{typeof siteConfig.text.home.headerTitle === 'function' 
  ? siteConfig.text.home.headerTitle(siteConfig) 
  : siteConfig.text.home.headerTitle}
```

#### Site-wide Text

- `siteName`: The name of the site, used in various places including the logo text and page titles
- `siteTagline`: A short tagline for the site

#### Navigation Text

- `nav.about`: Text for the About link in the navigation
- `nav.jobs`: Text for the Jobs link in the navigation

#### Home Page Text

- `home.title`: Main title for the home page
- `home.description`: Description for the home page (used for SEO)
- `home.headerTagline`: Small tagline displayed above the header title
- `home.headerTitle`: Main title in the header
- `home.headerDescription`: Description text in the header

#### Headers

- `headers.electricians.tagline`: Tagline for the electricians header
- `headers.electricians.title`: Title for the electricians header
- `headers.electricians.description`: Description for the electricians header

#### Buttons

- `buttons.viewJobs`: Text for the "View Jobs" button
- `buttons.aboutUs`: Text for the "About Us" button
- `buttons.applyNow`: Text for the "Apply Now" button

#### SEO and Accessibility Text

- `seo.logoAlt`: Alt text for the logo image (for accessibility)
- `seo.homeTitle`: Default title for the home page (for SEO)
- `seo.homeDescription`: Default description for the home page (for SEO)

## How to Customize

1. Open the configuration files:
   - `src/config/site.js`
   - `src/config/site.cjs`

2. Modify the values as needed. Be sure to update both files with the same changes.

3. Save the files and rebuild the site to see your changes.

## Adding New Text Strings

If you need to add new customizable text strings:

1. Add the new strings to the `text` section in both configuration files.

2. Update the relevant components to use the new strings from the configuration.

For example, to add a new button text:

```javascript
// In site.js and site.cjs
buttons: {
  viewJobs: "View Jobs",
  aboutUs: "About Us",
  applyNow: "Apply for this position",
  newButton: "Click Me" // New button text
}
```

Then in your component:

```astro
<button>{siteConfig.text.buttons.newButton}</button>
