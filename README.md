# Kenya Restoration Tracker

Monitor ecosystem restoration impact across Kenyan protected areas. Interactive map, site details, before/after satellite comparison, AI insights, and export.

## Features

- **Interactive map** — Mapbox GL; restoration sites from OpenStreetMap; satellite/outdoors toggle; centroid pins and search
- **Site detail pages** — Metrics, trends (Recharts), environmental impact, biodiversity, community impact
- **Before/After comparison** — Sentinel-2 historical imagery (Sentinel Hub) or Mapbox; draggable slider
- **AI Insights** — Ecological assessment, recommendations, climate impact, news (Groq/OpenRouter + NewsAPI)
- **Sites list & compare** — Filter, search, export GeoJSON; side-by-side comparison (2–4 sites)
- **Export** — Download filtered or compared sites as GeoJSON

## Tech stack

- **Frontend:** React 18, TypeScript, Vite, React Router
- **UI:** Tailwind CSS, shadcn/ui
- **Map:** Mapbox GL JS, Turf.js
- **Data:** TanStack Query, OpenStreetMap (Overpass), GBIF, Sentinel Hub (optional), Groq/OpenRouter (optional), NewsAPI (optional)

## Local setup

```bash
git clone <repo-url>
cd ecosystem-tracker
npm install
cp .env.example .env.local
# Edit .env.local and add at least VITE_MAPBOX_TOKEN
npm run dev
```

**Required**

| Variable | Description |
|----------|-------------|
| `VITE_MAPBOX_TOKEN` | [Mapbox](https://mapbox.com) → Account → Tokens |

**Optional**

| Variable | Description |
|----------|-------------|
| `VITE_SENTINEL_HUB_CLIENT_ID` / `VITE_SENTINEL_HUB_CLIENT_SECRET` | [Sentinel Hub](https://www.sentinel-hub.com/) — real historical satellite in Before/After |
| `VITE_GROQ_API_KEY` or `VITE_OPENROUTER_API_KEY` | [Groq](https://console.groq.com/) / [OpenRouter](https://openrouter.ai/keys) — AI Insights tab |
| `VITE_NEWS_API_KEY` | [NewsAPI.org](https://newsapi.org/register) — news in AI Insights |

## Build & deploy

```bash
npm run build
npm run preview   # local preview of production build
```

Output is in `dist/`. Deploy `dist/` to any static host (Vercel, Netlify, Cloudflare Pages, etc.). Set the same env vars in the host’s dashboard so they are available at build time.

## Project metadata

| Field | Value |
|-------|--------|
| **Name** | Kenya Restoration Tracker |
| **Description** | Monitoring ecosystem restoration impact across Kenyan protected areas |
| **License** | Private (or set as needed) |

## Data & attribution

- **Site boundaries:** OpenStreetMap contributors (ODbL)
- **Biodiversity:** GBIF
- **Maps & satellite:** Mapbox; optional historical imagery via Sentinel Hub
- **AI:** Groq / OpenRouter; news via NewsAPI.org
