import {
  getHolidays,
  getNextHoliday,
  isHoliday,
  getCurrentYearHolidays,
  Holiday,
  HolidayResult,
} from "../dist/index";

async function demo() {
  // Type-safe usage with TypeScript
  const result: HolidayResult = await getHolidays({ year: 2026 });

  result.holidays.forEach((holiday: Holiday) => {
    console.log(`${holiday.date}: ${holiday.name} (${holiday.type})`);
  });

  const next: Holiday | null = await getNextHoliday();
  if (next) {
    console.log(`Next: ${next.name} on ${next.date}`);
  }

  const isCny: boolean = await isHoliday("2026-02-17");
  console.log(`Is Chinese New Year a holiday? ${isCny}`);
}

demo().catch(console.error);
