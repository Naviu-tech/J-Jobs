# J-Jobs - Job Board Platform

A modern job board platform built with Astro, focusing on warehouse and electrical industry jobs. The platform features automated content management, SEO optimization, and Google Jobs integration through structured data.

## 🚀 Key Features

- **Content Management**
  - Automated job posting generation and updates
  - Content collections for jobs, blog posts, recruiting content, and info pages
  - Structured data implementation for Google Jobs indexing
  - Location-based job categorization

- **Automation Scripts**
  - Job description updates using OpenAI
  - State-specific content generation
  - Automated email notifications for content updates
  - Job indexing and management tools

- **SEO & Performance**
  - JSON-LD structured data for job postings
  - Optimized meta tags and social sharing
  - Static site generation for optimal performance
  - Automated sitemap generation

## 📁 Project Structure

```
├── content/
│   ├── jobs/         # Job posting markdown files
│   ├── posts/        # Blog post content
│   ├── recruiting/   # Recruiting-related content
│   └── infopages/    # Information pages
├── scripts/
│   ├── update-*.js   # Content update automation
│   ├── create-*.js   # Content generation scripts
│   └── notify-*.js   # Notification system scripts
└── src/
    └── layouts/      # Page layouts and templates
```

## 🔄 Content Updates

The project includes several ways to update content:

1. **Automated Updates**
   - Run update scripts for job descriptions
   - Generate state-specific content
   - Automated email notifications for changes

2. **Manual Updates**
   - Edit markdown files in content directories
   - Commit changes to trigger rebuild
   - Deploy updated content

3. **Post-Deployment Updates**
   - Requires rebuild and redeployment
   - Consider implementing CI/CD pipeline
   - Supports incremental updates

## 🛠 Development Notes

Important commit references:
- `0aa7041c9c921d77fddb680d73bb62390d526e83`: Pre-company pages content
- `e7558b5fee2e76fd8be582ce6592dcb2d3e731a8`: Pre-glossary and reduced jobs show on @open-positions

## 📦 Scripts Overview

Key automation scripts:
- `update-descriptions.js`: Updates job descriptions using OpenAI
- `update-state-content.js`: Generates location-specific content
- `notify-content-updates.js`: Handles update notifications
- `index-jobs.js`: Manages job indexing and organization

## 🔍 SEO Implementation

The platform implements comprehensive SEO features:
- Structured data for job postings
- Optimized meta tags
- Social media previews
- Automated sitemap generation

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Build for production: `npm run build`

## 📝 License

[Add your license information here]

---

For more information about the project structure or implementation details, please refer to the documentation in the respective directories.

# TEMPLATE SOLID USE _ DO NOT MESS WITH> JUST GIT CLONE BABY 

## SO SICKKKKKKKKKKKKKKKK


# commit: 0aa7041c9c921d77fddb680d73bb62390d526e83
- going to add company pages content, can always revert back to here
- If i mess this up copy the repo from here



safe at this commit: e7558b5fee2e76fd8be582ce6592dcb2d3e731a8
- before glossary and reduce jobs show on @open-positions


### Original Meta/SEO Stuff

Basehead.astro

---
import "../styles/global.css";
import Metas from "./seo/Metas.astro";
import Favicons from "./seo/Favicons.astro";
const {
  title = "Tustin Recruiting",
  description = "Tustin Recruiting is a boutique recruiting firm specializing in the placement of top talent in Orange County, California.",
  url,
  socialImage = "/social-preview-image.png",
  twitterImage = "/twitter-preview-image.png", // Assuming you have a separate image for Twitter
  author = "Tustin Recruiting",
} = Astro.props;
const sanitizedTitle = title.toLowerCase().replaceAll(" ", "-");
---
<Metas
  title={title}
  description={description.substring(0, 100)}
  url={Astro.site
    ? `${Astro.site}/${sanitizedTitle}`
    : `https://TustinRecruiting.com/${sanitizedTitle}`}
  image={socialImage}
  author={author}
  twitterImage={twitterImage}
/>
<Favicons />
<link
  href="https://api.fontshare.com/v2/css?f[]=jet-brains-mono@1,2&display=swap"
  rel="stylesheet"
/>
<link
  rel="preconnect"
  href="https://rsms.me/"
/>
<link
  rel="stylesheet"
  href="https://rsms.me/inter/inter.css"
/>
<!---- Alpine integrations -->
<script
  defer
  src="https://unpkg.com/@alpinejs/focus@3.10.3/dist/cdn.min.js"
></script>
<script
  defer
  src="https://unpkg.com/alpinejs@3.10.3/dist/cdn.min.js"
></script>
<!---- mailgo -->
<script src="https://unpkg.com/mailgo@0.12.2/dist/mailgo.min.js"></script>



Metas.astro

---
const { title, description, url, socialImage, twitterImage, author } =
  Astro.props;
let subtitle = "Tustin Recruiting";
---
<!--
    Standard meta
 -->
<meta charset="UTF-8" />
<meta name="author" content="Yout name" />
<meta name="theme-color" content="#ffffff" />
<meta name="viewport" content="width=device-width" />
<meta name="msapplication-TileColor" content="#ffffff" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="your keywords" content="Add ypour keywords here" />
<!--
    General meta for Open Graphs
 -->
<meta name="title" content={`${title} - ${subtitle}`} />
<meta name="description" content={description} />
<meta name="author" content={author} />
<!---------------------
    open graph standard
--------------------->
<meta property="og:title" content={`${title} - ${subtitle}`} />
<meta property="og:description" content={description} />
<meta property="og:type" content="website" />
<meta property="og:url" content={url} />
<!---------------------
     open graph Meta
--------------------->
<meta
  property="og:image"
  content={Astro.site ? `${Astro.site}${socialImage}` : socialImage}
/>
<!---------------------
    Open Graph Twitter
 --------------------->

<meta property="og:site_name" content={title} />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:description" content={description} />
<meta
  name="twitter:image"
  content={Astro.site ? `${Astro.site}${twitterImage}` : twitterImage}
/>
<title>{title} - {subtitle}</title>
