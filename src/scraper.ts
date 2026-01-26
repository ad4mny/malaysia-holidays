import * as https from "https";
import type { IncomingMessage } from "http";
import { Holiday, HolidayOptions, HolidayResult } from "./types";
import { Cache } from "./cache";

const BASE_URL = "https://www.officeholidays.com/countries/malaysia";

/**
 * Fetch HTML content from a URL using native https module
 */
function fetchHtml(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res: IncomingMessage) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
          return;
        }

        let data = "";
        res.on("data", (chunk: Buffer) => {
          data += chunk;
        });

        res.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (err: Error) => {
        reject(err);
      });
  });
}

/**
 * Extract text content from HTML element
 */
function extractText(html: string): string {
  return html
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/&nbsp;/g, " ") // Replace &nbsp; with space
    .replace(/&amp;/g, "&") // Replace &amp; with &
    .replace(/&lt;/g, "<") // Replace &lt; with <
    .replace(/&gt;/g, ">") // Replace &gt; with >
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&#039;/g, "'") // Replace &#039; with '
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10))) // Replace numeric entities
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16)),
    ) // Replace hex entities
    .trim();
}

/**
 * Parse holiday data from HTML
 */
function parseHolidays(html: string, year: number): Holiday[] {
  const holidays: Holiday[] = [];

  // Extract table rows using regex
  const tableMatch = html.match(/<table[^>]*>([\s\S]*?)<\/table>/i);
  if (!tableMatch) return holidays;

  const tableContent = tableMatch[1];
  const rowMatches = tableContent.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);

  for (const rowMatch of rowMatches) {
    const rowHtml = rowMatch[1];
    const cellMatches = [...rowHtml.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)];

    if (cellMatches.length >= 3) {
      const dayOfWeek = extractText(cellMatches[0][1]);
      const dateText = extractText(cellMatches[1][1]);
      const name = extractText(cellMatches[2][1]);

      if (dayOfWeek && dateText && name) {
        // Parse date (e.g., "Jan 01" -> "2026-01-01")
        const [month, day] = dateText.split(" ");
        const monthMap: { [key: string]: string } = {
          Jan: "01",
          Feb: "02",
          Mar: "03",
          Apr: "04",
          May: "05",
          Jun: "06",
          Jul: "07",
          Aug: "08",
          Sep: "09",
          Oct: "10",
          Nov: "11",
          Dec: "12",
        };

        const monthNum = monthMap[month];
        if (monthNum) {
          const date = `${year}-${monthNum}-${day.padStart(2, "0")}`;

          // Determine type and extract state information
          let type: "national" | "state" | "observance" = "national";
          const nameLower = name.toLowerCase();
          let states: string[] | undefined;

          // Extract state information from holiday name
          if (nameLower.includes("sultan of johor")) {
            type = "state";
            states = ["Johor"];
          } else if (nameLower.includes("sultan of kedah")) {
            type = "state";
            states = ["Kedah"];
          } else if (nameLower.includes("sultan of kelantan")) {
            type = "state";
            states = ["Kelantan"];
          } else if (nameLower.includes("sultan of negeri sembilan")) {
            type = "state";
            states = ["Negeri Sembilan"];
          } else if (nameLower.includes("sultan of pahang")) {
            type = "state";
            states = ["Pahang"];
          } else if (nameLower.includes("sultan of perak")) {
            type = "state";
            states = ["Perak"];
          } else if (nameLower.includes("sultan of selangor")) {
            type = "state";
            states = ["Selangor"];
          } else if (nameLower.includes("sultan of terengganu")) {
            type = "state";
            states = ["Terengganu"];
          } else if (nameLower.includes("raja of perlis")) {
            type = "state";
            states = ["Perlis"];
          } else if (nameLower.includes("governor of sabah")) {
            type = "state";
            states = ["Sabah"];
          } else if (
            nameLower.includes("governor of sarawak") ||
            nameLower.includes("sarawak day")
          ) {
            type = "state";
            states = ["Sarawak"];
          } else if (
            nameLower.includes("governor of penang") ||
            nameLower.includes("george town")
          ) {
            type = "state";
            states = ["Penang"];
          } else if (
            nameLower.includes("governor of melaka") ||
            nameLower.includes("melaka") ||
            nameLower.includes("malacca")
          ) {
            type = "state";
            states = ["Melaka"];
          } else if (
            nameLower.includes("federal territory") ||
            nameLower.includes("kuala lumpur") ||
            nameLower.includes("labuan") ||
            nameLower.includes("putrajaya")
          ) {
            type = "state";
            states = ["Kuala Lumpur", "Labuan", "Putrajaya"];
          } else if (nameLower.includes("pesta kaamatan")) {
            type = "state";
            states = ["Sabah"];
          } else if (nameLower.includes("gawai")) {
            type = "state";
            states = ["Sarawak"];
          } else if (
            nameLower.includes("birthday of the sultan") ||
            nameLower.includes("birthday of the governor") ||
            nameLower.includes("birthday of the raja")
          ) {
            type = "state";
          }

          holidays.push({
            date,
            name,
            dayOfWeek,
            type,
            ...(states && { states }),
          });
        }
      }
    }
  }

  return holidays;
}

