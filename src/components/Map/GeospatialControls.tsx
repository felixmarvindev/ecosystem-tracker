import { useEffect, useMemo, useState } from "react";
import * as turf from "@turf/turf";
import { Download, Pause, Play } from "lucide-react";
import { useMap } from "@/context/MapContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  downloadSentinelImage,
  isSentinelConfigured,
  type SentinelLayer,
} from "@/services/sentinel.service";

const KENYA_BBOX: [number, number, number, number] = [33.9, -5.0, 41.9, 4.6];

const LAYERS: { value: "RGB" | "NDVI" | "LAND_COVER"; label: string }[] = [
  { value: "RGB", label: "RGB" },
  { value: "NDVI", label: "NDVI" },
  { value: "LAND_COVER", label: "Land Cover" },
];

function monthOptions(): string[] {
  const options: string[] = [];
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth(), 1);
  const start = new Date(end.getFullYear() - 2, end.getMonth(), 1);
  const cursor = new Date(start);

  while (cursor <= end) {
    options.push(`${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`);
    cursor.setMonth(cursor.getMonth() + 1);
  }
  return options;
}

function monthLabel(value: string): string {
  const [year, month] = value.split("-").map(Number);
  const date = new Date(year, month - 1, 1);
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
}

export function GeospatialControls() {
  const {
    selectedSite,
    imageryLayer,
    layerOpacity,
    ndviMonth,
    setImageryLayer,
    setLayerOpacity,
    setNdviMonth,
  } = useMap();
  const { toast } = useToast();

  const [playing, setPlaying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const months = useMemo(() => monthOptions(), []);
  const ndviMonthIndex = Math.max(0, months.indexOf(ndviMonth));
  const hasSentinel = isSentinelConfigured();

  const exportRange = useMemo(() => {
    if (imageryLayer === "NDVI") {
      const [year, month] = ndviMonth.split("-").map(Number);
      const from = `${year}-${String(month).padStart(2, "0")}-01`;
      const lastDate = new Date(year, month, 0).getDate();
      const to = `${year}-${String(month).padStart(2, "0")}-${String(lastDate).padStart(2, "0")}`;
      return { from, to, label: ndviMonth };
    }
    const year = new Date().getFullYear();
    return {
      from: `${year}-01-01`,
      to: `${year}-12-31`,
      label: String(year),
    };
  }, [imageryLayer, ndviMonth]);

  const targetBbox = useMemo<[number, number, number, number]>(() => {
    if (!selectedSite) return KENYA_BBOX;
    const bbox = turf.bbox(turf.polygon(selectedSite.geometry.coordinates));
    return [bbox[0], bbox[1], bbox[2], bbox[3]];
  }, [selectedSite]);

  async function onDownload() {
    if (!hasSentinel) {
      toast({
        title: "Sentinel credentials missing",
        description: "Add Sentinel Hub credentials in .env.local to export imagery.",
      });
      return;
    }
    if (imageryLayer === "LAND_COVER") {
      toast({
        title: "Land-cover export unavailable",
        description: "Export currently supports RGB and NDVI imagery.",
      });
      return;
    }

    setIsDownloading(true);
    try {
      const siteName = selectedSite?.properties.name ?? "kenya-viewport";
      const slug = siteName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      const filename = `${slug}-${imageryLayer.toLowerCase()}-${exportRange.label}.png`;
      const ok = await downloadSentinelImage(
        targetBbox,
        exportRange.from,
        exportRange.to,
        imageryLayer as SentinelLayer,
        filename,
      );
      if (ok) {
        toast({
          title: "Imagery downloaded",
          description: `Saved ${imageryLayer} image for ${exportRange.label}.`,
        });
      } else {
        toast({
          title: "Export failed",
          description: "No image was returned for that date range.",
        });
      }
    } finally {
      setIsDownloading(false);
    }
  }

  // NDVI month playback loop.
  useEffect(() => {
    if (!playing || imageryLayer !== "NDVI") return;
    const timer = window.setInterval(() => {
      if (months.length === 0) return;
      const nextIdx = (ndviMonthIndex + 1) % months.length;
      setNdviMonth(months[nextIdx]);
    }, 1100);
    return () => window.clearInterval(timer);
  }, [playing, imageryLayer, ndviMonthIndex, months, setNdviMonth]);

  return (
    <div className="absolute left-2 sm:left-4 top-20 z-10 w-[min(22rem,calc(100%-1rem))] rounded-xl border bg-card/95 backdrop-blur shadow-lg">
      <div className="px-3.5 py-3 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-foreground">Geospatial Layers</p>
          <p className="text-[11px] text-muted-foreground">Phase 2</p>
        </div>

        <div className="flex rounded-lg border overflow-hidden">
          {LAYERS.map((layer) => (
            <button
              key={layer.value}
              className={`flex-1 px-2.5 py-1.5 text-xs font-medium transition-colors ${
                imageryLayer === layer.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setImageryLayer(layer.value)}
            >
              {layer.label}
            </button>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="layer-opacity" className="text-xs text-muted-foreground">
              Layer opacity
            </label>
            <span className="text-xs font-medium text-foreground">{layerOpacity}%</span>
          </div>
          <input
            id="layer-opacity"
            type="range"
            min={0}
            max={100}
            step={1}
            value={layerOpacity}
            onChange={(e) => setLayerOpacity(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {imageryLayer === "NDVI" && (
          <div className="space-y-2 rounded-lg border p-2.5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs text-muted-foreground">
                NDVI month: <span className="text-foreground font-medium">{monthLabel(months[ndviMonthIndex])}</span>
              </p>
              <Button
                variant="outline"
                size="sm"
                className="h-7 gap-1.5 text-xs"
                onClick={() => setPlaying((p) => !p)}
              >
                {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {playing ? "Pause" : "Play"}
              </Button>
            </div>
            <input
              type="range"
              min={0}
              max={Math.max(0, months.length - 1)}
              step={1}
              value={ndviMonthIndex}
              onChange={(e) => {
                const idx = Number(e.target.value);
                setNdviMonth(months[idx]);
              }}
              className="w-full"
            />
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2"
          onClick={onDownload}
          disabled={isDownloading}
        >
          <Download className="w-4 h-4" />
          {isDownloading ? "Downloading..." : "Download Date-Range Imagery"}
        </Button>
      </div>
    </div>
  );
}
