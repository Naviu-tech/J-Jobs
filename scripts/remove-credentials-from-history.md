# Removing Sensitive Credentials from Git History

This guide will help you remove the sensitive Google Cloud Service Account key file (`scripts/config/sheets-credentials.json`) from your Git history.

## Option 1: Using BFG Repo-Cleaner (Recommended)

BFG is a simpler, faster alternative to `git filter-branch` specifically designed for removing unwanted files from Git history.

### Step 1: Install BFG

Download the latest version of BFG from: https://rtyley.github.io/bfg-repo-cleaner/

```bash
# Example for Linux/macOS
curl -o bfg.jar https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar
```

### Step 2: Create a fresh clone of your repository (mirror)

```bash
git clone --mirror git@github.com:yourusername/your-repo.git repo-mirror.git
```

### Step 3: Run BFG to remove the sensitive file

```bash
java -jar bfg.jar --delete-files sheets-credentials.json repo-mirror.git
```

### Step 4: Clean up and update references

```bash
cd repo-mirror.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

### Step 5: Push the changes to GitHub

```bash
git push
```

### Step 6: Update your local repository

```bash
cd ..
rm -rf repo-mirror.git
git pull
```

## Option 2: Using git filter-branch

If you can't use BFG for some reason, you can use `git filter-branch` instead.

```bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch scripts/config/sheets-credentials.json" \
  --prune-empty --tag-name-filter cat -- --all
```

Then force-push to update the remote repository:

```bash
git push origin --force --all
git push origin --force --tags
```

## Verify the Removal

After completing either method, verify that the sensitive file has been removed from your Git history:

```bash
git log --all --full-history -- scripts/config/sheets-credentials.json
```

This command should return no results if the file has been successfully removed from the history.

## Important Notes

1. **Force pushing** will rewrite history on the remote repository. Make sure all team members are aware of this change.
2. Anyone with a clone of the repository will need to re-clone or perform specific steps to sync with the updated history.
3. If the repository is public, consider the sensitive information as compromised and rotate your credentials.
4. GitHub may still cache the sensitive file for a period of time after you've removed it from history.

## Next Steps

1. Ensure the sensitive file is added to `.gitignore` to prevent it from being accidentally committed again.
2. Follow the instructions in `scripts/config/README.md` to set up your credentials securely.
3. Consider rotating your Google Cloud Service Account key as a precaution.
