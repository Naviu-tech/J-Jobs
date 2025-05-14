# Credentials Security Changes

## Summary of Changes Made

We've implemented several changes to improve the security of your Google Cloud Service Account credentials:

1. **Modified `build-posts.js` to support multiple credential sources**:
   - Now supports loading credentials from environment variables (preferred method)
   - Falls back to the local JSON file if environment variables aren't available
   - Provides clear error messages if credentials aren't found

2. **Created template and example files**:
   - `scripts/config/sheets-credentials.template.json`: A template for the credentials file with placeholder values
   - `scripts/config/.env.example`: An example .env file for setting up environment variables

3. **Added helper utilities**:
   - `scripts/load-env.js`: A script to load environment variables from a .env file before running other scripts

4. **Updated documentation**:
   - `scripts/config/README.md`: Detailed instructions on setting up credentials securely
   - `scripts/remove-credentials-from-history.md`: Guide for removing sensitive files from Git history

5. **Updated `.gitignore`**:
   - Explicitly added `scripts/config/sheets-credentials.json` to ensure it's not committed again

## Next Steps

To complete the process of securing your credentials, you should:

1. **Remove the sensitive file from Git history**:
   - Follow the instructions in `scripts/remove-credentials-from-history.md`
   - Use BFG Repo-Cleaner (recommended) or git filter-branch to remove the file from history
   - Force push the changes to GitHub

2. **Set up your credentials securely**:
   - Choose one of the methods described in `scripts/config/README.md`:
     - Environment variables (recommended for production)
     - Local .env file (recommended for development)
     - Local JSON file (simplest but least secure)

3. **Consider rotating your credentials**:
   - If the repository was public or you suspect the credentials might have been exposed
   - Create a new service account key in the Google Cloud Console
   - Update your local credentials with the new key

## Testing Your Changes

After setting up your credentials using one of the methods above, you can test that everything works correctly:

```bash
# If using environment variables directly
node scripts/build-posts.js

# If using a .env file
node scripts/load-env.js node scripts/build-posts.js
```

## Security Best Practices Going Forward

1. **Never commit credentials** to your Git repository
2. Use environment variables for sensitive information
3. Include template files with placeholders instead of actual credentials
4. Regularly audit your repository for sensitive information
5. Consider using a pre-commit hook to prevent accidental commits of sensitive files
