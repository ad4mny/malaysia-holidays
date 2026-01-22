# 🌏 State Filtering Feature - Release Notes

## Version 1.1.0 - Added State/Region Filtering

### ✨ What's New

Added **`getHolidaysByState()`** function to filter holidays by specific Malaysian states and regions!

### 🎯 New Function

```javascript
getHolidaysByState(state, options?)
```

**Parameters:**

- `state: string` - Name of the state (e.g., 'Johor', 'Selangor', 'Kuala Lumpur')
- `options.year?: number` - Year to fetch (default: current year)
- `options.useCache?: boolean` - Use cache (default: true)

**Returns:** `Promise<HolidayResult>` - All national holidays + state-specific holidays

### 📍 Supported States & Territories

**13 States:**

- Johor, Kedah, Kelantan, Melaka, Negeri Sembilan
- Pahang, Penang, Perak, Perlis, Sabah
- Sarawak, Selangor, Terengganu

**3 Federal Territories:**

- Kuala Lumpur, Labuan, Putrajaya

### 💻 Usage Examples

**JavaScript:**

```javascript
const { getHolidaysByState } = require("malaysia-holiday");

// Get holidays for Johor in 2026
const johorHolidays = await getHolidaysByState("Johor", { year: 2026 });
console.log(johorHolidays.holidays); // 37 holidays

// Get holidays for Penang (current year)
const penangHolidays = await getHolidaysByState("Penang");

// Find state-specific holidays only
const johorSpecific = johorHolidays.holidays.filter((h) =>
  h.states?.includes("Johor"),
);
```

**TypeScript:**

```typescript
import { getHolidaysByState, HolidayResult } from "malaysia-holiday";

const result: HolidayResult = await getHolidaysByState("Selangor", {
  year: 2026,
});
```

**CLI:**

```bash
# List all holidays for Johor in 2026
malaysia-holiday state Johor 2026

# List holidays for Kuala Lumpur (current year)
malaysia-holiday state "Kuala Lumpur"

# List holidays for Sabah
malaysia-holiday state Sabah 2026
```

### 🔍 How It Works

1. **Fetches all holidays** for the specified year
2. **Filters to include:**
   - ✅ All national holidays (everyone gets these)
   - ✅ State-specific holidays for the requested state
3. **Returns combined list** sorted by date

### 📊 Example Output

```javascript
// Johor in 2026
{
  holidays: [
    {
      date: '2026-01-01',
      name: 'New Year\'s Day',
      type: 'national'
    },
    {
      date: '2026-03-23',
      name: 'Birthday of the Sultan of Johor',
      type: 'state',
      states: ['Johor']
    },
    // ... 35 more holidays
  ],
  year: 2026,
  fetchedAt: 2026-01-23T...,
  source: 'https://...'
}
```

### 🎨 Enhanced Features

**Holiday Objects Now Include:**

```typescript
interface Holiday {
  date: string; // 'YYYY-MM-DD'
  name: string; // Holiday name
  dayOfWeek: string; // 'Monday', 'Tuesday', etc.
  type: "national" | "state" | "observance";
  states?: string[]; // NEW! Array of applicable states
}
```

**State Detection:**

- Automatically identifies state-specific holidays
- Extracts state information from holiday names
- Handles multi-state holidays (e.g., Federal Territory Day)

### 📈 Holiday Counts by State (2026)

| State    | Total Holidays |
| -------- | -------------- |
| Sabah    | 38             |
| Sarawak  | 39             |
| Johor    | 37             |
| Selangor | 36             |
| Penang   | 36             |
| Others   | 35-37          |

### 🧪 Testing

**All 9 tests pass:**

- ✅ Get holidays for specific year
- ✅ Get current year holidays
- ✅ Get next upcoming holiday
- ✅ Check if date is holiday
- ✅ Caching mechanism
- ✅ Cache clearing
- ✅ Date object support
- ✅ Holiday type classification
- ✅ **State filtering** (NEW!)

### 📝 Code Examples

**Compare states:**

```javascript
const states = ["Johor", "Selangor", "Penang", "Sabah"];

for (const state of states) {
  const result = await getHolidaysByState(state, { year: 2026 });
  console.log(`${state}: ${result.holidays.length} holidays`);
}
```

**Find state-specific holidays:**

```javascript
const result = await getHolidaysByState("Johor", { year: 2026 });

// Filter to only Johor-specific holidays
const johorOnly = result.holidays.filter((h) => h.states?.includes("Johor"));

console.log(`Johor-specific holidays:`, johorOnly);
// [
//   { name: 'Birthday of the Sultan of Johor', ... },
//   { name: 'The Sultan of Johor Hol', ... }
// ]
```

### 🚀 Performance

- ✅ Uses existing cache (no extra API calls)
- ✅ Fast filtering (milliseconds)
- ✅ Works offline when cached
- ✅ Same 24-hour cache as main function

### 📦 Package Updates

**Updated Files:**

- `src/scraper.ts` - Added state parsing & `getHolidaysByState()`
- `src/index.ts` - Exported new function
- `src/cli.ts` - Added `state` command
- `README.md` - Updated with examples
- `CHANGELOG.md` - Version 1.1.0 notes

**New Files:**

- `example-state.js` - State filtering examples

### 🎯 Use Cases

Perfect for:

- 📅 **State-specific calendars** - Show only relevant holidays
- 🏢 **HR systems** - Different holidays per office location
- 📱 **Regional apps** - Filter by user's state
- 🗓️ **Work scheduling** - Account for regional differences
- 📊 **Analytics** - Compare holidays across states

### 🔄 Migration from v1.0.0

No breaking changes! Existing code continues to work.

**Optional upgrade:**

```javascript
// Old way (still works)
const all = await getHolidays({ year: 2026 });
const johor = all.holidays.filter(
  (h) => h.type === "national" || h.name.includes("Johor"),
);

// New way (easier & more accurate)
const johor = await getHolidaysByState("Johor", { year: 2026 });
```

### ✅ Ready to Use

```bash
# Rebuild (if developing)
npm run build

# Test
npm test

# Try it
node dist/cli.js state Johor 2026
```

### 🎉 Summary

**What you get:**

- 🌏 Filter holidays by any Malaysian state
- 📍 Automatic state detection
- 🎯 Accurate national + regional holidays
- 🚀 Same great performance
- ✨ Simple, intuitive API

**Install & try:**

```bash
npm install malaysia-holiday@1.1.0
```

---

**Enjoy the new state filtering feature! 🇲🇾**
