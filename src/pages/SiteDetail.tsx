import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  TreePine,
  TrendingUp,
  Globe,
  Bug,
  MapPin,
  BarChart3,
  Leaf,
  Droplets,
  Eye,
  Satellite,
  Map as MapIcon,
  Calendar,
  Layers,
  Activity,
  Award,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { SiteMiniMap } from "@/components/SiteDetail/SiteMiniMap";
import { SatelliteCompare } from "@/components/SiteDetail/SatelliteCompare";
import { MetricsChart } from "@/components/SiteDetail/MetricsChart";
import { AIInsights } from "@/components/SiteDetail/AIInsights";
import { fetchSites } from "@/services/api.service";
import { formatNumber, restorationLabel } from "@/utils/formatters";
import type { Site } from "@/types";

// ---- Helper: restoration type color class ----
const TYPE_BADGE_CLASSES: Record<string, string> = {
  MANGROVE: "bg-mangrove text-white",
  FOREST: "bg-forest text-white",
  DRYLAND: "bg-dryland text-white",
  MOUNTAIN_FOREST: "bg-mountain text-white",
  PROTECTED_AREA: "bg-protected text-white",
};

// ---- Helper: estimate ecosystem services ----
function estimateEcosystemServices(site: Site) {
  const { areaHectares, metrics, restorationType } = site.properties;
  const waterRetention = Math.round(areaHectares * 2.5); // m³ per hectare per year
  const soilConserved = Math.round(areaHectares * 0.8); // tonnes per hectare per year
  const jobsEstimate = Math.round(areaHectares * 0.02); // 2 jobs per 100 hectares

  // Community impact estimates
  const communitiesServed = Math.max(1, Math.round(areaHectares / 500));
  const carbonCreditsValue = Math.round(metrics.co2SequesteredTonnes * 15); // ~$15/tonne

  // Ecosystem health score (0-100)
  const healthScore = Math.round(
    (metrics.survivalRate * 0.3 +
      Math.min(100, metrics.biodiversityIndex) * 0.3 +
      Math.min(100, (metrics.speciesCount / Math.max(1, areaHectares)) * 500) * 0.2 +
      Math.min(100, metrics.totalObservations / 50) * 0.2),
  );

  return {
    waterRetention,
    soilConserved,
    jobsEstimate,
    communitiesServed,
    carbonCreditsValue,
    healthScore,
    restorationAge: new Date().getFullYear() - site.properties.year,
  };
}

