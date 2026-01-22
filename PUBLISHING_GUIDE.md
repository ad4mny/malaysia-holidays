# 🚀 Publishing Guide - malaysia-holiday v1.1.0

## ✅ Pre-Publishing Checklist (COMPLETED)

- ✅ Code written and tested
- ✅ All 9 tests passing (100%)
- ✅ TypeScript compiled successfully
- ✅ Package.json updated with correct info
- ✅ Git repository initialized
- ✅ Pushed to GitHub: https://github.com/ad4mny/malaysia-holidays.git
- ✅ Git tag v1.1.0 created and pushed
- ✅ Documentation complete

## 📦 Package Details

**Name:** malaysia-holiday  
**Version:** 1.1.0  
**Size:** 9.4 kB (compressed), 34.8 kB (unpacked)  
**Files:** 19 files included  
**Repository:** https://github.com/ad4mny/malaysia-holidays.git

## 🔐 Step 1: Login to npm

You need to login to npm before publishing. Run:

```bash
npm login
```

You'll be prompted for:

- **Username**: Your npm username
- **Password**: Your npm password
- **Email**: Your npm email (will be public)
- **OTP** (if 2FA enabled): Your one-time password

## 📤 Step 2: Publish to npm

Once logged in, publish the package:

```bash
npm publish
```

This will:

1. Run `prepublishOnly` script (build TypeScript)
2. Create the package tarball
3. Upload to npm registry
4. Make it available at: https://www.npmjs.com/package/malaysia-holiday

## 🔍 Step 3: Verify Publication

After publishing, verify it worked:

```bash
# Check your package online
npm view malaysia-holiday

# Install it globally to test
npm install -g malaysia-holiday

# Test the CLI
malaysia-holiday list 2026
malaysia-holiday state Johor 2026
```

## 🎯 Alternative: Scoped Package (If name is taken)

If `malaysia-holiday` is already taken, you can publish as a scoped package:

1. Update package.json:

```json
{
  "name": "@ad4mny/malaysia-holiday",
  ...
}
```

2. Publish as public package:

```bash
npm publish --access public
```

## 📋 Quick Commands Reference

```bash
# Login to npm
npm login

# Publish package
npm publish

# View published package
npm view malaysia-holiday

# Install published package
npm install malaysia-holiday

# Test CLI after install
npx malaysia-holiday list 2026
```

## 🔄 Future Updates

When you need to update the package:

1. Make your changes
2. Update version in package.json (e.g., 1.1.1 or 1.2.0)
3. Update CHANGELOG.md
4. Build and test:
   ```bash
   npm run build
   npm test
   ```
5. Commit and tag:
   ```bash
   git add .
   git commit -m "Release v1.x.x"
   git tag -a v1.x.x -m "Release v1.x.x"
   git push && git push --tags
   ```
6. Publish:
   ```bash
   npm publish
   ```

## 🎉 What Happens After Publishing

Once published, users can:

```bash
# Install your package
npm install malaysia-holiday

# Use in their code
const { getHolidays, getHolidaysByState } = require('malaysia-holiday');

# Use the CLI
npx malaysia-holiday state Johor 2026
```

## 🌟 Promotion Tips

After publishing:

1. **Update README badge** (auto-generated):
   - npm version: https://img.shields.io/npm/v/malaysia-holiday
   - npm downloads: https://img.shields.io/npm/dm/malaysia-holiday

2. **Share on social media**:
   - Twitter/X
   - LinkedIn
   - Reddit (r/node, r/javascript, r/malaysia)
   - Dev.to

3. **Update GitHub**:
   - Add topics: nodejs, npm, malaysia, holidays, typescript
   - Create release notes on GitHub

## 📞 Troubleshooting

**Error: Package name already exists**

- Use a different name or scoped package: `@ad4mny/malaysia-holiday`

**Error: Need auth**

- Run `npm login` first

**Error: 2FA required**

- Enter your OTP when prompted
- Or use: `npm login --auth-type=legacy`

**Error: Email not verified**

- Check your npm account email
- Verify it before publishing

## ✅ Ready to Publish!

Your package is **100% ready** to publish. Just run:

```bash
npm login
npm publish
```

Good luck! 🚀
