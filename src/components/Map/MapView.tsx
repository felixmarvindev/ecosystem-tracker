import { useEffect, useRef, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import { useMap } from "@/context/MapContext";
import {
  fetchSentinelImage,
  isSentinelConfigured,
} from "@/services/sentinel.service";

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
const NDVI_SOURCE_ID = "phase2-ndvi";
const NDVI_LAYER_ID = "phase2-ndvi-layer";
const KENYA_BBOX: [number, number, number, number] = [33.9, -5.0, 41.9, 4.6];

function clampBboxToKenya(
  bbox: [number, number, number, number],
): [number, number, number, number] {
  const west = Math.max(KENYA_BBOX[0], Math.min(KENYA_BBOX[2], bbox[0]));
  const south = Math.max(KENYA_BBOX[1], Math.min(KENYA_BBOX[3], bbox[1]));
  const east = Math.max(KENYA_BBOX[0], Math.min(KENYA_BBOX[2], bbox[2]));
  const north = Math.max(KENYA_BBOX[1], Math.min(KENYA_BBOX[3], bbox[3]));

  if (east <= west || north <= south) return KENYA_BBOX;
  return [west, south, east, north];
}

function recommendedSentinelSize(
  bbox: [number, number, number, number],
): number {
  const [west, south, east, north] = bbox;
  const centerLatRad = (((south + north) / 2) * Math.PI) / 180;
  const widthMeters = Math.abs(east - west) * 111_320 * Math.cos(centerLatRad);
  const heightMeters = Math.abs(north - south) * 110_540;
  // Keep <= 1500m/px for Sentinel-2 and cap to sane client payload.
  const minPixels = Math.ceil(Math.max(widthMeters, heightMeters) / 1_500);
  return Math.max(512, Math.min(2048, minPixels));
}

export function MapView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const isFirstMount = useRef(true);

  const {
    filteredSites,
    selectedSiteId,
    showSatellite,
    imageryLayer,
    layerOpacity,
    ndviMonth,
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

  const imageryLayerRef = useRef(imageryLayer);
  imageryLayerRef.current = imageryLayer;

  const layerOpacityRef = useRef(layerOpacity);
  layerOpacityRef.current = layerOpacity;

  const ndviMonthRef = useRef(ndviMonth);
  ndviMonthRef.current = ndviMonth;

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

    const opacityScale = Math.max(0, Math.min(1, layerOpacityRef.current / 100));
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
          Math.min(0.9, 0.35 + opacityScale * 0.55),
          Math.min(0.75, 0.2 + opacityScale * 0.45),
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

  const applyNdviOverlay = useCallback(async () => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    if (map.getLayer(NDVI_LAYER_ID)) map.removeLayer(NDVI_LAYER_ID);
    if (map.getSource(NDVI_SOURCE_ID)) map.removeSource(NDVI_SOURCE_ID);

    if (imageryLayerRef.current !== "NDVI") return;

    const [year, month] = ndviMonthRef.current.split("-").map(Number);
    const from = `${year}-${String(month).padStart(2, "0")}-01`;
    const toDate = new Date(year, month, 0);
    const to = `${year}-${String(month).padStart(2, "0")}-${String(toDate.getDate()).padStart(2, "0")}`;

    const bounds = map.getBounds();
    const bounded = clampBboxToKenya([
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast(),
      bounds.getNorth(),
    ]);
    const [west, south, east, north] = bounded;
    const bbox: [number, number, number, number] = [west, south, east, north];

    const opacity = Math.max(0, Math.min(1, layerOpacityRef.current / 100));

    if (isSentinelConfigured()) {
      const size = recommendedSentinelSize(bbox);
      const url = await fetchSentinelImage(bbox, from, to, size, "NDVI");
      if (!url || !mapRef.current || !mapRef.current.isStyleLoaded()) return;

      const imageCoordinates: [[number, number], [number, number], [number, number], [number, number]] = [
        [west, north],
        [east, north],
        [east, south],
        [west, south],
      ];

      mapRef.current.addSource(NDVI_SOURCE_ID, {
        type: "image",
        url,
        coordinates: imageCoordinates,
      });
      mapRef.current.addLayer({
        id: NDVI_LAYER_ID,
        type: "raster",
        source: NDVI_SOURCE_ID,
        paint: {
          "raster-opacity": opacity,
          "raster-resampling": "linear",
        },
      }, mapRef.current.getLayer("sites-fill") ? "sites-fill" : undefined);
      return;
    }

    // Fallback if Sentinel credentials are unavailable: tint current viewport.
    const viewportPolygon = {
      type: "FeatureCollection" as const,
      features: [
        {
          type: "Feature" as const,
          properties: {},
          geometry: {
            type: "Polygon" as const,
            coordinates: [[
              [west, south],
              [east, south],
              [east, north],
              [west, north],
              [west, south],
            ]],
          },
        },
      ],
    };

    map.addSource(NDVI_SOURCE_ID, { type: "geojson", data: viewportPolygon });
    map.addLayer({
      id: NDVI_LAYER_ID,
      type: "fill",
      source: NDVI_SOURCE_ID,
      paint: {
        "fill-color": "#4CAF50",
        "fill-opacity": Math.min(0.35, opacity * 0.35),
      },
    }, map.getLayer("sites-fill") ? "sites-fill" : undefined);
  }, []);

  // ----------------------------------------------------------------
  // Initialise the map (runs once per mount)
  // ----------------------------------------------------------------
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const initialStyle =
      imageryLayer === "RGB"
        ? (showSatellite ? STYLE_SATELLITE : STYLE_OUTDOORS)
        : (imageryLayer === "LAND_COVER" ? STYLE_OUTDOORS : STYLE_SATELLITE);

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
      void applyNdviOverlay();
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
    const nextStyle =
      imageryLayer === "RGB"
        ? (showSatellite ? STYLE_SATELLITE : STYLE_OUTDOORS)
        : (imageryLayer === "LAND_COVER" ? STYLE_OUTDOORS : STYLE_SATELLITE);
    map.setStyle(nextStyle);
  }, [showSatellite, imageryLayer]);

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

  // Keep fill opacity synced with the layer opacity slider.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getLayer("sites-fill")) return;

    const opacityScale = Math.max(0, Math.min(1, layerOpacity / 100));
    map.setPaintProperty("sites-fill", "fill-opacity", [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      Math.min(0.9, 0.35 + opacityScale * 0.55),
      Math.min(0.75, 0.2 + opacityScale * 0.45),
    ]);
  }, [layerOpacity]);

  // NDVI overlay updates on layer/month/opacity and viewport movement.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const onMoveEnd = () => {
      void applyNdviOverlay();
    };
    map.on("moveend", onMoveEnd);

    if (map.isStyleLoaded()) {
      void applyNdviOverlay();
    } else {
      map.once("style.load", () => {
        void applyNdviOverlay();
      });
    }

    return () => {
      map.off("moveend", onMoveEnd);
    };
  }, [imageryLayer, ndviMonth, layerOpacity, applyNdviOverlay]);

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
