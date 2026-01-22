# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-01-23

### Added

- `getHolidaysByState()` - New function to get holidays filtered by state/region
- State information extraction for all Malaysian states
- Enhanced holiday parsing to identify and tag state-specific holidays
- CLI command `state <state> [year]` to list holidays for specific states
- Support for all 13 states and 3 federal territories
- `example-state.js` - Example file demonstrating state filtering

### Enhanced

- Holiday data now includes `states` field for state-specific holidays
- Improved state detection for sultans' birthdays, governors' birthdays, and regional holidays
- Better classification between national, state, and observance holidays
- Updated README with state filtering examples
- Comprehensive test suite now includes 9 tests (was 8)

## [1.0.0] - 2026-01-23

### Added

- Initial release
- `getHolidays()` - Get holidays for any year
- `getCurrentYearHolidays()` - Get holidays for current year
- `getNextHoliday()` - Get next upcoming holiday
- `isHoliday()` - Check if a date is a holiday
- `clearCache()` - Clear cached data
- CLI tool for command-line usage
- Smart caching with 24-hour expiration
- TypeScript support with full type definitions
- Comprehensive documentation and examples

### Performance

- Uses native Node.js `https` module (no heavy HTTP clients)
- Minimal dependencies (only cheerio for HTML parsing)
- Smart caching system to minimize network requests
