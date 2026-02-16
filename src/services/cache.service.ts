/**
 * LocalStorage caching service with TTL support.
 * Prevents excessive API calls to OSM Overpass and GBIF by caching
 * responses for 24 hours.
 */

const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours in ms

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export class CacheService {
  private memoryCache = new Map<string, CacheEntry<unknown>>();

  /**
   * Retrieve a cached value. Checks memory first, then localStorage.
   * Returns null if the entry is missing or expired.
   */
  get<T>(key: string): T | null {
    // 1. Check memory cache
    const memEntry = this.memoryCache.get(key) as CacheEntry<T> | undefined;
    if (memEntry && !this.isExpired(memEntry)) {
      return memEntry.data;
    }

    // 2. Check localStorage
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;

      const entry: CacheEntry<T> = JSON.parse(raw);
      if (this.isExpired(entry)) {
        localStorage.removeItem(key);
        this.memoryCache.delete(key);
        return null;
      }

      // Hydrate memory cache from localStorage
      this.memoryCache.set(key, entry);
      return entry.data;
    } catch {
      return null;
    }
  }

  /**
   * Store a value in both memory and localStorage with a TTL.
   */
  set<T>(key: string, data: T, ttl: number = DEFAULT_TTL): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
    };

    this.memoryCache.set(key, entry);

    try {
      localStorage.setItem(key, JSON.stringify(entry));
    } catch (err) {
      // localStorage may be full or unavailable — memory cache still works
      console.warn("Cache: failed to persist to localStorage", err);
    }
  }

  /**
   * Remove a specific cache entry.
   */
  remove(key: string): void {
    this.memoryCache.delete(key);
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }

  /**
   * Clear all cache entries managed by this service.
   */
  clear(): void {
    this.memoryCache.clear();
  }

  private isExpired(entry: CacheEntry<unknown>): boolean {
    return Date.now() - entry.timestamp > entry.ttl;
  }
}

export const cacheService = new CacheService();
