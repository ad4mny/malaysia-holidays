# 🚀 Quick Start Guide - malaysia-holiday

## Installation & First Run

### 1. Install Dependencies (Already Done)

```bash
npm install
```

### 2. Build the Package

```bash
npm run build
```

### 3. Test It Out

**Run the demo:**

```bash
npm test
```

**Try the CLI:**

```bash
# List all holidays for 2026
node dist/cli.js list 2026

# Get next holiday
node dist/cli.js next

# Show help
node dist/cli.js help
```

**Use in code:**

```javascript
const { getHolidays, getNextHoliday } = require("./dist");

(async () => {
  // Get holidays
  const result = await getHolidays({ year: 2026 });
  console.log(result.holidays);

  // Get next holiday
  const next = await getNextHoliday();
  console.log(next);
})();
```

## 📦 Publishing to npm

1. **Login to npm:**

   ```bash
   npm login
   ```

2. **Update package.json:**
   - Set your name in `author` field
   - Update repository URL
   - Ensure version is correct

3. **Publish:**
   ```bash
   npm publish
   ```

## 🔧 Development

**Make changes:**

1. Edit files in `src/`
2. Run `npm run build`
3. Test with `npm test`

**File structure:**

- `src/scraper.ts` - Main scraping logic
- `src/cache.ts` - Caching system
- `src/types.ts` - TypeScript types
- `src/cli.ts` - CLI tool
- `src/index.ts` - Main export

## 📊 What's Included

✅ **Core Features:**

- Get holidays by year
- Get next upcoming holiday
- Check if date is holiday
- Smart 24-hour caching

✅ **Performance:**

- Uses native Node.js https (no axios)
- Only 1 dependency (cheerio)
- Fast HTML parsing
- Minimal bundle size

✅ **Developer Experience:**

- Full TypeScript support
- Type definitions included
- CLI tool included
- Comprehensive docs

## 🎯 Package Stats

- Total code: **365 lines**
- Dependencies: **1** (cheerio)
- Total packages: **26** (including dev deps)
- Build time: **< 1 second**
- Install time: **~3 seconds**
- Bundle: **Lightweight**

## 📖 Usage After Publishing

Once published to npm, users can:

```bash
# Install
npm install malaysia-holiday

# Use in code
const { getHolidays } = require('malaysia-holiday');

# Use CLI
npx malaysia-holiday list 2026
```

## 🌟 Key Highlights

1. **Zero Configuration** - Works out of the box
2. **Performance First** - Native https, smart caching
3. **TypeScript Ready** - Full type support
4. **Well Documented** - README, examples, JSDoc
5. **Production Ready** - Error handling, caching, CLI

## 📝 Next Steps

- [ ] Update `package.json` with your details
- [ ] Create GitHub repository
- [ ] Add your name to LICENSE
- [ ] Publish to npm
- [ ] Add to your portfolio!

Enjoy your new npm package! 🎉
