# GitHub Actions Workflow for Job Updates

This document explains how to set up the GitHub Actions workflow that automatically updates job listings from Google Sheets.

## Overview

The workflow:
1. Is triggered manually via GitHub's workflow_dispatch event
2. Uses GitHub Secrets to securely store Google Sheets API credentials
3. Runs the job import script to fetch data from Google Sheets
4. Commits and pushes any changes to the main branch

## Setting Up GitHub Secrets

You need to add the following secrets to your GitHub repository:

1. Go to your repository on GitHub
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Click on "New repository secret"
4. Add each of the following secrets:

| Secret Name | Description | Value |
|-------------|-------------|-------|
| `GOOGLE_SHEETS_TYPE` | Service account type | `service_account` |
| `GOOGLE_SHEETS_PROJECT_ID` | Google Cloud project ID | Your project ID (e.g., `blog-sheet-api-459013`) |
| `GOOGLE_SHEETS_PRIVATE_KEY_ID` | Private key ID | Your private key ID |
| `GOOGLE_SHEETS_PRIVATE_KEY` | Private key | Your private key (see note below) |
| `GOOGLE_SHEETS_CLIENT_EMAIL` | Service account email | Your service account email |
| `GOOGLE_SHEETS_CLIENT_ID` | Client ID | Your client ID |

### Important Note About Private Key

The private key contains newlines which need special handling in GitHub Secrets:

1. When adding the `GOOGLE_SHEETS_PRIVATE_KEY` secret, make sure to replace all literal newlines with `\n` characters
2. Do NOT add quotes around the key
3. The key should start with `-----BEGIN PRIVATE KEY-----\n` and end with `\n-----END PRIVATE KEY-----\n`

## Running the Workflow

To run the workflow:

1. Go to your repository on GitHub
2. Click on the "Actions" tab
3. Select "Update Jobs from Google Sheets" from the workflows list
4. Click on "Run workflow"
5. Confirm by clicking the green "Run workflow" button

## Workflow Details

The workflow performs these steps:

1. Checks out the repository
2. Sets up Node.js
3. Installs dependencies
4. Runs the import:jobs script with the Google Sheets credentials
5. Commits and pushes any changes to the main branch

The workflow will only commit and push if there are actual changes to the job files.
