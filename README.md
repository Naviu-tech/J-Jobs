# JobGuard - Job Board Platform

A modern job board platform built with Astro, focusing on warehouse and electrical industry jobs. The platform features automated content management, SEO optimization, and Google Jobs integration through structured data.

## 🚀 Key Features

- **Content Management**
  - Automated job posting generation and updates
  - Content collections for jobs, blog posts, recruiting content, and info pages
  - Structured data implementation for Google Jobs indexing
  - Location-based job categorization

- **Automation & Integration**
  - Job description updates using OpenAI
  - Google Sheets integration for job data import
  - GitHub Actions workflow automation

- **SEO & Performance**
  - JSON-LD structured data for job postings
  - Optimized meta tags and social sharing
  - Static site generation for optimal performance
  - Automated sitemap generation

## 🚀 Getting Started

### Quick Setup
1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd jobguard
   npm install
   ```

2. **Configure Site Settings**
   - Follow the [Site Configuration Guide](docs/site-configuration.md) to customize branding, colors, and content
   - Update site name, logo, and social links

3. **Set Up Automation** (Optional)
   - Configure Google Sheets integration: [GitHub Actions Setup](docs/github-actions-setup.md)
   - Set up automated job imports and updates

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

### Environment Setup

For full functionality, you'll need:
- Node.js 18+ 
- Google Sheets API credentials (for automated job imports)
- GitHub repository with Actions enabled (for deployment)


## 📖 Usage Guide

### For Site Operators

**Initial Setup:**
1. Customize your site using the [Site Configuration Guide](docs/site-configuration.md)
2. Add your first jobs manually following the [Adding Jobs Guide](docs/adding-jobs-manually.md)
3. Set up company profiles with the [Adding Companies Guide](docs/adding-companies.md)

**Daily Operations:**
- Import jobs from Google Sheets: `npm run import:jobs`
- Monitor job expiration dates and update content
- Review and approve automated content updates

**Content Management:**
- Jobs are stored as markdown files in `content/jobs/`
- Blog posts and recruiting content in respective directories
- All content supports frontmatter for SEO and structured data

### For Developers

**Key Directories:**
- `src/components/` - Reusable Astro components
- `src/layouts/` - Page layout templates
- `src/pages/` - Route definitions and page components
- `content/` - Content collections (jobs, posts, etc.)
- `scripts/` - Automation and utility scripts

**Development Workflow:**
1. Make changes to components or content
2. Test locally with `npm run dev`
3. Build and deploy with `npm run build`

## 📁 Project Structure

```
├── content/
│   ├── jobs/         # Job posting markdown files
│   ├── posts/        # Blog post content
│   ├── company/      # Company profile pages
│   ├── recruiting/   # Recruiting-related content
│   └── infopages/    # Information pages (privacy, terms, etc.)
├── scripts/
│   ├── update-*.js   # Content update automation
│   ├── create-*.js   # Content generation scripts
│   └── notify-*.js   # Notification system scripts
├── src/
│   ├── components/   # Reusable Astro components
│   ├── layouts/      # Page layouts and templates
│   ├── pages/        # Route definitions
│   └── config/       # Site configuration files
└── docs/             # Extended documentation
```

## 📚 Documentation

### Setup & Configuration
- **[Site Configuration Guide](docs/site-configuration.md)** - Complete guide to customizing branding, colors, text, and forms
- **[GitHub Actions Setup](docs/github-actions-setup.md)** - Automated workflow configuration for job imports

### Content Management  
- **[Adding Jobs Manually](docs/adding-jobs-manually.md)** - Step-by-step guide for creating job postings
- **[Adding Companies](docs/adding-companies.md)** - How to create and manage company profiles
- **[About Page Editing Guide](docs/about-page-editing-guide.md)** - Customizing your about page content

### Advanced Features
- **Automation Scripts** - Run via `npm run` commands (see Content Management Scripts section)
- **SEO Implementation** - Structured data and meta tag optimization built-in
- **Content Collections** - Astro-powered content management system

### Framework & Development
- **[Astro Framework Guide](docs/astro-framework-guide.md)** - Complete guide to working with Astro, adding content types, and customizing components

## 🔄 Content Updates

The platform supports multiple content update methods:

**1. Automated Updates**
- Google Sheets integration for bulk job imports
- Scheduled content refresh via GitHub Actions
- AI-powered job description generation

**2. Manual Updates**
- Direct editing of markdown files in content directories
- Git-based workflow for content changes
- Real-time preview in development mode

**3. Bulk Operations**
- Update job categories: `npm run update-category-values`
- Update job dates: `npm run update-dates` or `npm run update-recent-dates`
- Update company information: `npm run update-company-names`
- Content migration and cleanup utilities
- Batch processing for large datasets

## 🛠 Development

### Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run astro        # Run Astro CLI commands
```

### Content Management Scripts

```bash
# Job Management
npm run import:jobs              # Import jobs from Google Sheets (primary)
npm run index-jobs               # Index and organize job listings
npm run create-jobs              # Generate new job postings
npm run create-varied-jobs       # Create job variations
npm run update-dates             # Update job posting dates
npm run update-recent-dates      # Update recent job dates

# Content Generation
npm run create-blog-posts        # Generate blog content
npm run create:recruiting        # Create recruiting content
npm run create-glossary          # Generate glossary entries
npm run update-state             # Generate location-specific content

# Notifications & Updates
npm run notify-content-updates   # Send content update notifications
npm run notify-updated           # Notify about updated jobs
npm run notify-deleted           # Notify about deleted jobs

# Company & Data Management
npm run update-company-names     # Update company information
npm run update-category-values   # Update job categories
npm run update-team-values       # Update team assignments
npm run list-jobs                # List current job postings
npm run count-new                # Count new files
npm run count-locations          # Count jobs by location
```

### Automation Scripts

Run these scripts using npm commands:

```bash
npm run import:jobs              # Import jobs from Google Sheets
npm run index-jobs               # Index and organize job listings
npm run update-dates             # Update job posting dates
npm run create-jobs              # Generate new job postings
npm run notify-content-updates   # Send content update notifications
npm run update-state             # Generate location-specific content
npm run create-blog-posts        # Generate blog content
npm run update-company-names     # Update company information
```

**Key Scripts:**
- `import:jobs` - Primary job import from Google Sheets
- `index-jobs` - Job indexing and organization
- `notify-content-updates` - Stakeholder notification system
- `update-state` - Location-specific content generation

## 🔍 SEO Features

- **Structured Data**: JSON-LD implementation for Google Jobs
- **Meta Tags**: Optimized for social sharing and search engines
- **Sitemap**: Automatically generated and updated
- **Performance**: Static generation for optimal Core Web Vitals
- **Accessibility**: WCAG compliant components and markup

## 🚀 Deployment

The platform is optimized for static hosting providers:
- **Netlify**: Automatic deployments from Git
- **Vercel**: Zero-config deployment with Git integration  
- **GitHub Pages**: Static hosting with Actions workflow
- **Any Static Host**: Standard HTML/CSS/JS output

---

**Need Help?** 
- Check the [documentation](docs/) directory for detailed guides
- Run `npm run` to see all available scripts
- Review the Content Management Scripts section above for automation options
