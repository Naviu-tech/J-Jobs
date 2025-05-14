# Google Sheets Credentials Setup

This directory contains configuration files for accessing Google Sheets API. The sensitive credentials file has been removed from Git history to prevent exposure of private keys.

## Setting Up Credentials

You have three options for providing Google Sheets credentials:

### Option 1: Environment Variable (JSON String)

Set the `GOOGLE_SHEETS_CREDENTIALS` environment variable with the entire JSON content of your service account key:

```bash
# Example (Linux/macOS)
export GOOGLE_SHEETS_CREDENTIALS='{"type":"service_account","project_id":"your-project-id",...}'

# Example (Windows CMD)
set GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"your-project-id",...}

# Example (Windows PowerShell)
$env:GOOGLE_SHEETS_CREDENTIALS='{"type":"service_account","project_id":"your-project-id",...}'
```

### Option 2: Individual Environment Variables

Set individual environment variables for each credential field:

```bash
# Required fields
GOOGLE_SHEETS_TYPE=service_account
GOOGLE_SHEETS_PROJECT_ID=your-project-id
GOOGLE_SHEETS_PRIVATE_KEY_ID=your-private-key-id
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@your-project-id.iam.gserviceaccount.com
GOOGLE_SHEETS_CLIENT_ID=your-client-id

# Optional fields (defaults will be used if not provided)
GOOGLE_SHEETS_AUTH_URI=https://accounts.google.com/o/oauth2/auth
GOOGLE_SHEETS_TOKEN_URI=https://oauth2.googleapis.com/token
GOOGLE_SHEETS_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
GOOGLE_SHEETS_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project-id.iam.gserviceaccount.com
GOOGLE_SHEETS_UNIVERSE_DOMAIN=googleapis.com
```

### Option 3: Local JSON File (Not Recommended for Production)

1. Copy `sheets-credentials.template.json` to `sheets-credentials.json`
2. Fill in your actual service account credentials
3. Ensure this file is in your `.gitignore` (it already should be)

```bash
cp sheets-credentials.template.json sheets-credentials.json
# Edit sheets-credentials.json with your actual credentials
```

## Using Environment Variables with the Helper Script

For local development, you can use the provided helper script to load environment variables from a `.env` file:

1. Create a `.env` file in the `scripts/config` directory using the `.env.example` template:
   ```bash
   cp scripts/config/.env.example scripts/config/.env
   # Edit .env with your actual credentials
   ```

2. Run your script using the helper:
   ```bash
   # On Linux/macOS
   node scripts/load-env.js node scripts/build-posts.js
   
   # On Windows
   node scripts\load-env.js node scripts\build-posts.js
   ```

This will load the environment variables from your `.env` file before running the script.

## Security Best Practices

1. **Never commit credentials** to your Git repository
2. For local development, use a local `.env` file with environment variables
3. For production, use your hosting platform's secure environment variable storage
4. Regularly rotate your service account keys
5. Use the principle of least privilege when creating service accounts

## Obtaining Google Sheets Credentials

If you need to create new credentials:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable the Google Sheets API
4. Create a service account
5. Create a key for the service account (JSON format)
6. Share your Google Sheet with the service account email address
