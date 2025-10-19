#!/bin/bash

# API Client Generator Script (Bash version)
# Simple script to generate TypeScript API client from OpenAPI specifications

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
LOCAL_URL="http://localhost:8000/api/json"
STAGING_URL="https://staging-api.your-domain.com/api/json"
PRODUCTION_URL="https://api.your-domain.com/api/json"
OUTPUT_DIR="src/api/generated"
OUTPUT_FILE="api.ts"

# Helper functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

show_help() {
    echo -e "${CYAN}📋 API Client Generator${NC}"
    echo "=================================="
    echo ""
    echo "Usage: $0 [environment] [options]"
    echo ""
    echo "Environments:"
    echo "  local      - Local development server ($LOCAL_URL)"
    echo "  staging    - Staging environment ($STAGING_URL)"
    echo "  production - Production environment ($PRODUCTION_URL)"
    echo ""
    echo "Options:"
    echo "  --clean    - Clean output directory before generation"
    echo "  --help     - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 local"
    echo "  $0 production --clean"
    echo ""
}

clean_output() {
    if [ -d "$OUTPUT_DIR" ]; then
        log_info "Cleaning output directory: $OUTPUT_DIR"
        rm -rf "$OUTPUT_DIR"
    fi
    mkdir -p "$OUTPUT_DIR"
    log_info "Created output directory: $OUTPUT_DIR"
}

generate_client() {
    local source_url=$1
    
    log_info "Generating API client from: $source_url"
    
    # Check if swagger-typescript-api is available
    if ! command -v npx &> /dev/null; then
        log_error "npx is not available. Please install Node.js and npm."
        exit 1
    fi
    
    # Generate the client
    log_info "Running swagger-typescript-api..."
    npx swagger-typescript-api generate \
        --path "$source_url" \
        --output "$OUTPUT_DIR" \
        --name "$OUTPUT_FILE" \
        --axios \
        --modular \
        --route-types \
        --sort-types \
        --sort-routes
    
    log_success "API client generated successfully!"
}

post_generation() {
    log_info "Post-generation checks..."
    
    # Count generated files
    if [ -d "$OUTPUT_DIR" ]; then
        file_count=$(find "$OUTPUT_DIR" -type f -name "*.ts" | wc -l)
        log_success "Generated $file_count TypeScript files in $OUTPUT_DIR/"
        
        # List generated files
        log_info "Generated files:"
        find "$OUTPUT_DIR" -type f -name "*.ts" -exec basename {} \; | sort | sed 's/^/  📄 /'
    else
        log_error "Output directory not found!"
        exit 1
    fi
    
    echo ""
    log_success "🎉 API client generation completed!"
    log_info "Import from: @/api/generated/..."
}

# Main script
main() {
    echo -e "${CYAN}🚀 Starting API Client Generation...${NC}"
    echo "=================================="
    
    local environment=""
    local should_clean=false
    local source_url=""
    
    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --help|-h)
                show_help
                exit 0
                ;;
            --clean)
                should_clean=true
                shift
                ;;
            local|staging|production)
                environment=$1
                shift
                ;;
            *)
                log_error "Unknown option: $1"
                show_help
                exit 1
                ;;
        esac
    done
    
    # Set source URL based on environment
    case $environment in
        local)
            source_url=$LOCAL_URL
            log_info "Using local development server"
            ;;
        staging)
            source_url=$STAGING_URL
            log_info "Using staging environment"
            ;;
        production)
            source_url=$PRODUCTION_URL
            log_info "Using production environment"
            ;;
        "")
            source_url=$LOCAL_URL
            log_info "No environment specified, using local development server"
            ;;
        *)
            log_error "Invalid environment: $environment"
            log_info "Available environments: local, staging, production"
            exit 1
            ;;
    esac
    
    # Clean if requested
    if [ "$should_clean" = true ]; then
        clean_output
    fi
    
    # Generate client
    generate_client "$source_url"
    
    # Post-generation tasks
    post_generation
}

# Run the script
main "$@"