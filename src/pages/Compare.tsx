import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Trees,
  Plus,
  X,
  TreePine,
  TrendingUp,
  Globe,
  Bug,
  Eye,
  MapPin,
  Calendar,
  Activity,
  Droplets,
  Award,
  ChevronDown,
  ExternalLink,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { fetchSites } from "@/services/api.service";
import { formatNumber, restorationLabel } from "@/utils/formatters";
import { downloadGeoJSON } from "@/utils/exportGeoJSON";
import type { Site } from "@/types";

const MAX_COMPARE = 4;

const TYPE_COLORS: Record<string, string> = {
  MANGROVE: "#2E7D32",
  FOREST: "#388E3C",
  DRYLAND: "#F57C00",
  MOUNTAIN_FOREST: "#558B2F",
  PROTECTED_AREA: "#66BB6A",
};

const TYPE_BADGE: Record<string, string> = {
  MANGROVE: "bg-mangrove text-white",
  FOREST: "bg-forest text-white",
  DRYLAND: "bg-dryland text-white",
  MOUNTAIN_FOREST: "bg-mountain text-white",
  PROTECTED_AREA: "bg-protected text-white",
};

// ---- Metric row definition ----
interface MetricDef {
  label: string;
  icon: typeof TreePine;
  getValue: (s: Site) => number;
  format: (v: number) => string;
  unit?: string;
  higherIsBetter: boolean;
}

const METRICS: MetricDef[] = [
  {
    label: "Area",
    icon: TreePine,
    getValue: (s) => s.properties.areaHectares,
    format: formatNumber,
    unit: "ha",
    higherIsBetter: true,
  },
  {
    label: "Trees Planted",
    icon: TreePine,
    getValue: (s) => s.properties.metrics.treesPlanted,
    format: formatNumber,
    higherIsBetter: true,
  },
  {
    label: "Survival Rate",
    icon: TrendingUp,
    getValue: (s) => s.properties.metrics.survivalRate,
    format: (v) => `${v}`,
    unit: "%",
    higherIsBetter: true,
  },
  {
    label: "CO₂ Sequestered",
    icon: Globe,
    getValue: (s) => s.properties.metrics.co2SequesteredTonnes,
    format: formatNumber,
    unit: "t",
    higherIsBetter: true,
  },
  {
    label: "Species Count",
    icon: Bug,
    getValue: (s) => s.properties.metrics.speciesCount,
    format: (v) => String(v),
    higherIsBetter: true,
  },
  {
    label: "Observations",
    icon: Eye,
    getValue: (s) => s.properties.metrics.totalObservations,
    format: formatNumber,
    higherIsBetter: true,
  },
  {
    label: "Biodiversity Index",
    icon: Activity,
    getValue: (s) => s.properties.metrics.biodiversityIndex,
    format: (v) => String(v),
    unit: "/100",
    higherIsBetter: true,
  },
  {
    label: "Year Started",
    icon: Calendar,
    getValue: (s) => s.properties.year,
    format: (v) => String(v),
    higherIsBetter: false, // older = more established
  },
  {
    label: "Tree Density",
    icon: TreePine,
    getValue: (s) =>
      s.properties.areaHectares > 0
        ? Math.round(s.properties.metrics.treesPlanted / s.properties.areaHectares)
        : 0,
    format: formatNumber,
    unit: "/ha",
    higherIsBetter: true,
  },
  {
    label: "CO₂ per Hectare",
    icon: Droplets,
    getValue: (s) =>
      s.properties.areaHectares > 0
        ? Math.round(s.properties.metrics.co2SequesteredTonnes / s.properties.areaHectares)
        : 0,
    format: formatNumber,
    unit: "t/ha",
    higherIsBetter: true,
  },
];