// ---- Main page ----
export default function SiteDetail() {
  const { id } = useParams<{ id: string }>();
  const [mapSatellite, setMapSatellite] = useState(false);
  const [showCompare, setShowCompare] = useState(false);

  const { data: sites = [], isLoading } = useQuery<Site[], Error>({
    queryKey: ["restoration-sites"],
    queryFn: fetchSites,
    staleTime: 24 * 60 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading site data…</p>
        </div>
      </div>
    );
  }

  const site = sites.find((s) => s.id === id);

  if (!site) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Site Not Found</h1>
          <p className="text-muted-foreground">
            The restoration site you're looking for doesn't exist.
          </p>
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Map
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { name, restorationType, county, areaHectares, year, metrics, source } =
    site.properties;
  const eco = estimateEcosystemServices(site);

  return (
    <div className="min-h-screen bg-background">
      {/* ---- Top navigation ---- */}
      <header className="sticky top-0 z-30 bg-card/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Map</span>
            </Button>
          </Link>
          <Link to="/sites">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              All Sites
            </Button>
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <h1 className="text-sm font-semibold text-foreground truncate">{name}</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8">
        {/* ================================================================
            HERO SECTION
        ================================================================ */}
        <section className="flex flex-col lg:flex-row gap-6">
          {/* Left: Site info */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <Badge className={TYPE_BADGE_CLASSES[restorationType] ?? ""}>
                  {restorationLabel(restorationType)}
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {county || "Kenya"}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Since {year}
                </span>
                <Badge variant="outline" className="text-xs">
                  {source} data
                </Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{name}</h1>
              <p className="text-muted-foreground mt-2 max-w-xl">
                A {formatNumber(areaHectares)}-hectare {restorationLabel(restorationType).toLowerCase()} restoration
                site in {county || "Kenya"}, active since {year}. Currently supporting{" "}
                {metrics.speciesCount > 0
                  ? `${metrics.speciesCount} documented species`
                  : "ongoing biodiversity monitoring"}.
              </p>
            </div>

            {/* Ecosystem Health Score */}
            <Card>
              <CardContent className="pt-5 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">Ecosystem Health Score</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">{eco.healthScore}/100</span>
                </div>
                <Progress value={eco.healthScore} className="h-2.5" />
                <p className="text-xs text-muted-foreground mt-2">
                  Composite of survival rate, biodiversity index, species density, and observation frequency
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right: Mini map / Compare slider */}
          <div className="lg:w-[480px] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {showCompare ? "Before / After" : "Site Location"}
              </span>
              <div className="flex items-center gap-1.5">
                <Button
                  variant={showCompare ? "default" : "outline"}
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={() => setShowCompare((v) => !v)}
                  title="Before / After comparison"
                >
                  <Layers className="w-3.5 h-3.5" />
                  {showCompare ? "Compare" : "Compare"}
                </Button>
                {!showCompare && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs"
                    onClick={() => setMapSatellite((v) => !v)}
                  >
                    {mapSatellite ? <Satellite className="w-3.5 h-3.5" /> : <MapIcon className="w-3.5 h-3.5" />}
                    {mapSatellite ? "Satellite" : "Map"}
                  </Button>
                )}
              </div>
            </div>

            {showCompare ? (
              <SatelliteCompare
                key={`compare-${site.id}`}
                site={site}
                className="h-[340px]"
              />
            ) : (
              <SiteMiniMap
                key={`${site.id}-${mapSatellite}`}
                site={site}
                satellite={mapSatellite}
                className="h-[340px]"
              />
            )}
          </div>
        </section>

        {/* ================================================================
            KEY METRICS GRID
        ================================================================ */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" /> Key Metrics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <MetricTile icon={TreePine} value={formatNumber(areaHectares)} label="Hectares" color="text-forest" />
            <MetricTile icon={TreePine} value={formatNumber(metrics.treesPlanted)} label="Trees Planted" color="text-primary" />
            <MetricTile icon={TrendingUp} value={`${metrics.survivalRate}%`} label="Survival Rate" color="text-mountain" />
            <MetricTile icon={Globe} value={`${formatNumber(metrics.co2SequesteredTonnes)} t`} label="CO₂ Sequestered" color="text-blue-600" />
            <MetricTile icon={Bug} value={String(metrics.speciesCount)} label="Species Recorded" color="text-dryland" />
            <MetricTile icon={Eye} value={formatNumber(metrics.totalObservations)} label="Observations" color="text-purple-600" />
          </div>
        </section>

        {/* ================================================================
            TABBED DETAIL SECTIONS
        ================================================================ */}
        <Tabs defaultValue="trends" className="space-y-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="insights" className="gap-1.5">
              <Sparkles className="w-4 h-4" /> AI Insights
            </TabsTrigger>
            <TabsTrigger value="trends" className="gap-1.5">
              <BarChart3 className="w-4 h-4" /> Trends
            </TabsTrigger>
            <TabsTrigger value="impact" className="gap-1.5">
              <Leaf className="w-4 h-4" /> Environmental Impact
            </TabsTrigger>
            <TabsTrigger value="biodiversity" className="gap-1.5">
              <Bug className="w-4 h-4" /> Biodiversity
            </TabsTrigger>
            <TabsTrigger value="community" className="gap-1.5">
              <Award className="w-4 h-4" /> Community Impact
            </TabsTrigger>
          </TabsList>

          {/* ---- AI Insights Tab ---- */}
          <TabsContent value="insights">
            <AIInsights site={site} />
          </TabsContent>

          {/* ---- Trends (Charts) Tab ---- */}
          <TabsContent value="trends">
            <MetricsChart site={site} />
          </TabsContent>

          {/* ---- Environmental Impact Tab ---- */}
          <TabsContent value="impact" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Carbon */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600" /> Carbon Sequestration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Total CO₂ sequestered</span>
                      <span className="font-semibold">{formatNumber(metrics.co2SequesteredTonnes)} tonnes</span>
                    </div>
                    <Progress value={Math.min(100, (metrics.co2SequesteredTonnes / 200_000) * 100)} className="h-2" />
                  </div>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated carbon credit value</span>
                      <span className="font-medium text-green-700">${formatNumber(eco.carbonCreditsValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CO₂/hectare/year</span>
                      <span className="font-medium">
                        {eco.restorationAge > 0
                          ? formatNumber(Math.round(metrics.co2SequesteredTonnes / areaHectares / eco.restorationAge))
                          : "—"}{" "}
                        t
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trees */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TreePine className="w-4 h-4 text-primary" /> Reforestation Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Survival rate</span>
                      <span className="font-semibold">{metrics.survivalRate}%</span>
                    </div>
                    <Progress
                      value={metrics.survivalRate}
                      className="h-2"
                    />
                  </div>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Trees planted</span>
                      <span className="font-medium">{formatNumber(metrics.treesPlanted)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated surviving</span>
                      <span className="font-medium">
                        {formatNumber(Math.round(metrics.treesPlanted * (metrics.survivalRate / 100)))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Density</span>
                      <span className="font-medium">
                        {Math.round(metrics.treesPlanted / areaHectares)} trees/ha
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Water & Soil */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-500" /> Water & Soil
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Water retention (est.)</span>
                      <span className="font-medium">{formatNumber(eco.waterRetention)} m³/yr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Soil conserved (est.)</span>
                      <span className="font-medium">{formatNumber(eco.soilConserved)} t/yr</span>
                    </div>
                    <p className="text-xs text-muted-foreground pt-2 border-t">
                      Estimates based on area and ecosystem type. Actual values depend on soil conditions, slope, and rainfall patterns.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" /> Project Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Restoration started</span>
                      <span className="font-medium">{year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Years active</span>
                      <span className="font-medium">{eco.restorationAge} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Restoration type</span>
                      <span className="font-medium">{restorationLabel(restorationType)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data source</span>
                      <span className="font-medium">{source === "OSM" ? "OpenStreetMap" : "Mock Data"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ---- Biodiversity Tab ---- */}
          <TabsContent value="biodiversity" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" /> Biodiversity Index
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle
                          cx="50" cy="50" r="42"
                          fill="none"
                          stroke="currentColor"
                          className="text-muted"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50" cy="50" r="42"
                          fill="none"
                          stroke="currentColor"
                          className="text-primary"
                          strokeWidth="8"
                          strokeDasharray={`${metrics.biodiversityIndex * 2.64} 264`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-foreground">
                        {metrics.biodiversityIndex}
                      </span>
                    </div>
                    <div className="text-sm space-y-1">
                      <p className="font-medium text-foreground">
                        {metrics.biodiversityIndex >= 70
                          ? "High biodiversity"
                          : metrics.biodiversityIndex >= 40
                            ? "Moderate biodiversity"
                            : "Low biodiversity — needs attention"}
                      </p>
                      <p className="text-muted-foreground">
                        Species density relative to area. Higher values indicate a healthier, more diverse ecosystem.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Bug className="w-4 h-4 text-dryland" /> Species & Observations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Unique species recorded</span>
                      <span className="font-semibold text-foreground">{metrics.speciesCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total GBIF observations</span>
                      <span className="font-semibold text-foreground">
                        {formatNumber(metrics.totalObservations)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated endemic species</span>
                      <span className="font-semibold text-foreground">
                        ~{Math.round(metrics.speciesCount * 0.15)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Species per hectare</span>
                      <span className="font-semibold text-foreground">
                        {areaHectares > 0 ? (metrics.speciesCount / areaHectares).toFixed(4) : "—"}
                      </span>
                    </div>
                    <Separator />
                    <p className="text-xs text-muted-foreground">
                      Species data sourced from GBIF (Global Biodiversity Information Facility) occurrence records.
                      Counts represent documented observations within the site bounding box.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ---- Community Impact Tab ---- */}
          <TabsContent value="community" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Award className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{eco.jobsEstimate}</div>
                  <div className="text-sm text-muted-foreground">Estimated Jobs Created</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Based on ~2 jobs per 100 hectares for restoration and maintenance
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{eco.communitiesServed}</div>
                  <div className="text-sm text-muted-foreground">Communities Served</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Estimated surrounding communities benefiting from ecosystem services
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Globe className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">
                    ${formatNumber(eco.carbonCreditsValue)}
                  </div>
                  <div className="text-sm text-muted-foreground">Carbon Credit Value</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    At ~$15/tonne voluntary carbon market rate
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Note:</strong> Community impact figures are
                  estimates derived from area-based models. Actual impact varies based on local
                  population density, economic conditions, and project implementation. For verified
                  data, consult the managing conservation organization.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* ================================================================
            DATA SOURCES FOOTER
        ================================================================ */}
        <section className="border-t pt-6 pb-8">
          <h3 className="text-sm font-semibold text-foreground mb-3">Data Sources & Attribution</h3>
          <div className="grid sm:grid-cols-3 gap-4 text-xs text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-1">Site Boundaries</p>
              <p>OpenStreetMap contributors via Overpass API. Licensed under ODbL.</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Biodiversity Data</p>
              <p>GBIF — Global Biodiversity Information Facility. Free and open access.</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Satellite Imagery</p>
              <p>Mapbox (Mapbox Streets & Satellite) powered by Sentinel-2 / Landsat.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// ---- Metric tile sub-component ----
function MetricTile({
  icon: Icon,
  value,
  label,
  color = "text-primary",
}: {
  icon: typeof TreePine;
  value: string;
  label: string;
  color?: string;
}) {
  return (
    <Card className="text-center">
      <CardContent className="pt-4 pb-3 px-3">
        <Icon className={`w-5 h-5 mx-auto mb-1 ${color}`} />
        <div className="text-lg font-bold text-foreground">{value}</div>
        <div className="text-[11px] text-muted-foreground leading-tight">{label}</div>
      </CardContent>
    </Card>
  );
}
