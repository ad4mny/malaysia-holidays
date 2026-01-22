const { getHolidays, getNextHoliday, isHoliday } = require('../dist/index');

async function main() {
  console.log('🎉 Malaysia Holiday Package Demo\n');

  // Example 1: Get all holidays for 2026
  console.log('📅 Getting all holidays for 2026...');
  const result2026 = await getHolidays({ year: 2026 });
  console.log(`Found ${result2026.holidays.length} holidays`);
  console.log('\nFirst 5 holidays:');
  result2026.holidays.slice(0, 5).forEach(h => {
    console.log(`  - ${h.date} (${h.dayOfWeek}): ${h.name}`);
  });

  // Example 2: Get next upcoming holiday
  console.log('\n🔜 Next upcoming holiday:');
  const next = await getNextHoliday();
  if (next) {
    console.log(`  ${next.date} (${next.dayOfWeek}): ${next.name}`);
  }

  // Example 3: Check if a date is a holiday
  console.log('\n✅ Checking if dates are holidays:');
  const dates = ['2026-01-01', '2026-01-02', '2026-12-25'];
  for (const date of dates) {
    const check = await isHoliday(date);
    console.log(`  ${date}: ${check ? '✓ Holiday' : '✗ Not a holiday'}`);
  }

  // Example 4: Get current year holidays
  console.log('\n📆 Current year holidays:');
  const currentYear = await getHolidays();
  console.log(`  Found ${currentYear.holidays.length} holidays for ${currentYear.year}`);

  console.log('\n✨ Demo completed!');
}

main().catch(console.error);
