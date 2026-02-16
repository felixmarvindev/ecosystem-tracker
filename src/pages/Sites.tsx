import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  LayoutGrid,
  List,
  ArrowLeft,
  MapPin,
  TreePine,
  Globe,
  Bug,
  TrendingUp,
  Calendar,
  ChevronRight,
  Trees,
  Search,
  Download,
  GitCompareArrows,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { fetchSites } from "@/services/api.service";
import { formatNumber, restorationLabel } from "@/utils/formatters";
import { downloadGeoJSON } from "@/utils/exportGeoJSON";
import type { Site, RestorationType } from "@/types";

// ---- Badge color classes by type ----
const TYPE_BADGE: Record<string, string> = {
  MANGROVE: "bg-mangrove text-white",
  FOREST: "bg-forest text-white",
  DRYLAND: "bg-dryland text-white",
  MOUNTAIN_FOREST: "bg-mountain text-white",
  PROTECTED_AREA: "bg-protected text-white",
};

// ---- Filter types ----
const ALL_TYPES: (RestorationType | "ALL")[] = [
  "ALL",
  "MANGROVE",
  "FOREST",
  "DRYLAND",
  "MOUNTAIN_FOREST",
  "PROTECTED_AREA",
];

const DOT_COLORS: Record<string, string> = {
  ALL: "bg-foreground",
  MANGROVE: "bg-mangrove",
  FOREST: "bg-forest",
  DRYLAND: "bg-dryland",
  MOUNTAIN_FOREST: "bg-mountain",
  PROTECTED_AREA: "bg-protected",
};

type ViewMode = "cards" | "list";

