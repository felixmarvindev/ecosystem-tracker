export type RestorationType =
  | "MANGROVE"
  | "FOREST"
  | "DRYLAND"
  | "MOUNTAIN_FOREST"
  | "PROTECTED_AREA";

export interface SiteMetrics {
  speciesCount: number;
  totalObservations: number;
  treesPlanted: number;
  survivalRate: number;
  co2SequesteredTonnes: number;
  biodiversityIndex: number;
}

export interface SiteProperties {
  name: string;
  restorationType: RestorationType;
  year: number;
  county: string;
  areaHectares: number;
  metrics: SiteMetrics;
  source: "OSM" | "MOCK";
}

export interface Site {
  type: "Feature";
  id: string;
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
  properties: SiteProperties;
}

export interface MapState {
  sites: Site[];
  selectedSiteId: string | null;
  loading: boolean;
  error: string | null;
  showSatellite: boolean;
  filterType: RestorationType | "ALL";
}
