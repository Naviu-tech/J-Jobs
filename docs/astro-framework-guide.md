# Astro Framework Guide

This guide explains how JobGuard uses the Astro framework and how to work with Astro-specific features when adding new content or customizing the platform.

## What is Astro?

[Astro](https://astro.build) is a modern web framework designed for building fast, content-focused websites. It's particularly well-suited for job boards and content-heavy sites because it:

- **Ships zero JavaScript by default** - Pages load incredibly fast
- **Component-based architecture** - Reusable UI components
- **Content collections** - Perfect for managing jobs, blog posts, and company profiles
- **SEO-optimized** - Built-in performance and SEO best practices
- **Static site generation** - Pre-renders pages for optimal performance

## Why Astro for JobGuard?

JobGuard leverages Astro's strengths for job board functionality:

- **Performance**: Fast loading job listings improve user experience and SEO rankings
- **Content Management**: Astro's content collections make managing jobs, companies, and blog posts intuitive
- **SEO**: Built-in structured data support for Google Jobs integration
- **Scalability**: Can handle thousands of job listings without performance degradation
- **Developer Experience**: Easy to customize and extend with modern web technologies

## Key Astro Concepts

### Components (.astro files)
Astro components combine HTML, CSS, and JavaScript in a single file:

```astro
---
// Component script (runs at build time)
const { title, company } = Astro.props;
---

<div class="job-card">
  <h3>{title}</h3>
  <p>Company: {company}</p>
</div>

<style>
  .job-card {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 8px;
  }
</style>
```

### Layouts
Layouts define the common structure for pages. JobGuard uses several layouts:

- `BaseLayout.astro` - Core HTML structure
- `JobsLayout.astro` - Job listing pages
- `CompanyLayout.astro` - Company profile pages
- `BlogLayout.astro` - Blog post pages

### Content Collections
Content collections organize markdown files with type safety and automatic processing. JobGuard uses:

- `jobs/` - Job postings with structured frontmatter
- `company/` - Company profiles
- `posts/` - Blog content
- `glossary/` - Industry terminology

### Frontmatter
Frontmatter is structured metadata at the top of markdown files, written in YAML format and enclosed between `---` lines. It's the backbone of JobGuard's content management system.

#### What is Frontmatter?
Frontmatter allows you to add structured data to markdown files that Astro can process programmatically. It consists of:
- **Metadata section** (between `---` lines) - YAML-formatted data
- **Content section** (after the closing `---`) - Regular markdown content

#### Real JobGuard Examples

**Job Posting Frontmatter:**
```yaml
---
position: Assistant Inventory Clerk
description: |
  ## About the Assistant Inventory Clerk
  Handles inventory counts and data entry.
location: 'Glendora'
team: Industrial
datePosted: '2025-01-23T21:52:54.329Z'
validThrough: '2025-02-22T21:52:54.329Z'
employmentType: FULL_TIME
hiringOrganization:
  name: Albertsons
  sameAs: 'https://www.albertsons.com/'
  logo: 'https://example.com/logo.png'
jobLocation:
  streetAddress: 123 Main Street
  addressLocality: Glendora
  addressRegion: CA
  postalCode: '91740'
  addressCountry: USA
baseSalary:
  currency: USD
  value: 30.71
  minValue: 28.46
  maxValue: 32.97
  unitText: YEAR
featured: true
email:
  - will@jakesjobs.com
---

## About the Assistant Inventory Clerk
Handles inventory counts and data entry.
```

**Company Profile Frontmatter:**
```yaml
---
name: "Convergint Technologies"
logo: "https://www.convergint.com/logo.png"
description: "Leading security services provider..."
location: "Schaumburg, IL"
website: "https://convergint.com"
featured: true
---

Company description content goes here...
```

#### How JobGuard Uses Frontmatter

**1. Structured Data Generation**
Frontmatter automatically creates JSON-LD structured data for Google Jobs:
- Job details → Schema.org JobPosting markup
- Company info → Organization structured data
- Location data → Place markup

**2. Content Organization & Filtering**
- `team: Industrial` - Categorize jobs by industry
- `featured: true` - Mark priority content
- `employmentType: FULL_TIME` - Enable job type filtering
- `location: 'Glendora'` - Location-based search

**3. SEO Optimization** 
- `metaTitle`, `metaDescription` - Page-specific SEO
- All frontmatter fields can be used in meta tags
- Automatic URL generation from frontmatter data

**4. Type Safety with Schemas**
JobGuard validates frontmatter using Zod schemas in `config.ts`:

```typescript
const jobsCollection = defineCollection({
  schema: z.object({
    position: z.string(),           // Required string
    description: z.string(),        // Required string  
    location: z.string(),           // Required string
    team: z.string(),              // Required string
    featured: z.boolean().default(false), // Optional, defaults to false
    hiringOrganization: z.object({
      name: z.string(),
      sameAs: z.string(),
      logo: z.string(),
    }),
    // ... more validation rules
  }),
});
```

#### Frontmatter Best Practices

**Data Types:**
```yaml
# Strings (use quotes for special characters)
title: "Senior Warehouse Associate"
location: 'Los Angeles, CA'

# Numbers (no quotes needed)
salary: 25.50
experience_years: 3

# Booleans (true/false)
featured: true
remote_ok: false

# Arrays (list format)
skills:
  - "Warehouse Operations"
  - "Inventory Management"
  - "Forklift Operation"

# Objects (nested data)
company:
  name: "Amazon"
  website: "https://amazon.com"
  size: "Large"

# Dates (ISO format recommended)
datePosted: '2025-01-23T21:52:54.329Z'
validThrough: '2025-02-22T21:52:54.329Z'

# Multi-line strings (using |)
description: |
  This is a multi-line
  job description that
  preserves line breaks.
```

**Common Pitfalls to Avoid:**
- Missing quotes around strings with special characters
- Inconsistent indentation (use 2 spaces)
- Invalid YAML syntax (check with a YAML validator)
- Mismatched schema requirements
- Missing required fields defined in `config.ts`

#### Accessing Frontmatter in Components

In Astro components, frontmatter data is available through `entry.data`:

```astro
---
import { getCollection } from 'astro:content';

const jobs = await getCollection('jobs');
---

{jobs.map(job => (
  <div class="job-card">
    <h3>{job.data.position}</h3>
    <p>{job.data.hiringOrganization.name}</p>
    <p>{job.data.location}</p>
    <p>Salary: ${job.data.baseSalary.value}</p>
    {job.data.featured && <span class="featured-badge">Featured</span>}
  </div>
))}
```

## Project Structure (Astro-Specific)

```
src/
├── components/          # Reusable Astro components
│   ├── jobs/           # Job-related components
│   ├── company/        # Company-related components
│   ├── forms/          # Form components
│   └── global/         # Site-wide components (header, footer)
├── layouts/            # Page layout templates
├── pages/              # File-based routing
│   ├── jobs/
│   │   ├── [...slug].astro    # Dynamic job pages
│   │   └── home.astro         # Jobs listing page
│   ├── company/
│   │   └── [...slug].astro    # Dynamic company pages
│   └── api/            # API endpoints
├── content/            # Content collections
│   ├── jobs/           # Job markdown files
│   ├── company/        # Company markdown files
│   └── config.ts       # Content collection schemas
└── config/             # Site configuration
```

## Adding New Content Types

### 1. Create a Content Collection

Define the collection in `src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';

const newCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    // Add more fields as needed
  }),
});

export const collections = {
  jobs: jobsCollection,
  company: companyCollection,
  newCollection: newCollection, // Add your new collection
};
```

### 2. Create Content Files

Add markdown files in `src/content/newCollection/`:

```markdown
---
title: "Example Entry"
description: "This is an example"
publishDate: 2024-01-01
---

# Content goes here

This is the main content of the entry.
```

### 3. Create Pages to Display Content

Create pages in `src/pages/` to display your content:

```astro
---
// src/pages/newcollection/[...slug].astro
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const entries = await getCollection('newCollection');
  return entries.map(entry => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await entry.render();
---

<BaseLayout title={entry.data.title}>
  <h1>{entry.data.title}</h1>
  <p>{entry.data.description}</p>
  <Content />
</BaseLayout>
```

## Creating New Components

### Basic Component Structure

```astro
---
// src/components/example/ExampleComponent.astro
export interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<div class="example-component">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</div>

<style>
  .example-component {
    /* Component-specific styles */
  }
</style>
```

### Using Components in Pages

```astro
---
// In any .astro file
import ExampleComponent from '../components/example/ExampleComponent.astro';
---

<ExampleComponent 
  title="My Title" 
  description="Optional description" 
/>
```

## Working with Dynamic Routes

JobGuard uses dynamic routing for scalable content:

### File-based Routing Examples

- `pages/jobs/[...slug].astro` - Handles all job URLs (`/jobs/amazon-warehouse-worker`)
- `pages/company/[slug].astro` - Company profile pages (`/company/amazon`)
- `pages/recruiting/[state]/[city]/[role].astro` - Location-based job pages

### Dynamic Route Template

```astro
---
// pages/example/[id].astro
export async function getStaticPaths() {
  // Fetch data and return path parameters
  return [
    { params: { id: 'item-1' }, props: { data: {...} } },
    { params: { id: 'item-2' }, props: { data: {...} } },
  ];
}

const { id } = Astro.params;
const { data } = Astro.props;
---

<h1>Item: {id}</h1>
<!-- Display content -->
```

## SEO and Structured Data

JobGuard implements structured data for Google Jobs integration:

### Adding Structured Data

```astro
---
// In job pages
const jobStructuredData = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": job.data.title,
  "description": job.data.description,
  // ... more job data
};
---

<script type="application/ld+json" set:html={JSON.stringify(jobStructuredData)}></script>
```

### Meta Tags for SEO

```astro
---
// In layout or page head
import BaseHead from '../components/BaseHead.astro';
---

<BaseHead 
  title={`${job.data.title} - ${job.data.company}`}
  description={job.data.description}
  ogImage={job.data.company.logo}
/>
```

## Styling with Tailwind CSS

JobGuard uses Tailwind CSS for styling:

### Component Styling

```astro
<div class="bg-white shadow-md rounded-lg p-6 mb-4">
  <h3 class="text-xl font-semibold text-gray-900">{title}</h3>
  <p class="text-gray-600 mt-2">{description}</p>
</div>
```

### Custom Styles

```astro
<style>
  /* Scoped styles - only apply to this component */
  .custom-style {
    /* Custom CSS when Tailwind isn't sufficient */
  }
</style>
```

## API Routes

Create API endpoints for dynamic functionality:

```javascript
// src/pages/api/example.js
export async function GET({params, request}) {
  const data = await fetchSomeData();
  
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export async function POST({request}) {
  const formData = await request.formData();
  // Process form data
  
  return new Response(JSON.stringify({success: true}), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
```

## Development Workflow

### Running the Development Server

```bash
npm run dev
```

This starts the Astro development server with:
- Hot module replacement
- Error overlay
- Real-time content updates

### Building for Production

```bash
npm run build
```

This generates a static site in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Test the production build locally before deployment.

## Configuration

### Astro Configuration

The `astro.config.mjs` file configures:
- Output mode (static vs server)
- Integrations (Tailwind, etc.)
- Content collection settings
- Build options

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  // Add other configuration options
});
```

## Best Practices

### Performance
- Keep JavaScript minimal - Astro ships zero JS by default
- Use Astro components for static content
- Only add client-side JavaScript when necessary

### Content Organization
- Use descriptive filenames for content
- Maintain consistent frontmatter schemas
- Organize components by feature/section

### SEO
- Include proper meta tags in all pages
- Implement structured data for job postings
- Use semantic HTML structure

## Useful Resources

### Official Documentation
- [Astro Documentation](https://docs.astro.build) - Complete framework guide
- [Content Collections](https://docs.astro.build/en/guides/content-collections/) - Managing content
- [Components](https://docs.astro.build/en/core-concepts/astro-components/) - Building components
- [Routing](https://docs.astro.build/en/core-concepts/routing/) - File-based routing

### JobGuard-Specific Resources
- [Site Configuration Guide](site-configuration.md) - Customizing branding and content
- [Adding Jobs Guide](adding-jobs-manually.md) - Creating job postings
- [Adding Companies Guide](adding-companies.md) - Managing company profiles

### Community Resources
- [Astro Discord](https://astro.build/chat) - Community support
- [Astro GitHub](https://github.com/withastro/astro) - Source code and issues
- [Astro Examples](https://github.com/withastro/astro/tree/main/examples) - Example projects

## Troubleshooting

### Common Issues

**Content not updating?**
- Restart the development server
- Check frontmatter syntax
- Verify content collection schema matches

**Styling not applying?**
- Check Tailwind classes are correct
- Verify scoped styles syntax
- Clear browser cache

**Build failing?**
- Check for TypeScript errors
- Verify all imports are correct
- Review Astro configuration

**Need help?** Check the existing documentation guides or refer to the official Astro documentation for detailed technical information.