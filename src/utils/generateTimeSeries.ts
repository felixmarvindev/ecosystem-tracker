/**
 * Generate simulated monthly time-series data for a restoration site.
 *
 * The series starts from the site's `year` and runs to the current month.
 * Values follow realistic S-curve / logarithmic growth patterns seeded
 * by the site's actual metrics so the final data point matches reality.
 */
import type { Site } from "@/types";

export interface MonthlyDataPoint {
  /** ISO date string YYYY-MM */
  month: string;
  /** Display label e.g. "Jan 2022" */
  label: string;
  treesPlanted: number;
  survivalRate: number;
  co2Sequestered: number;
  speciesCount: number;
  observations: number;
  biodiversityIndex: number;
}

/** Deterministic pseudo-random from a seed string (simple hash → [0,1)) */
function seededRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return () => {
    h = (Math.imul(h ^ (h >>> 16), 0x45d9f3b) + 0x1) | 0;
    return ((h >>> 0) / 4294967296);
  };
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * S-curve growth: slow start → fast growth → plateau.
 * `t` is progress [0, 1], returns [0, 1].
 */
function sCurve(t: number): number {
  return 1 / (1 + Math.exp(-10 * (t - 0.4)));
}

export function generateTimeSeries(site: Site): MonthlyDataPoint[] {
  const { year, metrics } = site.properties;
  const rng = seededRandom(site.id);

  const now = new Date();
  const startYear = year;
  const startMonth = 0; // January of start year

  const endYear = now.getFullYear();
  const endMonth = now.getMonth();

  // Total months from project start to now
  const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;

  if (totalMonths <= 0) return [];

  // Current (final) metric values
  const finalTrees = metrics.treesPlanted;
  const finalSurvival = metrics.survivalRate;
  const finalCO2 = metrics.co2SequesteredTonnes;
  const finalSpecies = metrics.speciesCount;
  const finalObs = metrics.totalObservations;
  const finalBio = metrics.biodiversityIndex;

  const points: MonthlyDataPoint[] = [];

  for (let i = 0; i < totalMonths; i++) {
    const m = (startMonth + i) % 12;
    const y = startYear + Math.floor((startMonth + i) / 12);
    const progress = totalMonths > 1 ? i / (totalMonths - 1) : 1;

    // Add some monthly noise
    const noise = 1 + (rng() - 0.5) * 0.06;

    // Trees: fast planting phase then plateau
    const treeCurve = sCurve(progress);
    const trees = Math.round(finalTrees * treeCurve * noise);

    // Survival: starts high, dips mid-project, recovers
    const survivalDip = 1 - 0.08 * Math.sin(Math.PI * progress);
    const survivalBase = finalSurvival * 0.9 + finalSurvival * 0.1 * progress;
    const survival = Math.round(Math.min(100, survivalBase * survivalDip * (1 + (rng() - 0.5) * 0.02)));

    // CO2: cumulative, accelerates over time (more trees → more sequestration)
    const co2 = Math.round(finalCO2 * Math.pow(progress, 1.4) * noise);

    // Species: logarithmic discovery curve
    const speciesCurve = progress > 0 ? Math.log(1 + progress * 9) / Math.log(10) : 0;
    const species = Math.round(finalSpecies * speciesCurve * noise);

    // Observations: roughly linear with seasonal variation
    const seasonal = 1 + 0.2 * Math.sin((m / 12) * 2 * Math.PI - Math.PI / 2);
    const obs = Math.round(finalObs * progress * seasonal * noise);

    // Biodiversity index: follows species curve
    const bio = Math.round(finalBio * speciesCurve * (1 + (rng() - 0.5) * 0.04));

    points.push({
      month: `${y}-${String(m + 1).padStart(2, "0")}`,
      label: `${MONTH_NAMES[m]} ${y}`,
      treesPlanted: Math.max(0, trees),
      survivalRate: Math.max(0, Math.min(100, survival)),
      co2Sequestered: Math.max(0, co2),
      speciesCount: Math.max(0, species),
      observations: Math.max(0, obs),
      biodiversityIndex: Math.max(0, Math.min(100, bio)),
    });
  }

  return points;
}

/** Get a subset of the data based on a time range filter */
export type TimeRange = "6m" | "1y" | "2y" | "5y" | "all";

export function filterByTimeRange(
  data: MonthlyDataPoint[],
  range: TimeRange,
): MonthlyDataPoint[] {
  if (range === "all" || data.length === 0) return data;

  const monthsBack: Record<Exclude<TimeRange, "all">, number> = {
    "6m": 6,
    "1y": 12,
    "2y": 24,
    "5y": 60,
  };

  const n = monthsBack[range];
  return data.slice(Math.max(0, data.length - n));
}
