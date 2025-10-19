# API Client Generation Scripts

This directory contains scripts to automatically generate TypeScript API clients from OpenAPI/Swagger specifications.

## 📁 Available Scripts

### 1. Node.js Script (`generate-api.js`)

Advanced script with multiple options and environment support.

### 2. Bash Script (`generate-api.sh`)

Simple shell script for Unix-based systems.

### 3. NPM Scripts

Convenient npm commands for common use cases.

## 🚀 Quick Start

### Using NPM Scripts (Recommended)

```bash
# Generate from local development server
npm run api:generate

# Generate from production API
npm run api:generate:prod

# Generate from staging API
npm run api:generate:staging

# Clean output directory and regenerate
npm run api:generate:clean

# Show help
npm run api:generate:help
```

### Using Node.js Script Directly

```bash
# Basic usage
node scripts/generate-api.js local

# With custom URL
node scripts/generate-api.js --url https://custom-api.com/swagger.json

# From local file
node scripts/generate-api.js --file ./swagger.json

# Clean before generation
node scripts/generate-api.js production --clean
```

### Using Bash Script

```bash
# Basic usage
./scripts/generate-api.sh local

# With clean
./scripts/generate-api.sh production --clean

# Show help
./scripts/generate-api.sh --help
```

## ⚙️ Configuration

### Environment URLs

Update the URLs in `scripts/generate-api.js`:

```javascript
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
```

### Output Configuration

The generated files will be placed in:

- **Directory**: `src/api/generated/`
- **Main file**: `api.ts`

### Generation Options

The scripts use these swagger-typescript-api options:

- `--axios`: Use Axios as HTTP client
- `--modular`: Generate modular code structure
- `--route-types`: Generate route types
- `--sort-types`: Sort type definitions
- `--sort-routes`: Sort route definitions

## 📋 Available NPM Scripts

| Command                        | Description                            |
| ------------------------------ | -------------------------------------- |
| `npm run api:generate`         | Generate from local development server |
| `npm run api:generate:prod`    | Generate from production API           |
| `npm run api:generate:staging` | Generate from staging API              |
| `npm run api:generate:clean`   | Clean output directory and regenerate  |
| `npm run api:generate:help`    | Show script help                       |
| `npm run api:clean`            | Clean output directory only            |

## 🔧 Advanced Usage

### Custom URL Generation

```bash
node scripts/generate-api.js --url https://petstore.swagger.io/v2/swagger.json
```

### Local File Generation

```bash
node scripts/generate-api.js --file ./api-specs/swagger.json
```

### Multiple Environment Setup

You can add more environments by updating the CONFIG object:

```javascript
const CONFIG = {
  local: { url: 'http://localhost:8000/api/json' },
  dev: { url: 'https://dev-api.company.com/api/json' },
  staging: { url: 'https://staging-api.company.com/api/json' },
  production: { url: 'https://api.company.com/api/json' },
};
```

Then use:

```bash
npm run api:generate dev
```

## 🛠️ Troubleshooting

### Common Issues

1. **Network Error**: Make sure your API server is running and accessible
2. **Permission Denied**: Make scripts executable with `chmod +x scripts/*.{js,sh}`
3. **Invalid JSON**: Verify your OpenAPI spec is valid JSON/YAML

### Debug Mode

For detailed output, run the script directly:

```bash
node scripts/generate-api.js local --clean
```

### Validation

After generation, the script will:

- Count generated files
- List all created files
- Verify expected files exist

## 📝 Generated Files Structure

```
src/api/generated/
├── data-contracts.ts    # TypeScript interfaces and types
├── http-client.ts       # Base HTTP client configuration
├── Auth.ts             # Authentication endpoints
├── Users.ts            # User management endpoints
├── Transactions.ts     # Transaction endpoints
├── Health.ts           # Health check endpoints
└── [Other].ts          # Additional endpoint groups
```

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Generate API Client

on:
  workflow_dispatch:
  schedule:
    - cron: '0 2 * * *' # Daily at 2 AM

jobs:
  generate-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run api:generate:prod
      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v4
        with:
          title: 'Update API Client'
          body: 'Auto-generated API client update'
```

### Pre-commit Hook

Add to `.husky/pre-commit`:

```bash
#!/bin/sh
npm run api:generate:clean
git add src/api/generated/
```

## 🚦 Best Practices

1. **Version Control**: Commit generated files to track API changes
2. **Environment Separation**: Use different environments for different stages
3. **Regular Updates**: Regenerate when API changes
4. **Clean Generation**: Use `--clean` flag for fresh generation
5. **Validation**: Always test generated client after updates

## 📊 Monitoring Changes

To track API changes between generations:

```bash
# Before generation
git status src/api/generated/

# After generation
git diff src/api/generated/
```

This helps identify breaking changes in your API.
