#!/usr/bin/env node

import {
  getHolidays,
  getNextHoliday,
  getHolidaysByState,
  clearCache,
} from "./scraper";

const args = process.argv.slice(2);

async function main() {
  const command = args[0];

  try {
    switch (command) {
      case "list": {
        const year = args[1] ? parseInt(args[1]) : new Date().getFullYear();
        const result = await getHolidays({ year });

        process.stdout.write(`\nMalaysia Holidays ${year}\n`);
        process.stdout.write("=".repeat(50) + "\n\n");

        result.holidays.forEach((holiday) => {
          process.stdout.write(
            `${holiday.date} (${holiday.dayOfWeek}) - ${holiday.name}\n`,
          );
        });

        process.stdout.write(`\nTotal: ${result.holidays.length} holidays\n`);
        process.stdout.write(`Source: ${result.source}\n`);
        break;
      }

      case "next": {
        const holiday = await getNextHoliday();
        if (holiday) {
          process.stdout.write(`\nNext Holiday:\n`);
          process.stdout.write(
            `${holiday.date} (${holiday.dayOfWeek}) - ${holiday.name}\n\n`,
          );
        } else {
          process.stdout.write("No upcoming holidays found.\n");
        }
        break;
      }

      case "state": {
        const state = args[1];
        if (!state) {
          process.stdout.write("Error: Please specify a state name.\n");
          process.stdout.write("Example: malaysia-holiday state Johor\n");
          break;
        }

        const year = args[2] ? parseInt(args[2]) : new Date().getFullYear();
        const result = await getHolidaysByState(state, { year });

        process.stdout.write(`\nHolidays for ${state} in ${year}\n`);
        process.stdout.write("=".repeat(50) + "\n\n");

        result.holidays.forEach((holiday) => {
          const stateInfo = holiday.states
            ? ` [${holiday.states.join(", ")}]`
            : "";
          process.stdout.write(
            `${holiday.date} (${holiday.dayOfWeek}) - ${holiday.name}${stateInfo}\n`,
          );
        });

        process.stdout.write(`\nTotal: ${result.holidays.length} holidays\n`);
        process.stdout.write(`Source: ${result.source}\n`);
        break;
      }

      case "clear-cache": {
        clearCache();
        process.stdout.write("Cache cleared successfully.\n");
        break;
      }

      case "help":
      default: {
        process.stdout.write(`
Malaysia Holiday CLI

Usage:
  malaysia-holiday list [year]           List all holidays for a year (default: current year)
  malaysia-holiday state <state> [year]  List holidays for a specific state (default: current year)
  malaysia-holiday next                  Get the next upcoming holiday
  malaysia-holiday clear-cache           Clear the cache
  malaysia-holiday help                  Show this help message

Available States:
  Johor, Kedah, Kelantan, Melaka, Negeri Sembilan, Pahang, Penang,
  Perak, Perlis, Sabah, Sarawak, Selangor, Terengganu,
  Kuala Lumpur, Labuan, Putrajaya

Examples:
  malaysia-holiday list 2026
  malaysia-holiday state Johor 2026
  malaysia-holiday state "Kuala Lumpur"
  malaysia-holiday next

`);
        break;
      }
    }
  } catch (error) {
    process.stderr.write(
      `Error: ${error instanceof Error ? error.message : String(error)}\n`,
    );
    process.exit(1);
  }
}

main();