/**
 * Get Malaysia holidays for a specific year
 */
export async function getHolidays(
  options: HolidayOptions = {},
): Promise<HolidayResult> {
  const year = options.year || new Date().getFullYear();
  const useCache = options.useCache !== false; // Default to true
  const cache = new Cache(options.cacheDir);

  // Check cache first
  if (useCache) {
    const cached = cache.get<HolidayResult>(year);
    if (cached) {
      return {
        ...cached,
        fetchedAt: new Date(cached.fetchedAt), // Convert string back to Date
      };
    }
  }

  // Fetch fresh data
  const url =
    year === new Date().getFullYear() ? BASE_URL : `${BASE_URL}/${year}`;

  try {
    const html = await fetchHtml(url);
    const holidays = parseHolidays(html, year);

    const result: HolidayResult = {
      holidays,
      year,
      fetchedAt: new Date(),
      source: url,
    };

    // Save to cache
    if (useCache) {
      cache.set(year, result);
    }

    return result;
  } catch (error) {
    throw new Error(
      `Failed to fetch holidays: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * Get holidays for the current year
 */
export async function getCurrentYearHolidays(
  options: Omit<HolidayOptions, "year"> = {},
): Promise<HolidayResult> {
  return getHolidays({ ...options, year: new Date().getFullYear() });
}

/**
 * Get next upcoming holiday
 */
export async function getNextHoliday(
  options: Omit<HolidayOptions, "year"> = {},
): Promise<Holiday | null> {
  const now = new Date();
  const currentYear = now.getFullYear();

  // Get current year holidays
  let result = await getHolidays({ ...options, year: currentYear });
  const today = now.toISOString().split("T")[0];

  // Find next holiday
  let nextHoliday = result.holidays.find((h) => h.date >= today);

  // If no holiday found in current year, try next year
  if (!nextHoliday) {
    result = await getHolidays({ ...options, year: currentYear + 1 });
    nextHoliday = result.holidays[0];
  }

  return nextHoliday || null;
}

/**
 * Check if a specific date is a holiday
 */
export async function isHoliday(
  date: string | Date,
  options: Omit<HolidayOptions, "year"> = {},
): Promise<boolean> {
  const dateStr =
    date instanceof Date ? date.toISOString().split("T")[0] : date;
  const year = parseInt(dateStr.split("-")[0]);

  const result = await getHolidays({ ...options, year });
  return result.holidays.some((h) => h.date === dateStr);
}

/**
 * Get holidays for a specific state/region
 */
export async function getHolidaysByState(
  state: string,
  options: HolidayOptions = {},
): Promise<HolidayResult> {
  const year = options.year || new Date().getFullYear();
  const useCache = options.useCache !== false; // Default to true
  const cache = new Cache(options.cacheDir);

  // Normalize state name for URL (lowercase, handle spaces)
  const stateUrlSegment = state.toLowerCase().trim().replace(/\s+/g, "-");

  // Build state-specific URL
  const url = `${BASE_URL}/${stateUrlSegment}/${year}`;

  // Check cache first (using a state-specific cache key)
  const cacheKey = `${year}-${stateUrlSegment}`;
  if (useCache) {
    const cached = cache.get<HolidayResult>(cacheKey);
    if (cached) {
      return {
        ...cached,
        fetchedAt: new Date(cached.fetchedAt), // Convert string back to Date
      };
    }
  }

  // Fetch fresh data from state-specific URL
  try {
    const html = await fetchHtml(url);
    const holidays = parseHolidays(html, year);

    const result: HolidayResult = {
      holidays,
      year,
      fetchedAt: new Date(),
      source: url,
    };

    // Save to cache with state-specific key
    if (useCache) {
      cache.set(cacheKey, result);
    }

    return result;
  } catch (error) {
    throw new Error(
      `Failed to fetch holidays for ${state}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * Clear cache
 */
export function clearCache(cacheDir?: string): void {
  const cache = new Cache(cacheDir);
  cache.clear();
}
