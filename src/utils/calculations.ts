/**
 * Estimation formulas for restoration metrics.
 * These provide realistic estimates when actual measured data is unavailable.
 */

import type { RestorationType } from "@/types";

/** Trees-per-hectare density by ecosystem type. */
const DENSITY_MAP: Record<RestorationType, number> = {
  MANGROVE: 250,
  FOREST: 300,
  MOUNTAIN_FOREST: 350,
  DRYLAND: 150,
  PROTECTED_AREA: 200,
};

/** Estimated survival rates by ecosystem type (percentage). */
const SURVIVAL_MAP: Record<RestorationType, number> = {
  MANGROVE: 75,
  FOREST: 70,
  MOUNTAIN_FOREST: 65,
  DRYLAND: 55,
  PROTECTED_AREA: 70,
};

/**
 * Estimate trees planted based on area and restoration type.
 * Density ranges from 150 (dryland) to 350 (mountain forest) trees/ha.
 */
export function estimateTreesPlanted(
  areaHectares: number,
  type: RestorationType,
): number {
  return Math.round(areaHectares * DENSITY_MAP[type]);
}

/**
 * Estimated survival rate for a given ecosystem type.
 */
export function estimateSurvivalRate(type: RestorationType): number {
  return SURVIVAL_MAP[type];
}

/**
 * Estimate CO₂ sequestration in tonnes.
 * Assumes each surviving tree captures ~0.02 tonnes CO₂ per year.
 */
export function estimateCO2Sequestered(
  treesPlanted: number,
  survivalRate: number,
  yearsActive: number = 3,
): number {
  const CO2_PER_TREE_PER_YEAR = 0.02; // tonnes
  const survivingTrees = treesPlanted * (survivalRate / 100);
  return Number((survivingTrees * CO2_PER_TREE_PER_YEAR * yearsActive).toFixed(2));
}

/**
 * Simplified biodiversity index (0–100).
 * Based on species density relative to area.
 */
export function calculateBiodiversityIndex(
  speciesCount: number,
  areaHectares: number,
): number {
  if (areaHectares === 0) return 0;
  const speciesDensity = speciesCount / areaHectares;
  return Math.round(Math.min(100, speciesDensity * 10));
}
