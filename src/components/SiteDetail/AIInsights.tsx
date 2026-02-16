import { useState, useEffect, useCallback } from "react";
import {
  Sparkles,
  RefreshCw,
  Leaf,
  Target,
  Globe,
  Bug,
  AlertTriangle,
  Newspaper,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  generateSiteInsights,
  isAIConfigured,
  type SiteInsights,
} from "@/services/ai.service";
import { fetchSiteNews, type NewsArticle } from "@/services/news.service";
import type { Site } from "@/types";

interface AIInsightsProps {
  site: Site;
}

function SkeletonCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="h-5 w-32 rounded bg-muted animate-pulse" />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="h-3 w-full rounded bg-muted animate-pulse" />
        <div className="h-3 w-4/5 rounded bg-muted animate-pulse" />
        <div className="h-3 w-2/3 rounded bg-muted animate-pulse" />
      </CardContent>
    </Card>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export function AIInsights({ site }: AIInsightsProps) {
  const [insights, setInsights] = useState<SiteInsights | null>(null);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [regenerating, setRegenerating] = useState(false);

  const load = useCallback(
    async (forceRefresh = false) => {
      if (!isAIConfigured()) {
        setError(
          "Add VITE_GROQ_API_KEY or VITE_OPENROUTER_API_KEY to .env.local to enable AI insights.",
        );
        setLoading(false);
        return;
      }

      if (forceRefresh) setRegenerating(true);
      else setLoading(true);
      setError(null);

      try {
        const [insightsResult, newsResult] = await Promise.all([
          generateSiteInsights(site, forceRefresh),
          fetchSiteNews(site.properties.name, site.properties.county ?? ""),
        ]);
        setInsights(insightsResult);
        setNews(newsResult);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load insights");
        if (forceRefresh) setInsights(null);
      } finally {
        setLoading(false);
        setRegenerating(false);
      }
    },
    [site],
  );

  useEffect(() => {
    load();
  }, [load]);

  if (loading && !insights) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" /> AI Insights
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <SkeletonCard />
      </div>
    );
  }

  if (error && !insights) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" /> AI Insights
        </h2>
        <Card className="border-destructive/50">
          <CardContent className="pt-6 flex flex-col items-center gap-3 text-center">
            <AlertTriangle className="w-10 h-10 text-destructive" />
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button variant="outline" size="sm" onClick={() => load(true)}>
              Try again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const data = insights!;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" /> AI Insights
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => load(true)}
          disabled={regenerating}
        >
          <RefreshCw className={`w-4 h-4 ${regenerating ? "animate-spin" : ""}`} />
          {regenerating ? "Regenerating…" : "Regenerate"}
        </Button>
      </div>

      {/* Site description (from plan: AI-generated description) */}
      {data.siteDescription && (
        <Card>
          <CardContent className="pt-5 pb-4">
            <p className="text-sm text-foreground leading-relaxed">
              {data.siteDescription}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Comparative context one-liner */}
      {data.comparativeContext && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-4 pb-4">
            <p className="text-sm font-medium text-foreground">
              {data.comparativeContext}
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {/* Ecological Assessment */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Leaf className="w-4 h-4 text-primary" /> Ecological Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {data.ecologicalAssessment || "—"}
            </p>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" /> Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.recommendations.length > 0 ? (
              <ol className="list-decimal list-inside space-y-1.5 text-sm text-muted-foreground">
                {data.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-muted-foreground">—</p>
            )}
          </CardContent>
        </Card>

        {/* Climate Impact */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" /> Climate Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {data.climateImpactAnalysis || "—"}
            </p>
          </CardContent>
        </Card>

        {/* Biodiversity Outlook */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Bug className="w-4 h-4 text-dryland" /> Biodiversity Outlook
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {data.biodiversityOutlook || "—"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Factors */}
      {data.riskFactors.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" /> Risk Factors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {data.riskFactors.map((r, i) => (
                <Badge
                  key={i}
                  variant={
                    r.severity === "high"
                      ? "destructive"
                      : r.severity === "medium"
                        ? "secondary"
                        : "outline"
                  }
                  className="text-xs"
                >
                  {r.factor}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Species Spotlight */}
      {data.speciesSpotlight.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Bug className="w-4 h-4 text-mountain" /> Species Spotlight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
              {data.speciesSpotlight.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* News feed */}
      <div>
        <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-muted-foreground" /> News & Updates
        </h3>
        {news.length === 0 ? (
          <Card>
            <CardContent className="pt-6 pb-6 text-center text-sm text-muted-foreground">
              No recent news found for this area. Add VITE_NEWS_API_KEY for news search.
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {news.map((article, i) => (
              <a
                key={i}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="h-full hover:shadow-md hover:border-primary/30 transition-all group">
                  {article.urlToImage && (
                    <div className="aspect-video overflow-hidden rounded-t-lg bg-muted">
                      <img
                        src={article.urlToImage}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <CardContent className="pt-3 pb-3">
                    <h4 className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <span>{article.source}</span>
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                    {article.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {article.description}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-1 text-xs text-primary mt-2">
                      Read <ExternalLink className="w-3 h-3" />
                    </span>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Attribution */}
      <p className="text-[10px] text-muted-foreground border-t pt-4">
        Insights powered by Groq / OpenRouter. News from NewsAPI.org.
      </p>
    </div>
  );
}
