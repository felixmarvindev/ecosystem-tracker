import { MapProvider, useMap } from "@/context/MapContext";
import { Header } from "@/components/Layout/Header";
import { LoadingScreen } from "@/components/Layout/LoadingScreen";
import { MapView } from "@/components/Map/MapView";
import { StatsBar } from "@/components/Map/StatsBar";
import { FilterBar } from "@/components/Map/FilterBar";
import { SearchBar } from "@/components/Map/SearchBar";
import { GeospatialControls } from "@/components/Map/GeospatialControls";
import { SitePanel } from "@/components/SiteDetails/SitePanel";

function Dashboard() {
  const { loading } = useMap();

  if (loading) return <LoadingScreen />;

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="relative flex-1 overflow-hidden">
        <MapView />
        <StatsBar />
        <SearchBar />
        <GeospatialControls />
        <FilterBar />
        <SitePanel />
      </main>
    </div>
  );
}

export default function Index() {
  return (
    <MapProvider>
      <Dashboard />
    </MapProvider>
  );
}
