# malaysia-holidays

[![npm version](https://img.shields.io/npm/v/malaysia-holidays.svg)](https://www.npmjs.com/package/malaysia-holidays)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A fast, lightweight npm package to get Malaysia public holidays. Built with performance in mind using minimal dependencies.

## Features

- 🚀 **High Performance** - Uses native Node.js `https` module (no heavy HTTP clients)
- 💾 **Smart Caching** - Automatic 24-hour cache to minimize network requests
- 📦 **Minimal Dependencies** - Only uses `cheerio` for HTML parsing
- 🔄 **TypeScript Support** - Full TypeScript definitions included
- 🎯 **Simple API** - Easy-to-use async functions
- 🌏 **State Filtering** - Get holidays by specific state/region
- 🛠️ **CLI Included** - Command-line interface for quick access

## Installation

```bash
npm install malaysia-holidays
```

## Quick Start

### As a Library

```javascript
const {
  getHolidays,
  getNextHoliday,
  isHoliday,
  getHolidaysByState,
} = require("malaysia-holiday");

// Get all holidays for current year
const result = await getHolidays();
console.log(result.holidays);

// Get holidays for a specific year
const holidays2026 = await getHolidays({ year: 2026 });

// Get holidays for a specific state
const johorHolidays = await getHolidaysByState("Johor", { year: 2026 });
console.log(johorHolidays.holidays);

// Get next upcoming holiday
const nextHoliday = await getNextHoliday();
console.log(nextHoliday);

// Check if a date is a holiday
const isNewYear = await isHoliday("2026-01-01");
console.log(isNewYear); // true
```

### TypeScript

```typescript
import { getHolidays, Holiday, HolidayResult } from "malaysia-holidays";

const result: HolidayResult = await getHolidays({ year: 2026 });
result.holidays.forEach((holiday: Holiday) => {
  console.log(`${holiday.date}: ${holiday.name}`);
});
```

### CLI

```bash
# List all holidays for current year
npx malaysia-holidays list

# List holidays for specific year
npx malaysia-holidays list 2026

# List holidays for a specific state
npx malaysia-holidays state Johor 2026
npx malaysia-holidays state "Kuala Lumpur"

# Get next upcoming holiday
npx malaysia-holidays next

# Clear cache
npx malaysia-holidays clear-cache
```

## API Reference

### `getHolidays(options?)`

Get holidays for a specific year.

**Parameters:**

- `options.year?: number` - Year to fetch holidays for (default: current year)
- `options.useCache?: boolean` - Whether to use cache (default: true)
- `options.cacheDir?: string` - Custom cache directory

**Returns:** `Promise<HolidayResult>`

```javascript
const result = await getHolidays({
  year: 2026,
  useCache: true,
});
```

### `getCurrentYearHolidays(options?)`

Get holidays for the current year.

**Returns:** `Promise<HolidayResult>`

```javascript
const result = await getCurrentYearHolidays();
```

### `getNextHoliday(options?)`

Get the next upcoming holiday from today.

**Returns:** `Promise<Holiday | null>`

```javascript
const next = await getNextHoliday();
console.log(next?.name);
```

### `isHoliday(date, options?)`

Check if a specific date is a holiday.

**Parameters:**

- `date: string | Date` - Date to check (format: 'YYYY-MM-DD' or Date object)

**Returns:** `Promise<boolean>`

```javascript
const check = await isHoliday("2026-01-01");
console.log(check); // true
```

### `getHolidaysByState(state, options?)`

Get holidays for a specific state/region (includes national holidays + state-specific holidays).

**Parameters:**

- `state: string` - State name (e.g., 'Johor', 'Selangor', 'Kuala Lumpur')
- `options.year?: number` - Year to fetch holidays for (default: current year)
- `options.useCache?: boolean` - Whether to use cache (default: true)
- `options.cacheDir?: string` - Custom cache directory

**Returns:** `Promise<HolidayResult>`

**Available States:**

- Johor, Kedah, Kelantan, Melaka, Negeri Sembilan, Pahang, Penang
- Perak, Perlis, Sabah, Sarawak, Selangor, Terengganu
- Kuala Lumpur, Labuan, Putrajaya

```javascript
// Get holidays for Johor in 2026
const johorHolidays = await getHolidaysByState("Johor", { year: 2026 });
console.log(johorHolidays.holidays); // Includes national + Johor-specific holidays

// Get holidays for current state
const selangorHolidays = await getHolidaysByState("Selangor");

// Compare holidays across states
const states = ["Johor", "Penang", "Sabah"];
for (const state of states) {
  const result = await getHolidaysByState(state, { year: 2026 });
  console.log(`${state}: ${result.holidays.length} holidays`);
}
```

### `clearCache(cacheDir?)`

Clear the holiday cache.

```javascript
import { clearCache } from "malaysia-holidays";
clearCache();
```

## Data Structure

### Holiday

```typescript
interface Holiday {
  date: string; // ISO format: 'YYYY-MM-DD'
  name: string; // Holiday name
  dayOfWeek: string; // e.g., 'Monday', 'Tuesday'
  type: "national" | "state" | "observance";
  states?: string[]; // Applicable states (if state holiday)
}
```

### HolidayResult

```typescript
interface HolidayResult {
  holidays: Holiday[];
  year: number;
  fetchedAt: Date;
  source: string;
}
```

## Performance

- **Zero external HTTP libraries** - Uses Node.js native `https` module
- **Intelligent caching** - Results cached for 24 hours
- **Fast parsing** - Cheerio is one of the fastest HTML parsers
- **Small bundle size** - Minimal dependencies

## Caching

By default, holiday data is cached for 24 hours in the system's temp directory. You can:

- Disable caching: `getHolidays({ useCache: false })`
- Custom cache directory: `getHolidays({ cacheDir: '/custom/path' })`
- Clear cache: `clearCache()`

## Data Source

Data is scraped from [Office Holidays](https://www.officeholidays.com/countries/malaysia), a reliable source for public holiday information.

## License

MIT License - feel free to use in your projects!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you find this package useful, please give it a ⭐ on GitHub!
