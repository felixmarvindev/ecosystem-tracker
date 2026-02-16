/**
 * API orchestration service.
 *
 * Coordinates data fetching from OSM and GBIF with caching
 * and automatic fallback to mock data on failure.
 */

import { fetchProtectedAreas } from "./osm.service";
import { fetchBiodiversityData } from "./gbif.service";
import { cacheService } from "./cache.service";
import { calculateBiodiversityIndex } from "@/utils/calculations";
import { mockSites } from "@/data/mockSites";
import type { Site } from "@/types";

const SITES_CACHE_KEY = "restoration-sites-v1";
const GBIF_CACHE_PREFIX = "gbif-";

// 24-hour TTL for site boundaries (they rarely change)
const SITES_TTL = 24 * 60 * 60 * 1000;
// 6-hour TTL for biodiversity data (more dynamic)
const GBIF_TTL = 6 * 60 * 60 * 1000;

/**
 * Main entry point: fetch sites with real data, enriched with biodiversity.
 * Falls back to mock data if the OSM request fails.
 */
export async function fetchSites(): Promise<Site[]> {
  // 1. Try cache first
  const cached = cacheService.get<Site[]>(SITES_CACHE_KEY);
  if (cached) {
    console.log("[API] Returning cached sites");
    return cached;
  }

  // 2. Fetch real sites from OSM
  let sites: Site[];
  try {
    console.log("[API] Fetching sites from OSM Overpass…");
    sites = await fetchProtectedAreas(12);

    if (sites.length === 0) {
      console.warn("[API] OSM returned 0 sites, using mock data");
      sites = mockSites;
    }
  } catch (err) {
    console.error("[API] OSM fetch failed, falling back to mock data:", err);
    sites = mockSites;
  }

  // 3. Enrich with GBIF biodiversity data
  const enriched = await enrichWithBiodiversity(sites);

  // 4. Cache the enriched result
  if (enriched.some((s) => s.properties.source === "OSM")) {
    cacheService.set(SITES_CACHE_KEY, enriched, SITES_TTL);
  }

  return enriched;
}

/**
 * Enrich each site with species and observation data from GBIF.
 * Failures for individual sites are silently caught — the site
 * keeps its default zero metrics.
 */
async function enrichWithBiodiversity(sites: Site[]): Promise<Site[]> {
  console.log(`[API] Enriching ${sites.length} sites with GBIF data…`);

  const results = await Promise.allSettled(
    sites.map(async (site): Promise<Site> => {
      const gbifKey = `${GBIF_CACHE_PREFIX}${site.id}`;

      // Check GBIF cache
      const cachedBio = cacheService.get<{ speciesCount: number; totalObservations: number }>(gbifKey);

      let speciesCount: number;
      let totalObservations: number;

      if (cachedBio) {
        speciesCount = cachedBio.speciesCount;
        totalObservations = cachedBio.totalObservations;
      } else {
        try {
          const bio = await fetchBiodiversityData(site.geometry);
          speciesCount = bio.speciesCount;
          totalObservations = bio.totalObservations;

          cacheService.set(gbifKey, { speciesCount, totalObservations }, GBIF_TTL);
        } catch (err) {
          console.warn(`[API] GBIF failed for ${site.properties.name}:`, err);
          return site; // return un-enriched
        }
      }

      const biodiversityIndex = calculateBiodiversityIndex(
        speciesCount,
        site.properties.areaHectares,
      );

      return {
        ...site,
        properties: {
          ...site.properties,
          metrics: {
            ...site.properties.metrics,
            speciesCount,
            totalObservations,
            biodiversityIndex,
          },
        },
      };
    }),
  );

  return results.map((r, i) => (r.status === "fulfilled" ? r.value : sites[i]));
}

/**
 * Force-clear the cache and re-fetch everything.
 */
export async function refreshSites(): Promise<Site[]> {
  cacheService.remove(SITES_CACHE_KEY);
  return fetchSites();
}
