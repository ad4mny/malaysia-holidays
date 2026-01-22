# 📋 Deployment Checklist

## Pre-Publishing Steps

### 1. Update Package Information

- [ ] Update `author` field in [package.json](package.json)
- [ ] Update `repository` URL in [package.json](package.json)
- [ ] Update `bugs` URL in [package.json](package.json)
- [ ] Update `homepage` URL in [package.json](package.json)
- [ ] Update copyright year in [LICENSE](LICENSE) if needed

### 2. Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial release v1.0.0"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/malaysia-holiday.git
git branch -M main
git push -u origin main
```

### 3. Test Everything

```bash
# Run comprehensive tests
npm test

# Run demo
npm run demo

# Test CLI
node dist/cli.js list 2026
node dist/cli.js next

# Test build
npm run build
```

### 4. Verify Package Contents

```bash
# See what will be published
npm pack --dry-run

# Package size should be ~25KB unpacked
```

## Publishing to npm

### 1. Login to npm

```bash
npm login
# Enter your npm credentials
```

### 2. Publish

```bash
# First time publish
npm publish

# If package name is taken, update name in package.json
# Or use scoped package: @yourusername/malaysia-holiday
```

### 3. Verify Publication

```bash
# Check on npm
npm view malaysia-holiday

# Try installing
npm install malaysia-holiday -g

# Test installed package
malaysia-holiday list 2026
```

## Post-Publishing

### 1. Create GitHub Release

- Go to GitHub releases
- Create new release with tag `v1.0.0`
- Add changelog from [CHANGELOG.md](CHANGELOG.md)

### 2. Add Badges to README

Update [README.md](README.md) with real badges:

```markdown
[![npm version](https://img.shields.io/npm/v/malaysia-holiday.svg)](https://www.npmjs.com/package/malaysia-holiday)
[![npm downloads](https://img.shields.io/npm/dm/malaysia-holiday.svg)](https://www.npmjs.com/package/malaysia-holiday)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
```

### 3. Share Your Package

- [ ] Tweet about it
- [ ] Post on Reddit (r/node, r/javascript, r/malaysia)
- [ ] Share on LinkedIn
- [ ] Add to your portfolio
- [ ] Share on dev.to

## Version Updates (Future)

When making updates:

1. **Make your changes**
2. **Update version in package.json**
   - Patch: 1.0.1 (bug fixes)
   - Minor: 1.1.0 (new features)
   - Major: 2.0.0 (breaking changes)
3. **Update CHANGELOG.md**
4. **Commit and tag**
   ```bash
   git commit -am "Release v1.0.1"
   git tag v1.0.1
   git push && git push --tags
   ```
5. **Publish**
   ```bash
   npm publish
   ```

## Troubleshooting

### Package name already taken?

- Use scoped package: `@yourusername/malaysia-holiday`
- Or choose different name: `my-malaysia-holiday`

### Publish failed?

- Check if logged in: `npm whoami`
- Verify email: npm requires verified email
- Check 2FA if enabled

### Version already published?

- Update version in package.json
- Can't republish same version

## Success Criteria ✅

Your package is successfully published when:

- ✅ Visible on npmjs.com
- ✅ Can install via `npm install malaysia-holiday`
- ✅ CLI works: `npx malaysia-holiday list`
- ✅ API works in code
- ✅ TypeScript types available
- ✅ Documentation is complete

## Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [npm Documentation](https://docs.npmjs.com/)
- [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github)

---

**Note:** Remember to keep your package.json `author`, `repository`, and `bugs` fields updated before publishing!
