/**
 * OpenStreetMap Overpass API integration.
 * Fetches real protected area polygons in Kenya and converts them
 * to our Site GeoJSON format.
 */

import * as turf from "@turf/turf";
import type { Site, RestorationType } from "@/types";
import {
  estimateTreesPlanted,
  estimateSurvivalRate,
  estimateCO2Sequestered,
} from "@/utils/calculations";

// ---- OSM response types ----

interface OSMNode {
  lat: number;
  lon: number;
}

interface OSMMember {
  type: string;
  ref: number;
  role: string;
  geometry?: OSMNode[];
}

interface OSMElement {
  type: string;
  id: number;
  tags: Record<string, string>;
  geometry?: OSMNode[];
  members?: OSMMember[];
}

interface OSMResponse {
  elements: OSMElement[];
}

// ---- Public API ----

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

/**
 * Fetch protected areas in Kenya from the Overpass API.
 * Returns up to `limit` sites as GeoJSON Features.
 */
export async function fetchProtectedAreas(limit = 12): Promise<Site[]> {
  const query = `
    [out:json][timeout:25];
    area["ISO3166-1"="KE"]->.searchArea;
    (
      way["boundary"="protected_area"]["name"](area.searchArea);
      relation["boundary"="protected_area"]["name"](area.searchArea);
    );
    out geom;
  `;

  const response = await fetch(OVERPASS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `data=${encodeURIComponent(query)}`,
  });

  if (!response.ok) {
    throw new Error(`OSM Overpass API error: ${response.status} ${response.statusText}`);
  }

  const data: OSMResponse = await response.json();
  console.log(`[OSM] Received ${data.elements.length} elements`);

  return osmToSites(data).slice(0, limit);
}

// ---- Internal helpers ----

function osmToSites(osmData: OSMResponse): Site[] {
  const sites: Site[] = [];

  for (const element of osmData.elements) {
    if (!element.geometry && !element.members) continue;
    if (!element.tags.name) continue;

    try {
      const coordinates = extractCoordinates(element);
      if (!coordinates || coordinates.length < 4) continue;

      const polygon: GeoJSON.Polygon = {
        type: "Polygon",
        coordinates: [coordinates],
      };

      // Calculate area in hectares using turf
      const areaM2 = turf.area(turf.polygon([coordinates]));
      const areaHectares = Number((areaM2 / 10_000).toFixed(2));

      // Skip very small (< 10 ha) or very large (> 100 000 ha) areas
      if (areaHectares < 10 || areaHectares > 100_000) continue;

      const restorationType = classifyType(element.tags, areaHectares);
      const year = 2020; // default restoration start year
      const treesPlanted = estimateTreesPlanted(areaHectares, restorationType);
      const survivalRate = estimateSurvivalRate(restorationType);
      const yearsActive = new Date().getFullYear() - year;
      const co2Tonnes = estimateCO2Sequestered(treesPlanted, survivalRate, yearsActive);

      sites.push({
        type: "Feature",
        id: `osm-${element.id}`,
        geometry: polygon,
        properties: {
          name: element.tags.name,
          restorationType,
          year,
          county: element.tags["addr:county"] ?? "",
          areaHectares,
          metrics: {
            speciesCount: 0,         // enriched later by GBIF
            totalObservations: 0,    // enriched later by GBIF
            treesPlanted,
            survivalRate,
            co2SequesteredTonnes: co2Tonnes,
            biodiversityIndex: 0,    // calculated after GBIF
          },
          source: "OSM",
        },
      });
    } catch (err) {
      console.warn(`[OSM] Skipping element ${element.id}:`, err);
    }
  }

  return sites;
}

function extractCoordinates(element: OSMElement): number[][] | null {
  // For ways — geometry is directly on the element
  if (element.geometry) {
    const coords = element.geometry.map((n) => [n.lon, n.lat]);
    ensureClosed(coords);
    return coords;
  }

  // For relations — use the first outer member
  if (element.members) {
    const outer = element.members.find((m) => m.role === "outer" && m.geometry);
    if (outer?.geometry) {
      const coords = outer.geometry.map((n) => [n.lon, n.lat]);
      ensureClosed(coords);
      return coords;
    }
  }

  return null;
}

/** Ensure a coordinate ring is closed (first == last). */
function ensureClosed(coords: number[][]): void {
  const first = coords[0];
  const last = coords[coords.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) {
    coords.push([...first]);
  }
}

function classifyType(tags: Record<string, string>, areaHectares: number): RestorationType {
  const name = (tags.name ?? "").toLowerCase();

  if (name.includes("mangrove")) return "MANGROVE";
  if (name.includes("mountain") || name.includes("highland")) return "MOUNTAIN_FOREST";
  if (name.includes("dryland") || name.includes("arid")) return "DRYLAND";
  if (name.includes("forest") || name.includes("woodland")) return "FOREST";

  const protectClass = parseInt(tags.protect_class ?? "", 10);
  if (!isNaN(protectClass) && protectClass <= 2) return "FOREST";

  if (areaHectares > 1_000) return "FOREST";

  return "PROTECTED_AREA";
}
