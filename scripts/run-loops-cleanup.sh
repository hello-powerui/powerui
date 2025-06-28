#!/bin/bash

# Script to run Loops contact cleanup

echo "🧹 Loops Contact Cleanup"
echo "======================="
echo ""

# Check if we're doing a dry run
if [ "$1" == "dry-run" ]; then
    DRY_RUN="true"
    echo "🔍 Running in DRY RUN mode - no actual updates will be made"
else
    DRY_RUN="false"
    echo "⚠️  Running in LIVE mode - contacts will be updated!"
fi

echo ""
echo "Configuration:"
echo "- Max contacts to process: ${MAX_CONTACTS:-5}"
echo "- Dry run: $DRY_RUN"
echo ""

# Confirm before proceeding
if [ "$DRY_RUN" != "true" ]; then
    read -p "Do you want to continue with LIVE updates? (y/N) " -n 1 -r
    echo ""
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]
    then
        echo "❌ Cleanup cancelled."
        exit 1
    fi
fi

echo ""
echo "Starting Loops cleanup..."
echo ""

# Run the cleanup script
DRY_RUN="$DRY_RUN" MAX_CONTACTS="${MAX_CONTACTS:-5}" npx tsx -r dotenv/config scripts/cleanup-loops-contacts.ts dotenv_config_path=.env.local

echo ""
echo "✅ Loops cleanup run completed!"
echo ""
echo "To view the cleanup log:"
echo "cat customer-analysis/output/loops-cleanup-log.json | jq"
echo ""
echo "To continue with more contacts:"
echo "MAX_CONTACTS=20 ./scripts/run-loops-cleanup.sh"
echo ""
echo "To do a dry run first:"
echo "MAX_CONTACTS=20 ./scripts/run-loops-cleanup.sh dry-run"