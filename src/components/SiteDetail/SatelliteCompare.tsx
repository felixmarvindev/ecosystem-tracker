import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import {
  isSentinelConfigured,
  fetchSentinelImage,
} from "@/services/sentinel.service";
import type { Site } from "@/types";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

const SATELLITE_STYLE = "mapbox://styles/mapbox/satellite-streets-v12";

const TYPE_COLORS: Record<string, string> = {
  MANGROVE: "#2E7D32",
  FOREST: "#388E3C",
  DRYLAND: "#F57C00",
  MOUNTAIN_FOREST: "#558B2F",
  PROTECTED_AREA: "#66BB6A",
};

interface SatelliteCompareProps {
  site: Site;
  className?: string;
}

/**
 * Before/After satellite comparison slider.
 *
 * When Sentinel Hub credentials are configured:
 *   Left  = real Sentinel-2 imagery from the site's start year
 *   Right = real Sentinel-2 imagery from the current year + polygon overlay
 *
 * When credentials are NOT configured:
 *   Left  = Mapbox satellite (no overlay)
 *   Right = Mapbox satellite + polygon overlay
 *   A banner tells the user how to enable real historical imagery.
 */
export function SatelliteCompare({ site, className = "" }: SatelliteCompareProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const beforeContainerRef = useRef<HTMLDivElement>(null);
  const afterContainerRef = useRef<HTMLDivElement>(null);
  const beforeMapRef = useRef<mapboxgl.Map | null>(null);
  const afterMapRef = useRef<mapboxgl.Map | null>(null);
  const isDragging = useRef(false);

  const [sliderPos, setSliderPos] = useState(0.5);
  const [loadingBefore, setLoadingBefore] = useState(false);
  const [loadingAfter, setLoadingAfter] = useState(false);
  const [sentinelReady, setSentinelReady] = useState<{
    before: boolean;
    after: boolean;
  }>({ before: false, after: false });

  const hasSentinel = isSentinelConfigured();
  const color = TYPE_COLORS[site.properties.restorationType] ?? "#757575";
  const bbox = turf.bbox(turf.polygon(site.geometry.coordinates));
  const bounds: mapboxgl.LngLatBoundsLike = [
    [bbox[0], bbox[1]],
    [bbox[2], bbox[3]],
  ];

  // Mapbox image source coordinates: [topLeft, topRight, bottomRight, bottomLeft]
  const imageCoordinates: [[number, number], [number, number], [number, number], [number, number]] = [
    [bbox[0], bbox[3]], // top-left  (west, north)
    [bbox[2], bbox[3]], // top-right (east, north)
    [bbox[2], bbox[1]], // bottom-right (east, south)
    [bbox[0], bbox[1]], // bottom-left  (west, south)
  ];

  // Sync pan/zoom between both maps
  const syncMaps = useCallback(() => {
    const before = beforeMapRef.current;
    const after = afterMapRef.current;
    if (!before || !after) return;

    const syncFrom = (source: mapboxgl.Map, target: mapboxgl.Map) => {
      const handler = () => {
        target.jumpTo({
          center: source.getCenter(),
          zoom: source.getZoom(),
          bearing: source.getBearing(),
          pitch: source.getPitch(),
        });
      };
      source.on("move", handler);
      return () => source.off("move", handler);
    };

    const unsyncA = syncFrom(before, after);
    const unsyncB = syncFrom(after, before);
    return () => {
      unsyncA();
      unsyncB();
    };
  }, []);

  // Add Sentinel-2 imagery as an image overlay on a map
  const addSentinelOverlay = useCallback(
    (map: mapboxgl.Map, sourceId: string, imageUrl: string) => {
      if (map.getSource(sourceId)) {
        (map.getSource(sourceId) as mapboxgl.ImageSource).updateImage({ url: imageUrl });
      } else {
        map.addSource(sourceId, {
          type: "image",
          url: imageUrl,
          coordinates: imageCoordinates,
        });
        map.addLayer(
          {
            id: `${sourceId}-layer`,
            type: "raster",
            source: sourceId,
            paint: { "raster-opacity": 1 },
          },
          // Insert below any polygon layers
          map.getLayer("site-after-outline") ? "site-after-outline" : undefined,
        );
      }
    },
    [imageCoordinates],
  );

  // Initialize both Mapbox maps
  useEffect(() => {
    if (
      !beforeContainerRef.current ||
      !afterContainerRef.current ||
      beforeMapRef.current ||
      afterMapRef.current
    )
      return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    // ---- Before map (left) ----
    const beforeMap = new mapboxgl.Map({
      container: beforeContainerRef.current,
      style: SATELLITE_STYLE,
      bounds,
      fitBoundsOptions: { padding: 50 },
      attributionControl: false,
      interactive: true,
    });
    beforeMap.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "top-left",
    );

    // Subtle dashed outline on the before side
    beforeMap.on("style.load", () => {
      beforeMap.addSource("site-before", { type: "geojson", data: site });
      beforeMap.addLayer({
        id: "site-before-outline",
        type: "line",
        source: "site-before",
        paint: {
          "line-color": "#FFFFFF",
          "line-width": 2,
          "line-dasharray": [3, 2],
          "line-opacity": 0.6,
        },
      });
    });

    // ---- After map (right) ----
    const afterMap = new mapboxgl.Map({
      container: afterContainerRef.current,
      style: SATELLITE_STYLE,
      bounds,
      fitBoundsOptions: { padding: 50 },
      attributionControl: false,
      interactive: true,
    });
    afterMap.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "top-right",
    );
    afterMap.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      "bottom-right",
    );

    // Polygon overlay on after side (boundary only, no fill)
    afterMap.on("style.load", () => {
      afterMap.addSource("site-after", { type: "geojson", data: site });
      afterMap.addLayer({
        id: "site-after-outline",
        type: "line",
        source: "site-after",
        paint: { "line-color": color, "line-width": 3 },
      });

      // Centroid marker
      const centroid = turf.centroid(turf.polygon(site.geometry.coordinates));
      const [lng, lat] = centroid.geometry.coordinates;
      new mapboxgl.Marker({ color }).setLngLat([lng, lat]).addTo(afterMap);
    });

    beforeMapRef.current = beforeMap;
    afterMapRef.current = afterMap;

    // Sync maps once both are loaded
    let unsync: (() => void) | undefined;
    let loadedCount = 0;
    const onLoad = () => {
      loadedCount++;
      if (loadedCount === 2) {
        unsync = syncMaps();
      }
    };
    beforeMap.on("load", onLoad);
    afterMap.on("load", onLoad);

    return () => {
      unsync?.();
      beforeMap.remove();
      afterMap.remove();
      beforeMapRef.current = null;
      afterMapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [site.id]);

  // Fetch and overlay Sentinel-2 imagery
  useEffect(() => {
    if (!hasSentinel) return;

    const sentinelBbox: [number, number, number, number] = [
      bbox[0],
      bbox[1],
      bbox[2],
      bbox[3],
    ];

    const startYear = site.properties.year;
    const currentYear = new Date().getFullYear();

    // Before image: the start year
    const fetchBefore = async () => {
      setLoadingBefore(true);
      const url = await fetchSentinelImage(
        sentinelBbox,
        `${startYear}-01-01`,
        `${startYear}-12-31`,
      );
      if (url && beforeMapRef.current) {
        const map = beforeMapRef.current;
        if (map.isStyleLoaded()) {
          addSentinelOverlay(map, "sentinel-before", url);
        } else {
          map.once("style.load", () =>
            addSentinelOverlay(map, "sentinel-before", url),
          );
        }
        setSentinelReady((prev) => ({ ...prev, before: true }));
      }
      setLoadingBefore(false);
    };

    // After image: current year (or last year if early in the year)
    const afterYear = new Date().getMonth() >= 3 ? currentYear : currentYear - 1;
    const fetchAfter = async () => {
      setLoadingAfter(true);
      const url = await fetchSentinelImage(
        sentinelBbox,
        `${afterYear}-01-01`,
        `${afterYear}-12-31`,
      );
      if (url && afterMapRef.current) {
        const map = afterMapRef.current;
        if (map.isStyleLoaded()) {
          addSentinelOverlay(map, "sentinel-after", url);
        } else {
          map.once("style.load", () =>
            addSentinelOverlay(map, "sentinel-after", url),
          );
        }
        setSentinelReady((prev) => ({ ...prev, after: true }));
      }
      setLoadingAfter(false);
    };

    fetchBefore();
    fetchAfter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [site.id, hasSentinel]);

  // ---- Drag handling ----
  const getSliderPos = useCallback((clientX: number) => {
    if (!wrapperRef.current) return 0.5;
    const rect = wrapperRef.current.getBoundingClientRect();
    return Math.max(0.05, Math.min(0.95, (clientX - rect.left) / rect.width));
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      setSliderPos(getSliderPos(e.clientX));
    },
    [getSliderPos],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      setSliderPos(getSliderPos(e.clientX));
    },
    [getSliderPos],
  );

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const pct = `${(sliderPos * 100).toFixed(2)}%`;
  const isLoading = loadingBefore || loadingAfter;

  const startYear = site.properties.year;
  const currentYear = new Date().getFullYear();
  const afterYear = new Date().getMonth() >= 3 ? currentYear : currentYear - 1;

  return (
    <div
      ref={wrapperRef}
      className={`relative select-none rounded-xl overflow-hidden border shadow-sm ${className}`}
      style={{ touchAction: "none" }}
    >
      {/* ---- Before map (full width, underneath) ---- */}
      <div ref={beforeContainerRef} className="absolute inset-0 w-full h-full" />

      {/* ---- After map (clipped to the right portion) ---- */}
      <div
        ref={afterContainerRef}
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 0 0 ${pct})` }}
      />

      {/* ---- Slider handle ---- */}
      <div
        className="absolute top-0 bottom-0 z-10 cursor-ew-resize"
        style={{ left: pct, transform: "translateX(-50%)", width: "40px" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* Vertical line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-white shadow-md" />

        {/* Handle knob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border-2 border-primary flex items-center justify-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-primary"
          >
            <path
              d="M5 3L2 8L5 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 3L14 8L11 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* ---- Labels ---- */}
      <div className="absolute top-3 left-3 z-10 bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-none">
        {hasSentinel && sentinelReady.before
          ? `Sentinel-2 · ${startYear}`
          : `Before · ${startYear}`}
      </div>
      <div className="absolute top-3 right-3 z-10 bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-none">
        {hasSentinel && sentinelReady.after
          ? `Sentinel-2 · ${afterYear}`
          : `After · ${currentYear}`}
      </div>

      {/* ---- Loading indicator ---- */}
      {isLoading && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-2 pointer-events-none">
          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Loading Sentinel-2 imagery…
        </div>
      )}

      {/* ---- No-credentials banner ---- */}
      {!hasSentinel && (
        <div className="absolute bottom-3 left-3 right-3 z-10 bg-black/70 text-white text-[10px] leading-tight px-3 py-2 rounded-lg backdrop-blur-sm pointer-events-none">
          <strong>Tip:</strong> Add Sentinel Hub credentials to{" "}
          <code className="bg-white/20 px-1 rounded">.env.local</code> for real
          historical satellite imagery.
        </div>
      )}

      {/* Invisible overlay for full-area drag (below handle z-index) */}
      <div
        className="absolute inset-0 z-[5]"
        style={{
          cursor: isDragging.current ? "ew-resize" : "default",
          pointerEvents: isDragging.current ? "auto" : "none",
        }}
      />
    </div>
  );
}
