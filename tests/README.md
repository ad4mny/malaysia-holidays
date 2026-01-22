# Tests

This folder contains test files for the malaysia-holiday package.

## Running Tests

```bash
# Run comprehensive test suite
npm test

# Run state filtering test
npm run test:state
```

## Test Files

- **comprehensive-test.js** - Full test suite covering all features (9 tests)
- **test-state-feature.js** - Specific tests for state filtering functionality

## Test Coverage

All tests validate:

- ✅ Holiday retrieval by year
- ✅ Current year holidays
- ✅ Next upcoming holiday
- ✅ Date validation (isHoliday)
- ✅ Caching mechanism
- ✅ Cache clearing
- ✅ Date object support
- ✅ Holiday type classification
- ✅ State filtering by region
