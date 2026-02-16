import { Trees } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50 gap-4">
      <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center animate-pulse">
        <Trees className="w-8 h-8 text-primary-foreground" />
      </div>
      <div className="text-center">
        <h2 className="text-lg font-semibold text-foreground">
          Loading Restoration Sites
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Preparing map data…
        </p>
      </div>
    </div>
  );
}
