# Kenya Restoration Tracker — Feature Phases

Phases are ordered for incremental delivery. Timelines are omitted; implement in order or pick by priority.

---

## Phase 1 — Product Polish & Shareability

- **URL-shareable views** — Persist filters, search, satellite mode, and selected site in query params. Copy-link and open in new tab to restore exact view.
- **Copy View / Save View** — Copy current map URL to clipboard. Save named views to localStorage; list and open saved URLs from header.
- **Mobile-first optimization** — Refine map controls, tabs, and overlay layout on small screens. Sticky quick actions for Compare and Export where useful.
- **Before/After image export** — Download side-by-side Before/After image (fixed layout, not slider state) from the site detail compare widget.

---

## Phase 2 — Advanced Geospatial Layers

- **Satellite layer selector** — Toggle RGB, NDVI, and land-cover style layers on the map (and in compare where applicable).
- **Layer opacity** — Slider (0–100%) for each imagery layer.
- **NDVI time slider + animation** — Month-by-month NDVI playback for viewport or selected site; play/pause and scrubber.
- **Date-range imagery download** — Export selected layer image for a chosen date range.
- **Real historical time-series** — Replace simulated trends with real monthly snapshots (e.g. Sentinel/GBIF-derived) where APIs allow; show in Trends tab.
- **Change-detection layers** — NDVI delta, canopy cover change, burn scars (or equivalent) as optional map overlays.
- **Viewport and performance** — Viewport-driven loading and optional geometry simplification at low zoom for large datasets.

---

## Phase 3 — Portfolio Analytics & Decision Support

- **County / ecosystem rollups** — Aggregate metrics by county and restoration type from current site data; optional choropleth overlay on map.
- **National dashboard** — Portfolio-level KPIs, time-range selector (YTD, 1Y, 3Y, All), top-performing and at-risk site cards.
- **Threshold-based alerts** — Client-side rules (e.g. survival rate &lt; 60%, biodiversity drop); alert badges and an alert center UI.

---

## Phase 4 — Data Management & Reporting

- **GeoJSON upload** — Drag-and-drop GeoJSON; polygon preview and client-side validation; store as local draft (no backend required for MVP).
- **Manual metric edits** — Editable metric forms with local audit trail (e.g. in state or IndexedDB).
- **Advanced export** — GeoJSON export with option to include or exclude time-series (or derived) data.
- **PDF report generation** — One-click site or group report: map snapshot, metrics table, trend charts, before/after section, optional branding.

---

## Phase 5 — AI & Insights Maturity (Stretch)

- **Actionable recommendations by risk** — Tie AI recommendations to risk profile and thresholds.
- **County-level news and policy** — Surface area news and policy/event context in insights.
- **Natural-language site query** — e.g. “Show dryland sites with declining biodiversity.”
- **Confidence and attribution** — Confidence badges and clear data sources on AI-generated insights.

---

## Notes

- Phase 1 is complete in the current codebase.
- Phases 2–4 are frontend-first; a future backend can add persistence, jobs, and vector tiles.
- Real historical time-series and change-detection (Phase 2) depend on satellite/ingestion availability and may be scoped per site or region initially.
