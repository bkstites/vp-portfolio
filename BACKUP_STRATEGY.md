# 🔒 VP Portfolio Backup Strategy

## 🚨 IMPORTANT: Always Backup Before Changes!

This document outlines our backup strategy to prevent data loss.

## 📋 Backup Commands

### 1. **Automatic Backup (Recommended)**
```bash
./backup.sh
```
This creates a timestamped backup branch and pushes it to GitHub.

### 2. **Manual Backup**
```bash
# Create backup branch
git checkout -b backup-$(date +%Y%m%d-%H%M%S)

# Push to remote
git push origin backup-$(date +%Y%m%d-%H%M%S)

# Return to main
git checkout main
```

### 3. **Restore from Backup**
```bash
./restore.sh
```
This interactive script shows all backups and lets you choose which to restore.

## 🔄 Workflow for Safe Changes

### Before Making ANY Changes:
1. **Create Backup:**
   ```bash
   ./backup.sh
   ```

2. **Make Your Changes**

3. **Test Changes:**
   ```bash
   npm run build
   npm run dev
   ```

4. **If Changes Work:**
   ```bash
   git add .
   git commit -m "Your change description"
   git push origin main
   ```

5. **If Changes Break Something:**
   ```bash
   ./restore.sh
   # Choose the backup you want to restore from
   ```

## 📚 Managing Backups

### List All Backups:
```bash
git branch | grep backup
```

### Delete Old Backups:
```bash
# Delete local backup
git branch -D backup-YYYYMMDD-HHMMSS

# Delete remote backup
git push origin --delete backup-YYYYMMDD-HHMMSS
```

### Keep Only Recent Backups:
```bash
# Keep only last 5 backups
git branch | grep backup | tail -n +6 | xargs -I {} git branch -D {}
```

## 🛡️ Additional Safety Measures

### 1. **Git Hooks (Automatic Backups)**
Create `.git/hooks/pre-commit`:
```bash
#!/bin/bash
# This runs before every commit
./backup.sh
```

### 2. **Regular Snapshots**
Set up a cron job for daily backups:
```bash
# Add to crontab
0 9 * * * cd /path/to/vp-portfolio && ./backup.sh
```

### 3. **Remote Repository Backup**
Your GitHub repository serves as a remote backup. All backup branches are pushed there.

## 🚨 Emergency Recovery

### If Everything is Broken:
1. **List all backups:**
   ```bash
   git branch | grep backup
   ```

2. **Restore from most recent working backup:**
   ```bash
   ./restore.sh
   ```

3. **Force deploy to Vercel:**
   ```bash
   git push --force origin main
   ```

## 📝 Best Practices

1. **Always backup before changes**
2. **Test changes locally before pushing**
3. **Keep at least 5 recent backups**
4. **Document what each backup contains**
5. **Use descriptive commit messages**

## 🔧 Troubleshooting

### If backup script fails:
```bash
# Manual backup
git checkout -b backup-manual-$(date +%Y%m%d-%H%M%S)
git push origin backup-manual-$(date +%Y%m%d-%H%M%S)
git checkout main
```

### If restore script fails:
```bash
# Manual restore
git checkout backup-YYYYMMDD-HHMMSS
git checkout -b temp-restore
git checkout main
git reset --hard temp-restore
git push --force origin main
git branch -D temp-restore
```

## 📞 Emergency Contacts

- **GitHub Repository:** https://github.com/bkstites/vp-portfolio
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Backup Branches:** All pushed to GitHub automatically

---

**Remember: It's better to have too many backups than to lose your work!** 