/**
 * News service — fetches real news about restoration/conservation for a site's area.
 * Uses NewsAPI.org (free tier). Results cached for 6 hours.
 */

const NEWS_API_URL = "https://newsapi.org/v2/everything";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

export interface NewsArticle {
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  description: string | null;
  urlToImage: string | null;
}

interface CacheEntry {
  articles: NewsArticle[];
  expiresAt: number;
}

const cache = new Map<string, CacheEntry>();

function isNewsConfigured(): boolean {
  return Boolean(import.meta.env.VITE_NEWS_API_KEY);
}

function normalizeCacheKey(siteName: string, county: string): string {
  return `news_${(county || siteName || "kenya").toLowerCase().replace(/\s+/g, "_")}`;
}

function mapArticle(item: {
  title?: string;
  source?: { name?: string };
  url?: string;
  publishedAt?: string;
  description?: string;
  urlToImage?: string;
}): NewsArticle {
  return {
    title: item.title ?? "",
    source: item.source?.name ?? "Unknown",
    url: item.url ?? "",
    publishedAt: item.publishedAt ?? "",
    description: item.description ?? null,
    urlToImage: item.urlToImage ?? null,
  };
}

/**
 * Fetch news articles related to the site's area (county/site name) and restoration/conservation.
 * Falls back to broader "Kenya restoration" search if no key or no results.
 * Returns up to 5 articles. Cached for 6 hours.
 */
export async function fetchSiteNews(
  siteName: string,
  county: string,
): Promise<NewsArticle[]> {
  const cacheKey = normalizeCacheKey(siteName, county);
  const cached = cache.get(cacheKey);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.articles;
  }

  if (!isNewsConfigured()) {
    return [];
  }

  const apiKey = import.meta.env.VITE_NEWS_API_KEY as string;

  // Try: county + restoration/conservation terms
  const location = county?.trim() || siteName?.trim() || "Kenya";
  const queries = [
    `"${location}" (restoration OR conservation OR forest OR environment)`,
    `Kenya restoration OR Kenya conservation`,
  ];

  for (const q of queries) {
    const params = new URLSearchParams({
      q,
      apiKey,
      language: "en",
      sortBy: "publishedAt",
      pageSize: "5",
    });

    const res = await fetch(`${NEWS_API_URL}?${params}`);
    if (!res.ok) continue;

    const data = await res.json();
    const articles = (data.articles ?? []).filter(
      (a: { title?: string }) => a?.title,
    );

    if (articles.length > 0) {
      const mapped = articles.slice(0, 5).map(mapArticle);
      cache.set(cacheKey, {
        articles: mapped,
        expiresAt: Date.now() + CACHE_TTL_MS,
      });
      return mapped;
    }
  }

  cache.set(cacheKey, { articles: [], expiresAt: Date.now() + CACHE_TTL_MS });
  return [];
}
