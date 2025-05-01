# Manually Adding a New Job Entry

This guide explains how to manually add a new job posting to the J-Jobs platform.

## File Structure

Job entries are stored as markdown files in the `content/jobs/` directory. Each file follows this naming convention:
```
{company-name}-{job-title}-{location}-{unique-id}.md
```

Example: `amazon-warehouse-unloader-brea-amaze6kzpp.md`

## Job Entry Template

Create a new markdown file with the following structure:

```markdown
---
title: "Warehouse Associate"
company: "Amazon"
location: "Brea, CA"
position: "Warehouse Associate"
description: "Join our team as a Warehouse Associate in our Brea facility..."
datePosted: "2024-03-27"
validThrough: "2024-04-27"
employmentType: "FULL_TIME"
hiringOrganization: {
  name: "Amazon",
  sameAs: "https://www.amazon.com",
  logo: "https://example.com/amazon-logo.png"
}
jobLocation: {
  addressLocality: "Brea",
  addressRegion: "CA",
  addressCountry: "US",
  streetAddress: "123 Main St"
}
baseSalary: {
  currency: "USD",
  value: {
    minValue: 18,
    maxValue: 22,
    unitText: "HOUR"
  }
}
qualifications: [
  "High school diploma or equivalent",
  "Ability to lift up to 50 pounds",
  "Previous warehouse experience preferred"
]
responsibilities: [
  "Unload trucks",
  "Sort and organize inventory",
  "Maintain a clean and safe work environment"
]
benefits: [
  "Health insurance",
  "401(k) matching",
  "Paid time off"
]
skills: [
  "Warehouse Operations",
  "Inventory Management",
  "Physical Stamina"
]
---

## About the Role

[Detailed job description goes here...]

## Requirements

[List of requirements goes here...]

## Benefits

[List of benefits goes here...]

## How to Apply

[Application instructions go here...]
```

## Required Fields

1. **Frontmatter Fields** (between `---`):
   - `title`: Job title
   - `company`: Company name
   - `location`: Job location
   - `position`: Position title (usually same as title)
   - `description`: Brief job description
   - `datePosted`: Current date (YYYY-MM-DD)
   - `validThrough`: Expiration date (YYYY-MM-DD)
   - `employmentType`: One of: FULL_TIME, PART_TIME, CONTRACTOR, TEMPORARY
   - `hiringOrganization`: Company details
   - `jobLocation`: Detailed location information
   - `baseSalary`: Salary information
   - `qualifications`: Array of required qualifications
   - `responsibilities`: Array of job responsibilities
   - `benefits`: Array of job benefits
   - `skills`: Array of required skills

2. **Content Sections**:
   - About the Role
   - Requirements
   - Benefits
   - How to Apply

## SEO Optimization

The frontmatter fields are used to generate:
1. Structured data for Google Jobs
2. Meta tags for social sharing
3. SEO-friendly URLs

## Best Practices for File Naming

- Use lowercase letters
- Replace spaces with hyphens
- Include location and unique ID
- Keep filenames concise but descriptive

## Testing

After adding a new job:

1. Run the development server: `npm run dev`
2. Navigate to the job posting page
3. Verify all information displays correctly
