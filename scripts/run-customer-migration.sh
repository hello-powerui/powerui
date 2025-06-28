#!/bin/bash

# Script to run customer migration to Clerk

echo "🚀 Customer Migration to Clerk"
echo "============================="
echo ""

# Check if we're using production or development environment
if [ "$1" == "production" ]; then
    ENV_FILE=".env.production"
    echo "⚠️  WARNING: Using PRODUCTION environment!"
else
    ENV_FILE=".env.local"
    echo "ℹ️  Using development environment (.env.local)"
fi

echo ""
echo "Configuration:"
echo "- Environment file: $ENV_FILE"
echo "- Max users to process: ${MAX_USERS:-5}"
echo ""

# Confirm before proceeding
read -p "Do you want to continue? (y/N) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "❌ Migration cancelled."
    exit 1
fi

echo ""
echo "Starting migration..."
echo ""

# Run the migration script
MAX_USERS="${MAX_USERS:-5}" npx tsx -r dotenv/config scripts/migrate-customers-to-clerk.ts dotenv_config_path=$ENV_FILE

echo ""
echo "✅ Migration run completed!"
echo ""
echo "To view the migration log:"
echo "cat customer-analysis/output/migration-log.json | jq"
echo ""
echo "To continue with more users:"
echo "MAX_USERS=20 ./scripts/run-customer-migration.sh"