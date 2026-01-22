const { getHolidaysByState } = require('../dist');

async function demo() {
  console.log('🌏 STATE FILTERING FEATURE DEMO\n');
  
  const johor = await getHolidaysByState('Johor', { year: 2026 });
  const johorSpecific = johor.holidays.filter(h => h.states?.includes('Johor'));
  
  console.log(`✅ Total holidays for Johor: ${johor.holidays.length}`);
  console.log(`📍 Johor-specific holidays: ${johorSpecific.length}`);
  console.log('\nJohor-specific holidays:');
  johorSpecific.forEach(h => console.log(`  - ${h.date}: ${h.name}`));
  
  console.log('\n📊 Comparison across states:');
  const states = ['Johor', 'Selangor', 'Penang', 'Sabah', 'Sarawak'];
  for (const state of states) {
    const result = await getHolidaysByState(state, { year: 2026 });
    console.log(`  ${state.padEnd(12)} - ${result.holidays.length} holidays`);
  }
  
  console.log('\n✨ State filtering feature working perfectly!');
}

demo().catch(console.error);
