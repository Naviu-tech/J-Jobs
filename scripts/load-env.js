#!/usr/bin/env node

/**
 * Simple script to load environment variables from .env file
 * Usage: node scripts/load-env.js node scripts/build-posts.js
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Paths to check for .env files
const envPaths = [
  path.join(__dirname, 'config', '.env'),
  path.join(__dirname, '..', '.env')
];

// Load environment variables from .env file
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return false;
  }

  console.log(`Loading environment variables from ${filePath}`);
  const envContent = fs.readFileSync(filePath, 'utf-8');
  const envLines = envContent.split('\n');

  for (const line of envLines) {
    const trimmedLine = line.trim();
    // Skip comments and empty lines
    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }

    // Parse KEY=VALUE format
    const match = trimmedLine.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      
      // Remove surrounding quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.substring(1, value.length - 1);
      }
      
      process.env[key] = value;
    }
  }
  
  return true;
}

// Try to load from any available .env file
let envLoaded = false;
for (const envPath of envPaths) {
  if (loadEnvFile(envPath)) {
    envLoaded = true;
    break;
  }
}

if (!envLoaded) {
  console.warn('No .env file found. Using existing environment variables.');
}

// Execute the command with the loaded environment variables
if (process.argv.length <= 2) {
  console.error('Usage: node load-env.js <command> [args...]');
  process.exit(1);
}

const command = process.argv[2];
const args = process.argv.slice(3);

const child = spawn(command, args, {
  stdio: 'inherit',
  env: process.env,
  shell: true
});

child.on('exit', (code) => {
  process.exit(code);
});
