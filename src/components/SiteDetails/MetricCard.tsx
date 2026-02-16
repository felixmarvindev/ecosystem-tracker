import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

export function MetricCard({ icon: Icon, value, label }: MetricCardProps) {
  return (
    <div className="rounded-lg border bg-card p-3 text-center">
      <Icon className="w-5 h-5 text-primary mx-auto" />
      <div className="text-lg font-bold text-foreground mt-1">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
