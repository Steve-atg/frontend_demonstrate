#!/usr/bin/env node

/**
 * API Client Generator Script
 *
 * This script generates TypeScript API client from OpenAPI/Swagger specifications
 * Supports multiple environments and configuration options
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  local: {
    url: 'http://localhost:8000/api/json',
    description: 'Local development server',
  },
  staging: {
    url: 'https://staging-api.your-domain.com/api/json',
    description: 'Staging environment',
  },
  production: {
    url: 'https://api.your-domain.com/api/json',
    description: 'Production environment',
  },
};

const OUTPUT_DIR = 'src/api/generated';
const OUTPUT_FILE = 'api.ts';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, colors.green);
}

function logError(message) {
  log(`❌ ${message}`, colors.red);
}

function logInfo(message) {
  log(`ℹ️  ${message}`, colors.blue);
}

function logWarning(message) {
  log(`⚠️  ${message}`, colors.yellow);
}

function showHelp() {
  log('\n📋 API Client Generator', colors.bright);
  log('='.repeat(50), colors.cyan);

  log('\nUsage:', colors.bright);
  log('  node scripts/generate-api.js [environment] [options]');

  log('\nEnvironments:', colors.bright);
  Object.entries(CONFIG).forEach(([env, config]) => {
    log(`  ${env.padEnd(12)} - ${config.description} (${config.url})`);
  });

  log('\nOptions:', colors.bright);
  log('  --file <path>   Generate from local file instead of URL');
  log('  --url <url>     Generate from custom URL');
  log('  --clean         Clean output directory before generation');
  log('  --help          Show this help message');

  log('\nExamples:', colors.bright);
  log('  node scripts/generate-api.js local');
  log('  node scripts/generate-api.js production --clean');
  log(
    '  node scripts/generate-api.js --url http://custom-api.com/swagger.json'
  );
  log('  node scripts/generate-api.js --file ./swagger.json');

  log('');
}

function cleanOutputDirectory() {
  try {
    if (fs.existsSync(OUTPUT_DIR)) {
      fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
      logInfo(`Cleaned output directory: ${OUTPUT_DIR}`);
    }
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    logInfo(`Created output directory: ${OUTPUT_DIR}`);
  } catch (error) {
    logError(`Failed to clean output directory: ${error.message}`);
    process.exit(1);
  }
}

function generateApiClient(source, sourceType = 'url') {
  try {
    logInfo(`Generating API client from ${sourceType}: ${source}`);

    const sourceFlag = sourceType === 'file' ? '--input' : '--path';

    const command = [
      'npx swagger-typescript-api generate',
      `${sourceFlag} ${source}`,
      `--output ${OUTPUT_DIR}`,
      `--name ${OUTPUT_FILE}`,
      '--axios',
      '--modular',
      '--route-types',
      '--sort-types',
      '--sort-routes',
    ].join(' ');

    logInfo('Running command:');
    log(`  ${command}`, colors.cyan);
    log('');

    execSync(command, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });

    logSuccess('API client generated successfully!');
  } catch (error) {
    logError(`Failed to generate API client: ${error.message}`);
    process.exit(1);
  }
}

function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function validateFile(filePath) {
  return fs.existsSync(filePath);
}

function postGeneration() {
  logInfo('Running post-generation tasks...');

  // Check if generated files exist
  const generatedFiles = [
    'data-contracts.ts',
    'http-client.ts',
    'Auth.ts',
    'Users.ts',
    'Transactions.ts',
    'Health.ts',
  ];

  const missingFiles = generatedFiles.filter(
    file => !fs.existsSync(path.join(OUTPUT_DIR, file))
  );

  if (missingFiles.length > 0) {
    logWarning(
      `Some expected files were not generated: ${missingFiles.join(', ')}`
    );
  }

  // Count generated files
  const files = fs.readdirSync(OUTPUT_DIR);
  logSuccess(`Generated ${files.length} files in ${OUTPUT_DIR}/`);

  // List generated files
  logInfo('Generated files:');
  files.forEach(file => {
    log(`  📄 ${file}`, colors.cyan);
  });

  log('');
  logSuccess('🎉 API client generation completed!');
  logInfo('You can now use the generated client in your application.');
  logInfo('Import from: @/api/generated/...');
}

function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  log('\n🚀 Starting API Client Generation...', colors.bright);
  log('='.repeat(50), colors.cyan);

  let source = null;
  let sourceType = 'url';
  let shouldClean = false;

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--clean') {
      shouldClean = true;
    } else if (arg === '--file') {
      const filePath = args[++i];
      if (!filePath) {
        logError('--file option requires a file path');
        process.exit(1);
      }
      if (!validateFile(filePath)) {
        logError(`File not found: ${filePath}`);
        process.exit(1);
      }
      source = filePath;
      sourceType = 'file';
    } else if (arg === '--url') {
      const url = args[++i];
      if (!url) {
        logError('--url option requires a URL');
        process.exit(1);
      }
      if (!validateUrl(url)) {
        logError(`Invalid URL: ${url}`);
        process.exit(1);
      }
      source = url;
      sourceType = 'url';
    } else if (!arg.startsWith('--')) {
      // Environment name
      if (CONFIG[arg]) {
        source = CONFIG[arg].url;
        sourceType = 'url';
        logInfo(`Using ${arg} environment: ${CONFIG[arg].description}`);
      } else {
        logError(`Unknown environment: ${arg}`);
        logInfo('Available environments: ' + Object.keys(CONFIG).join(', '));
        process.exit(1);
      }
    }
  }

  // Default to local if no source specified
  if (!source) {
    source = CONFIG.local.url;
    sourceType = 'url';
    logInfo('No environment specified, using local development server');
  }

  // Clean output directory if requested
  if (shouldClean) {
    cleanOutputDirectory();
  }

  // Generate API client
  generateApiClient(source, sourceType);

  // Post-generation tasks
  postGeneration();
}

// Run the script
main();
