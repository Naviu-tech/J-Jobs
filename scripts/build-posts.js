#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

// 1) Load service-account credentials
const credentials = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'config', 'sheets-credentials.json'), 'utf-8')
);

// 2) Spreadsheet settings
const SPREADSHEET_ID = '166JIv4epwIesnW9U-cnYcaau7VAOU0kMEzqdUMde6nc';
const SHEET_RANGE    = 'Jobs!A1:Y'; // headers in row1, data start row2

// 3) Fetch & map sheet data
async function getSheetData() {
  const auth   = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const res    = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: SHEET_RANGE,
  });

  const rows = res.data.values || [];
  if (rows.length < 2) {
    console.error('No data rows found in sheet!');
    process.exit(1);
  }

  const headers = rows[0].map(h => h.trim());
  return rows.slice(1).map(r => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = r[i] != null ? r[i] : '';
    });
    return {
      position:            obj.position,
      description:         obj.description,
      location:            obj.location,
      team:                obj.team,
      datePosted:          obj.datePosted,
      validThrough:        obj.validThrough,
      employmentType:      obj.employmentType,
      city:                obj.jobLocation_addressLocality,
      state:               obj.jobLocation_addressRegion,
      zipCode:             obj.jobLocation_postalCode,
      salary:              obj.baseSalary_value,
      minSalary:           obj.baseSalary_minValue,
      maxSalary:           obj.baseSalary_maxValue,
      experienceLevel:     obj.experienceRequirements,
      category:            obj.occupationalCategory,
      jobId:               obj.identifier_value || obj.identifier_name,
      featured:            (obj.featured.toLowerCase() === 'true'),
      emailList:           obj.email.split(',').map(e => e.trim()).filter(Boolean),
    };
  });
}

// 4) Template with placeholders (frontmatter only)
const TEMPLATE = `---
position: {{position}}
description: |
{{descriptionBlock}}
location: '{{location}}'
team: {{team}}
datePosted: '{{datePosted}}'
validThrough: '{{validThrough}}'
employmentType: FULL_TIME
hiringOrganization:
  name: Prime Partners
  sameAs: 'https://primepartners.info/'
  logo: >-
    https://primepartners.info/wp-content/uploads/2020/05/cropped-Prime-Partners-Logo-NO-BG-1-1.png
jobLocation:
  streetAddress: 123 Main Street
  addressLocality: {{city}}
  addressRegion: {{state}}
  postalCode: '{{zipCode}}'
  addressCountry: USA
baseSalary:
  currency: USD
  value: {{salary}}
  minValue: {{minSalary}}
  maxValue: {{maxSalary}}
  unitText: YEAR
experienceRequirements: {{experienceLevel}}
occupationalCategory: {{category}}
identifier:
  name: Prime Partners
  value: {{jobId}}
featured: {{featured}}
email:
{{emailLines}}
---
`; // note: we close frontmatter here

// 5) Render frontmatter
function renderFrontmatter(job) {
  let out = TEMPLATE;

  const descLines      = job.description.split(/\r?\n/);
  const descriptionBlock = descLines.map(l => `  ${l}`).join('\n');
  const emailLines     = job.emailList.map(e => `  - ${e}`).join('\n');
  const replacements   = {
    '{{position}}':        job.position,
    '{{location}}':        job.location,
    '{{team}}':            job.team,
    '{{datePosted}}':      job.datePosted,
    '{{validThrough}}':    job.validThrough,
    '{{city}}':            job.city,
    '{{state}}':           job.state,
    '{{zipCode}}':         job.zipCode,
    '{{salary}}':          job.salary,
    '{{minSalary}}':       job.minSalary,
    '{{maxSalary}}':       job.maxSalary,
    '{{experienceLevel}}': job.experienceLevel,
    '{{category}}':        job.category,
    '{{jobId}}':           job.jobId,
    '{{featured}}':        job.featured ? 'true' : 'false',
    '{{descriptionBlock}}': descriptionBlock,
    '{{emailLines}}':      emailLines,
  };

  for (const [key, val] of Object.entries(replacements)) {
    out = out.replace(new RegExp(key, 'g'), val);
  }

  return out;
}

// 6) Build all posts
async function buildPosts() {
  const jobs = await getSheetData();
  const outDir = path.join(__dirname, '..', 'src', 'content', 'jobs');
  fs.mkdirSync(outDir, { recursive: true });

  for (const job of jobs) {
    // 1) Render frontmatter
    const frontmatter = renderFrontmatter(job);
    // 2) Append Markdown body of the description
    const body = `\n${job.description.trim()}\n`;
    // 3) Write file
    const fname = job.jobId.replace(/[^a-zA-Z0-9_-]/g, '');
    fs.writeFileSync(path.join(outDir, `${fname}.md`), frontmatter + body);
    console.log(`✅ Written: ${fname}.md`);
  }
}

buildPosts().catch(err => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
