/**
 * Export an array of Site features as a downloadable .geojson file.
 */
import type { Site } from "@/types";

export function downloadGeoJSON(sites: Site[], filename = "restoration-sites.geojson") {
  const featureCollection = {
    type: "FeatureCollection" as const,
    features: sites.map((site) => ({
      type: "Feature" as const,
      id: site.id,
      geometry: site.geometry,
      properties: {
        name: site.properties.name,
        restorationType: site.properties.restorationType,
        year: site.properties.year,
        county: site.properties.county,
        areaHectares: site.properties.areaHectares,
        treesPlanted: site.properties.metrics.treesPlanted,
        survivalRate: site.properties.metrics.survivalRate,
        co2SequesteredTonnes: site.properties.metrics.co2SequesteredTonnes,
        speciesCount: site.properties.metrics.speciesCount,
        totalObservations: site.properties.metrics.totalObservations,
        biodiversityIndex: site.properties.metrics.biodiversityIndex,
        source: site.properties.source,
      },
    })),
  };

  const blob = new Blob([JSON.stringify(featureCollection, null, 2)], {
    type: "application/geo+json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
