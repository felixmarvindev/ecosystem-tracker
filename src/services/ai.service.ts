/**
 * AI Insights service — Groq (primary) + OpenRouter (fallback).
 * Generates structured ecological insights from site data.
 */
import type { Site } from "@/types";
import { restorationLabel } from "@/utils/formatters";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";
const OPENROUTER_MODEL = "meta-llama/llama-3.3-70b-instruct";

// ---- Response shape ----
export interface SiteInsights {
  ecologicalAssessment: string;
  recommendations: string[];
  climateImpactAnalysis: string;
  biodiversityOutlook: string;
  riskFactors: Array<{ factor: string; severity: "low" | "medium" | "high" }>;
  siteDescription: string;
  speciesSpotlight: string[];
  comparativeContext: string;
}

const INSIGHTS_SCHEMA = `
Respond with valid JSON only, no markdown or extra text. Use this exact structure:
{
  "ecologicalAssessment": "2-3 sentences on current health, strengths, and risks",
  "recommendations": ["suggestion 1", "suggestion 2", "suggestion 3", "optional 4th"],
  "climateImpactAnalysis": "2-3 sentences on carbon sequestration context and climate resilience",
  "biodiversityOutlook": "2-3 sentences on species trends and conservation priorities",
  "riskFactors": [
    { "factor": "short description", "severity": "low" | "medium" | "high" }
  ],
  "siteDescription": "One engaging paragraph (2-4 sentences) describing this restoration site for the public, using the metrics. Do not start with 'This site'.",
  "speciesSpotlight": ["1-2 sentences on notable species/ecosystem value", "optional second bullet"],
  "comparativeContext": "One sentence placing a key metric in real-world context (e.g. CO2 equivalent to cars removed, trees equivalent to X football pitches)"
}`;

const cache = new Map<string, SiteInsights>();

function buildPrompt(site: Site): string {
  const p = site.properties;
  const age = new Date().getFullYear() - p.year;

  return `You are an ecological analyst. Analyze this Kenyan restoration site and respond with the requested JSON.

Site: ${p.name}
Type: ${restorationLabel(p.restorationType)}
Location: ${p.county || "Kenya"}
Area: ${p.areaHectares.toLocaleString()} hectares
Year started: ${p.year} (${age} years active)
Trees planted: ${p.metrics.treesPlanted.toLocaleString()} (survival rate: ${p.metrics.survivalRate}%)
CO2 sequestered: ${p.metrics.co2SequesteredTonnes.toLocaleString()} tonnes
Species recorded: ${p.metrics.speciesCount} (biodiversity index: ${p.metrics.biodiversityIndex}/100)
GBIF observations: ${p.metrics.totalObservations.toLocaleString()}

${INSIGHTS_SCHEMA}`;
}

async function callGroq(prompt: string): Promise<string> {
  const key = import.meta.env.VITE_GROQ_API_KEY as string | undefined;
  if (!key) throw new Error("VITE_GROQ_API_KEY not set");

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
      max_tokens: 2048,
    }),
  });

  if (!res.ok) {
    throw new Error(`Groq: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error("Groq: empty response");
  return content;
}

async function callOpenRouter(prompt: string): Promise<string> {
  const key = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined;
  if (!key) throw new Error("VITE_OPENROUTER_API_KEY not set");

  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
      "HTTP-Referer": typeof window !== "undefined" ? window.location.origin : "",
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
      max_tokens: 2048,
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenRouter: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error("OpenRouter: empty response");
  return content;
}

function parseJsonResponse(raw: string): SiteInsights {
  // Strip markdown code block if present
  let jsonStr = raw.trim();
  const match = jsonStr.match(/^```(?:json)?\s*([\s\S]*?)```$/);
  if (match) jsonStr = match[1].trim();

  const parsed = JSON.parse(jsonStr) as Record<string, unknown>;

  return {
    ecologicalAssessment: String(parsed.ecologicalAssessment ?? ""),
    recommendations: Array.isArray(parsed.recommendations)
      ? parsed.recommendations.map(String)
      : [],
    climateImpactAnalysis: String(parsed.climateImpactAnalysis ?? ""),
    biodiversityOutlook: String(parsed.biodiversityOutlook ?? ""),
    riskFactors: Array.isArray(parsed.riskFactors)
      ? (parsed.riskFactors as Array<{ factor: string; severity: string }>).map(
          (r) => ({
            factor: String(r.factor ?? ""),
            severity:
              r.severity === "high" || r.severity === "medium"
                ? r.severity
                : "low",
          }),
        )
      : [],
    siteDescription: String(parsed.siteDescription ?? ""),
    speciesSpotlight: Array.isArray(parsed.speciesSpotlight)
      ? parsed.speciesSpotlight.map(String)
      : [],
    comparativeContext: String(parsed.comparativeContext ?? ""),
  };
}

export function isAIConfigured(): boolean {
  const groq = import.meta.env.VITE_GROQ_API_KEY;
  const openRouter = import.meta.env.VITE_OPENROUTER_API_KEY;
  return Boolean(groq || openRouter);
}

/**
 * Generate structured AI insights for a site. Uses Groq first, falls back to OpenRouter.
 * Results are cached in memory per site ID.
 */
export async function generateSiteInsights(
  site: Site,
  forceRefresh = false,
): Promise<SiteInsights> {
  if (!forceRefresh && cache.has(site.id)) {
    return cache.get(site.id)!;
  }

  const prompt = buildPrompt(site);

  let raw: string;
  try {
    raw = await callGroq(prompt);
  } catch (e) {
    if (isAIConfigured()) {
      raw = await callOpenRouter(prompt);
    } else {
      throw e;
    }
  }

  const insights = parseJsonResponse(raw);
  cache.set(site.id, insights);
  return insights;
}