export default function Sites() {
  const [view, setView] = useState<ViewMode>("cards");
  const [filterType, setFilterType] = useState<RestorationType | "ALL">("ALL");
  const [search, setSearch] = useState("");

  const { data: sites = [], isLoading } = useQuery<Site[], Error>({
    queryKey: ["restoration-sites"],
    queryFn: fetchSites,
    staleTime: 24 * 60 * 60 * 1000,
  });

  // Filter & search
  const filtered = useMemo(() => {
    let result = sites;

    if (filterType !== "ALL") {
      result = result.filter((s) => s.properties.restorationType === filterType);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.properties.name.toLowerCase().includes(q) ||
          (s.properties.county ?? "").toLowerCase().includes(q),
      );
    }

    return result;
  }, [sites, filterType, search]);

  // Totals for the filtered set
  const totals = useMemo(
    () => ({
      sites: filtered.length,
      hectares: filtered.reduce((sum, s) => sum + s.properties.areaHectares, 0),
      species: filtered.reduce((sum, s) => sum + s.properties.metrics.speciesCount, 0),
      trees: filtered.reduce((sum, s) => sum + s.properties.metrics.treesPlanted, 0),
    }),
    [filtered],
  );

  return (
    <div className="min-h-screen bg-background">
      {/* ---- Header ---- */}
      <header className="sticky top-0 z-30 bg-card/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Map
            </Button>
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            <Trees className="w-5 h-5 text-primary" />
            <h1 className="text-sm font-semibold text-foreground">All Restoration Sites</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
        {/* ---- Summary stats ---- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Sites" value={totals.sites} icon={MapPin} />
          <StatCard label="Hectares" value={totals.hectares} icon={TreePine} />
          <StatCard label="Species" value={totals.species} icon={Bug} />
          <StatCard label="Trees Planted" value={totals.trees} icon={TreePine} />
        </div>

        {/* ---- Toolbar: search + filters + view toggle ---- */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or county…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Type filters */}
            <div className="flex gap-1 rounded-lg bg-muted p-1">
              {ALL_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    filterType === t
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-background"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${DOT_COLORS[t]}`} />
                  <span className="hidden md:inline">
                    {t === "ALL" ? "All" : restorationLabel(t)}
                  </span>
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div className="flex rounded-lg border overflow-hidden">
              <button
                onClick={() => setView("cards")}
                className={`p-2 transition-colors ${
                  view === "cards" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
                title="Card view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 transition-colors ${
                  view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Export GeoJSON */}
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => downloadGeoJSON(filtered)}
              disabled={filtered.length === 0}
              title="Export filtered sites as GeoJSON"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Export</span>
            </Button>

            {/* Compare */}
            <Link to="/compare">
              <Button variant="outline" size="sm" className="gap-1.5">
                <GitCompareArrows className="w-4 h-4" />
                <span className="hidden md:inline">Compare</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* ---- Loading state ---- */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* ---- Empty state ---- */}
        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <TreePine className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">No sites found</p>
            <p className="text-sm mt-1">Try adjusting your search or filter.</p>
          </div>
        )}

        {/* ---- Cards view ---- */}
        {!isLoading && filtered.length > 0 && view === "cards" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((site) => (
              <SiteCard key={site.id} site={site} />
            ))}
          </div>
        )}

        {/* ---- List view ---- */}
        {!isLoading && filtered.length > 0 && view === "list" && (
          <div className="space-y-2">
            {filtered.map((site) => (
              <SiteRow key={site.id} site={site} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// ----------------------------------------------------------------
// Sub-components
// ----------------------------------------------------------------

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof MapPin;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 py-4">
        <Icon className="w-5 h-5 text-primary shrink-0" />
        <div>
          <div className="text-xl font-bold text-foreground">{formatNumber(value)}</div>
          <div className="text-xs text-muted-foreground">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function SiteCard({ site }: { site: Site }) {
  const { name, restorationType, county, areaHectares, metrics, year } = site.properties;

  return (
    <Link to={`/site/${site.id}`}>
      <Card className="hover:shadow-lg hover:border-primary/30 transition-all group cursor-pointer h-full">
        {/* Color bar at top */}
        <div
          className="h-1.5 rounded-t-lg"
          style={{
            backgroundColor:
              restorationType === "MANGROVE" ? "#2E7D32"
              : restorationType === "FOREST" ? "#388E3C"
              : restorationType === "DRYLAND" ? "#F57C00"
              : restorationType === "MOUNTAIN_FOREST" ? "#558B2F"
              : "#66BB6A",
          }}
        />
        <CardContent className="pt-4 pb-4 space-y-3">
          {/* Header */}
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
              {name}
            </h3>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <Badge className={`text-[10px] ${TYPE_BADGE[restorationType] ?? ""}`}>
                {restorationLabel(restorationType)}
              </Badge>
              {county && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {county}
                </span>
              )}
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {year}
              </span>
            </div>
          </div>

          <Separator />

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
            <div className="flex items-center gap-1.5">
              <TreePine className="w-3.5 h-3.5 text-primary" />
              <span className="text-muted-foreground">Area</span>
              <span className="ml-auto font-medium text-foreground">{formatNumber(areaHectares)} ha</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bug className="w-3.5 h-3.5 text-dryland" />
              <span className="text-muted-foreground">Species</span>
              <span className="ml-auto font-medium text-foreground">{metrics.speciesCount}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-mountain" />
              <span className="text-muted-foreground">Survival</span>
              <span className="ml-auto font-medium text-foreground">{metrics.survivalRate}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-muted-foreground">CO₂</span>
              <span className="ml-auto font-medium text-foreground">{formatNumber(metrics.co2SequesteredTonnes)} t</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function SiteRow({ site }: { site: Site }) {
  const { name, restorationType, county, areaHectares, metrics } = site.properties;

  return (
    <Link to={`/site/${site.id}`}>
      <Card className="hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer">
        <CardContent className="flex items-center gap-4 py-3 px-4">
          {/* Type dot */}
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{
              backgroundColor:
                restorationType === "MANGROVE" ? "#2E7D32"
                : restorationType === "FOREST" ? "#388E3C"
                : restorationType === "DRYLAND" ? "#F57C00"
                : restorationType === "MOUNTAIN_FOREST" ? "#558B2F"
                : "#66BB6A",
            }}
          />

          {/* Name & location */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
              {name}
            </h3>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
              <Badge className={`text-[10px] ${TYPE_BADGE[restorationType] ?? ""}`}>
                {restorationLabel(restorationType)}
              </Badge>
              {county && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {county}
                </span>
              )}
            </div>
          </div>

          {/* Key metrics */}
          <div className="hidden sm:flex items-center gap-6 text-sm">
            <div className="text-center">
              <div className="font-semibold text-foreground">{formatNumber(areaHectares)}</div>
              <div className="text-[10px] text-muted-foreground">Hectares</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-foreground">{metrics.speciesCount}</div>
              <div className="text-[10px] text-muted-foreground">Species</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-foreground">{metrics.survivalRate}%</div>
              <div className="text-[10px] text-muted-foreground">Survival</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-foreground">{formatNumber(metrics.co2SequesteredTonnes)}</div>
              <div className="text-[10px] text-muted-foreground">CO₂ (t)</div>
            </div>
          </div>

          {/* Chevron */}
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
        </CardContent>
      </Card>
    </Link>
  );
}
