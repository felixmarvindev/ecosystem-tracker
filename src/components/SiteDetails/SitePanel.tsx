import { X, TreePine, TrendingUp, Globe, Bug, MapPin, BarChart3, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMap } from "@/context/MapContext";
import { MetricCard } from "./MetricCard";
import { formatNumber, restorationLabel } from "@/utils/formatters";

export function SitePanel() {
  const { selectedSite, setSelectedSiteId } = useMap();

  if (!selectedSite) return null;

  const { name, restorationType, county, areaHectares, metrics } =
    selectedSite.properties;

  return (
    <div className="absolute top-0 right-0 h-full w-full md:w-[var(--panel-width)] bg-card shadow-2xl z-20 flex flex-col animate-slide-in-right">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex justify-between items-start gap-2">
        <div className="min-w-0">
          <h2 className="text-lg font-bold leading-tight truncate">{name}</h2>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge variant="secondary" className="text-xs">
              {restorationLabel(restorationType)}
            </Badge>
            <span className="text-xs opacity-80 flex items-center gap-1"><MapPin className="w-3 h-3" /> {county}</span>
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="text-primary-foreground hover:bg-primary-foreground/20 shrink-0"
          onClick={() => setSelectedSiteId(null)}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Area highlight */}
        <div className="rounded-lg bg-muted p-4 text-center">
          <div className="text-3xl font-bold text-foreground">
            {formatNumber(areaHectares)}
          </div>
          <div className="text-sm text-muted-foreground">Hectares</div>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            icon={TreePine}
            value={formatNumber(metrics.treesPlanted)}
            label="Trees Planted"
          />
          <MetricCard
            icon={TrendingUp}
            value={`${metrics.survivalRate}%`}
            label="Survival Rate"
          />
          <MetricCard
            icon={Globe}
            value={`${formatNumber(metrics.co2SequesteredTonnes)} t`}
            label="CO₂ Sequestered"
          />
          <MetricCard
            icon={Bug}
            value={String(metrics.speciesCount)}
            label="Species"
          />
        </div>

        {/* Biodiversity */}
        <div className="border-t pt-4">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" /> Biodiversity
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Observations</span>
              <span className="font-medium text-foreground">
                {formatNumber(metrics.totalObservations)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Biodiversity Index</span>
              <span className="font-medium text-foreground">
                {metrics.biodiversityIndex}/100
              </span>
            </div>
          </div>
        </div>

        {/* View full details */}
        <Link to={`/site/${selectedSite.id}`}>
          <Button variant="default" className="w-full gap-2">
            <ExternalLink className="w-4 h-4" />
            View Full Details
          </Button>
        </Link>

        {/* Attribution */}
        <div className="text-xs text-muted-foreground border-t pt-3">
          <p className="font-medium mb-1">Data sources:</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>Site boundary: OpenStreetMap</li>
            <li>Species data: GBIF</li>
            <li>Satellite: Mapbox / Sentinel-2</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
