import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import type { Site } from "@/types";
import * as turf from "@turf/turf";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

const TYPE_COLORS: Record<string, string> = {
  MANGROVE: "#2E7D32",
  FOREST: "#388E3C",
  DRYLAND: "#F57C00",
  MOUNTAIN_FOREST: "#558B2F",
  PROTECTED_AREA: "#66BB6A",
};

interface SiteMiniMapProps {
  site: Site;
  satellite?: boolean;
  className?: string;
}

/**
 * A focused, non-interactive Mapbox map that shows a single site polygon.
 * Automatically fits the bounds to the site with appropriate padding.
 */
export function SiteMiniMap({ site, satellite = false, className = "" }: SiteMiniMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    // Compute bounding box for the site
    const bbox = turf.bbox(turf.polygon(site.geometry.coordinates));

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: satellite
        ? "mapbox://styles/mapbox/satellite-streets-v12"
        : "mapbox://styles/mapbox/outdoors-v12",
      bounds: [
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]],
      ] as mapboxgl.LngLatBoundsLike,
      fitBoundsOptions: { padding: 60 },
      interactive: true,
      attributionControl: false,
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-right");

    map.on("style.load", () => {
      // Site polygon fill
      map.addSource("site", {
        type: "geojson",
        data: site,
      });

      map.addLayer({
        id: "site-fill",
        type: "fill",
        source: "site",
        paint: {
          "fill-color": TYPE_COLORS[site.properties.restorationType] ?? "#757575",
          "fill-opacity": 0.35,
        },
      });

      map.addLayer({
        id: "site-outline",
        type: "line",
        source: "site",
        paint: {
          "line-color": TYPE_COLORS[site.properties.restorationType] ?? "#757575",
          "line-width": 3,
        },
      });

      // Add centroid marker
      const centroid = turf.centroid(turf.polygon(site.geometry.coordinates));
      const [lng, lat] = centroid.geometry.coordinates;

      new mapboxgl.Marker({ color: TYPE_COLORS[site.properties.restorationType] ?? "#757575" })
        .setLngLat([lng, lat])
        .addTo(map);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [site.id, satellite]);

  return (
    <div className={`rounded-xl overflow-hidden border shadow-sm ${className}`}>
      <div ref={containerRef} className="w-full h-full min-h-[300px]" />
    </div>
  );
}
