#!/bin/bash

# Quick Restore Script for Working Functional Version
# This script restores the portfolio to the stable working version

echo "🔄 VP Portfolio - Restore to Working Functional Version"
echo "======================================================"
echo ""

echo "⚠️  WARNING: This will overwrite your current main branch!"
echo "Restoring to commit: e6e3c43"
echo "Description: Redesign EMS AI with professional medical interface"
echo ""

echo "Are you sure you want to restore? (y/N):"
read -r confirm

if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
    echo ""
    echo "🔄 Restoring to working functional version..."
    
    # Create backup of current state
    CURRENT_BACKUP="backup-before-restore-$(date +%Y%m%d-%H%M%S)"
    git checkout -b "$CURRENT_BACKUP"
    git push origin "$CURRENT_BACKUP"
    echo "📋 Current state backed up as: $CURRENT_BACKUP"
    
    # Restore to working version
    git checkout main
    git reset --hard e6e3c43
    git push --force origin main
    
    echo ""
    echo "✅ Successfully restored to working functional version!"
    echo "🌐 Check your site at: https://bryankstites.com"
    echo ""
    echo "📋 To restore from current backup: git checkout $CURRENT_BACKUP"
else
    echo "❌ Restore cancelled"
fi 