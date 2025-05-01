# Adding a New Company/Employer

This guide explains how to add a new company or employer to the J-Jobs platform. Companies are used both for job listings and company profile pages.

## File Structure

Company entries are stored as markdown files in the `content/company/` directory. Each file should follow this naming convention:
```
{company-name-lowercase}.md
```

Example: `premier-electric.md`

## Company Entry Template

Create a new markdown file with the following structure:

```markdown
---
name: "Premier Electric"
logo: "/images/companies/premier-electric-logo.png"  # Can be local path or external URL
description: "Premier Electric is a leading electrical contractor specializing in commercial and industrial installations..."
location: "Costa Mesa, CA"
website: "https://www.premierelectric.com"
featured: false
---

## About Premier Electric

[Detailed company description goes here...]

## Why Work With Us

[Company benefits and culture information...]

## Our Projects

[Notable projects and achievements...]

## Contact Information

[Company contact details...]
```

## Required Fields

1. **Frontmatter Fields** (between `---`):
   - `name`: Full company name (used for display and job matching)
   - `logo`: Path to company logo (can be local path or external URL)
   - `description`: Brief company overview (used for SEO and previews)
   - `location`: Main company location
   - `website`: Company website URL (must be a valid URL)
   - `featured`: Boolean to mark as featured company (optional, defaults to false)

2. **Content Sections**:
   - About the Company
   - Why Work With Us
   - Our Projects
   - Contact Information

## Image Management

You can handle company logos in two ways:

1. **Local Images**:
   - Store images in `public/images/companies/`
   - Reference using relative path: `/images/companies/company-name-logo.png`
   - Benefits:
     - Version controlled with codebase
     - Guaranteed availability
     - Faster loading from same domain
   - Considerations:
     - Must be included in deployment
     - Increases repository size
     - Manual optimization required

2. **External URLs**:
   - Use full URLs from company websites or CDNs
   - Example: `https://company-cdn.com/logo.png`
   - Benefits:
     - No local storage needed
     - Often pre-optimized
     - Can be updated without code changes
   - Considerations:
     - Dependent on external availability
     - Potential for broken links
     - Cross-origin loading

### Image Requirements

Regardless of storage method:
- Preferred format: PNG with transparency

### Best Practices for Local Image file naming

   - Use lowercase letters
   - Replace spaces with hyphens
   - use company name to make it easy to identify
   - Example: `premier-electric-logo.png`
   
## Company Schema

The company information is used to generate:
1. Company profile pages
2. Job listing company details
3. Structured data for SEO
4. Company listings in search results

## Integration with Jobs

When creating job listings, use the exact company name as defined in the company profile. This ensures:
1. Proper linking between jobs and company profile
2. Consistent branding across the platform
3. Accurate job filtering by company
4. Correct company information display on job listings

Example job frontmatter reference:
```yaml
hiringOrganization: {
  name: "Premier Electric",
  sameAs: "https://www.premierelectric.com",
  logo: "/images/companies/premier-electric-logo.png"  # Use same path as company profile
}
```

## Testing

After adding a new company:

1. Verify the company profile page:
   - Run development server: `npm run dev`
   - Navigate to `/company/[company-slug]`
   - Check all information displays correctly
   - Verify logo loading and appearance
   - Test website links

2. Create a test job listing:
   - Use the company details in a job posting
   - Verify company information appears correctly
   - Check links to company profile
   - Ensure logo displays consistently

3. Validate structured data:
   - Use browser dev tools
   - Check Schema.org markup
   - Verify all required fields
   - Confirm image URLs are absolute
