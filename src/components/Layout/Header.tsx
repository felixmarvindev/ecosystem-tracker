import { Link } from "react-router-dom";
import { Globe, Satellite, Trees, List, GitCompareArrows } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMap } from "@/context/MapContext";

export function Header() {
  const { showSatellite, setShowSatellite } = useMap();

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
