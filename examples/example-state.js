const { getHolidaysByState, getHolidays } = require('../dist/index');

async function main() {
  console.log('🌏 Malaysia Holiday by State Demo\n');

  // Example 1: Get holidays for Johor
  console.log('📅 Holidays for Johor in 2026:');
  const johorHolidays = await getHolidaysByState('Johor', { year: 2026 });
  console.log(`Found ${johorHolidays.holidays.length} holidays for Johor`);
  
  // Show Johor-specific holidays
  const johorSpecific = johorHolidays.holidays.filter(h => h.states?.includes('Johor'));
  console.log(`\nJohor-specific holidays:`);
  johorSpecific.forEach(h => {
    console.log(`  - ${h.date}: ${h.name}`);
  });

  // Example 2: Get holidays for Selangor
  console.log('\n📅 Holidays for Selangor in 2026:');
  const selangorHolidays = await getHolidaysByState('Selangor', { year: 2026 });
  console.log(`Found ${selangorHolidays.holidays.length} holidays for Selangor`);
  
  const selangorSpecific = selangorHolidays.holidays.filter(h => h.states?.includes('Selangor'));
  console.log(`\nSelangor-specific holidays:`);
  selangorSpecific.forEach(h => {
    console.log(`  - ${h.date}: ${h.name}`);
  });

  // Example 3: Compare states
  console.log('\n📊 Comparing holiday counts by state:');
  const states = ['Johor', 'Selangor', 'Penang', 'Sabah', 'Sarawak'];
  
  for (const state of states) {
    const result = await getHolidaysByState(state, { year: 2026 });
    console.log(`  ${state.padEnd(15)} - ${result.holidays.length} holidays`);
  }

  // Example 4: Get all holidays and analyze by state
  console.log('\n📍 Holiday distribution:');
  const allHolidays = await getHolidays({ year: 2026 });
  const national = allHolidays.holidays.filter(h => h.type === 'national');
  const stateSpecific = allHolidays.holidays.filter(h => h.type === 'state');
  
  console.log(`  National holidays: ${national.length}`);
  console.log(`  State-specific holidays: ${stateSpecific.length}`);
  console.log(`  Total holidays: ${allHolidays.holidays.length}`);

  console.log('\n✨ Demo completed!');
}

main().catch(console.error);
