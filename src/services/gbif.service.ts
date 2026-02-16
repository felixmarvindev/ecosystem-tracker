/**
 * GBIF (Global Biodiversity Information Facility) API integration.
 * Fetches real species observation data for a given polygon bounding box.
 */

import * as turf from "@turf/turf";

const GBIF_API = "https://api.gbif.org/v1";

export interface BiodiversityData {
  speciesCount: number;
  totalObservations: number;
  endemicSpecies: number;
}

/**
 * Fetch biodiversity data for a single polygon from GBIF.
 *
 * Uses the bounding box of the polygon to query occurrence records
 * filtered to Kenya, then extracts unique species counts.
 */
export async function fetchBiodiversityData(
  polygon: GeoJSON.Polygon,
): Promise<BiodiversityData> {
  const [minLng, minLat, maxLng, maxLat] = turf.bbox(turf.polygon(polygon.coordinates));

  const url =
    `${GBIF_API}/occurrence/search?` +
    `country=KE&` +
    `decimalLatitude=${minLat},${maxLat}&` +
    `decimalLongitude=${minLng},${maxLng}&` +
    `limit=100`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`GBIF API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Extract unique species from results
  const uniqueSpecies = new Set<string>(
    (data.results ?? [])
      .filter((r: Record<string, unknown>) => r.species)
      .map((r: Record<string, unknown>) => r.species as string),
  );

  // Rough endemic estimate (~15 % of observed species)
  const endemicCount = Math.round(uniqueSpecies.size * 0.15);

  return {
    speciesCount: uniqueSpecies.size,
    totalObservations: data.count ?? 0,
    endemicSpecies: endemicCount,
  };
}
