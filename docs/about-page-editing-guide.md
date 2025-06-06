# Simple Guide to Editing the About Page

This guide explains how to edit the different sections of the About page in a straightforward way.

## Overview

The About page has four main sections:
1. Header (top section with title and images)
2. Features (middle section with bullet points)
3. Pricing (section with pricing plans)
4. Call-to-Action (bottom section with buttons)

Most text can be edited in one central file, while specific content requires editing component files.

## The Main Configuration File

**File:** `src/config/site.js`

This is the most important file for editing text across the site. Here's what you can change:

```javascript
// Company information
text: {
  siteName: "Naviu's Jobs",        // Your company name
  companyShortName: "Naviu",       // Short version of company name
  
  // Header text
  home: {
    headerTagline: "Find your next opportunity",  // Main headline
    // Description text
    description: function(config) { 
      return `Discover your next career opportunity with ${config.text.siteName}. We connect job seekers with rewarding positions across the United States.`;
    }
  },
  
  // Button text
  buttons: {
    viewJobs: "View Jobs",         // Primary button text
    aboutUs: "About Us",           // Secondary button text
  }
}

// Brand colors
colors: {
  main: "#077b8a",      // Primary color (blue)
  secondary: "#5c3c92", // Secondary color (purple)
}
```

**Important:** After editing `site.js`, make the same changes to `site.cjs` to keep them in sync.

## Editing Each Section

### 1. Header Section

**Basic Text:** Edit in `src/config/site.js` as shown above.

**Images:** To change the images:
1. Add your new images to the `public/images/` folder
2. Edit `src/components/headers/HeaderTwo.astro`
3. Find the `<img>` tags and change the `src` attributes:
   ```html
   <img src="/images/your-new-image.jpg" alt="..." />
   ```

### 2. Features Section

**File:** `src/components/features/FeatureFive.astro`

To edit the features list:
1. Find the `features` array at the top of the file
2. Edit the titles and descriptions:
   ```javascript
   const features = [
     {
       title: "Fast Career Matches",
       description: "Get matched with jobs that fit your skills and experience.",
     },
     // More features...
   ];
   ```

### 3. Pricing Section

**File:** `src/components/pricing/PricingPage.astro`

To edit pricing plans:
1. Find the `pricingPlans` array at the top of the file
2. Edit plan names, prices, and features:
   ```javascript
   const pricingPlans = [
     {
       name: "Starter",
       monthlyPrice: "399",
       annualPrice: "349",
       description: "Ideal for growing mid-size companies who need to hire 1 or 2 employees.",
       features: [
         "5 active job postings",
         "30-day listings",
         // More features...
       ],
       unavailableFeatures: [
         "Dedicated account manager",
         // Features not included...
       ],
     },
     // More pricing plans...
   ];
   ```

To edit the extended features list below the pricing plans:
1. Find the `extended` array in the same file
2. Edit the titles and benefits:
   ```javascript
   const extended = [
     {
       title: "Targeted Job Distribution",
       benefits: [
         "Post to multiple job boards",
         "Social media promotion",
         "SEO optimization for listings"
       ],
     },
     // More extended features...
   ];
   ```

### 4. Call-to-Action Section

**Basic Text:** Edit in `src/config/site.js` as shown above.

The CTA section uses the same text as the header section by default. If you want different text:
1. Edit `src/components/cta/CtaOne.astro`
2. Find the heading and paragraph text and change them directly

## Testing Your Changes

After making changes:
1. Run `npm run dev` to start the development server
2. Visit the About page in your browser to see your changes
3. Make additional edits as needed

## Quick Tips

- Most text can be edited in `src/config/site.js`
- For more specific changes, edit the component files
- Always update both `site.js` and `site.cjs` with the same changes
- Add new images to the `public/images/` folder
- Test your changes by running the development server
