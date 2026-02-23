import { useEffect, useRef, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import { useMap } from "@/context/MapContext";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

const KENYA_BOUNDS: mapboxgl.LngLatBoundsLike = [
  [33.9, -5.0],
  [41.9, 4.6],
];

const TYPE_COLORS: Record<string, string> = {
  MANGROVE: "#2E7D32",
  FOREST: "#388E3C",
  DRYLAND: "#F57C00",
  MOUNTAIN_FOREST: "#558B2F",
  PROTECTED_AREA: "#66BB6A",
};

const STYLE_OUTDOORS = "mapbox://styles/mapbox/outdoors-v12";
const STYLE_SATELLITE = "mapbox://styles/mapbox/satellite-streets-v12";

export function MapView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const isFirstMount = useRef(true);

  const {
    filteredSites,
    selectedSiteId,
    showSatellite,
    setSelectedSiteId,
    zoomToSiteId,
    setZoomToSiteId,
  } = useMap();

  // Keep latest values in refs so map callbacks always have current data
  const filteredSitesRef = useRef(filteredSites);
  filteredSitesRef.current = filteredSites;

  const selectedSiteIdRef = useRef(selectedSiteId);
  selectedSiteIdRef.current = selectedSiteId;

  const setSelectedSiteIdRef = useRef(setSelectedSiteId);
  setSelectedSiteIdRef.current = setSelectedSiteId;

  // ----------------------------------------------------------------
  // Build centroid GeoJSON from current sites
  // ----------------------------------------------------------------
  const buildCentroids = useCallback(() => {
    return {
      type: "FeatureCollection" as const,
      features: filteredSitesRef.current.map((site) => {
        const centroid = turf.centroid(turf.polygon(site.geometry.coordinates));
        return {
          type: "Feature" as const,
          geometry: centroid.geometry,
          properties: {
            name: site.properties.name,
            restorationType: site.properties.restorationType,
            siteId: site.id,
          },
        };
      }),
    };
  }, []);

  /**
   * Remove any existing site layers/sources, then re-add them.
   * Also adds centroid pin markers for sites that are tiny at zoom-out.
   */
  const addSiteLayers = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clean up previous layers/sources
    const layersToRemove = [
      "selected-outline",
      "sites-fill",
      "sites-outline",
      "site-pins",
      "site-pin-labels",
    ];
    for (const id of layersToRemove) {
      if (map.getLayer(id)) map.removeLayer(id);
    }
    const sourcesToRemove = ["selected", "sites", "site-centroids"];
    for (const id of sourcesToRemove) {
      if (map.getSource(id)) map.removeSource(id);
    }

    const features = filteredSitesRef.current;
    if (features.length === 0) return;

    // ---- Polygon source + layers ----
    map.addSource("sites", {
      type: "geojson",
      data: { type: "FeatureCollection", features },
    });

    map.addLayer({
      id: "sites-fill",
      type: "fill",
      source: "sites",
      paint: {
        "fill-color": [
          "match",
          ["get", "restorationType"],
          "MANGROVE", TYPE_COLORS.MANGROVE,
          "DRYLAND", TYPE_COLORS.DRYLAND,
          "FOREST", TYPE_COLORS.FOREST,
          "MOUNTAIN_FOREST", TYPE_COLORS.MOUNTAIN_FOREST,
          "PROTECTED_AREA", TYPE_COLORS.PROTECTED_AREA,
          "#757575",
        ],
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          0.75,
          0.55,
        ],
      },
    });

    map.addLayer({
      id: "sites-outline",
      type: "line",
      source: "sites",
      paint: {
        "line-color": "#1B5E20",
        "line-width": 1.5,
      },
    });

    // ---- Centroid pin markers ----
    map.addSource("site-centroids", {
      type: "geojson",
      data: buildCentroids(),
    });

    map.addLayer({
      id: "site-pins",
      type: "circle",
      source: "site-centroids",
      paint: {
        "circle-radius": [
          "interpolate", ["linear"], ["zoom"],
          4, 8,    // large pins when zoomed out
          8, 6,    // medium at mid-zoom
          12, 3,   // small when polygons are visible
        ],
        "circle-color": [
          "match",
          ["get", "restorationType"],
          "MANGROVE", TYPE_COLORS.MANGROVE,
          "DRYLAND", TYPE_COLORS.DRYLAND,
          "FOREST", TYPE_COLORS.FOREST,
          "MOUNTAIN_FOREST", TYPE_COLORS.MOUNTAIN_FOREST,
          "PROTECTED_AREA", TYPE_COLORS.PROTECTED_AREA,
          "#757575",
        ],
        "circle-stroke-color": "#fff",
        "circle-stroke-width": [
          "interpolate", ["linear"], ["zoom"],
          4, 2.5,
          12, 1,
        ],
        "circle-opacity": [
          "interpolate", ["linear"], ["zoom"],
          4, 1,     // fully visible when zoomed out
          10, 0.8,
          13, 0,    // fade out when polygons are clearly visible
        ],
        "circle-stroke-opacity": [
          "interpolate", ["linear"], ["zoom"],
          4, 1,
          13, 0,
        ],
      },
    });

    // Site name labels next to pins (visible at mid-zoom)
    map.addLayer({
      id: "site-pin-labels",
      type: "symbol",
      source: "site-centroids",
      layout: {
        "text-field": ["get", "name"],
        "text-size": 11,
        "text-offset": [0, 1.5],
        "text-anchor": "top",
        "text-max-width": 12,
        "text-optional": true,
        "text-allow-overlap": false,
      },
      paint: {
        "text-color": "#1B5E20",
        "text-halo-color": "#fff",
        "text-halo-width": 1.5,
        "text-opacity": [
          "interpolate", ["linear"], ["zoom"],
          5, 0,
          7, 1,
          13, 0,
        ],
      },
    });

    // Re-add selected-site highlight if active
    const selId = selectedSiteIdRef.current;
    if (selId) {
      const selSite = filteredSitesRef.current.find((s) => s.id === selId);
      if (selSite) {
        map.addSource("selected", { type: "geojson", data: selSite });
        map.addLayer({
          id: "selected-outline",
          type: "line",
          source: "selected",
          paint: { "line-color": "#FFD700", "line-width": 3 },
        });
      }
    }
  }, [buildCentroids]);

  // ----------------------------------------------------------------
  // Initialise the map (runs once per mount)
  // ----------------------------------------------------------------
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const initialStyle = showSatellite ? STYLE_SATELLITE : STYLE_OUTDOORS;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: initialStyle,
      bounds: KENYA_BOUNDS,
      fitBoundsOptions: { padding: 40 },
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-left");

    // Persistent style.load handler
    map.on("style.load", () => {
      addSiteLayers();
    });

    // ---- Interaction handlers ----
    let hoveredId: string | number | null = null;

    // Click on polygon fill
    map.on("click", "sites-fill", (e) => {
      if (e.features?.[0]) {
        const clickedName = e.features[0].properties?.name;
        const site = filteredSitesRef.current.find(
          (s) => s.properties.name === clickedName,
        );
        setSelectedSiteIdRef.current(site?.id ?? null);
      }
    });

    // Click on centroid pin
    map.on("click", "site-pins", (e) => {
      if (e.features?.[0]?.properties?.siteId) {
        setSelectedSiteIdRef.current(e.features[0].properties.siteId);
      }
    });

    map.on("mouseenter", "sites-fill", () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseenter", "site-pins", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mousemove", "sites-fill", (e) => {
      if (hoveredId !== null) {
        map.setFeatureState({ source: "sites", id: hoveredId }, { hover: false });
      }
      if (e.features?.[0]?.id != null) {
        hoveredId = e.features[0].id;
        map.setFeatureState({ source: "sites", id: hoveredId }, { hover: true });
      }
    });

    map.on("mouseleave", "sites-fill", () => {
      if (hoveredId !== null) {
        map.setFeatureState({ source: "sites", id: hoveredId }, { hover: false });
      }
      hoveredId = null;
      map.getCanvas().style.cursor = "";
    });
    map.on("mouseleave", "site-pins", () => {
      map.getCanvas().style.cursor = "";
    });

    mapRef.current = map;
    isFirstMount.current = true;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------
  // Satellite / Map style toggle (skip on initial mount)
  // ----------------------------------------------------------------
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const map = mapRef.current;
    if (!map) return;
    map.setStyle(showSatellite ? STYLE_SATELLITE : STYLE_OUTDOORS);
  }, [showSatellite]);

  // ----------------------------------------------------------------
  // Update GeoJSON data when filtered sites change
  // ----------------------------------------------------------------
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const sitesSource = map.getSource("sites") as mapboxgl.GeoJSONSource | undefined;
    const centroidSource = map.getSource("site-centroids") as mapboxgl.GeoJSONSource | undefined;

    if (sitesSource && centroidSource) {
      sitesSource.setData({ type: "FeatureCollection", features: filteredSites });
      centroidSource.setData(buildCentroids());
    } else {
      addSiteLayers();
    }
  }, [filteredSites, addSiteLayers, buildCentroids]);

  // ----------------------------------------------------------------
  // Zoom to site (triggered by search bar or programmatic)
  // ----------------------------------------------------------------
  useEffect(() => {
    if (!zoomToSiteId) return;

    const map = mapRef.current;
    if (!map) return;

    const site = filteredSitesRef.current.find((s) => s.id === zoomToSiteId);
    if (!site) return;

    const bbox = turf.bbox(turf.polygon(site.geometry.coordinates));
    map.fitBounds(
      [[bbox[0], bbox[1]], [bbox[2], bbox[3]]] as mapboxgl.LngLatBoundsLike,
      { padding: 120, maxZoom: 13, duration: 1200 },
    );

    // Clear the zoom request so it can be triggered again
    setZoomToSiteId(null);
  }, [zoomToSiteId, setZoomToSiteId, filteredSites]);

  // ----------------------------------------------------------------
  // Selected-site highlight
  // ----------------------------------------------------------------
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    if (map.getLayer("selected-outline")) map.removeLayer("selected-outline");
    if (map.getSource("selected")) map.removeSource("selected");

    if (!selectedSiteId) return;

    const site = filteredSites.find((s) => s.id === selectedSiteId);
    if (!site) return;

    map.addSource("selected", { type: "geojson", data: site });
    map.addLayer({
      id: "selected-outline",
      type: "line",
      source: "selected",
      paint: { "line-color": "#FFD700", "line-width": 3 },
    });
  }, [selectedSiteId, filteredSites]);

  return <div ref={containerRef} className="w-full h-full" />;
}
