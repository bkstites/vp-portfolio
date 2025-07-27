#!/bin/bash

# Restore Script for VP Portfolio
# This script helps restore from backup branches

echo "🔄 VP Portfolio Restore Tool"
echo "=========================="

# Show available backups
echo ""
echo "📚 Available backups:"
git branch | grep backup | nl

echo ""
echo "Enter the number of the backup to restore from (or 'q' to quit):"
read -r choice

if [ "$choice" = "q" ]; then
    echo "❌ Restore cancelled"
    exit 0
fi

# Get the backup branch name
BACKUP_BRANCH=$(git branch | grep backup | sed -n "${choice}p" | sed 's/^[[:space:]]*//')

if [ -z "$BACKUP_BRANCH" ]; then
    echo "❌ Invalid choice"
    exit 1
fi

echo ""
echo "⚠️  WARNING: This will overwrite your current main branch!"
echo "Backup to restore from: $BACKUP_BRANCH"
echo ""
echo "Are you sure? (y/N):"
read -r confirm

if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
    echo "🔄 Restoring from $BACKUP_BRANCH..."
    
    # Create a backup of current state before restoring
    CURRENT_BACKUP="backup-before-restore-$(date +%Y%m%d-%H%M%S)"
    git checkout -b "$CURRENT_BACKUP"
    git push origin "$CURRENT_BACKUP"
    
    # Switch to main and reset to backup
    git checkout main
    git reset --hard "$BACKUP_BRANCH"
    git push --force origin main
    
    echo "✅ Restored from $BACKUP_BRANCH"
    echo "📋 Current backup saved as: $CURRENT_BACKUP"
else
    echo "❌ Restore cancelled"
fi 