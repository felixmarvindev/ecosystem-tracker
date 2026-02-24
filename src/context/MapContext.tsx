import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchSites, refreshSites } from "@/services/api.service";
import type { Site, MapState, RestorationType } from "@/types";

interface MapContextType extends MapState {
  selectedSite: Site | null;
  filteredSites: Site[];
  setSelectedSiteId: (id: string | null) => void;
  setShowSatellite: (show: boolean) => void;
  setFilterType: (type: RestorationType | "ALL") => void;
  totals: { sites: number; hectares: number; species: number };
  refresh: () => void;
  zoomToSiteId: string | null;
  setZoomToSiteId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setImageryLayer: (layer: "RGB" | "NDVI" | "LAND_COVER") => void;
  setLayerOpacity: (opacity: number) => void;
  setNdviMonth: (month: string) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramSiteId = searchParams.get("site");
  const paramShowSatellite = searchParams.get("sat") === "1";
  const paramFilterType = searchParams.get("type");
  const paramSearchQuery = searchParams.get("q") ?? "";
  const paramLayer = searchParams.get("layer");
  const opacityRaw = searchParams.get("opacity");
  const paramOpacity = opacityRaw === null ? NaN : Number(opacityRaw);
  const paramNdviMonth = searchParams.get("ndviMonth");
  const validFilterType =
    paramFilterType === "MANGROVE" ||
    paramFilterType === "FOREST" ||
    paramFilterType === "DRYLAND" ||
    paramFilterType === "MOUNTAIN_FOREST" ||
    paramFilterType === "PROTECTED_AREA"
      ? paramFilterType
      : "ALL";
  const validLayer =
    paramLayer === "RGB" || paramLayer === "NDVI" || paramLayer === "LAND_COVER"
      ? paramLayer
      : "RGB";
  const validOpacity =
    Number.isFinite(paramOpacity) && paramOpacity >= 0 && paramOpacity <= 100
      ? Math.round(paramOpacity)
      : 80;
  const current = new Date();
  const currentMonth = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}`;
  const validNdviMonth =
    paramNdviMonth && /^\d{4}-(0[1-9]|1[0-2])$/.test(paramNdviMonth)
      ? paramNdviMonth
      : currentMonth;

  const [selectedSiteId, setSelectedSiteIdRaw] = useState<string | null>(paramSiteId);
  const [showSatellite, setShowSatelliteRaw] = useState(paramShowSatellite);
  const [filterType, setFilterTypeRaw] = useState<RestorationType | "ALL">(validFilterType);
  const [zoomToSiteId, setZoomToSiteIdRaw] = useState<string | null>(paramSiteId);
  const [searchQuery, setSearchQueryRaw] = useState(paramSearchQuery);
  const [imageryLayer, setImageryLayerRaw] = useState<"RGB" | "NDVI" | "LAND_COVER">(validLayer);
  const [layerOpacity, setLayerOpacityRaw] = useState(validOpacity);
  const [ndviMonth, setNdviMonthRaw] = useState(validNdviMonth);

  // Fetch sites using React Query with caching + retry
  const {
    data: sites = [],
    isLoading: loading,
    error: queryError,
    refetch,
  } = useQuery<Site[], Error>({
    queryKey: ["restoration-sites"],
    queryFn: fetchSites,
    staleTime: 24 * 60 * 60 * 1000,   // 24 h — don't re-fetch while fresh
    gcTime: 30 * 60 * 1000,           // 30 min garbage collection
    retry: 2,                          // retry twice on failure
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),
  });

  const error = queryError?.message ?? null;

  // Derived state
  const filteredSites = useMemo(
    () =>
      filterType === "ALL"
        ? sites
        : sites.filter((s) => s.properties.restorationType === filterType),
    [sites, filterType],
  );

  const selectedSite = useMemo(
    () => sites.find((s) => s.id === selectedSiteId) ?? null,
    [sites, selectedSiteId],
  );

  const totals = useMemo(
    () => ({
      sites: filteredSites.length,
      hectares: filteredSites.reduce((sum, s) => sum + s.properties.areaHectares, 0),
      species: filteredSites.reduce(
        (sum, s) => sum + s.properties.metrics.speciesCount,
        0,
      ),
    }),
    [filteredSites],
  );

  // Stable callbacks
  const setSelectedSiteId = useCallback(
    (id: string | null) => setSelectedSiteIdRaw(id),
    [],
  );
  const setShowSatellite = useCallback(
    (show: boolean) => setShowSatelliteRaw(show),
    [],
  );
  const setFilterType = useCallback(
    (type: RestorationType | "ALL") => setFilterTypeRaw(type),
    [],
  );
  const setZoomToSiteId = useCallback(
    (id: string | null) => setZoomToSiteIdRaw(id),
    [],
  );
  const setSearchQuery = useCallback(
    (query: string) => setSearchQueryRaw(query),
    [],
  );
  const setImageryLayer = useCallback(
    (layer: "RGB" | "NDVI" | "LAND_COVER") => setImageryLayerRaw(layer),
    [],
  );
  const setLayerOpacity = useCallback(
    (opacity: number) => setLayerOpacityRaw(Math.max(0, Math.min(100, Math.round(opacity)))),
    [],
  );
  const setNdviMonth = useCallback((month: string) => setNdviMonthRaw(month), []);

  const refresh = useCallback(() => {
    // Clear service-layer cache, then re-fetch via React Query
    refreshSites().then(() => refetch());
  }, [refetch]);

  // Keep local state synchronized when URL query params change.
  // Only depend on URL-derived values to avoid overriding in-app state updates.
  useEffect(() => {
    setShowSatelliteRaw(paramShowSatellite);
    setFilterTypeRaw(validFilterType);
    setSearchQueryRaw(paramSearchQuery);
    setImageryLayerRaw(validLayer);
    setLayerOpacityRaw(validOpacity);
    setNdviMonthRaw(validNdviMonth);
    setSelectedSiteIdRaw(paramSiteId ?? null);
    // Re-trigger zoom whenever URL site changes
    setZoomToSiteIdRaw(paramSiteId ?? null);
  }, [
    paramShowSatellite,
    validFilterType,
    paramSearchQuery,
    paramSiteId,
    validLayer,
    validOpacity,
    validNdviMonth,
  ]);

  // Keep view state URL-shareable (satellite/filter/search/selected site)
  useEffect(() => {
    const next = new URLSearchParams(searchParams);

    if (showSatellite) next.set("sat", "1");
    else next.delete("sat");

    if (filterType !== "ALL") next.set("type", filterType);
    else next.delete("type");

    if (selectedSiteId) next.set("site", selectedSiteId);
    else next.delete("site");

    if (searchQuery.trim()) next.set("q", searchQuery.trim());
    else next.delete("q");

    if (imageryLayer !== "RGB") next.set("layer", imageryLayer);
    else next.delete("layer");

    if (layerOpacity !== 80) next.set("opacity", String(layerOpacity));
    else next.delete("opacity");

    if (ndviMonth !== currentMonth) next.set("ndviMonth", ndviMonth);
    else next.delete("ndviMonth");

    if (next.toString() !== searchParams.toString()) {
      setSearchParams(next, { replace: true });
    }
  }, [
    showSatellite,
    filterType,
    selectedSiteId,
    searchQuery,
    imageryLayer,
    layerOpacity,
    ndviMonth,
    currentMonth,
    searchParams,
    setSearchParams,
  ]);

  return (
    <MapContext.Provider
      value={{
        sites,
        selectedSiteId,
        loading,
        error,
        showSatellite,
        filterType,
        imageryLayer,
        layerOpacity,
        ndviMonth,
        selectedSite,
        filteredSites,
        setSelectedSiteId,
        setShowSatellite,
        setFilterType,
        totals,
        refresh,
        zoomToSiteId,
        setZoomToSiteId,
        searchQuery,
        setSearchQuery,
        setImageryLayer,
        setLayerOpacity,
        setNdviMonth,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMap() {
  const ctx = useContext(MapContext);
  if (!ctx) throw new Error("useMap must be used within MapProvider");
  return ctx;
}
