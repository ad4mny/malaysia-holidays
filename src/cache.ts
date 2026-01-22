import * as fs from "fs";
import * as path from "path";
import * as os from "os";

const CACHE_DIR = path.join(os.tmpdir(), "malaysia-holiday-cache");
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export class Cache {
  private cacheDir: string;

  constructor(customDir?: string) {
    this.cacheDir = customDir || CACHE_DIR;
    this.ensureCacheDir();
  }

  private ensureCacheDir(): void {
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  getCacheKey(key: number | string): string {
    return `malaysia-holidays-${key}.json`;
  }

  getCachePath(key: number | string): string {
    return path.join(this.cacheDir, this.getCacheKey(key));
  }

  has(key: number | string): boolean {
    const cachePath = this.getCachePath(key);
    if (!fs.existsSync(cachePath)) {
      return false;
    }

    const stats = fs.statSync(cachePath);
    const age = Date.now() - stats.mtimeMs;

    if (age > CACHE_DURATION) {
      // Cache expired, delete it
      fs.unlinkSync(cachePath);
      return false;
    }

    return true;
  }

  get<T>(key: number | string): T | null {
    if (!this.has(key)) {
      return null;
    }

    try {
      const cachePath = this.getCachePath(key);
      const data = fs.readFileSync(cachePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }

  set<T>(key: number | string, data: T): void {
    try {
      const cachePath = this.getCachePath(key);
      fs.writeFileSync(cachePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
      process.stderr.write(`Failed to write cache: ${error}\n`);
    }
  }

  clear(): void {
    try {
      if (fs.existsSync(this.cacheDir)) {
        const files = fs.readdirSync(this.cacheDir);
        files.forEach((file: string) => {
          if (file.startsWith("malaysia-holidays-")) {
            fs.unlinkSync(path.join(this.cacheDir, file));
          }
        });
      }
    } catch (error) {
      process.stderr.write(`Failed to clear cache: ${error}\n`);
    }
  }
}
