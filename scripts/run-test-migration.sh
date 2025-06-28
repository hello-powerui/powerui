#!/bin/bash

# Script to run the test migration with production environment variables

echo "🔧 Running test migration with production environment..."
echo ""
echo "⚠️  WARNING: This will create a user in your PRODUCTION Clerk instance!"
echo "⚠️  Make sure you have your .env.production file configured correctly."
echo ""
read -p "Do you want to continue? (y/N) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "❌ Migration cancelled."
    exit 1
fi

# Load production environment variables
export NODE_ENV=production

# Run the migration script with production env
npx tsx -r dotenv/config scripts/test-clerk-migration.ts dotenv_config_path=.env.production

echo ""
echo "✅ Script execution completed!"