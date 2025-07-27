#!/bin/bash

# Automatic Backup Script for VP Portfolio
# This script creates a backup branch before any changes

echo "🔄 Creating automatic backup..."

# Get current timestamp
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_BRANCH="backup-$TIMESTAMP"

# Create backup branch from current state
git checkout -b "$BACKUP_BRANCH"

# Push backup branch to remote
git push origin "$BACKUP_BRANCH"

# Switch back to main
git checkout main

echo "✅ Backup created: $BACKUP_BRANCH"
echo "📋 To restore from this backup: git checkout $BACKUP_BRANCH"
echo "📋 To list all backups: git branch | grep backup"
echo "📋 To delete old backups: git branch -D backup-YYYYMMDD-HHMMSS"

# Show recent backups
echo ""
echo "📚 Recent backups:"
git branch | grep backup | tail -5 