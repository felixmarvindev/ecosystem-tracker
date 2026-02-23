import { Link } from "react-router-dom";
import {
  Globe,
  Satellite,
  Trees,
  List,
  GitCompareArrows,
  Link2,
  BookmarkPlus,
  Bookmark,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMap } from "@/context/MapContext";

interface SavedView {
  id: string;
  name: string;
  url: string;
  createdAt: string;
}

const SAVED_VIEWS_KEY = "saved-map-views-v1";

export function Header() {
  const { showSatellite, setShowSatellite } = useMap();
  const [savedViewsOpen, setSavedViewsOpen] = useState(false);
  const [savedViews, setSavedViews] = useState<SavedView[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(SAVED_VIEWS_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as SavedView[];
      if (Array.isArray(parsed)) setSavedViews(parsed);
    } catch {
      // Ignore malformed localStorage data
    }
  }, []);

  const sortedSavedViews = useMemo(
    () =>
      [...savedViews].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [savedViews],
  );

  function persistSavedViews(next: SavedView[]) {
    setSavedViews(next);
    localStorage.setItem(SAVED_VIEWS_KEY, JSON.stringify(next));
  }

  async function copyCurrentViewLink() {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
  }

  function saveCurrentView() {
    const name = window.prompt("Name this view", `View ${savedViews.length + 1}`);
    if (!name) return;
    const next: SavedView[] = [
      ...savedViews,
      {
        id: `${Date.now()}`,
        name,
        url: window.location.href,
        createdAt: new Date().toISOString(),
      },
    ];
    persistSavedViews(next);
  }

  function deleteSavedView(id: string) {
    const next = savedViews.filter((v) => v.id !== id);
    persistSavedViews(next);
  }

  return (
    <header className="h-[var(--header-height)] flex items-center justify-between px-4 md:px-6 bg-card border-b shadow-sm z-20 relative">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Trees className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold leading-tight text-foreground">
              Kenya Restoration Tracker
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Monitoring ecosystem restoration impact
            </p>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setSavedViewsOpen((v) => !v)}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved Views</span>
          </Button>

          {savedViewsOpen && (
            <div className="absolute right-0 mt-1 w-80 rounded-lg bg-card border shadow-lg p-2 max-h-80 overflow-y-auto">
              {sortedSavedViews.length === 0 ? (
                <div className="px-2 py-3 text-sm text-muted-foreground">
                  No saved views yet.
                </div>
              ) : (
                <div className="space-y-1">
                  {sortedSavedViews.map((v) => (
                    <div
                      key={v.id}
                      className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 hover:bg-muted"
                    >
                      <a
                        href={v.url}
                        className="text-sm text-foreground truncate hover:underline"
                        title={v.name}
                      >
                        {v.name}
                      </a>
                      <button
                        onClick={() => deleteSavedView(v.id)}
                        className="text-muted-foreground hover:text-destructive"
                        title="Delete view"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <Button variant="outline" size="sm" className="gap-2 hidden sm:flex" onClick={copyCurrentViewLink}>
          <Link2 className="w-4 h-4" />
          <span>Copy View</span>
        </Button>

        <Button variant="outline" size="sm" className="gap-2 hidden sm:flex" onClick={saveCurrentView}>
          <BookmarkPlus className="w-4 h-4" />
          <span>Save View</span>
        </Button>

        <Link to="/sites">
          <Button variant="outline" size="sm" className="gap-2">
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">All Sites</span>
          </Button>
        </Link>

        <Link to="/compare">
          <Button variant="outline" size="sm" className="gap-2">
            <GitCompareArrows className="w-4 h-4" />
            <span className="hidden sm:inline">Compare</span>
          </Button>
        </Link>

        <Button
          variant={showSatellite ? "default" : "outline"}
          size="sm"
          onClick={() => setShowSatellite(!showSatellite)}
          className="gap-2"
        >
          {showSatellite ? (
            <Satellite className="w-4 h-4" />
          ) : (
            <Globe className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">
            {showSatellite ? "Satellite" : "Map"}
          </span>
        </Button>
      </div>
    </header>
  );
}
