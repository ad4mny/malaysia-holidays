export interface Holiday {
  date: string;
  name: string;
  dayOfWeek: string;
  type: "national" | "state" | "observance";
  states?: string[];
}

export interface HolidayOptions {
  year?: number;
  useCache?: boolean;
  cacheDir?: string;
}

export interface HolidayResult {
  holidays: Holiday[];
  year: number;
  fetchedAt: Date;
  source: string;
}