export default function Compare() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allSites = [], isLoading } = useQuery<Site[], Error>({
    queryKey: ["restoration-sites"],
    queryFn: fetchSites,
    staleTime: 24 * 60 * 60 * 1000,
  });

  const selectedSites = useMemo(
    () => selectedIds.map((id) => allSites.find((s) => s.id === id)).filter(Boolean) as Site[],
    [selectedIds, allSites],
  );

  // Sites not already selected, filtered by search
  const availableSites = useMemo(() => {
    const taken = new Set(selectedIds);
    let available = allSites.filter((s) => !taken.has(s.id));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      available = available.filter(
        (s) =>
          s.properties.name.toLowerCase().includes(q) ||
          (s.properties.county ?? "").toLowerCase().includes(q),
      );
    }
    return available;
  }, [allSites, selectedIds, searchQuery]);

  function addSite(id: string) {
    if (selectedIds.length < MAX_COMPARE && !selectedIds.includes(id)) {
      setSelectedIds((prev) => [...prev, id]);
    }
    setDropdownOpen(null);
    setSearchQuery("");
  }

  function removeSite(id: string) {
    setSelectedIds((prev) => prev.filter((sid) => sid !== id));
  }

  function addSlot() {
    setDropdownOpen(selectedIds.length);
    setSearchQuery("");
  }

  // Find best/worst for each metric
  function getBestIdx(metric: MetricDef): number {
    if (selectedSites.length < 2) return -1;
    const values = selectedSites.map((s) => metric.getValue(s));
    const best = metric.higherIsBetter ? Math.max(...values) : Math.min(...values);
    return values.indexOf(best);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-card/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center gap-4">
          <Link to="/sites">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Sites
            </Button>
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            <Trees className="w-5 h-5 text-primary" />
            <h1 className="text-sm font-semibold text-foreground">Compare Sites</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {selectedSites.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => downloadGeoJSON(selectedSites, "compared-sites.geojson")}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
        {/* ---- Site selector slots ---- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Existing selected sites */}
          {selectedIds.map((id, idx) => {
            const site = allSites.find((s) => s.id === id);
            if (!site) return null;
            return (
              <Card key={id} className="relative">
                <div
                  className="h-1.5 rounded-t-lg"
                  style={{ backgroundColor: TYPE_COLORS[site.properties.restorationType] ?? "#757575" }}
                />
                <CardContent className="pt-3 pb-3 px-3">
                  <button
                    onClick={() => removeSite(id)}
                    className="absolute top-2 right-2 text-muted-foreground hover:text-destructive transition-colors"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <h3 className="font-semibold text-sm text-foreground pr-5 leading-tight">
                    {site.properties.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Badge className={`text-[10px] ${TYPE_BADGE[site.properties.restorationType] ?? ""}`}>
                      {restorationLabel(site.properties.restorationType)}
                    </Badge>
                  </div>
                  {site.properties.county && (
                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {site.properties.county}
                    </div>
                  )}
                  <Link to={`/site/${site.id}`} className="text-xs text-primary mt-2 flex items-center gap-1 hover:underline">
                    <ExternalLink className="w-3 h-3" /> Details
                  </Link>
                </CardContent>
              </Card>
            );
          })}

          {/* Add site slot / dropdown */}
          {selectedIds.length < MAX_COMPARE && (
            <div className="relative">
              <button
                onClick={addSlot}
                className="w-full h-full min-h-[120px] rounded-lg border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary"
              >
                <Plus className="w-6 h-6" />
                <span className="text-xs font-medium">
                  Add Site ({selectedIds.length}/{MAX_COMPARE})
                </span>
              </button>

              {/* Dropdown picker */}
              {dropdownOpen === selectedIds.length && (
                <div className="absolute top-full left-0 mt-1 w-72 max-h-64 bg-card border rounded-lg shadow-xl z-20 overflow-hidden">
                  <div className="p-2 border-b">
                    <input
                      type="text"
                      placeholder="Search sites…"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-full text-sm px-3 py-1.5 rounded-md border bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <div className="overflow-y-auto max-h-48">
                    {availableSites.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-muted-foreground">No sites available</div>
                    ) : (
                      availableSites.map((site) => (
                        <button
                          key={site.id}
                          onClick={() => addSite(site.id)}
                          className="w-full text-left px-4 py-2 hover:bg-muted transition-colors flex items-center gap-2"
                        >
                          <div
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: TYPE_COLORS[site.properties.restorationType] ?? "#757575" }}
                          />
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-foreground truncate">{site.properties.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {restorationLabel(site.properties.restorationType)}
                              {site.properties.county ? ` · ${site.properties.county}` : ""}
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                  <div className="p-2 border-t">
                    <button
                      onClick={() => { setDropdownOpen(null); setSearchQuery(""); }}
                      className="text-xs text-muted-foreground hover:text-foreground w-full text-center py-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ---- Empty state ---- */}
        {selectedSites.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Award className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">Select sites to compare</p>
            <p className="text-sm mt-1">Choose 2-4 restoration sites to see a side-by-side comparison of their metrics.</p>
          </div>
        )}

        {/* ---- Single site hint ---- */}
        {selectedSites.length === 1 && (
          <div className="text-center py-8 text-muted-foreground">
            <ChevronDown className="w-6 h-6 mx-auto mb-2 animate-bounce" />
            <p className="text-sm">Add at least one more site to start comparing.</p>
          </div>
        )}

        {/* ---- Comparison table ---- */}
        {selectedSites.length >= 2 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-xs font-semibold text-muted-foreground py-3 px-4 w-44">
                    Metric
                  </th>
                  {selectedSites.map((site) => (
                    <th
                      key={site.id}
                      className="text-center text-xs font-semibold py-3 px-3 min-w-[140px]"
                    >
                      <span
                        className="inline-block w-2 h-2 rounded-full mr-1.5"
                        style={{ backgroundColor: TYPE_COLORS[site.properties.restorationType] ?? "#757575" }}
                      />
                      <span className="text-foreground">{site.properties.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {METRICS.map((metric) => {
                  const bestIdx = getBestIdx(metric);
                  return (
                    <tr key={metric.label} className="border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 text-sm">
                          <metric.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                          <span className="font-medium text-foreground">{metric.label}</span>
                        </div>
                      </td>
                      {selectedSites.map((site, idx) => {
                        const val = metric.getValue(site);
                        const isBest = idx === bestIdx;
                        return (
                          <td key={site.id} className="py-3 px-3 text-center">
                            <span
                              className={`text-sm font-semibold ${
                                isBest ? "text-primary" : "text-foreground"
                              }`}
                            >
                              {metric.format(val)}
                              {metric.unit ? (
                                <span className="text-xs font-normal text-muted-foreground ml-0.5">
                                  {metric.unit}
                                </span>
                              ) : null}
                            </span>
                            {isBest && (
                              <span className="ml-1 text-[10px] text-primary font-medium">★</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ---- Legend ---- */}
        {selectedSites.length >= 2 && (
          <div className="text-xs text-muted-foreground flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="text-primary font-semibold">★</span> Best performer for that metric
            </span>
            <span>· {selectedSites.length} sites compared · {METRICS.length} metrics</span>
          </div>
        )}
      </main>
    </div>
  );
}
