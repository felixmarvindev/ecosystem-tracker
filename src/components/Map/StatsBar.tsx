import { MapPin, Ruler, Bug } from "lucide-react";
import { useMap } from "@/context/MapContext";
import { formatNumber } from "@/utils/formatters";

export function StatsBar() {
  const { totals } = useMap();

  const stats = [
    { icon: MapPin, label: "Sites", value: totals.sites },
    { icon: Ruler, label: "Hectares", value: totals.hectares },
    { icon: Bug, label: "Species", value: totals.species },
  ];

  return (
    <div className="absolute top-3 left-2 sm:left-14 z-10 flex gap-2 max-w-[calc(100%-1rem)] overflow-x-auto">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-2 rounded-lg bg-card/90 backdrop-blur px-3 py-2 shadow-md border text-sm"
        >
          <s.icon className="w-4 h-4 text-primary" />
          <span className="font-semibold text-foreground">{formatNumber(s.value)}</span>
          <span className="text-muted-foreground hidden sm:inline">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
