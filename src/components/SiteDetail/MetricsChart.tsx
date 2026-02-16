import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/utils/formatters";
import {
  generateTimeSeries,
  filterByTimeRange,
  type TimeRange,
  type MonthlyDataPoint,
} from "@/utils/generateTimeSeries";
import type { Site } from "@/types";

// ---- Metric definitions for the chart ----
interface ChartMetric {
  key: keyof MonthlyDataPoint;
  label: string;
  color: string;
  unit: string;
  chartType: "line" | "area";
}

const CHART_METRICS: ChartMetric[] = [
  { key: "treesPlanted", label: "Trees Planted", color: "#388E3C", unit: "", chartType: "area" },
  { key: "survivalRate", label: "Survival Rate", color: "#558B2F", unit: "%", chartType: "line" },
  { key: "co2Sequestered", label: "CO₂ Sequestered", color: "#1976D2", unit: " t", chartType: "area" },
  { key: "speciesCount", label: "Species Count", color: "#F57C00", unit: "", chartType: "line" },
  { key: "observations", label: "Observations", color: "#7B1FA2", unit: "", chartType: "area" },
  { key: "biodiversityIndex", label: "Biodiversity Index", color: "#00897B", unit: "/100", chartType: "line" },
];

const TIME_RANGES: { value: TimeRange; label: string }[] = [
  { value: "6m", label: "6M" },
  { value: "1y", label: "1Y" },
  { value: "2y", label: "2Y" },
  { value: "5y", label: "5Y" },
  { value: "all", label: "All" },
];

interface MetricsChartProps {
  site: Site;
}

export function MetricsChart({ site }: MetricsChartProps) {
  const [selectedMetric, setSelectedMetric] = useState<keyof MonthlyDataPoint>("treesPlanted");
  const [timeRange, setTimeRange] = useState<TimeRange>("all");

  const fullData = useMemo(() => generateTimeSeries(site), [site]);
  const data = useMemo(() => filterByTimeRange(fullData, timeRange), [fullData, timeRange]);

  const metric = CHART_METRICS.find((m) => m.key === selectedMetric)!;

  // Calculate trend (last 6 months vs prior 6 months)
  const trend = useMemo(() => {
    if (fullData.length < 12) return null;
    const recent = fullData.slice(-6);
    const prior = fullData.slice(-12, -6);
    const avgRecent = recent.reduce((s, d) => s + (d[selectedMetric] as number), 0) / recent.length;
    const avgPrior = prior.reduce((s, d) => s + (d[selectedMetric] as number), 0) / prior.length;
    if (avgPrior === 0) return null;
    const pctChange = ((avgRecent - avgPrior) / avgPrior) * 100;
    return pctChange;
  }, [fullData, selectedMetric]);

  // Downsample labels so the X-axis isn't crowded
  const tickInterval = Math.max(1, Math.floor(data.length / 8));

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label: tipLabel }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-card border rounded-lg shadow-lg px-3 py-2 text-sm">
        <p className="font-medium text-foreground mb-1">{tipLabel}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.color }} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: p.color }}
            />
            {metric.label}: <span className="font-semibold">{formatNumber(p.value)}{metric.unit}</span>
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Metric selector pills */}
      <div className="flex flex-wrap gap-2">
        {CHART_METRICS.map((m) => (
          <button
            key={m.key}
            onClick={() => setSelectedMetric(m.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
              selectedMetric === m.key
                ? "text-white border-transparent"
                : "text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"
            }`}
            style={
              selectedMetric === m.key
                ? { backgroundColor: m.color }
                : undefined
            }
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Chart card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: metric.color }}
                />
                {metric.label} Over Time
              </CardTitle>
              {trend !== null && (
                <p className="text-xs text-muted-foreground mt-1">
                  6-month trend:{" "}
                  <span className={trend >= 0 ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                    {trend >= 0 ? "+" : ""}{trend.toFixed(1)}%
                  </span>
                </p>
              )}
            </div>

            {/* Time range toggle */}
            <div className="flex rounded-lg border overflow-hidden">
              {TIME_RANGES.map((tr) => (
                <button
                  key={tr.value}
                  onClick={() => setTimeRange(tr.value)}
                  className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                    timeRange === tr.value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tr.label}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {data.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
              No data available for this time range.
            </div>
          ) : metric.chartType === "area" ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id={`grad-${metric.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={metric.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={metric.color} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11 }}
                  className="text-muted-foreground"
                  interval={tickInterval}
                  angle={-30}
                  textAnchor="end"
                  height={50}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  className="text-muted-foreground"
                  tickFormatter={(v) => formatNumber(v)}
                  width={55}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey={metric.key}
                  stroke={metric.color}
                  strokeWidth={2}
                  fill={`url(#grad-${metric.key})`}
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11 }}
                  className="text-muted-foreground"
                  interval={tickInterval}
                  angle={-30}
                  textAnchor="end"
                  height={50}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  className="text-muted-foreground"
                  tickFormatter={(v) => formatNumber(v)}
                  width={55}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey={metric.key}
                  stroke={metric.color}
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 2, fill: metric.color }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}

          {/* Summary stats below chart */}
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Current</div>
              <div className="text-sm font-semibold text-foreground">
                {data.length > 0 ? formatNumber(data[data.length - 1][selectedMetric] as number) : "—"}
                {metric.unit}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Average</div>
              <div className="text-sm font-semibold text-foreground">
                {data.length > 0
                  ? formatNumber(
                      Math.round(
                        data.reduce((s, d) => s + (d[selectedMetric] as number), 0) / data.length,
                      ),
                    )
                  : "—"}
                {metric.unit}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Data Points</div>
              <div className="text-sm font-semibold text-foreground">{data.length} months</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Note: Time-series data is simulated from current site metrics using growth models.
        Actual month-to-month values may differ. Charts are seeded deterministically per site for consistency.
      </p>
    </div>
  );
}
