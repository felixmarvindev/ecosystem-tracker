import { useState, useRef, useEffect, useMemo } from "react";
import { Search, X, MapPin } from "lucide-react";
import { useMap } from "@/context/MapContext";
import { restorationLabel } from "@/utils/formatters";

export function SearchBar() {
  const {
    sites,
    setSelectedSiteId,
    setZoomToSiteId,
    searchQuery,
    setSearchQuery,
  } = useMap();
  const [open, setOpen] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter sites by name or county
  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return sites.filter(
      (s) =>
        s.properties.name.toLowerCase().includes(q) ||
        (s.properties.county ?? "").toLowerCase().includes(q),
    );
  }, [sites, searchQuery]);

  // Reset highlight when results change
  useEffect(() => {
    setHighlightIdx(-1);
  }, [results.length]);

  // Close dropdown on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        listRef.current &&
        !listRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function selectSite(siteId: string) {
    setSelectedSiteId(siteId);
    setZoomToSiteId(siteId);
    setSearchQuery("");
    setOpen(false);
    inputRef.current?.blur();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && highlightIdx >= 0) {
      e.preventDefault();
      selectSite(results[highlightIdx].id);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div className="absolute top-3 right-2 sm:right-4 z-10 w-[calc(100%-1rem)] sm:w-80 max-w-sm">
      {/* Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search sites…"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => searchQuery.trim() && setOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-lg bg-card/95 backdrop-blur border shadow-md pl-9 pr-8 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 transition"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setOpen(false);
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && searchQuery.trim() && (
        <div
          ref={listRef}
          className="mt-1 rounded-lg bg-card border shadow-lg max-h-64 overflow-y-auto"
        >
          {results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-muted-foreground">No sites found</div>
          ) : (
            results.map((site, idx) => (
              <button
                key={site.id}
                onClick={() => selectSite(site.id)}
                onMouseEnter={() => setHighlightIdx(idx)}
                className={`w-full text-left px-4 py-2.5 flex items-start gap-3 transition-colors ${
                  idx === highlightIdx ? "bg-muted" : "hover:bg-muted/50"
                }`}
              >
                <MapPin
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{
                    color:
                      site.properties.restorationType === "MANGROVE" ? "#2E7D32"
                      : site.properties.restorationType === "FOREST" ? "#388E3C"
                      : site.properties.restorationType === "DRYLAND" ? "#F57C00"
                      : site.properties.restorationType === "MOUNTAIN_FOREST" ? "#558B2F"
                      : "#66BB6A",
                  }}
                />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {site.properties.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {restorationLabel(site.properties.restorationType)}
                    {site.properties.county ? ` · ${site.properties.county}` : ""}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
