import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";
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
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  const [selectedSiteId, setSelectedSiteIdRaw] = useState<string | null>(null);
  const [showSatellite, setShowSatelliteRaw] = useState(false);
  const [filterType, setFilterTypeRaw] = useState<RestorationType | "ALL">("ALL");
  const [zoomToSiteId, setZoomToSiteIdRaw] = useState<string | null>(null);

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

  const refresh = useCallback(() => {
    // Clear service-layer cache, then re-fetch via React Query
    refreshSites().then(() => refetch());
  }, [refetch]);

  return (
    <MapContext.Provider
      value={{
        sites,
        selectedSiteId,
        loading,
        error,
        showSatellite,
        filterType,
        selectedSite,
        filteredSites,
        setSelectedSiteId,
        setShowSatellite,
        setFilterType,
        totals,
        refresh,
        zoomToSiteId,
        setZoomToSiteId,
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
