#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { google } = require('googleapis')

// 1. Load your service‑account credentials JSON
const credentials = require(path.join(__dirname, 'config', 'sheets-credentials.json'))

// 2. Your Sheet settings
const SPREADSHEET_ID = '166JIv4epwIesnW9U-cnYcaau7VAOU0kMEzqdUMde6nc'  // from your URL
const SHEET_RANGE    = 'Sheet1!A2:D'                                 // columns: title,slug,description,tags

// 3. Fetch rows from Google Sheets
async function getSheetData() {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })

  const sheets = google.sheets({ version: 'v4', auth })
  const res    = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: SHEET_RANGE,
  })

  const rows = res.data.values || []
  if (!rows.length) {
    console.error('No data found in the sheet.')
    process.exit(1)
  }

  // Map each row into an object
  return rows.map(([title, slug, description, tags]) => ({
    title,
    slug,
    description,
    tags: tags.split(',').map(t => t.trim()),
  }))
}

// 4. Write each row to a Markdown file
async function buildPosts() {
  const posts = await getSheetData()

  // Ensure output folder exists
  const outDir = path.join(__dirname, '..', 'src', 'content', 'jobs')
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  for (const { title, slug, description, tags } of posts) {
    const frontmatter = `---
title: "${title}"
slug: "${slug}"
description: "${description}"
tags: ${JSON.stringify(tags)}
---

`
    const body = `${description}\n`

    const filePath = path.join(outDir, `${slug}.md`)
    fs.writeFileSync(filePath, frontmatter + body)
    console.log(`✅ Written: ${filePath}`)
  }
}

buildPosts().catch(err => {
  console.error('Build failed:', err)
  process.exit(1)
})
