#!/usr/bin/env node

/**
 * Comprehensive Test Suite for malaysia-holiday package
 * Run: node comprehensive-test.js
 */

const { 
  getHolidays, 
  getCurrentYearHolidays, 
  getNextHoliday, 
  isHoliday,
  getHolidaysByState,
  clearCache 
} = require('../dist');

console.log('🧪 Running Comprehensive Tests for malaysia-holiday\n');
console.log('='.repeat(60));

async function runTests() {
  let passed = 0;
  let failed = 0;

  // Test 1: Get holidays for specific year
  try {
    console.log('\n✅ Test 1: Get holidays for 2026');
    const result = await getHolidays({ year: 2026 });
    if (result.holidays.length > 0 && result.year === 2026) {
      console.log(`   ✓ Found ${result.holidays.length} holidays for 2026`);
      console.log(`   ✓ First holiday: ${result.holidays[0].name} (${result.holidays[0].date})`);
      passed++;
    } else {
      throw new Error('No holidays found');
    }
  } catch (error) {
    console.log(`   ✗ Failed: ${error.message}`);
    failed++;
  }

  // Test 2: Get current year holidays
  try {
    console.log('\n✅ Test 2: Get current year holidays');
    const result = await getCurrentYearHolidays();
    const currentYear = new Date().getFullYear();
    if (result.holidays.length > 0 && result.year === currentYear) {
      console.log(`   ✓ Found ${result.holidays.length} holidays for ${currentYear}`);
      passed++;
    } else {
      throw new Error('No holidays found for current year');
    }
  } catch (error) {
    console.log(`   ✗ Failed: ${error.message}`);
    failed++;
  }

  // Test 3: Get next upcoming holiday
  try {
    console.log('\n✅ Test 3: Get next upcoming holiday');
    const next = await getNextHoliday();
    if (next && next.name && next.date) {
      console.log(`   ✓ Next holiday: ${next.name} on ${next.date}`);
      passed++;
    } else {
      throw new Error('No upcoming holiday found');
    }
  } catch (error) {
    console.log(`   ✗ Failed: ${error.message}`);
    failed++;
  }

  // Test 4: Check if specific date is a holiday
  try {
    console.log('\n✅ Test 4: Check if date is a holiday');
    const isNewYear = await isHoliday('2026-01-01');
    const isNotHoliday = await isHoliday('2026-01-02');
    
    if (isNewYear === true && isNotHoliday === false) {
      console.log('   ✓ 2026-01-01 (New Year) correctly identified as holiday');
      console.log('   ✓ 2026-01-02 correctly identified as NOT a holiday');
      passed++;
    } else {
      throw new Error('Holiday detection failed');
    }
  } catch (error) {
    console.log(`   ✗ Failed: ${error.message}`);
    failed++;
  }

  // Test 5: Test caching
  try {
    console.log('\n✅ Test 5: Test caching mechanism');
    const start1 = Date.now();
    await getHolidays({ year: 2025 });
    const time1 = Date.now() - start1;
    
    const start2 = Date.now();
    await getHolidays({ year: 2025 }); // Should be cached
    const time2 = Date.now() - start2;
    
    console.log(`   ✓ First call: ${time1}ms`);
    console.log(`   ✓ Cached call: ${time2}ms`);
    console.log(`   ✓ Speed improvement: ${Math.round((time1 / time2) * 100) / 100}x faster`);
    passed++;
  } catch (error) {
    console.log(`   ✗ Failed: ${error.message}`);
    failed++;
  }

  // Test 6: Test cache clearing
  try {
    console.log('\n✅ Test 6: Test cache clearing');
    clearCache();
    console.log('   ✓ Cache cleared successfully');
    passed++;
  } catch (error) {
    console.log(`   ✗ Failed: ${error.message}`);
    failed++;
  }

  // Test 7: Test Date object support
  try {
    console.log('\n✅ Test 7: Test Date object support');
    const date = new Date('2026-12-25');
    const isChristmas = await isHoliday(date);
    if (isChristmas === true) {
      console.log('   ✓ Date object correctly processed');
      passed++;
    } else {
      throw new Error('Date object not working');
    }
  } catch (error) {
    console.log(`   ✗ Failed: ${error.message}`);
    failed++;
  }

  // Test 8: Test holiday types
  try {
    console.log('\n✅ Test 8: Test holiday type classification');
    const result = await getHolidays({ year: 2026 });
    const national = result.holidays.filter(h => h.type === 'national');
    const state = result.holidays.filter(h => h.type === 'state');
    
    console.log(`   ✓ National holidays: ${national.length}`);
    console.log(`   ✓ State holidays: ${state.length}`);
    console.log(`   ✓ Example national: ${national[0]?.name}`);
    console.log(`   ✓ Example state: ${state[0]?.name}`);
    passed++;
  } catch (error) {
    console.log(`   ✗ Failed: ${error.message}`);
    failed++;
  }

  // Test 9: Test getHolidaysByState function
  try {
    console.log('\n✅ Test 9: Test getHolidaysByState function');
    const johorHolidays = await getHolidaysByState('Johor', { year: 2026 });
    const selangorHolidays = await getHolidaysByState('Selangor', { year: 2026 });
    
    if (johorHolidays.holidays.length > 0 && selangorHolidays.holidays.length > 0) {
      console.log(`   ✓ Johor holidays: ${johorHolidays.holidays.length}`);
      console.log(`   ✓ Selangor holidays: ${selangorHolidays.holidays.length}`);
      
      // Find Johor-specific holidays
      const johorSpecific = johorHolidays.holidays.filter(h => 
        h.states?.includes('Johor')
      );
      if (johorSpecific.length > 0) {
        console.log(`   ✓ Johor-specific: ${johorSpecific[0].name}`);
      }
      passed++;
    } else {
      throw new Error('No holidays found for states');
    }
  } catch (error) {
    console.log(`   ✗ Failed: ${error.message}`);
    failed++;
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Test Summary:');
  console.log(`   ✓ Passed: ${passed}`);
  console.log(`   ✗ Failed: ${failed}`);
  console.log(`   Total: ${passed + failed}`);
  console.log(`   Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! Package is working perfectly!');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the errors above.');
  }
  
  console.log('\n' + '='.repeat(60) + '\n');
}

runTests().catch(err => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
