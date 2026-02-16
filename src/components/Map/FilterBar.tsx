import { useMap } from "@/context/MapContext";
import { restorationLabel } from "@/utils/formatters";
import type { RestorationType } from "@/types";

const TYPES: (RestorationType | "ALL")[] = [
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

export function FilterBar() {
  const { filterType, setFilterType } = useMap();

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1 rounded-lg bg-card/90 backdrop-blur p-1 shadow-lg border">
      {TYPES.map((t) => (
        <button
          key={t}
          onClick={() => setFilterType(t)}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            filterType === t
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${DOT_COLORS[t]}`} />
          <span className="hidden sm:inline">
            {t === "ALL" ? "All" : restorationLabel(t)}
          </span>
        </button>
      ))}
    </div>
  );
}
