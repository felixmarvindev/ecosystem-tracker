# KENYA ECOSYSTEM RESTORATION IMPACT TRACKER
## Complete Technical Specification Document

---

# 1️⃣ PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Problem Statement

Environmental organizations and ecosystem restoration projects in Kenya lack accessible, real-time visualization tools to effectively communicate restoration impact to stakeholders, investors, and local communities. Current reporting methods rely on static PDFs, spreadsheets, and manual data aggregation, making it difficult to:

- Demonstrate measurable environmental impact over time
- Attract and retain international funding through compelling data visualization
- Track restoration site performance across multiple metrics simultaneously
- Compare outcomes across different restoration approaches and ecosystems
- Make data-driven decisions about resource allocation and intervention strategies

**The Gap**: While global platforms exist for deforestation monitoring, there is no Kenya-focused tool that combines restoration site tracking, biodiversity monitoring, carbon sequestration measurement, and community impact visualization in a single, interactive platform.

## Target Users

### Primary Users
1. **Environmental NGOs and Conservation Organizations**
   - Green Belt Movement Kenya, Wildlife Works, Mikoko Pamoja
   - Need: Demonstrate impact to donors, track multiple sites, generate reports

2. **Environmental Data Analysts and GIS Specialists**
   - Technical staff managing restoration projects
   - Need: Analyze spatial patterns, validate field data, export datasets

3. **Impact Investors and Funding Organizations**
   - Carbon credit buyers, climate funds, CSR departments
   - Need: Verify claims, assess ROI, monitor progress remotely

4. **Government Environmental Departments**
   - Kenya Forest Service, National Environment Management Authority
   - Need: National-level aggregation, policy compliance monitoring

### Secondary Users
5. **Academic Researchers**
   - Universities studying restoration ecology
   - Need: Access to time-series data, spatial analysis capabilities

6. **Local Community Representatives**
   - Community forest associations, local councils
   - Need: Simple visualizations of local impact, employment data

## User Personas

### Persona 1: Dr. Wanjiru Kamau - Conservation Program Manager
**Background**: PhD in Ecology, manages 15 restoration sites across Kenya for an international NGO  
**Tech Savvy**: Medium - comfortable with Excel, Google Earth  
**Goals**: 
- Prepare quarterly reports for donors in under 2 hours
- Identify underperforming sites quickly
- Compare restoration approaches across different ecosystems

**Pain Points**:
- Spends 20+ hours monthly consolidating field data
- Can't show real-time progress to visiting donors
- Struggles to justify resource allocation decisions

**Success Criteria**: Can generate interactive impact report in 15 minutes

---

### Persona 2: James Omondi - GIS Analyst
**Background**: BSc Geography, 5 years experience with QGIS and ArcGIS  
**Tech Savvy**: High - scripts in Python, familiar with PostGIS  
**Goals**:
- Validate satellite-derived metrics against field measurements
- Export GeoJSON for custom analysis
- Identify spatial correlations between interventions and outcomes

**Pain Points**:
- Desktop GIS software too slow for frequent updates
- Can't share analysis with non-technical stakeholders easily
- Manual data entry from field teams

**Success Criteria**: Can complete spatial analysis workflows 60% faster

---

### Persona 3: Sarah Mboya - Impact Investment Analyst
**Background**: MBA Finance, evaluates carbon offset projects  
**Tech Savvy**: Medium - uses Bloomberg Terminal, Excel  
**Goals**:
- Verify carbon sequestration claims before investment
- Monitor portfolio of 10+ restoration projects
- Generate due diligence reports for clients

**Pain Points**:
- Relies on self-reported data from project developers
- Can't independently verify satellite imagery claims
- Needs auditable data trails

**Success Criteria**: Can verify project claims in 30 minutes vs 2 days

---

### Persona 4: Tom Kiprono - Community Forest Association Chair
**Background**: Local leader, basic smartphone literacy  
**Tech Savvy**: Low - uses WhatsApp, basic web browsing  
**Goals**:
- Show community members how their work creates impact
- Track employment and income generation
- Demonstrate environmental improvements to youth

**Pain Points**:
- Technical reports too complex for community meetings
- Can't access data without NGO intermediaries
- Wants simple before/after comparisons

**Success Criteria**: Can show visual impact on smartphone at community gathering

## User Stories

### Epic 1: Site Discovery and Overview

**US-001**: As a program manager, I want to view all restoration sites on an interactive map so that I can get a geographic overview of my portfolio  
**Acceptance Criteria**:
- Map loads with all sites visible as colored polygons within 2 seconds
- Sites are color-coded by restoration type (mangrove, dryland, mountain forest)
- Clicking a site highlights it and displays basic info panel
- Map supports zoom levels from national to site-level (100m²)

**US-002**: As an analyst, I want to filter sites by restoration year, type, and status so that I can focus on relevant subsets  
**Acceptance Criteria**:
- Multi-select dropdown filters for year, type, status
- Filters apply instantly (<500ms)
- URL updates with filter parameters for sharing
- Shows count of visible sites (e.g., "Showing 12 of 47 sites")

**US-003**: As an investor, I want to search for sites by name or location so that I can quickly find specific projects  
**Acceptance Criteria**:
- Search bar autocompletes site names as I type
- Accepts county names, GPS coordinates, or site IDs
- Results highlight on map and appear in side panel
- Search history persists in session

### Epic 2: Site-Level Impact Visualization

**US-004**: As a program manager, I want to click a site and see key metrics (trees planted, survival rate, CO2 offset) so that I can quickly assess performance  
**Acceptance Criteria**:
- Metrics panel slides in from right on site click
- Displays 6-8 key indicators with current values and trends
- Includes visual indicators (↑↓) for positive/negative changes
- Data loads in <1 second

**US-005**: As an analyst, I want to view time-series charts for each metric so that I can identify trends and seasonality  
**Acceptance Criteria**:
- Line charts show monthly data points for last 24 months
- Hover tooltips display exact values and dates
- Can toggle between daily/monthly/annual aggregation
- Export chart data as CSV

**US-006**: As a community leader, I want to see before/after photos of a site so that I can show visual transformation  
**Acceptance Criteria**:
- Split-screen satellite imagery comparison (slider control)
- Dates clearly labeled on each image
- Can download comparison image for offline sharing
- Works on mobile devices

### Epic 3: Comparative Analysis

**US-007**: As a program manager, I want to compare performance across multiple sites side-by-side so that I can identify best practices  
**Acceptance Criteria**:
- Select up to 4 sites for comparison
- Table view shows all metrics in columns
- Highlights best/worst performers per metric
- Can export comparison as PDF report

**US-008**: As an analyst, I want to aggregate data at county or ecosystem level so that I can report on regional impact  
**Acceptance Criteria**:
- Dropdown to group by: county, ecosystem type, partner organization
- Map updates to show aggregated polygons
- Metrics sum/average appropriately (sum for trees, avg for survival rate)
- Shows total hectares restored per grouping

**US-009**: As an investor, I want to see national-level dashboard showing total impact metrics so that I can understand program-wide outcomes  
**Acceptance Criteria**:
- Dashboard shows: total hectares, total trees, total CO2, total jobs
- Metrics update based on active filters
- Includes time-range selector (YTD, 1Y, 3Y, All Time)
- Comparison to national restoration targets

### Epic 4: Satellite Imagery Integration

**US-010**: As an analyst, I want to toggle between different satellite imagery layers (RGB, NDVI, land cover) so that I can analyze vegetation health  
**Acceptance Criteria**:
- Layer selector with 4-6 satellite products
- Layers load progressively (show low-res then high-res)
- Opacity slider for each layer (0-100%)
- Legend explains color coding

**US-011**: As a program manager, I want to see NDVI change over time animated on the map so that I can visualize greening trends  
**Acceptance Criteria**:
- Time slider with play/pause controls
- Animation cycles through monthly NDVI images
- Speed control (1x, 2x, 5x)
- Can scrub to specific date

**US-012**: As an investor, I want to download satellite imagery for a specific date range so that I can include in due diligence reports  
**Acceptance Criteria**:
- Date range picker
- Export options: GeoTIFF, PNG, JPEG
- Includes metadata (acquisition date, resolution, source)
- Respects selected site boundary (crops imagery)

### Epic 5: Data Management

**US-013**: As an analyst, I want to upload new site boundaries as GeoJSON so that I can add sites without developer support  
**Acceptance Criteria**:
- Drag-and-drop GeoJSON file upload
- Validation checks (valid JSON, geometry type, coordinate system)
- Preview uploaded polygon before saving
- Allows bulk upload (multi-site files)

**US-014**: As a program manager, I want to export site data as GeoJSON so that I can use in QGIS or ArcGIS  
**Acceptance Criteria**:
- Export button for active filters
- Includes geometry and all attribute data
- Option to include/exclude time-series data
- Downloads as .geojson file

**US-015**: As an analyst, I want to manually update site metrics through the UI so that I can correct field data errors  
**Acceptance Criteria**:
- Edit mode toggle on metrics panel
- Inline editing with validation (e.g., survival rate 0-100%)
- Requires confirmation before saving
- Logs who edited what and when (audit trail)

### Epic 6: Reporting and Sharing

**US-016**: As a program manager, I want to generate a PDF impact report for a site or group of sites so that I can share with donors offline  
**Acceptance Criteria**:
- Report includes: map snapshot, metrics table, time-series charts, photos
- Custom branding/logo upload
- Date range selector for report period
- Generates in <10 seconds

**US-017**: As an investor, I want to bookmark a specific map view with filters applied so that I can return to it later  
**Acceptance Criteria**:
- "Save View" button creates shareable URL
- URL includes: zoom level, center point, active filters, selected layers
- Works without authentication (public sharing)
- Can name and save views to account (if logged in)

**US-018**: As a community leader, I want to view the application on my mobile phone so that I can show impact during field visits  
**Acceptance Criteria**:
- Responsive design works on screens 360px wide
- Touch-friendly map interactions (pinch zoom, tap polygon)
- Simplified layout on mobile (collapsible panels)
- Offline mode caches key data for no-connectivity areas

## Functional Requirements

### FR-1: Geographic Visualization
- Display restoration sites as GeoJSON polygons on interactive map
- Support pan, zoom, and rotation
- Color-code polygons by categorical attributes
- Display basemap layers (satellite, street, terrain)
- Support WGS84 and UTM coordinate systems

### FR-2: Metrics Dashboard
- Display real-time metrics: trees planted, survival rate, CO2 sequestered, biodiversity index, jobs created, hectares restored
- Time-series visualization with configurable date ranges
- Export metrics as CSV, JSON, or Excel
- Support metric thresholds and alerts (e.g., survival rate <60% triggers warning)

### FR-3: Satellite Imagery
- Integrate raster tile layers from external APIs
- Support before/after comparison with slider
- Display NDVI, RGB, and land cover classification
- Time-slider for temporal analysis
- Download satellite imagery for selected area

### FR-4: Filtering and Search
- Filter by: year, restoration type, ecosystem, county, status, partner organization
- Full-text search across site names and descriptions
- Spatial query: find sites within drawn polygon or radius
- Save filter combinations as named views

### FR-5: Data Import/Export
- Import GeoJSON, Shapefile, KML
- Export GeoJSON with attributes
- Bulk upload via CSV with geometry columns
- API endpoints for programmatic data access

### FR-6: User Management
- Role-based access: Admin, Editor, Viewer
- Organization-level data isolation
- Authentication via email/password and OAuth2 (Google)
- Audit logging for data modifications

### FR-7: Reporting
- Auto-generate PDF reports with charts and maps
- Customizable report templates
- Schedule periodic email reports
- Embed charts/maps via iframe for external sites

### FR-8: Performance
- Initial page load <3 seconds on 3G
- Map interaction <100ms latency
- Support 1000+ polygons without performance degradation
- Progressive loading for large datasets

## Non-Functional Requirements

### NFR-1: Scalability
- Support 100 concurrent users without performance degradation
- Handle 10,000+ restoration sites
- Database query response time <500ms for 95th percentile
- Horizontal scaling capability for API and frontend

### NFR-2: Reliability
- 99.5% uptime SLA
- Automated backups every 6 hours
- Disaster recovery plan with RPO <1 hour, RTO <4 hours
- Graceful degradation when external APIs unavailable

### NFR-3: Security
- HTTPS enforced (TLS 1.3)
- OWASP Top 10 compliance
- SQL injection prevention via parameterized queries
- XSS protection via Content Security Policy
- Rate limiting: 100 requests/minute per IP

### NFR-4: Usability
- Accessible (WCAG 2.1 Level AA)
- Mobile-responsive (works on 360px screens)
- Support English and Swahili languages
- Onboarding tutorial for new users

### NFR-5: Maintainability
- Test coverage >80%
- API documentation via OpenAPI/Swagger
- Code follows linting standards (ESLint, Prettier)
- Git commit messages follow Conventional Commits

### NFR-6: Compliance
- GDPR compliance for user data
- Data sovereignty (Kenya data hosted in Africa region)
- Open data licensing for public datasets
- Attribution for satellite imagery sources

## Success Metrics

### Usage Metrics
- Monthly Active Users (MAU): Target 200 in first 6 months
- Average session duration: >5 minutes
- Map interactions per session: >10
- Export actions per week: >50

### Impact Metrics
- Time to generate report: <15 minutes (vs 2+ hours manually)
- Number of organizations onboarded: >15 in first year
- Hectares tracked in system: >50,000 within 18 months
- Data accuracy: <5% deviation from ground truth

### Technical Metrics
- Page load time: <3 seconds (90th percentile)
- API uptime: >99.5%
- Error rate: <0.1% of requests
- User-reported bugs: <10 per month after stabilization

### Business Metrics
- Cost per user: <$5/month
- Customer satisfaction (NPS): >40
- Return users: >60% within 30 days
- Funding secured based on platform demos: >$500K tracked

## Constraints

### Technical Constraints
- Must use open-source mapping libraries (no Google Maps API due to cost)
- Satellite imagery limited to publicly available sources (Sentinel, Landsat)
- No offline-first architecture (defer to Phase 2)
- Mobile app not in scope (mobile-web only)

### Resource Constraints
- Development team: 1 frontend dev, 1 backend dev (part-time)
- Timeline: MVP in 8 weeks
- Budget: <$10K for first year (hosting, APIs)
- No dedicated DevOps engineer (use managed services)

### Data Constraints
- Historical data availability varies by site (some sites only from 2020+)
- Ground truth measurements depend on partner organizations' data quality
- Satellite imagery resolution limited to 10-30m (Sentinel-2)
- Real-time updates not feasible (batch processing nightly)

### Regulatory Constraints
- Data cannot leave Kenya jurisdiction (GDPR-equivalent local laws)
- Some site locations confidential (sensitive ecosystems)
- Attribution required for all data sources
- User data requires explicit consent

## Risks and Mitigations

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| **Satellite API downtime** | Medium | High | Cache imagery tiles locally, fallback to secondary provider (Planet Labs), graceful degradation to show last available imagery |
| **Poor data quality from partners** | High | Medium | Implement validation rules, provide data entry templates, offer training sessions, flag suspicious outliers for review |
| **User adoption challenges** | Medium | High | Conduct user testing with 5 NGOs during beta, create video tutorials, offer onboarding calls, simplify UI based on feedback |
| **Scope creep** | High | Medium | Lock MVP feature set, maintain prioritized backlog, require business case for new features, quarterly roadmap reviews |
| **Performance issues with large datasets** | Medium | High | Implement server-side clustering for >500 polygons, use viewport-based querying, tile vector data, load testing before launch |
| **Budget overruns** | Low | Medium | Use serverless architecture, leverage free tiers, negotiate nonprofit discounts with cloud providers, monthly cost monitoring |
| **Security breach** | Low | Very High | Penetration testing before launch, bug bounty program, automated security scanning in CI/CD, encrypt sensitive data at rest |
| **Key personnel turnover** | Medium | High | Document architecture decisions (ADRs), pair programming, code reviews, knowledge sharing sessions, backup contributors identified |

## Assumptions

1. **Data Availability**: Partner organizations can provide baseline data for at least 20 restoration sites to seed the platform
2. **Internet Access**: Target users have reliable internet (minimum 2G) during working hours
3. **Device Capabilities**: Users have devices capable of running modern web browsers (Chrome 90+, Safari 14+)
4. **Funding**: Grant funding secured for 12-month runway before revenue requirements
5. **Technical Expertise**: Users have basic GIS literacy or can complete 30-minute training
6. **API Stability**: Third-party satellite APIs (Sentinel Hub, Global Forest Watch) remain accessible and free/affordable
7. **Regulatory Environment**: No major changes to Kenya data sovereignty laws in next 24 months
8. **Partner Engagement**: At least 5 NGOs willing to participate in beta testing phase
9. **Field Data Collection**: Existing field monitoring programs continue providing ground truth measurements
10. **Cloud Infrastructure**: AWS/Azure/GCP maintain Africa regions with competitive pricing

---

# 2️⃣ SYSTEM OVERVIEW

## System Summary

The **Kenya Ecosystem Restoration Impact Tracker** is a full-stack web application that provides interactive geospatial visualization and analytics for environmental restoration projects across Kenya. The system enables organizations to monitor restoration impact through satellite imagery analysis, field-collected metrics, and biodiversity observations.

### Core Capabilities

1. **Interactive Mapping**
   - Displays restoration site boundaries as GeoJSON polygons
   - Overlays satellite imagery layers (Sentinel-2 RGB, NDVI, land cover)
   - Before/after temporal comparison with adjustable time slider
   - Pan, zoom, and polygon selection interactions

2. **Impact Metrics Dashboard**
   - Real-time display of environmental indicators per site
   - Metrics include: trees planted, survival rate, CO2 sequestered, biodiversity counts, jobs created
   - Time-series charts showing trends over months/years
   - Aggregation at site, county, ecosystem, and national levels

3. **Data Management**
   - Upload restoration site boundaries (GeoJSON/Shapefile)
   - Import field measurements via CSV
   - Export filtered datasets for external analysis
   - CRUD operations for sites, metrics, and observations

4. **Reporting and Analytics**
   - Automated PDF report generation
   - Comparative analysis across sites
   - Spatial queries (e.g., "all sites within 50km of Nairobi")
   - Shareable map views via URLs

### System Architecture Principles

- **Separation of Concerns**: Frontend focuses purely on presentation; business logic resides in backend services
- **API-First Design**: All data access through versioned REST/GraphQL APIs
- **Progressive Enhancement**: Core functionality works without advanced satellite features
- **Stateless Services**: Enables horizontal scaling and simplified deployment
- **Data Integrity**: PostGIS for spatial operations ensures geometric validity
- **Observability**: Structured logging and metrics from all components

### Technology Stack

**Frontend**
- **Framework**: React 18 with TypeScript 5
- **Build Tool**: Vite 5 (fast HMR, optimized production builds)
- **Mapping**: Mapbox GL JS (vector tiles, custom styling) with fallback to Leaflet
- **State Management**: Redux Toolkit (global state) + TanStack Query (server state)
- **Charts**: Recharts (time-series visualization)
- **UI Components**: Headless UI + Tailwind CSS
- **Testing**: Vitest + React Testing Library + Playwright (E2E)

**Backend**
- **Runtime**: Node.js 20 LTS
- **Framework**: NestJS (modular, TypeScript-native, built-in DI)
- **API Style**: REST primary, GraphQL for complex queries
- **Database**: PostgreSQL 15 + PostGIS 3.3 extension
- **ORM**: TypeORM (migrations, entities, query builder)
- **Validation**: Class-validator + class-transformer
- **Authentication**: Passport.js + JWT tokens
- **Testing**: Jest + Supertest

**External Integrations**
- **Satellite Imagery**: Sentinel Hub API (Sentinel-2 L2A tiles)
- **Deforestation Data**: Global Forest Watch Data API
- **Biodiversity**: GBIF (Global Biodiversity Information Facility) API
- **Geocoding**: Nominatim (OpenStreetMap)

**Infrastructure**
- **Containerization**: Docker + Docker Compose
- **Orchestration**: Kubernetes (production) or Docker Swarm (simpler alternative)
- **CI/CD**: GitHub Actions (build, test, deploy)
- **Cloud Provider**: AWS (ECS Fargate + RDS + S3) or Azure (Container Apps + Postgres Flexible Server)
- **CDN**: CloudFront or Azure CDN (static assets, tile caching)
- **Monitoring**: Prometheus + Grafana + Sentry (error tracking)

### Data Flow

```
User Interaction Flow:
1. User opens application → Frontend loads from CDN
2. User authenticates → JWT token issued by Auth Service
3. User pans map → Frontend requests visible site polygons from API
4. API queries PostGIS → Returns GeoJSON with site boundaries
5. Frontend renders polygons on Mapbox GL layer
6. User clicks polygon → API fetches site metrics + time-series
7. TanStack Query caches response → Instant display on subsequent clicks
8. User toggles NDVI layer → Frontend requests tiles from Sentinel Hub
9. Tiles cached in CDN → Subsequent loads instant

Data Write Flow:
1. User uploads GeoJSON → Frontend validates structure
2. POST request to /api/v1/sites → Backend validates geometry
3. Transaction starts → Insert into site_boundaries table
4. PostGIS validates geometry → Computes area, centroid
5. Audit log entry created → Transaction commits
6. Websocket notification (future) → Other users see new site
7. Background job → Fetches historical satellite data
8. NDVI time-series computed → Stored in metric_timeseries table
```

### Deployment Architecture

```
Production Environment:

[User Browser]
     ↓
[CloudFront CDN] ← Static assets (HTML, JS, CSS, images)
     ↓
[Application Load Balancer]
     ↓
[ECS Fargate Tasks] ← Docker containers (auto-scaling 2-10 instances)
  ├─ Frontend (Nginx serving React build)
  ├─ API Service (NestJS)
  └─ Worker Service (background jobs)
     ↓
[RDS PostgreSQL + PostGIS] (Multi-AZ, automated backups)
     ↓
[S3 Buckets]
  ├─ User uploads (GeoJSON, photos)
  ├─ Generated reports (PDFs)
  └─ Cached satellite tiles

External Dependencies:
[Sentinel Hub API] → Satellite imagery
[Global Forest Watch API] → Deforestation alerts
[GBIF API] → Biodiversity data

Monitoring:
[CloudWatch Logs] → [Grafana Dashboard]
[Application Metrics] → [Prometheus] → [Alertmanager]
[Error Tracking] → [Sentry]
```

### Security Architecture

- **Transport Layer**: TLS 1.3 enforced, HSTS headers
- **Authentication**: JWT tokens (15-min access, 7-day refresh), httpOnly cookies
- **Authorization**: RBAC with permissions checked at route handlers
- **Data Protection**: Encryption at rest (RDS KMS), in transit (TLS)
- **API Security**: Rate limiting (100 req/min per IP), CORS whitelist
- **Input Validation**: Schema validation on all endpoints, geometry sanitization
- **Secrets Management**: AWS Secrets Manager or Azure Key Vault

### Scalability Strategy

**Horizontal Scaling**
- API services stateless → Scale ECS tasks based on CPU/memory
- Frontend CDN-distributed → No origin server bottleneck
- Database read replicas → Route read-heavy queries to replicas

**Performance Optimization**
- Server-side polygon clustering (>500 visible sites)
- Viewport-based querying (only fetch visible area)
- Response pagination (50 sites per page)
- Redis caching layer (frequently accessed metrics)
- Tile pyramid for vector data (simplified geometries at low zoom)

**Cost Optimization**
- Serverless functions for infrequent tasks (report generation)
- Spot instances for worker nodes
- S3 lifecycle policies (delete old tiles after 90 days)
- Reserved instances for database (predictable baseline)

---

# 3️⃣ HIGH-LEVEL ARCHITECTURE

## Architecture Diagram Description

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Web Browser │  │ Mobile Safari│  │ Chrome (PWA) │          │
│  │   (Desktop)  │  │   (iOS)      │  │  (Android)   │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                  │                  │                   │
│         └──────────────────┴──────────────────┘                   │
│                            │                                      │
└────────────────────────────┼──────────────────────────────────────┘
                             │ HTTPS
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                         CDN LAYER                                │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  CloudFront / Azure CDN                                    │ │
│  │  - Cached static assets (React bundle, images, fonts)     │ │
│  │  - Cached tile layers (satellite imagery, vector tiles)   │ │
│  │  - Edge locations in Africa, Europe, North America        │ │
│  └────────────────────────────────────────────────────────────┘ │
└────────────────────────────┼────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                             │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Application Load Balancer                                 │ │
│  │  - Health checks                                           │ │
│  │  - SSL termination                                         │ │
│  │  - Request routing (/api/* → Backend, /* → Frontend)      │ │
│  └──────────────┬─────────────────────────────────────────────┘ │
│                 │                                                 │
│     ┌───────────┴───────────┬──────────────┬──────────────────┐ │
│     ↓                       ↓              ↓                  ↓ │
│  ┌─────────┐         ┌─────────┐    ┌─────────┐      ┌─────────┐│
│  │Frontend │         │   API   │    │  Auth   │      │ Worker  ││
│  │ Service │         │ Service │    │ Service │      │ Service ││
│  │ (Nginx) │         │(NestJS) │    │(NestJS) │      │(NestJS) ││
│  │         │         │         │    │         │      │         ││
│  │Container│         │Container│    │Container│      │Container││
│  │  x2     │         │  x3-10  │    │  x2     │      │  x1-3   ││
│  └─────────┘         └────┬────┘    └────┬────┘      └────┬────┘│
│                           │              │                │     │
└───────────────────────────┼──────────────┼────────────────┼─────┘
                            │              │                │
                            ↓              ↓                ↓
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Primary Database (PostgreSQL 15 + PostGIS 3.3)          │   │
│  │  - Site geometries, metrics, time-series, users          │   │
│  │  - Multi-AZ deployment                                   │   │
│  │  - Automated backups every 6 hours                       │   │
│  │  - Read replicas (2x) for analytics queries             │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Redis Cache (ElastiCache)                               │   │
│  │  - Session storage                                       │   │
│  │  - API response caching (5-minute TTL)                   │   │
│  │  - Rate limiting counters                                │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Object Storage (S3 / Azure Blob)                        │   │
│  │  - User-uploaded GeoJSON files                           │   │
│  │  - Generated PDF reports                                 │   │
│  │  - Site photos and documentation                         │   │
│  │  - Cached satellite tile imagery                         │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                  EXTERNAL SERVICES LAYER                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Sentinel Hub API                                        │   │
│  │  - Sentinel-2 L2A imagery (10m resolution RGB, NDVI)    │   │
│  │  - Tile serving (WMTS protocol)                         │   │
│  │  - Rate limit: 1000 requests/hour (free tier)           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Global Forest Watch Data API                            │   │
│  │  - Tree cover loss data (30m resolution)                │   │
│  │  - Deforestation alerts                                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  GBIF (Global Biodiversity Information Facility)         │   │
│  │  - Species occurrence records                            │   │
│  │  - Biodiversity metrics by location                      │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    MONITORING & LOGGING                          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Prometheus + Grafana                                    │   │
│  │  - Service metrics (request rate, latency, errors)       │   │
│  │  - Infrastructure metrics (CPU, memory, disk)            │   │
│  │  - Custom business metrics (sites created, reports gen)  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Sentry                                                   │   │
│  │  - Frontend error tracking                               │   │
│  │  - Backend exception monitoring                          │   │
│  │  - User session replay                                   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  CloudWatch Logs / Azure Monitor                         │   │
│  │  - Structured JSON logs from all services                │   │
│  │  - Log aggregation and search                            │   │
│  │  - Alerting on error patterns                            │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Component Architecture

```
src/
├── app/                          # Application shell
│   ├── App.tsx                   # Root component
│   ├── routes.tsx                # Route configuration
│   └── providers/                # Context providers
│       ├── AuthProvider.tsx
│       ├── ThemeProvider.tsx
│       └── QueryProvider.tsx
│
├── features/                     # Feature-based modules
│   ├── map/                      # Map feature
│   │   ├── components/
│   │   │   ├── Map.tsx           # Main map component
│   │   │   ├── MapControls.tsx   # Zoom, layer toggle
│   │   │   ├── SitePolygon.tsx   # Individual polygon
│   │   │   └── SatelliteLayer.tsx
│   │   ├── hooks/
│   │   │   ├── useMapInteraction.ts
│   │   │   ├── useSitePolygons.ts
│   │   │   └── useSatelliteLayers.ts
│   │   ├── services/
│   │   │   └── mapboxService.ts
│   │   └── types/
│   │       └── map.types.ts
│   │
│   ├── sites/                    # Sites feature
│   │   ├── components/
│   │   │   ├── SitesList.tsx
│   │   │   ├── SiteDetails.tsx
│   │   │   ├── SiteMetrics.tsx
│   │   │   └── SiteForm.tsx
│   │   ├── hooks/
│   │   │   ├── useSites.ts       # TanStack Query hook
│   │   │   ├── useCreateSite.ts
│   │   │   └── useUpdateSite.ts
│   │   ├── api/
│   │   │   └── sitesApi.ts       # API client
│   │   └── types/
│   │       └── site.types.ts
│   │
│   ├── metrics/                  # Metrics/analytics
│   │   ├── components/
│   │   │   ├── MetricsDashboard.tsx
│   │   │   ├── TimeSeriesChart.tsx
│   │   │   ├── ComparisonTable.tsx
│   │   │   └── MetricCard.tsx
│   │   ├── hooks/
│   │   │   ├── useMetrics.ts
│   │   │   └── useTimeSeriesData.ts
│   │   └── utils/
│   │       └── chartHelpers.ts
│   │
│   ├── filters/                  # Filtering system
│   │   ├── components/
│   │   │   ├── FilterPanel.tsx
│   │   │   ├── DateRangeFilter.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   └── SearchBar.tsx
│   │   ├── hooks/
│   │   │   └── useFilters.ts
│   │   └── store/
│   │       └── filterSlice.ts    # Redux slice
│   │
│   ├── reports/                  # Report generation
│   │   ├── components/
│   │   │   ├── ReportBuilder.tsx
│   │   │   └── ReportPreview.tsx
│   │   └── services/
│   │       └── pdfService.ts
│   │
│   └── auth/                     # Authentication
│       ├── components/
│       │   ├── LoginForm.tsx
│       │   └── ProtectedRoute.tsx
│       ├── hooks/
│       │   └── useAuth.ts
│       └── services/
│           └── authService.ts
│
├── shared/                       # Shared utilities
│   ├── components/               # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorBoundary.tsx
│   ├── hooks/                    # Generic hooks
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   └── useMediaQuery.ts
│   ├── utils/                    # Helper functions
│   │   ├── geojsonUtils.ts
│   │   ├── dateUtils.ts
│   │   └── formatters.ts
│   ├── types/                    # Shared TypeScript types
│   │   ├── api.types.ts
│   │   └── common.types.ts
│   └── constants/
│       └── config.ts
│
├── store/                        # Redux store
│   ├── index.ts                  # Store configuration
│   ├── slices/
│   │   ├── uiSlice.ts            # UI state (modals, toasts)
│   │   └── userSlice.ts          # User preferences
│   └── middleware/
│       └── apiMiddleware.ts
│
└── styles/                       # Global styles
    ├── globals.css               # Tailwind imports
    └── mapbox-overrides.css      # Map styling
```

### State Management Strategy

**Redux Toolkit** - Global UI state
- Active filters (year, type, county)
- Selected site IDs
- Map viewport (center, zoom, bearing)
- UI state (modals, sidebars, toasts)
- User preferences (theme, units, language)

**TanStack Query** - Server state
- Site data (queries, mutations, caching)
- Metrics and time-series
- User profile
- Automatic refetching on window focus
- Optimistic updates for mutations
- Background cache invalidation

**Local Component State** - Ephemeral UI state
- Form inputs (controlled components)
- Hover states
- Accordion expand/collapse
- Map interaction handlers

### Data Flow Patterns

**Site Selection Flow**
```
1. User clicks polygon on map
   ↓
2. Map component dispatches Redux action: setSelectedSiteId(id)
   ↓
3. SiteDetails component subscribes to selectedSiteId
   ↓
4. useQuery hook fetches /api/sites/{id} (checks cache first)
   ↓
5. TanStack Query returns cached or fresh data
   ↓
6. Component renders with loading/error/success states
```

**Filter Application Flow**
```
1. User changes filter (e.g., selects "2022" in year dropdown)
   ↓
2. Filter component dispatches: updateFilters({year: 2022})
   ↓
3. Redux updates filters state
   ↓
4. useSelector hook in Map component detects change
   ↓
5. useSites hook refetches with new query params: /api/sites?year=2022
   ↓
6. Map re-renders with filtered polygons
   ↓
7. URL updates via useEffect: ?filters=year:2022
```

**Optimistic Update Flow (Site Metric Edit)**
```
1. User edits survival rate from 75% → 82%
   ↓
2. useMutation hook calls: PUT /api/sites/{id}/metrics
   ↓
3. Optimistic update: immediately update UI to 82%
   ↓
4. API request sent in background
   ↓
5. On success: cache updated, UI already correct
   On error: revert to 75%, show error toast
```

### Performance Optimizations

1. **Code Splitting**
   ```typescript
   const ReportBuilder = lazy(() => import('./features/reports/ReportBuilder'));
   const MetricsDashboard = lazy(() => import('./features/metrics/MetricsDashboard'));
   ```

2. **Map Layer Management**
   - Only render visible polygons (viewport-based)
   - Cluster polygons when zoom < level 8
   - Use `React.memo` for polygon components
   - Debounce pan/zoom handlers (300ms)

3. **TanStack Query Configuration**
   ```typescript
   const queryClient = new QueryClient({
     defaultOptions: {
       queries: {
         staleTime: 5 * 60 * 1000,      // 5 minutes
         cacheTime: 10 * 60 * 1000,     // 10 minutes
         refetchOnWindowFocus: false,
         retry: 1,
       },
     },
   });
   ```

4. **Image Optimization**
   - Lazy load satellite tiles as user pans
   - WebP format with fallback to JPEG
   - Responsive images (srcset for different resolutions)
   - Preload above-the-fold images

5. **Bundle Optimization**
   - Tree-shaking enabled in Vite
   - Dynamic imports for routes
   - Analyze bundle with `vite-bundle-visualizer`
   - Target modern browsers (ES2020+)

## Backend Architecture

### Service Layer Architecture

```
src/
├── main.ts                       # Application bootstrap
├── app.module.ts                 # Root module
│
├── modules/                      # Feature modules
│   ├── sites/
│   │   ├── sites.module.ts
│   │   ├── sites.controller.ts   # REST endpoints
│   │   ├── sites.service.ts      # Business logic
│   │   ├── sites.repository.ts   # Data access
│   │   ├── entities/
│   │   │   ├── site.entity.ts
│   │   │   └── site-boundary.entity.ts
│   │   ├── dto/
│   │   │   ├── create-site.dto.ts
│   │   │   ├── update-site.dto.ts
│   │   │   └── site-response.dto.ts
│   │   └── interfaces/
│   │       └── site.interface.ts
│   │
│   ├── metrics/
│   │   ├── metrics.module.ts
│   │   ├── metrics.controller.ts
│   │   ├── metrics.service.ts
│   │   ├── entities/
│   │   │   ├── site-metric.entity.ts
│   │   │   └── metric-timeseries.entity.ts
│   │   └── dto/
│   │
│   ├── satellite/
│   │   ├── satellite.module.ts
│   │   ├── satellite.controller.ts
│   │   ├── satellite.service.ts
│   │   ├── providers/
│   │   │   ├── sentinel-hub.provider.ts
│   │   │   └── gfw.provider.ts  # Global Forest Watch
│   │   └── dto/
│   │
│   ├── biodiversity/
│   │   ├── biodiversity.module.ts
│   │   ├── biodiversity.service.ts
│   │   ├── entities/
│   │   │   └── biodiversity-record.entity.ts
│   │   └── providers/
│   │       └── gbif.provider.ts
│   │
│   ├── reports/
│   │   ├── reports.module.ts
│   │   ├── reports.controller.ts
│   │   ├── reports.service.ts
│   │   ├── generators/
│   │   │   ├── pdf.generator.ts
│   │   │   └── excel.generator.ts
│   │   └── templates/
│   │       └── impact-report.hbs  # Handlebars template
│   │
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   └── local.strategy.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   └── decorators/
│   │       └── roles.decorator.ts
│   │
│   └── users/
│       ├── users.module.ts
│       ├── users.service.ts
│       ├── entities/
│       │   └── user.entity.ts
│       └── dto/
│
├── common/                       # Shared utilities
│   ├── filters/
│   │   ├── http-exception.filter.ts
│   │   └── validation.filter.ts
│   ├── interceptors/
│   │   ├── logging.interceptor.ts
│   │   └── transform.interceptor.ts
│   ├── pipes/
│   │   └── validation.pipe.ts
│   ├── decorators/
│   │   └── current-user.decorator.ts
│   ├── guards/
│   │   └── throttle.guard.ts
│   └── utils/
│       ├── geojson.utils.ts
│       └── date.utils.ts
│
├── config/                       # Configuration
│   ├── database.config.ts
│   ├── jwt.config.ts
│   └── app.config.ts
│
└── database/                     # Database management
    ├── migrations/
    │   ├── 1640000000000-CreateSites.ts
    │   ├── 1640100000000-AddPostGIS.ts
    │   └── 1640200000000-CreateMetrics.ts
    └── seeds/
        └── sample-sites.seed.ts
```

### API Design Principles

1. **RESTful Resource Modeling**
   - Nouns for endpoints (sites, metrics, reports)
   - Standard HTTP methods (GET, POST, PUT, DELETE)
   - Nested resources for relationships

2. **Versioning**
   - URL-based versioning: `/api/v1/sites`
   - Allows parallel versions during migration
   - Deprecation warnings in headers

3. **Pagination**
   - Cursor-based for time-series data
   - Offset-based for admin tables
   - Include metadata in responses:
     ```json
     {
       "data": [...],
       "meta": {
         "total": 247,
         "page": 2,
         "pageSize": 50,
         "hasNext": true
       }
     }
     ```

4. **Error Handling**
   - Standardized error format (RFC 7807 Problem Details)
   - Include error codes for client handling
   - Never expose stack traces in production

5. **Request Validation**
   - DTO validation with `class-validator`
   - Geometry validation for GeoJSON inputs
   - Sanitize user inputs to prevent SQL injection

### Background Jobs Architecture

**Bull Queue** (Redis-based job processing)

```typescript
// Job Types
enum JobType {
  COMPUTE_NDVI_TIMESERIES = 'compute-ndvi-timeseries',
  GENERATE_PDF_REPORT = 'generate-pdf-report',
  FETCH_GFW_ALERTS = 'fetch-gfw-alerts',
  SYNC_BIODIVERSITY_DATA = 'sync-biodiversity-data',
}

// Worker Service
@Injectable()
export class WorkerService {
  @Process(JobType.COMPUTE_NDVI_TIMESERIES)
  async computeNDVI(job: Job) {
    const { siteId, startDate, endDate } = job.data;
    // 1. Fetch site boundary geometry
    // 2. Request NDVI tiles from Sentinel Hub
    // 3. Compute mean NDVI per month
    // 4. Store in metric_timeseries table
    // 5. Update job progress: job.progress(50)
  }
}

// Job Scheduling (Cron)
@Cron('0 2 * * *')  // 2 AM daily
async scheduleDailyJobs() {
  // Queue GFW alerts check for all sites
  await this.jobQueue.add(JobType.FETCH_GFW_ALERTS);
}
```

## Data Flow Explanation

### Read Path (GET /sites)

```
1. Client: GET /api/v1/sites?year=2023&ecosystem=mangrove
   ↓
2. API Gateway: Rate limit check (100 req/min)
   ↓
3. NestJS Controller: Route to SitesController.findAll()
   ↓
4. Guard: JWT authentication + RBAC check
   ↓
5. ValidationPipe: Validate query parameters
   ↓
6. Service Layer: SitesService.findAll(filters)
   ↓
7. Check Redis Cache: Key = "sites:2023:mangrove"
   ├─ Cache Hit → Return cached GeoJSON
   └─ Cache Miss → Continue
       ↓
8. Repository: Query PostgreSQL with PostGIS
   ```sql
   SELECT 
     s.id, s.name, s.restoration_type,
     ST_AsGeoJSON(sb.geometry) as boundary,
     m.trees_planted, m.co2_sequestered
   FROM sites s
   JOIN site_boundaries sb ON s.id = sb.site_id
   LEFT JOIN site_metrics m ON s.id = m.site_id
   WHERE s.restoration_year = 2023
     AND s.ecosystem_type = 'mangrove'
   ```
   ↓
9. Transform: Convert rows to GeoJSON FeatureCollection
   ↓
10. Cache Result: Store in Redis (TTL = 5 minutes)
   ↓
11. Response: Return to client with ETag header
```

### Write Path (POST /sites)

```
1. Client: POST /api/v1/sites
   Headers: Authorization: Bearer {jwt}
   Body: {name, boundary: GeoJSON, metrics: {...}}
   ↓
2. Guard: Verify JWT, check user has "EDITOR" role
   ↓
3. ValidationPipe: Validate DTO (CreateSiteDto)
   - name required, 3-100 chars
   - boundary must be valid GeoJSON Polygon
   - coordinates in WGS84 (-180 to 180, -90 to 90)
   ↓
4. Service: SitesService.create(dto, user)
   ↓
5. Transaction Start
   ↓
6. PostGIS Validation:
   ```sql
   SELECT ST_IsValid(
     ST_GeomFromGeoJSON('{"type":"Polygon",...}')
   );
   -- Returns true/false
   ```
   ↓
7. Compute Derived Fields:
   ```sql
   INSERT INTO site_boundaries (site_id, geometry, area_hectares, centroid)
   VALUES (
     uuid_generate_v4(),
     ST_GeomFromGeoJSON($1),
     ST_Area(ST_GeomFromGeoJSON($1)::geography) / 10000,
     ST_Centroid(ST_GeomFromGeoJSON($1))
   );
   ```
   ↓
8. Insert Related Records:
   - site_metrics (initial values)
   - audit_logs (created_by, created_at)
   ↓
9. Queue Background Job:
   - COMPUTE_NDVI_TIMESERIES for last 24 months
   ↓
10. Transaction Commit
   ↓
11. Invalidate Cache:
   - DELETE Redis keys matching "sites:*"
   ↓
12. Response: 201 Created
   Location: /api/v1/sites/{newId}
   Body: {id, name, boundary, createdAt}
```

### Satellite Tile Request Path

```
1. Client: User toggles NDVI layer for site ABC
   ↓
2. Frontend: Request tiles for current viewport
   GET /api/v1/satellite/tiles/ndvi?bbox=-1.5,36.5,-1.0,37.0&date=2024-01-15
   ↓
3. Controller: SatelliteController.getTiles()
   ↓
4. Service: Check S3 cache
   Key = "tiles/ndvi/2024-01-15/z12/x123/y456.png"
   ├─ Exists → Return pre-signed URL
   └─ Not exists → Continue
       ↓
5. External API Call: Sentinel Hub WMTS
   URL: https://services.sentinel-hub.com/ogc/wmts/{instance}
   Params: layer=NDVI, time=2024-01-15, bbox=...
   ↓
6. Response Processing:
   - Download tile (PNG, 256x256px)
   - Upload to S3 with 30-day TTL
   - Generate pre-signed URL (valid 1 hour)
   ↓
7. Return URL to client
   ↓
8. Client: Fetch tile from S3, render on map
   (Subsequent requests served from CDN)
```

## Integration Points

### External API Integration Architecture

**1. Sentinel Hub (Satellite Imagery)**
- **Auth**: OAuth 2.0 client credentials
- **Rate Limit**: 1000 requests/hour (free tier)
- **Retry Strategy**: Exponential backoff (2^n seconds, max 3 retries)
- **Circuit Breaker**: Open after 5 failures, half-open after 60s
- **Fallback**: Return cached imagery or degraded mode

**2. Global Forest Watch Data API**
- **Auth**: API key in headers
- **Rate Limit**: 600 requests/hour
- **Data**: Tree cover loss, gain, fire alerts
- **Update Frequency**: Daily batch import at 3 AM
- **Storage**: Denormalize into `deforestation_alerts` table

**3. GBIF (Biodiversity)**
- **Auth**: Public API (no key required)
- **Rate Limit**: Best effort (throttle client-side to 100/min)
- **Query Pattern**: Fetch occurrence records within site polygon
- **Caching**: 24-hour cache for species lists per site

### Integration Patterns

```typescript
// Resilient HTTP Client
export class ResilientHttpClient {
  async get(url: string, options: RequestOptions) {
    return await pRetry(
      async () => {
        const response = await axios.get(url, options);
        if (response.status >= 500) {
          throw new Error('Server error - retry');
        }
        return response.data;
      },
      {
        retries: 3,
        factor: 2,
        minTimeout: 1000,
        onFailedAttempt: (error) => {
          logger.warn(`Attempt ${error.attemptNumber} failed. Retrying...`);
        },
      }
    );
  }
}

// Circuit Breaker
export class CircuitBreaker {
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private failureCount = 0;
  private readonly threshold = 5;
  
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      throw new Error('Circuit breaker is OPEN');
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
}
```

## Deployment Overview

### Container Architecture

**Docker Compose (Development)**
```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - VITE_API_URL=http://localhost:8000/api/v1

  api:
    build: ./backend
    ports:
      - "8000:8000"
    depends_on:
      - postgres
      - redis
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/restoration_db
      - REDIS_URL=redis://redis:6379

  worker:
    build: ./backend
    command: npm run worker
    depends_on:
      - postgres
      - redis
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/restoration_db

  postgres:
    image: postgis/postgis:15-3.3
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=restoration_db
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:
```

### Production Deployment (AWS ECS)

```
ECS Cluster
├── Frontend Service
│   ├── Task Definition: nginx:alpine + React build
│   ├── Desired Count: 2
│   ├── Auto-scaling: Target 70% CPU
│   └── Load Balancer: ALB with HTTPS (ACM certificate)
│
├── API Service
│   ├── Task Definition: node:20-alpine + NestJS
│   ├── Desired Count: 3-10 (auto-scale)
│   ├── Health Check: GET /health
│   └── Environment: Secrets Manager for DB creds
│
└── Worker Service
    ├── Task Definition: node:20-alpine + Bull worker
    ├── Desired Count: 1-3
    └── SQS Dead Letter Queue for failed jobs

Data Layer
├── RDS PostgreSQL
│   ├── Instance: db.t4g.medium (2 vCPU, 4 GB RAM)
│   ├── Multi-AZ: Yes
│   ├── Read Replicas: 2 (for analytics queries)
│   └── Automated Backups: Daily, 7-day retention
│
├── ElastiCache Redis
│   ├── Node Type: cache.t4g.micro
│   ├── Cluster Mode: Disabled
│   └── Multi-AZ: Yes
│
└── S3 Buckets
    ├── Uploads: Private (IAM role access)
    ├── Reports: Public with CloudFront
    └── Tiles Cache: Public with CloudFront

Networking
├── VPC: 10.0.0.0/16
├── Public Subnets: 10.0.1.0/24, 10.0.2.0/24 (ALB)
├── Private Subnets: 10.0.10.0/24, 10.0.11.0/24 (ECS tasks)
└── Security Groups:
    ├── ALB → Allow 80, 443 from 0.0.0.0/0
    ├── ECS Tasks → Allow from ALB only
    └── RDS → Allow 5432 from ECS tasks only
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: |
          npm install
          npm run test:ci
          npm run lint
  
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Build Docker images
        run: |
          docker build -t $ECR_REGISTRY/frontend:$SHA ./frontend
          docker build -t $ECR_REGISTRY/api:$SHA ./backend
      
      - name: Push to ECR
        run: |
          aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_REGISTRY
          docker push $ECR_REGISTRY/frontend:$SHA
          docker push $ECR_REGISTRY/api:$SHA
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to ECS
        run: |
          aws ecs update-service \
            --cluster restoration-cluster \
            --service api-service \
            --force-new-deployment
```

---

# 4️⃣ DATABASE DESIGN

## Schema Overview

The database uses PostgreSQL 15 with PostGIS 3.3 extension for spatial operations. All spatial data stored in WGS84 (SRID 4326) for consistency with GeoJSON.

## Table Definitions

### users

**Purpose**: Store user accounts and authentication data

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'EDITOR', 'VIEWER')),
  organization_id UUID,
  email_verified BOOLEAN DEFAULT FALSE,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP  -- Soft delete
);

-- Indexes
CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_organization ON users(organization_id);
CREATE INDEX idx_users_role ON users(role);
```

**Columns**:
- `id`: UUID for security (not sequential integers)
- `password_hash`: bcrypt hash (cost factor 12)
- `role`: Enum for RBAC (Admin = full access, Editor = write, Viewer = read-only)
- `organization_id`: Foreign key to `organizations` table (multi-tenancy)
- `deleted_at`: Soft delete timestamp (GDPR compliance)

**Performance Considerations**:
- Partial index on `email` excludes deleted users
- Index on `organization_id` for tenant-based queries
- Index on `role` for permission checks

---

### organizations

**Purpose**: Multi-tenant isolation for different NGOs/companies

```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  subscription_tier VARCHAR(20) DEFAULT 'FREE' CHECK (subscription_tier IN ('FREE', 'BASIC', 'PRO', 'ENTERPRISE')),
  max_sites INTEGER DEFAULT 10,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE UNIQUE INDEX idx_organizations_slug ON organizations(LOWER(slug));
```

**Columns**:
- `slug`: URL-friendly identifier (e.g., "green-belt-movement")
- `subscription_tier`: Determines feature access and limits
- `max_sites`: Enforce quota (checked at site creation)
- `settings`: JSONB for flexible organization preferences (logo_url, theme_color, etc.)

---

### restoration_sites

**Purpose**: Core table for restoration project metadata

```sql
CREATE TABLE restoration_sites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  restoration_type VARCHAR(50) NOT NULL CHECK (restoration_type IN ('MANGROVE', 'DRYLAND', 'MOUNTAIN_FOREST', 'RIPARIAN', 'COASTAL')),
  ecosystem_type VARCHAR(50),
  restoration_year INTEGER NOT NULL CHECK (restoration_year >= 1990 AND restoration_year <= EXTRACT(YEAR FROM CURRENT_DATE)),
  status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('PLANNING', 'ACTIVE', 'COMPLETED', 'PAUSED', 'CANCELLED')),
  county VARCHAR(100),
  sub_county VARCHAR(100),
  partner_organizations TEXT[],  -- Array of partner names
  funding_sources TEXT[],
  project_lead_name VARCHAR(255),
  project_lead_email VARCHAR(255),
  project_lead_phone VARCHAR(50),
  site_photos TEXT[],  -- Array of S3 URLs
  metadata JSONB DEFAULT '{}',  -- Flexible additional data
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_sites_organization ON restoration_sites(organization_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_sites_year ON restoration_sites(restoration_year);
CREATE INDEX idx_sites_type ON restoration_sites(restoration_type);
CREATE INDEX idx_sites_status ON restoration_sites(status);
CREATE INDEX idx_sites_county ON restoration_sites(county);
CREATE INDEX idx_sites_created_at ON restoration_sites(created_at DESC);

-- Full-text search
CREATE INDEX idx_sites_search ON restoration_sites USING GIN(
  to_tsvector('english', name || ' ' || COALESCE(description, ''))
);
```

**Columns**:
- `restoration_type`: Standardized categories for filtering
- `restoration_year`: Year intervention started
- `status`: Lifecycle state (planning → active → completed)
- `county/sub_county`: Administrative boundaries for regional aggregation
- `partner_organizations`: Array to support multi-partner projects
- `metadata`: JSONB for extensibility (soil_type, rainfall, community_size, etc.)

**Performance Considerations**:
- Composite index on `(organization_id, status, restoration_year)` for common queries
- GIN index for full-text search on name and description
- Partial indexes exclude soft-deleted records

---

### site_boundaries

**Purpose**: Store spatial geometries separately for performance (1:1 with restoration_sites)

```sql
CREATE TABLE site_boundaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID NOT NULL UNIQUE REFERENCES restoration_sites(id) ON DELETE CASCADE,
  geometry GEOMETRY(POLYGON, 4326) NOT NULL,  -- WGS84
  area_hectares NUMERIC(12, 4) GENERATED ALWAYS AS (
    ST_Area(geometry::geography) / 10000
  ) STORED,
  perimeter_meters NUMERIC(12, 2) GENERATED ALWAYS AS (
    ST_Perimeter(geometry::geography)
  ) STORED,
  centroid GEOMETRY(POINT, 4326) GENERATED ALWAYS AS (
    ST_Centroid(geometry)
  ) STORED,
  bbox BOX2D GENERATED ALWAYS AS (
    ST_Extent(geometry)
  ) STORED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Spatial Indexes
CREATE INDEX idx_boundaries_geom ON site_boundaries USING GIST(geometry);
CREATE INDEX idx_boundaries_centroid ON site_boundaries USING GIST(centroid);

-- Validation Constraint
ALTER TABLE site_boundaries ADD CONSTRAINT valid_geometry 
  CHECK (ST_IsValid(geometry) AND ST_GeometryType(geometry) = 'ST_Polygon');
```

**Columns**:
- `geometry`: PostGIS polygon in WGS84 (SRID 4326)
- `area_hectares`: Auto-computed using geography cast for accuracy
- `centroid`: For labeling and clustering
- `bbox`: Bounding box for viewport queries

**Spatial Indexing Strategy**:
- GIST index on `geometry` for `ST_Contains`, `ST_Intersects`, `ST_DWithin` queries
- GIST index on `centroid` for clustering algorithms
- Validation constraint ensures geometries are valid and polygon type

**Spatial Queries Examples**:
```sql
-- Find sites within viewport
SELECT s.* FROM restoration_sites s
JOIN site_boundaries sb ON s.id = sb.site_id
WHERE ST_Intersects(sb.geometry, ST_MakeEnvelope(-1.5, 36.0, -1.0, 37.0, 4326));

-- Find sites within 10km of point
SELECT s.* FROM restoration_sites s
JOIN site_boundaries sb ON s.id = sb.site_id
WHERE ST_DWithin(
  sb.centroid::geography,
  ST_SetSRID(ST_MakePoint(36.8219, -1.2921), 4326)::geography,
  10000  -- meters
);

-- County-level aggregation
SELECT 
  county,
  COUNT(*) as site_count,
  SUM(sb.area_hectares) as total_hectares
FROM restoration_sites s
JOIN site_boundaries sb ON s.id = sb.site_id
GROUP BY county;
```

---

### site_metrics

**Purpose**: Current/latest metrics for each site (1:1 with restoration_sites)

```sql
CREATE TABLE site_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID NOT NULL UNIQUE REFERENCES restoration_sites(id) ON DELETE CASCADE,
  trees_planted INTEGER DEFAULT 0 CHECK (trees_planted >= 0),
  survival_rate NUMERIC(5, 2) CHECK (survival_rate >= 0 AND survival_rate <= 100),  -- Percentage
  co2_sequestered_tonnes NUMERIC(12, 2) DEFAULT 0,
  biomass_tonnes NUMERIC(12, 2),
  biodiversity_index NUMERIC(5, 2),  -- 0-100 scale
  species_count INTEGER DEFAULT 0,
  endemic_species_count INTEGER DEFAULT 0,
  jobs_created INTEGER DEFAULT 0,
  women_employed_percentage NUMERIC(5, 2),
  youth_employed_percentage NUMERIC(5, 2),
  community_income_generated NUMERIC(12, 2),  -- USD
  training_sessions_conducted INTEGER DEFAULT 0,
  households_benefited INTEGER DEFAULT 0,
  water_retention_improvement_percentage NUMERIC(5, 2),
  soil_erosion_reduction_percentage NUMERIC(5, 2),
  last_field_survey_date DATE,
  last_satellite_analysis_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_metrics_site_id ON site_metrics(site_id);
CREATE INDEX idx_metrics_survival_rate ON site_metrics(survival_rate) WHERE survival_rate < 60;  -- Alert threshold
CREATE INDEX idx_metrics_updated_at ON site_metrics(updated_at DESC);
```

**Columns**:
- **Ecological Metrics**: trees_planted, survival_rate, co2_sequestered, biodiversity_index
- **Socioeconomic Metrics**: jobs_created, community_income, households_benefited
- **Gender/Youth**: Percentage-based for equity tracking
- **Last Survey Dates**: Track data freshness

**Data Sources**:
- Field surveys (manual entry by rangers)
- Satellite-derived (NDVI → biomass estimation)
- Community reporting (jobs, income)

**Validation Rules**:
- Survival rate: 0-100%
- Gender/youth percentages: 0-100%
- Negative checks on counts (trees, jobs, etc.)

---

### metric_timeseries

**Purpose**: Historical data for trend analysis and charting

```sql
CREATE TABLE metric_timeseries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID NOT NULL REFERENCES restoration_sites(id) ON DELETE CASCADE,
  metric_name VARCHAR(100) NOT NULL,  -- e.g., "ndvi_mean", "survival_rate", "co2_cumulative"
  metric_value NUMERIC(15, 4) NOT NULL,
  metric_unit VARCHAR(50),  -- e.g., "percentage", "tonnes", "count"
  measurement_date DATE NOT NULL,
  data_source VARCHAR(50) NOT NULL CHECK (data_source IN ('FIELD_SURVEY', 'SATELLITE', 'COMMUNITY_REPORT', 'CALCULATED')),
  confidence_level VARCHAR(20) CHECK (confidence_level IN ('HIGH', 'MEDIUM', 'LOW')),
  notes TEXT,
  metadata JSONB DEFAULT '{}',  -- Satellite scene ID, surveyor name, etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_timeseries_site_metric ON metric_timeseries(site_id, metric_name, measurement_date DESC);
CREATE INDEX idx_timeseries_date ON metric_timeseries(measurement_date DESC);
CREATE INDEX idx_timeseries_source ON metric_timeseries(data_source);

-- Partitioning by year (for large datasets)
CREATE TABLE metric_timeseries_2024 PARTITION OF metric_timeseries
  FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
CREATE TABLE metric_timeseries_2025 PARTITION OF metric_timeseries
  FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');
```

**Columns**:
- `metric_name`: Flexible string for any metric type
- `measurement_date`: Date of observation (not timestamp - daily granularity)
- `data_source`: Provenance tracking
- `confidence_level`: Data quality indicator

**Partitioning Strategy**:
- Partition by year for time-series optimization
- Faster queries for recent data (most common access pattern)
- Easier archival of old data

**Common Queries**:
```sql
-- Last 12 months of NDVI for site
SELECT measurement_date, metric_value
FROM metric_timeseries
WHERE site_id = 'abc-123'
  AND metric_name = 'ndvi_mean'
  AND measurement_date >= CURRENT_DATE - INTERVAL '12 months'
ORDER BY measurement_date ASC;

-- Monthly average survival rate (filled gaps)
WITH months AS (
  SELECT generate_series(
    DATE_TRUNC('month', CURRENT_DATE - INTERVAL '12 months'),
    DATE_TRUNC('month', CURRENT_DATE),
    INTERVAL '1 month'
  )::date AS month
)
SELECT 
  m.month,
  COALESCE(AVG(mt.metric_value), LAG(AVG(mt.metric_value)) OVER (ORDER BY m.month)) as survival_rate
FROM months m
LEFT JOIN metric_timeseries mt ON 
  DATE_TRUNC('month', mt.measurement_date) = m.month
  AND mt.site_id = 'abc-123'
  AND mt.metric_name = 'survival_rate'
GROUP BY m.month
ORDER BY m.month;
```

---

### biodiversity_records

**Purpose**: Species observations within restoration sites

```sql
CREATE TABLE biodiversity_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID NOT NULL REFERENCES restoration_sites(id) ON DELETE CASCADE,
  scientific_name VARCHAR(255) NOT NULL,
  common_name VARCHAR(255),
  taxonomic_kingdom VARCHAR(50),
  taxonomic_class VARCHAR(50),
  taxonomic_order VARCHAR(50),
  taxonomic_family VARCHAR(50),
  is_endemic BOOLEAN DEFAULT FALSE,
  is_threatened BOOLEAN DEFAULT FALSE,
  iucn_status VARCHAR(20),  -- CR, EN, VU, NT, LC, DD, NE
  observation_count INTEGER DEFAULT 1,
  observation_date DATE NOT NULL,
  observer_name VARCHAR(255),
  observation_method VARCHAR(50),  -- CAMERA_TRAP, VISUAL, ACOUSTIC, eDNA
  gbif_taxon_key INTEGER,  -- Link to GBIF API
  gbif_occurrence_id VARCHAR(255),
  location GEOMETRY(POINT, 4326),  -- Specific observation location
  photo_url TEXT,
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_biodiversity_site ON biodiversity_records(site_id);
CREATE INDEX idx_biodiversity_species ON biodiversity_records(scientific_name);
CREATE INDEX idx_biodiversity_endemic ON biodiversity_records(is_endemic) WHERE is_endemic = TRUE;
CREATE INDEX idx_biodiversity_threatened ON biodiversity_records(is_threatened) WHERE is_threatened = TRUE;
CREATE INDEX idx_biodiversity_date ON biodiversity_records(observation_date DESC);
CREATE INDEX idx_biodiversity_location ON biodiversity_records USING GIST(location);
```

**Columns**:
- Full taxonomic hierarchy (kingdom → family)
- `is_endemic`: Kenya-specific species
- `is_threatened`: Conservation concern (IUCN Red List)
- `gbif_taxon_key`: Integration with global biodiversity database
- `location`: Point geometry for species distribution mapping

**Use Cases**:
- Calculate biodiversity index (species richness, Shannon index)
- Track endemic/threatened species recovery
- Spatial analysis (species hotspots within site)
- Export observations to GBIF

**Aggregation Queries**:
```sql
-- Species richness per site
SELECT 
  site_id,
  COUNT(DISTINCT scientific_name) as species_count,
  COUNT(DISTINCT CASE WHEN is_endemic THEN scientific_name END) as endemic_count
FROM biodiversity_records
GROUP BY site_id;

-- Shannon Diversity Index (simplified)
WITH species_counts AS (
  SELECT 
    site_id,
    scientific_name,
    COUNT(*) as observations,
    SUM(COUNT(*)) OVER (PARTITION BY site_id) as total_observations
  FROM biodiversity_records
  GROUP BY site_id, scientific_name
)
SELECT 
  site_id,
  -SUM((observations::numeric / total_observations) * LN(observations::numeric / total_observations)) as shannon_index
FROM species_counts
GROUP BY site_id;
```

---

### satellite_layers

**Purpose**: Metadata for cached satellite imagery tiles

```sql
CREATE TABLE satellite_layers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES restoration_sites(id) ON DELETE CASCADE,
  layer_type VARCHAR(50) NOT NULL CHECK (layer_type IN ('RGB', 'NDVI', 'NDMI', 'LAND_COVER', 'TRUE_COLOR')),
  satellite_source VARCHAR(50) NOT NULL CHECK (satellite_source IN ('SENTINEL2', 'LANDSAT8', 'LANDSAT9', 'PLANET')),
  acquisition_date DATE NOT NULL,
  cloud_cover_percentage NUMERIC(5, 2),
  tile_url TEXT,  -- S3 or CDN URL
  s3_bucket VARCHAR(255),
  s3_key VARCHAR(500),
  zoom_levels INTEGER[] DEFAULT ARRAY[10,11,12,13,14],  -- Available zoom levels
  bbox BOX2D,  -- Tile extent
  resolution_meters NUMERIC(6, 2),  -- Spatial resolution
  scene_id VARCHAR(255),  -- Sentinel scene ID (for traceability)
  processing_level VARCHAR(20),  -- L1C, L2A, etc.
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP  -- Cache expiration
);

-- Indexes
CREATE INDEX idx_satellite_site ON satellite_layers(site_id, acquisition_date DESC);
CREATE INDEX idx_satellite_type_date ON satellite_layers(layer_type, acquisition_date DESC);
CREATE INDEX idx_satellite_expires ON satellite_layers(expires_at) WHERE expires_at IS NOT NULL;
```

**Columns**:
- `layer_type`: Different satellite products (RGB visual, NDVI vegetation index, etc.)
- `satellite_source`: Data provenance
- `cloud_cover_percentage`: Quality indicator (reject >20%)
- `tile_url`: Pre-signed S3 URL or public CDN path
- `zoom_levels`: Which zoom levels are cached
- `expires_at`: For cache cleanup (tiles older than 90 days)

**Lifecycle**:
1. Background job requests Sentinel Hub API for new imagery
2. Tiles downloaded and uploaded to S3
3. Metadata inserted into this table
4. Frontend queries table for available dates
5. Cron job deletes expired entries and S3 objects

---

### audit_logs

**Purpose**: Track all data modifications for compliance and debugging

```sql
CREATE TABLE audit_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  organization_id UUID REFERENCES organizations(id),
  action VARCHAR(50) NOT NULL CHECK (action IN ('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'EXPORT', 'IMPORT')),
  entity_type VARCHAR(100) NOT NULL,  -- e.g., "restoration_sites", "site_metrics"
  entity_id UUID,
  changes JSONB,  -- {before: {...}, after: {...}}
  ip_address INET,
  user_agent TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_audit_user ON audit_logs(user_id, timestamp DESC);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id, timestamp DESC);
CREATE INDEX idx_audit_action ON audit_logs(action, timestamp DESC);
CREATE INDEX idx_audit_timestamp ON audit_logs(timestamp DESC);

-- Partitioning by month (high-volume table)
CREATE TABLE audit_logs_2024_12 PARTITION OF audit_logs
  FOR VALUES FROM ('2024-12-01') TO ('2025-01-01');
```

**Columns**:
- `changes`: JSON diff of before/after state
- `ip_address`: INET type for efficient IP range queries
- `user_agent`: Browser fingerprinting

**Retention Policy**:
- Keep 12 months online
- Archive to S3 Glacier (13-36 months)
- Purge after 3 years

**Compliance Use Cases**:
- GDPR right to deletion (prove data was deleted)
- Security incident investigation
- Data quality debugging (who changed this metric?)

**Example Query**:
```sql
-- All changes to site "abc-123" in last 30 days
SELECT 
  u.email,
  al.action,
  al.changes,
  al.timestamp
FROM audit_logs al
JOIN users u ON al.user_id = u.id
WHERE al.entity_type = 'restoration_sites'
  AND al.entity_id = 'abc-123'
  AND al.timestamp >= CURRENT_TIMESTAMP - INTERVAL '30 days'
ORDER BY al.timestamp DESC;
```

---

## Database Relationships (ERD in Text)

```
organizations (1) ─────< (N) users
    │
    └─< (N) restoration_sites (1) ─── (1) site_boundaries
                │                          │
                ├─ (1) site_metrics        └─ (N) satellite_layers
                ├─< (N) metric_timeseries
                └─< (N) biodiversity_records

users (1) ───< (N) audit_logs
```

**Key Relationships**:
- Organization → Sites: One-to-many (multi-tenancy)
- Site → Boundary: One-to-one (separate for performance)
- Site → Metrics: One-to-one (current state)
- Site → Timeseries: One-to-many (historical records)
- Site → Biodiversity: One-to-many (multiple observations)
- Site → Satellite: One-to-many (multiple dates/layers)

---

## Indexing Strategy Summary

| Index Type | Use Case | Tables |
|------------|----------|--------|
| **GIST (Spatial)** | Geometry queries (contains, intersects, within) | site_boundaries (geometry, centroid) |
| **B-Tree** | Equality, range queries (dates, IDs, status) | All tables (id, created_at, foreign keys) |
| **Partial** | Filtered queries (active sites, deleted_at IS NULL) | sites, users |
| **GIN** | Full-text search, JSONB queries, arrays | sites (search), metrics (metadata) |
| **Composite** | Multi-column queries (site_id + date) | metric_timeseries (site_id, metric_name, date) |
| **Expression** | Computed columns (LOWER(email)) | organizations (slug) |

**Index Maintenance**:
- Auto-analyze enabled (PostgreSQL defaults)
- Manual `REINDEX` quarterly for high-churn tables
- Monitor index bloat with `pg_stat_user_indexes`
- Drop unused indexes (zero scans in 30 days)

---

## Performance Considerations

### Query Optimization Patterns

1. **Viewport-Based Polygon Fetching**
```sql
-- Bad: Fetch all sites, filter in application
SELECT * FROM restoration_sites;

-- Good: Spatial index + bounding box
SELECT s.*, ST_AsGeoJSON(sb.geometry) as boundary
FROM restoration_sites s
JOIN site_boundaries sb ON s.id = sb.site_id
WHERE ST_Intersects(
  sb.geometry,
  ST_MakeEnvelope($1, $2, $3, $4, 4326)  -- User viewport
);
```

2. **Aggregation Pushdown**
```sql
-- Bad: Fetch all timeseries, aggregate in app
SELECT * FROM metric_timeseries WHERE site_id = 'abc-123';

-- Good: Database aggregation
SELECT 
  DATE_TRUNC('month', measurement_date) as month,
  AVG(metric_value) as avg_ndvi
FROM metric_timeseries
WHERE site_id = 'abc-123'
  AND metric_name = 'ndvi_mean'
  AND measurement_date >= CURRENT_DATE - INTERVAL '12 months'
GROUP BY month
ORDER BY month;
```

3. **Join Elimination**
```sql
-- Bad: Always join boundaries even for list view
SELECT s.*, ST_AsGeoJSON(sb.geometry)
FROM restoration_sites s
LEFT JOIN site_boundaries sb ON s.id = sb.site_id;

-- Good: Separate endpoints
-- /api/sites (no geometry, fast)
SELECT id, name, restoration_type FROM restoration_sites;

-- /api/sites/:id (with geometry)
SELECT s.*, ST_AsGeoJSON(sb.geometry) as boundary
FROM restoration_sites s
JOIN site_boundaries sb ON s.id = sb.site_id
WHERE s.id = $1;
```

### Connection Pooling

```typescript
// TypeORM Configuration
{
  type: 'postgres',
  poolSize: 20,  // Max connections
  extra: {
    max: 20,
    idleTimeoutMillis: 30000,  // 30s idle timeout
    connectionTimeoutMillis: 2000,  // 2s connect timeout
  },
}
```

### Read Replica Strategy

- **Primary**: All writes (INSERT, UPDATE, DELETE)
- **Replica 1**: Analytics queries (aggregations, reports)
- **Replica 2**: Search queries (full-text, spatial)

```typescript
// TypeORM Replication
const dataSource = new DataSource({
  replication: {
    master: {
      host: 'primary.rds.amazonaws.com',
      port: 5432,
      database: 'restoration_db',
    },
    slaves: [
      { host: 'replica1.rds.amazonaws.com', port: 5432, database: 'restoration_db' },
      { host: 'replica2.rds.amazonaws.com', port: 5432, database: 'restoration_db' },
    ],
  },
});
```

### Caching Strategy

```typescript
// Redis Cache Layer
const CACHE_KEYS = {
  SITES_LIST: (orgId, filters) => `sites:${orgId}:${JSON.stringify(filters)}`,
  SITE_DETAIL: (siteId) => `site:${siteId}`,
  METRICS: (siteId) => `metrics:${siteId}`,
  TIMESERIES: (siteId, metric, range) => `timeseries:${siteId}:${metric}:${range}`,
};

// Cache invalidation on writes
async updateSiteMetrics(siteId: string, data: UpdateMetricsDto) {
  await this.metricsRepo.update(siteId, data);
  await this.cacheManager.del(CACHE_KEYS.METRICS(siteId));
  await this.cacheManager.del(CACHE_KEYS.SITE_DETAIL(siteId));
}
```

---

# 5️⃣ API SPECIFICATION

## API Overview

**Base URL**: `https://api.restoration.earth`  
**Current Version**: `v1`  
**Protocol**: HTTPS only (TLS 1.3)  
**Content Type**: `application/json`  
**Character Encoding**: UTF-8

## Versioning Strategy

- **URL-based versioning**: `/api/v1/sites`, `/api/v2/sites`
- **Backward compatibility**: v1 maintained for minimum 12 months after v2 launch
- **Deprecation headers**: `Sunset: Sat, 31 Dec 2025 23:59:59 GMT`
- **Version negotiation**: Accept header fallback (`Accept: application/vnd.restoration.v2+json`)

## Authentication

**JWT Bearer Tokens**

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Token Lifecycle**:
- Access token: 15 minutes expiration
- Refresh token: 7 days expiration (stored as httpOnly cookie)
- Automatic renewal: Client requests new access token using refresh token

**Login Flow**:
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123!"
}

Response:
{
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "expires_in": 900,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "EDITOR"
  }
}
```

**Token Refresh**:
```http
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJhbGc..."
}

Response:
{
  "access_token": "new_token...",
  "expires_in": 900
}
```

## Authorization (RBAC)

| Role | Permissions |
|------|-------------|
| **VIEWER** | Read all sites/metrics within organization |
| **EDITOR** | VIEWER + Create/Update sites, Upload data |
| **ADMIN** | EDITOR + Delete sites, Manage users, Org settings |

## Rate Limiting

- **Authenticated users**: 100 requests per minute per account
- **Unauthenticated**: 20 requests per minute per IP
- **Burst allowance**: 2x rate for 10 seconds

**Rate Limit Headers**:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 73
X-RateLimit-Reset: 1640995200  # Unix timestamp
```

**Exceeded Response**:
```http
HTTP/1.1 429 Too Many Requests
Retry-After: 42

{
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "Rate limit exceeded. Retry after 42 seconds.",
  "details": {
    "limit": 100,
    "window": "1 minute",
    "retryAfter": 42
  }
}
```

---

## Endpoints

### Sites

#### GET /api/v1/sites

**Purpose**: List all restoration sites with optional filtering

**Query Parameters**:
```typescript
{
  year?: number;  // Filter by restoration year
  type?: 'MANGROVE' | 'DRYLAND' | 'MOUNTAIN_FOREST' | 'RIPARIAN' | 'COASTAL';
  status?: 'PLANNING' | 'ACTIVE' | 'COMPLETED' | 'PAUSED';
  county?: string;
  search?: string;  // Full-text search on name/description
  bbox?: string;  // "minLon,minLat,maxLon,maxLat" (viewport query)
  page?: number;  // Default 1
  pageSize?: number;  // Default 50, max 100
  sortBy?: 'name' | 'createdAt' | 'restorationYear';
  sortOrder?: 'asc' | 'desc';
}
```

**Example Request**:
```http
GET /api/v1/sites?year=2023&type=MANGROVE&bbox=36.5,-1.5,37.5,-0.5&page=1&pageSize=20
Authorization: Bearer {token}
```

**Success Response (200 OK)**:
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Mikoko Pamoja Mangrove Site",
      "restorationYear": 2023,
      "restorationType": "MANGROVE",
      "ecosystemType": "Coastal wetland",
      "status": "ACTIVE",
      "county": "Kilifi",
      "areaHectares": 117.5,
      "boundary": {
        "type": "Polygon",
        "coordinates": [[[36.8, -1.2], [36.9, -1.2], [36.9, -1.3], [36.8, -1.3], [36.8, -1.2]]]
      },
      "centroid": {
        "type": "Point",
        "coordinates": [36.85, -1.25]
      },
      "metrics": {
        "treesPlanted": 25000,
        "survivalRate": 78.5,
        "co2SequesteredTonnes": 120.3,
        "biodiversityIndex": 67.2
      },
      "createdAt": "2023-01-15T10:30:00Z",
      "updatedAt": "2024-02-10T14:22:00Z"
    }
  ],
  "meta": {
    "total": 47,
    "page": 1,
    "pageSize": 20,
    "totalPages": 3,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

**Error Responses**:
```json
// 400 Bad Request
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid query parameters",
  "details": [
    {
      "field": "year",
      "message": "Must be between 1990 and 2025"
    }
  ]
}

// 401 Unauthorized
{
  "error": "UNAUTHORIZED",
  "message": "Missing or invalid authentication token"
}
```

---

#### GET /api/v1/sites/{id}

**Purpose**: Get detailed information for a single site

**Path Parameters**:
- `id` (UUID, required): Site identifier

**Success Response (200 OK)**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Mikoko Pamoja Mangrove Site",
  "description": "Community-led mangrove restoration project combining conservation with carbon credit revenue...",
  "restorationYear": 2023,
  "restorationType": "MANGROVE",
  "ecosystemType": "Coastal wetland",
  "status": "ACTIVE",
  "county": "Kilifi",
  "subCounty": "Gazi",
  "boundary": {
    "type": "Polygon",
    "coordinates": [...]
  },
  "areaHectares": 117.5,
  "perimeterMeters": 4382.6,
  "centroid": {"type": "Point", "coordinates": [36.85, -1.25]},
  "partnerOrganizations": ["Mikoko Pamoja CBO", "WWF Kenya"],
  "fundingSources": ["VCS Carbon Credits", "GEF Small Grants"],
  "projectLead": {
    "name": "Jane Wanjiru",
    "email": "jane@mikokopamoja.org",
    "phone": "+254712345678"
  },
  "sitePhotos": [
    "https://cdn.restoration.earth/photos/mikoko-2023-01.jpg",
    "https://cdn.restoration.earth/photos/mikoko-2023-02.jpg"
  ],
  "metrics": {
    "treesPlanted": 25000,
    "survivalRate": 78.5,
    "co2SequesteredTonnes": 120.3,
    "biomassTonnes": 340.7,
    "biodiversityIndex": 67.2,
    "speciesCount": 34,
    "endemicSpeciesCount": 7,
    "jobsCreated": 15,
    "womenEmployedPercentage": 60.0,
    "youthEmployedPercentage": 40.0,
    "communityIncomeGenerated": 12500.00,
    "householdsBenefited": 87,
    "lastFieldSurveyDate": "2024-01-15",
    "lastSatelliteAnalysisDate": "2024-02-01"
  },
  "metadata": {
    "soilType": "Saline clay",
    "averageRainfall": 1200,
    "tidalRange": 3.2
  },
  "createdBy": "user-uuid",
  "createdAt": "2023-01-15T10:30:00Z",
  "updatedAt": "2024-02-10T14:22:00Z"
}
```

**Error Responses**:
```json
// 404 Not Found
{
  "error": "NOT_FOUND",
  "message": "Site not found",
  "details": {
    "siteId": "550e8400-e29b-41d4-a716-446655440000"
  }
}

// 403 Forbidden
{
  "error": "FORBIDDEN",
  "message": "You do not have permission to access this site",
  "details": {
    "requiredRole": "VIEWER",
    "userRole": "NONE"
  }
}
```

---

#### POST /api/v1/sites

**Purpose**: Create a new restoration site

**Request Body**:
```json
{
  "name": "New Reforestation Site",
  "description": "Dryland restoration in Baringo County...",
  "restorationType": "DRYLAND",
  "ecosystemType": "Acacia woodland",
  "restorationYear": 2024,
  "status": "PLANNING",
  "county": "Baringo",
  "subCounty": "Marigat",
  "boundary": {
    "type": "Polygon",
    "coordinates": [
      [[36.0, 0.5], [36.1, 0.5], [36.1, 0.4], [36.0, 0.4], [36.0, 0.5]]
    ]
  },
  "partnerOrganizations": ["Green Belt Movement"],
  "fundingSources": ["Adaptation Fund"],
  "projectLead": {
    "name": "John Kiplagat",
    "email": "john@example.com",
    "phone": "+254720000000"
  },
  "initialMetrics": {
    "treesPlanted": 0,
    "survivalRate": 0
  }
}
```

**Validation Rules**:
- `name`: Required, 3-255 characters
- `restorationType`: Required, must be valid enum
- `restorationYear`: Required, 1990-current year
- `boundary`: Required, valid GeoJSON Polygon, SRID 4326
- `boundary.geometry`: Must be simple (no self-intersections), area 0.1-100,000 hectares

**Success Response (201 Created)**:
```json
{
  "id": "new-uuid",
  "name": "New Reforestation Site",
  "restorationYear": 2024,
  "areaHectares": 45.3,
  "createdAt": "2024-02-15T12:00:00Z",
  "message": "Site created successfully. Background job queued to fetch historical satellite data."
}
```

**Headers**:
```http
Location: /api/v1/sites/new-uuid
```

**Error Responses**:
```json
// 400 Bad Request - Validation Error
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid request body",
  "details": [
    {
      "field": "boundary",
      "message": "Geometry is not valid: self-intersection at [36.05, 0.45]"
    },
    {
      "field": "restorationYear",
      "message": "Year must be between 1990 and 2025"
    }
  ]
}

// 403 Forbidden
{
  "error": "FORBIDDEN",
  "message": "Insufficient permissions to create sites",
  "details": {
    "requiredRole": "EDITOR",
    "userRole": "VIEWER"
  }
}

// 409 Conflict
{
  "error": "CONFLICT",
  "message": "A site with this name already exists in your organization",
  "details": {
    "existingSiteId": "existing-uuid",
    "existingSiteName": "New Reforestation Site"
  }
}
```

---

#### PUT /api/v1/sites/{id}

**Purpose**: Update an existing site

**Request Body** (partial updates allowed):
```json
{
  "name": "Updated Site Name",
  "status": "ACTIVE",
  "description": "Updated description...",
  "projectLead": {
    "phone": "+254722222222"
  }
}
```

**Success Response (200 OK)**:
```json
{
  "id": "uuid",
  "name": "Updated Site Name",
  "status": "ACTIVE",
  "updatedAt": "2024-02-15T14:30:00Z",
  "message": "Site updated successfully"
}
```

**Immutable Fields** (cannot be changed):
- `id`
- `createdAt`
- `createdBy`

**Error Responses**:
```json
// 422 Unprocessable Entity
{
  "error": "UNPROCESSABLE_ENTITY",
  "message": "Cannot change restoration type once site is ACTIVE",
  "details": {
    "field": "restorationType",
    "currentValue": "MANGROVE",
    "attemptedValue": "DRYLAND"
  }
}
```

---

#### DELETE /api/v1/sites/{id}

**Purpose**: Soft-delete a site (sets `deleted_at` timestamp)

**Success Response (204 No Content)**:
```http
HTTP/1.1 204 No Content
```

**Error Responses**:
```json
// 403 Forbidden
{
  "error": "FORBIDDEN",
  "message": "Only ADMIN users can delete sites",
  "details": {
    "requiredRole": "ADMIN",
    "userRole": "EDITOR"
  }
}

// 409 Conflict
{
  "error": "CONFLICT",
  "message": "Cannot delete site with active monitoring data",
  "details": {
    "reason": "Site has 347 biodiversity records and 24 months of satellite data",
    "suggestion": "Consider setting status to CANCELLED instead"
  }
}
```

---

### Metrics

#### GET /api/v1/sites/{id}/metrics

**Purpose**: Get current metrics for a site

**Success Response (200 OK)**:
```json
{
  "siteId": "uuid",
  "treesPlanted": 25000,
  "survivalRate": 78.5,
  "co2SequesteredTonnes": 120.3,
  "biomassTonnes": 340.7,
  "biodiversityIndex": 67.2,
  "speciesCount": 34,
  "endemicSpeciesCount": 7,
  "jobsCreated": 15,
  "womenEmployedPercentage": 60.0,
  "communityIncomeGenerated": 12500.00,
  "lastFieldSurveyDate": "2024-01-15",
  "lastSatelliteAnalysisDate": "2024-02-01",
  "updatedAt": "2024-02-10T14:22:00Z"
}
```

---

#### GET /api/v1/sites/{id}/timeseries

**Purpose**: Get historical time-series data for charting

**Query Parameters**:
```typescript
{
  metric: string;  // e.g., "ndvi_mean", "survival_rate", "co2_cumulative"
  startDate?: string;  // ISO 8601 (default: 12 months ago)
  endDate?: string;  // ISO 8601 (default: today)
  interval?: 'daily' | 'weekly' | 'monthly';  // Default: monthly
  fillGaps?: boolean;  // Fill missing dates with interpolation (default: false)
}
```

**Example Request**:
```http
GET /api/v1/sites/uuid/timeseries?metric=ndvi_mean&startDate=2023-01-01&endDate=2024-01-01&interval=monthly
```

**Success Response (200 OK)**:
```json
{
  "siteId": "uuid",
  "metric": "ndvi_mean",
  "unit": "index",
  "interval": "monthly",
  "dataPoints": [
    {
      "date": "2023-01-01",
      "value": 0.42,
      "dataSource": "SATELLITE",
      "confidenceLevel": "HIGH"
    },
    {
      "date": "2023-02-01",
      "value": 0.45,
      "dataSource": "SATELLITE",
      "confidenceLevel": "HIGH"
    },
    {
      "date": "2023-03-01",
      "value": 0.51,
      "dataSource": "SATELLITE",
      "confidenceLevel": "MEDIUM"
    }
  ],
  "statistics": {
    "min": 0.42,
    "max": 0.68,
    "mean": 0.54,
    "trend": "INCREASING"  // INCREASING, DECREASING, STABLE
  }
}
```

**Available Metrics**:
- `ndvi_mean`: Normalized Difference Vegetation Index (0-1)
- `survival_rate`: Tree survival percentage (0-100)
- `co2_cumulative`: Cumulative CO2 sequestered (tonnes)
- `biodiversity_index`: Species diversity (0-100)
- `jobs_created_cumulative`: Cumulative jobs

---

#### GET /api/v1/sites/{id}/biodiversity

**Purpose**: Get biodiversity observations for a site

**Query Parameters**:
```typescript
{
  startDate?: string;
  endDate?: string;
  isEndemic?: boolean;
  isThreatened?: boolean;
  taxonomicClass?: string;  // e.g., "Aves" (birds), "Mammalia"
}
```

**Success Response (200 OK)**:
```json
{
  "siteId": "uuid",
  "totalRecords": 147,
  "speciesRichness": 34,
  "endemicSpeciesCount": 7,
  "threatenedSpeciesCount": 3,
  "observations": [
    {
      "id": "obs-uuid",
      "scientificName": "Anthus melindae",
      "commonName": "Malindi pipit",
      "taxonomicClass": "Aves",
      "isEndemic": true,
      "isThreatened": true,
      "iucnStatus": "EN",  // Endangered
      "observationDate": "2024-01-10",
      "observationCount": 3,
      "observer": "Dr. Jane Kamau",
      "location": {"type": "Point", "coordinates": [36.85, -1.25]},
      "photoUrl": "https://cdn.restoration.earth/obs/malindi-pipit.jpg"
    }
  ]
}
```

---

### Satellite Imagery

#### GET /api/v1/satellite/layers

**Purpose**: Get available satellite imagery layers for a site

**Query Parameters**:
```typescript
{
  siteId?: string;  // Filter by site
  layerType?: 'RGB' | 'NDVI' | 'NDMI' | 'LAND_COVER';
  startDate?: string;
  endDate?: string;
  maxCloudCover?: number;  // 0-100 (default: 20)
}
```

**Success Response (200 OK)**:
```json
{
  "layers": [
    {
      "id": "layer-uuid",
      "siteId": "site-uuid",
      "layerType": "NDVI",
      "satelliteSource": "SENTINEL2",
      "acquisitionDate": "2024-01-15",
      "cloudCoverPercentage": 5.2,
      "tileUrl": "https://cdn.restoration.earth/tiles/ndvi/2024-01-15/{z}/{x}/{y}.png",
      "zoomLevels": [10, 11, 12, 13, 14],
      "resolutionMeters": 10.0,
      "sceneId": "S2A_MSIL2A_20240115T073211_N0510_R049_T37MCS_20240115T101923"
    }
  ]
}
```

**Frontend Usage**:
```typescript
// Add tile layer to Mapbox GL map
map.addLayer({
  id: 'ndvi-layer',
  type: 'raster',
  source: {
    type: 'raster',
    tiles: ['https://cdn.restoration.earth/tiles/ndvi/2024-01-15/{z}/{x}/{y}.png'],
    tileSize: 256,
  },
});
```

---

### Impact Summary

#### GET /api/v1/impact/summary

**Purpose**: Get aggregated impact metrics across all sites (or filtered subset)

**Query Parameters**:
```typescript
{
  year?: number;
  type?: string;
  county?: string;
  organizationId?: string;  // Admin only - view other orgs
}
```

**Success Response (200 OK)**:
```json
{
  "totalSites": 47,
  "totalHectares": 5432.7,
  "metrics": {
    "totalTreesPlanted": 1250000,
    "averageSurvivalRate": 72.3,
    "totalCO2SequesteredTonnes": 8750.4,
    "totalJobsCreated": 342,
    "totalHouseholdsBenefited": 2150,
    "totalCommunityIncomeGenerated": 425000.00
  },
  "breakdown": {
    "byRestorationTypeuse": [
      {"type": "MANGROVE", "siteCount": 12, "hectares": 1240.5},
      {"type": "DRYLAND", "siteCount": 20, "hectares": 3100.2},
      {"type": "MOUNTAIN_FOREST", "siteCount": 15, "hectares": 1092.0}
    ],
    "byCounty": [
      {"county": "Kilifi", "siteCount": 8, "hectares": 980.3},
      {"county": "Baringo", "siteCount": 7, "hectares": 1200.0}
    ],
    "byYear": [
      {"year": 2021, "siteCount": 10, "hectares": 1100.5},
      {"year": 2022, "siteCount": 15, "hectares": 1800.3},
      {"year": 2023, "siteCount": 12, "hectares": 1420.7},
      {"year": 2024, "siteCount": 10, "hectares": 1111.2}
    ]
  },
  "trends": {
    "ndviChange": "+12.5%",  // Avg NDVI increase over last year
    "survivalRateTrend": "STABLE",
    "newSitesThisYear": 10
  },
  "generatedAt": "2024-02-15T16:00:00Z"
}
```

---

## GraphQL Schema (Optional Layer)

```graphql
type Site {
  id: ID!
  name: String!
  restorationYear: Int!
  restorationType: RestorationType!
  status: SiteStatus!
  boundary: GeoJSONPolygon!
  areaHectares: Float!
  metrics: SiteMetrics!
  timeseries(metric: String!, startDate: Date, endDate: Date): [TimeSeriesDataPoint!]!
  biodiversityRecords(filters: BiodiversityFilters): BiodiversityData!
  satelliteLayers(type: LayerType, startDate: Date, endDate: Date): [SatelliteLayer!]!
}

type SiteMetrics {
  treesPlanted: Int!
  survivalRate: Float!
  co2SequesteredTonnes: Float!
  biodiversityIndex: Float!
  speciesCount: Int!
  jobsCreated: Int!
}

type TimeSeriesDataPoint {
  date: Date!
  value: Float!
  dataSource: DataSource!
  confidenceLevel: ConfidenceLevel!
}

enum RestorationType {
  MANGROVE
  DRYLAND
  MOUNTAIN_FOREST
  RIPARIAN
  COASTAL
}

enum SiteStatus {
  PLANNING
  ACTIVE
  COMPLETED
  PAUSED
  CANCELLED
}

type Query {
  sites(filters: SiteFilters, pagination: PaginationInput): SitesConnection!
  site(id: ID!): Site
  impactSummary(filters: SiteFilters): ImpactSummary!
}

type Mutation {
  createSite(input: CreateSiteInput!): Site!
  updateSite(id: ID!, input: UpdateSiteInput!): Site!
  deleteSite(id: ID!): Boolean!
  updateMetrics(siteId: ID!, metrics: MetricsInput!): SiteMetrics!
}

# Pagination
type SitesConnection {
  edges: [SiteEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type SiteEdge {
  node: Site!
  cursor: String!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}
```

**GraphQL Query Example**:
```graphql
query GetSiteDetails($id: ID!) {
  site(id: $id) {
    name
    restorationYear
    metrics {
      treesPlanted
      survivalRate
      co2SequesteredTonnes
    }
    timeseries(metric: "ndvi_mean", startDate: "2023-01-01", endDate: "2024-01-01") {
      date
      value
    }
  }
}
```

---

## Error Handling

### Standard Error Format (RFC 7807)

```json
{
  "error": "ERROR_CODE",
  "message": "Human-readable error message",
  "details": {
    "field": "specificField",
    "additionalContext": "..."
  },
  "timestamp": "2024-02-15T16:30:00Z",
  "path": "/api/v1/sites",
  "requestId": "req-uuid"  // For support tracking
}
```

### HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successful GET/PUT |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid parameters |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate resource |
| 422 | Unprocessable Entity | Business logic violation |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unexpected failure |
| 503 | Service Unavailable | Maintenance mode |

### Error Codes

```typescript
enum ErrorCode {
  // Validation
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_GEOJSON = 'INVALID_GEOJSON',
  GEOMETRY_TOO_LARGE = 'GEOMETRY_TOO_LARGE',
  
  // Authentication
  UNAUTHORIZED = 'UNAUTHORIZED',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  
  // Authorization
  FORBIDDEN = 'FORBIDDEN',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  
  // Resources
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  GONE = 'GONE',  // Resource was deleted
  
  // Business Logic
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  INVALID_STATE_TRANSITION = 'INVALID_STATE_TRANSITION',
  
  // External Services
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  SATELLITE_API_UNAVAILABLE = 'SATELLITE_API_UNAVAILABLE',
  
  // Rate Limiting
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
}
```

---

## Request/Response Examples

### Complex Filtering Example

```http
GET /api/v1/sites?
  year=2023&
  type=MANGROVE&
  county=Kilifi&
  status=ACTIVE&
  bbox=36.5,-1.5,37.5,-0.5&
  sortBy=name&
  sortOrder=asc&
  page=2&
  pageSize=20
```

### Bulk Operations (Future Enhancement)

```http
POST /api/v1/sites/bulk
Content-Type: application/json

{
  "sites": [
    {
      "name": "Site 1",
      "boundary": {...},
      ...
    },
    {
      "name": "Site 2",
      "boundary": {...},
      ...
    }
  ]
}

Response:
{
  "created": 2,
  "failed": 0,
  "results": [
    {"index": 0, "id": "uuid-1", "status": "created"},
    {"index": 1, "id": "uuid-2", "status": "created"}
  ]
}
```

---

# 6️⃣ FRONTEND ARCHITECTURE

## Component Hierarchy

```
App
├── AuthProvider (Context)
│   └── Router
│       ├── PublicLayout
│       │   ├── Header
│       │   ├── LoginPage
│       │   └── Footer
│       │
│       └── AuthenticatedLayout
│           ├── NavigationSidebar
│           │   ├── OrgSwitcher
│           │   ├── NavLinks (Dashboard, Sites, Reports, Settings)
│           │   └── UserMenu
│           │
│           ├── Routes
│           │   ├── DashboardPage
│           │   │   ├── ImpactSummaryCards
│           │   │   ├── TrendsChart
│           │   │   ├── RecentActivity
│           │   │   └── QuickActions
│           │   │
│           │   ├── SitesPage
│           │   │   ├── FilterPanel
│           │   │   │   ├── YearFilter
│           │   │   │   ├── TypeFilter
│           │   │   │   ├── CountyFilter
│           │   │   │   ├── StatusFilter
│           │   │   │   └── SearchBar
│           │   │   │
│           │   │   ├── SplitLayout
│           │   │   │   ├── MapPanel (70% width)
│           │   │   │   │   ├── Map
│           │   │   │   │   │   ├── BasemapToggle
│           │   │   │   │   │   ├── SitePolygonsLayer
│           │   │   │   │   │   ├── SatelliteImageryLayer (conditional)
│           │   │   │   │   │   ├── ClusterLayer (low zoom)
│           │   │   │   │   │   └── MapControls (zoom, compass, geolocation)
│           │   │   │   │   │
│           │   │   │   │   ├── LayerToggle
│           │   │   │   │   │   ├── SatelliteLayerPicker
│           │   │   │   │   │   ├── OpacitySlider
│           │   │   │   │   │   └── DatePicker
│           │   │   │   │   │
│           │   │   │   │   └── TimeSlider (satellite animation)
│           │   │   │   │
│           │   │   │   └── SidePanel (30% width)
│           │   │   │       ├── SitesList (if no selection)
│           │   │   │       │   └── SiteListItem[]
│           │   │   │       │
│           │   │   │       └── SiteDetails (if selected)
│           │   │   │           ├── SiteHeader (name, status badge)
│           │   │   │           ├── SiteMetrics
│           │   │   │           │   └── MetricCard[]
│           │   │   │           ├── TimeSeriesCharts
│           │   │   │           │   ├── NDVIChart
│           │   │   │           │   ├── SurvivalRateChart
│           │   │   │           │   └── CO2Chart
│           │   │   │           ├── BiodiversitySection
│           │   │   │           │   ├── SpeciesCount
│           │   │   │           │   └── ObservationsList
│           │   │   │           ├── PhotoGallery
│           │   │   │           └── ActionButtons (Edit, Export, Report)
│           │   │
│           │   ├── ComparisonPage
│           │   │   ├── SiteSelector (multi-select)
│           │   │   ├── ComparisonTable
│           │   │   └── ComparisonCharts
│           │   │
│           │   ├── ReportsPage
│           │   │   ├── ReportTemplateSelector
│           │   │   ├── FilterBuilder
│           │   │   ├── ReportPreview
│           │   │   └── ExportButton (PDF, Excel)
│           │   │
│           │   └── SettingsPage
│           │       ├── ProfileSettings
│           │       ├── OrganizationSettings
│           │       └── APIKeysManagement
│           │
│           └── ToastContainer (global notifications)
│
└── ErrorBoundary
```

## State Management Design

### Redux Store Slices

```typescript
// store/index.ts
const store = configureStore({
  reducer: {
    filters: filtersReducer,       // Active map filters
    ui: uiReducer,                  // UI state (modals, sidebars)
    map: mapReducer,                // Map viewport and layers
    user: userReducer,              // User preferences
    comparison: comparisonReducer,  // Site comparison state
  },
});

// store/slices/filtersSlice.ts
interface FiltersState {
  year: number | null;
  restorationTypes: string[];
  counties: string[];
  statuses: string[];
  searchQuery: string;
  bbox: [number, number, number, number] | null;
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    year: null,
    restorationTypes: [],
    counties: [],
    statuses: ['ACTIVE'],
    searchQuery: '',
    bbox: null,
  },
  reducers: {
    setYear: (state, action) => { state.year = action.payload; },
    toggleRestorationType: (state, action) => {
      const index = state.restorationTypes.indexOf(action.payload);
      if (index > -1) {
        state.restorationTypes.splice(index, 1);
      } else {
        state.restorationTypes.push(action.payload);
      }
    },
    setBbox: (state, action) => { state.bbox = action.payload; },
    resetFilters: () => initialState,
  },
});

// store/slices/mapSlice.ts
interface MapState {
  viewport: {
    center: [number, number];
    zoom: number;
    bearing: number;
    pitch: number;
  };
  selectedSiteId: string | null;
  activeLayers: string[];  // ['satellite-rgb', 'ndvi', 'site-polygons']
  satelliteLayerConfig: {
    type: 'RGB' | 'NDVI' | 'NDMI';
    date: string;
    opacity: number;
  };
}
```

### TanStack Query Hooks

```typescript
// features/sites/hooks/useSites.ts
export function useSites() {
  const filters = useSelector((state) => state.filters);
  
  return useQuery({
    queryKey: ['sites', filters],
    queryFn: () => sitesApi.fetchSites(filters),
    staleTime: 5 * 60 * 1000,  // 5 minutes
    select: (data) => ({
      sites: data.data,
      total: data.meta.total,
    }),
  });
}

// features/sites/hooks/useSiteDetails.ts
export function useSiteDetails(siteId: string | null) {
  return useQuery({
    queryKey: ['site', siteId],
    queryFn: () => sitesApi.fetchSite(siteId!),
    enabled: !!siteId,  // Only fetch when siteId exists
    staleTime: 10 * 60 * 1000,
  });
}

// features/sites/hooks/useCreateSite.ts
export function useCreateSite() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: sitesApi.createSite,
    onSuccess: () => {
      // Invalidate sites list to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['sites'] });
      toast.success('Site created successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to create site: ${error.message}`);
    },
  });
}

// features/metrics/hooks/useTimeSeries.ts
export function useTimeSeries(siteId: string, metric: string, dateRange: DateRange) {
  return useQuery({
    queryKey: ['timeseries', siteId, metric, dateRange],
    queryFn: () => metricsApi.fetchTimeSeries(siteId, metric, dateRange),
    staleTime: 15 * 60 * 1000,  // Time-series data changes less frequently
    select: (data) => ({
      chartData: data.dataPoints.map(dp => ({
        date: new Date(dp.date).getTime(),
        value: dp.value,
      })),
      statistics: data.statistics,
    }),
  });
}
```

## Map Layer Management Strategy

### Layer Architecture

```typescript
// features/map/types/layers.ts
interface MapLayer {
  id: string;
  type: 'geojson' | 'raster' | 'vector-tile';
  source: MapSource;
  paint: PaintProperties;
  layout?: LayoutProperties;
  minZoom?: number;
  maxZoom?: number;
  filter?: FilterExpression;
}

// Layer Definitions
const LAYERS: Record<string, MapLayer> = {
  'site-polygons': {
    id: 'site-polygons',
    type: 'geojson',
    source: {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] },
    },
    paint: {
      'fill-color': [
        'match',
        ['get', 'restorationType'],
        'MANGROVE', '#2E7D32',
        'DRYLAND', '#F57C00',
        'MOUNTAIN_FOREST', '#388E3C',
        '#757575',  // default
      ],
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        0.8,
        0.5,
      ],
      'fill-outline-color': '#000',
    },
    layout: {
      'visibility': 'visible',
    },
  },
  
  'site-polygons-outline': {
    id: 'site-polygons-outline',
    type: 'geojson',
    source: 'site-polygons',  // Reuse same source
    paint: {
      'line-color': '#000',
      'line-width': [
        'case',
        ['boolean', ['feature-state', 'selected'], false],
        3,
        1,
      ],
    },
  },
  
  'site-clusters': {
    id: 'site-clusters',
    type: 'geojson',
    source: {
      type: 'geojson',
      data: null,
      cluster: true,
      clusterMaxZoom: 10,
      clusterRadius: 50,
    },
    paint: {
      'circle-color': [
        'step',
        ['get', 'point_count'],
        '#51bbd6',
        10, '#f1f075',
        50, '#f28cb1',
      ],
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        20,
        10, 30,
        50, 40,
      ],
    },
    layout: {
      'visibility': 'visible',
    },
    maxZoom: 10,  // Only show clusters at low zoom
  },
  
  'satellite-ndvi': {
    id: 'satellite-ndvi',
    type: 'raster',
    source: {
      type: 'raster',
      tiles: [],  // Populated dynamically
      tileSize: 256,
    },
    paint: {
      'raster-opacity': 0.7,
    },
    layout: {
      'visibility': 'none',  // Hidden by default
    },
  },
};
```

### Layer Toggling Logic

```typescript
// features/map/hooks/useMapLayers.ts
export function useMapLayers(mapRef: MapRef) {
  const activeLayers = useSelector((state) => state.map.activeLayers);
  const satelliteConfig = useSelector((state) => state.map.satelliteLayerConfig);
  const { data: sites } = useSites();
  
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || !sites) return;
    
    // Update site polygons source
    const source = map.getSource('site-polygons') as GeoJSONSource;
    if (source) {
      source.setData({
        type: 'FeatureCollection',
        features: sites.map(site => ({
          type: 'Feature',
          id: site.id,
          geometry: site.boundary,
          properties: {
            name: site.name,
            restorationType: site.restorationType,
          },
        })),
      });
    }
  }, [sites, mapRef]);
  
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    
    // Toggle satellite layer visibility
    if (activeLayers.includes('satellite-ndvi')) {
      map.setLayoutProperty('satellite-ndvi', 'visibility', 'visible');
      
      // Update tile URL based on date
      const source = map.getSource('satellite-ndvi') as RasterSource;
      if (source && satelliteConfig.date) {
        const tileUrl = `https://cdn.restoration.earth/tiles/ndvi/${satelliteConfig.date}/{z}/{x}/{y}.png`;
        source.setTiles([tileUrl]);
      }
    } else {
      map.setLayoutProperty('satellite-ndvi', 'visibility', 'none');
    }
  }, [activeLayers, satelliteConfig, mapRef]);
}
```

### Viewport-Based Data Fetching

```typescript
// features/map/hooks/useViewportSites.ts
export function useViewportSites() {
  const [bbox, setBbox] = useState<BBox | null>(null);
  const filters = useSelector((state) => state.filters);
  
  const { data: sites } = useQuery({
    queryKey: ['sites', 'viewport', bbox, filters],
    queryFn: () => sitesApi.fetchSites({ ...filters, bbox }),
    enabled: !!bbox,
    staleTime: 2 * 60 * 1000,  // 2 minutes
  });
  
  const handleMapMoveEnd = useCallback((map: MapboxMap) => {
    const bounds = map.getBounds();
    setBbox([
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast(),
      bounds.getNorth(),
    ]);
  }, []);
  
  return { sites, handleMapMoveEnd };
}
```

## Before/After Satellite Comparison Implementation

```typescript
// features/map/components/SatelliteComparison.tsx
export function SatelliteComparison({ siteId }: Props) {
  const [beforeDate, setBeforeDate] = useState('2022-01-01');
  const [afterDate, setAfterDate] = useState('2024-01-01');
  const [sliderPosition, setSliderPosition] = useState(50);  // 0-100%
  
  const { data: beforeLayer } = useQuery({
    queryKey: ['satellite', siteId, 'RGB', beforeDate],
    queryFn: () => satelliteApi.getLayer(siteId, 'RGB', beforeDate),
  });
  
  const { data: afterLayer } = useQuery({
    queryKey: ['satellite', siteId, 'RGB', afterDate],
    queryFn: () => satelliteApi.getLayer(siteId, 'RGB', afterDate),
  });
  
  return (
    <div className="relative h-96">
      <Map style={{position: 'absolute', inset: 0}}>
        {beforeLayer && (
          <Layer
            id="before-image"
            type="raster"
            source={{
              type: 'raster',
              tiles: [beforeLayer.tileUrl],
            }}
            paint={{
              'raster-opacity': 1,
            }}
            beforeId="after-image"
          />
        )}
        
        {afterLayer && (
          <Layer
            id="after-image"
            type="raster"
            source={{
              type: 'raster',
              tiles: [afterLayer.tileUrl],
            }}
            paint={{
              'raster-opacity': 1,
            }}
          />
        )}
        
        {/* Clip path for split effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
        </div>
      </Map>
      
      {/* Slider */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-10"
      />
      
      {/* Date Labels */}
      <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded">
        Before: {beforeDate}
      </div>
      <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded">
        After: {afterDate}
      </div>
    </div>
  );
}
```

## Performance Optimization Strategy

### Code Splitting

```typescript
// app/routes.tsx
const DashboardPage = lazy(() => import('./features/dashboard/DashboardPage'));
const SitesPage = lazy(() => import('./features/sites/SitesPage'));
const ReportsPage = lazy(() => import('./features/reports/ReportsPage'));

export const routes = [
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<PageLoader />}>
        <DashboardPage />
      </Suspense>
    ),
  },
];
```

### Memoization

```typescript
// features/sites/components/SitesList.tsx
export const SitesList = memo(function SitesList({ sites }: Props) {
  const sortedSites = useMemo(() => {
    return [...sites].sort((a, b) => a.name.localeCompare(b.name));
  }, [sites]);
  
  return (
    <ul>
      {sortedSites.map(site => (
        <SiteListItem key={site.id} site={site} />
      ))}
    </ul>
  );
});

const SiteListItem = memo(function SiteListItem({ site }: Props) {
  // Only re-renders if this specific site changes
  return <li>{site.name}</li>;
});
```

### Virtual Scrolling (Large Lists)

```typescript
// features/sites/components/VirtualSitesList.tsx
import { useVirtualizer } from '@tanstack/react-virtual';

export function VirtualSitesList({ sites }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: sites.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,  // Estimated row height
    overscan: 5,  // Render 5 extra items above/below viewport
  });
  
  return (
    <div ref={parentRef} className="h-96 overflow-auto">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const site = sites[virtualRow.index];
          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <SiteListItem site={site} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

### Map Performance

```typescript
// features/map/hooks/useMapOptimization.ts
export function useMapOptimization(mapRef: MapRef) {
  const zoom = useMapZoom(mapRef);
  
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    
    // Simplify geometries at low zoom levels
    if (zoom < 10) {
      map.setLayoutProperty('site-polygons', 'visibility', 'none');
      map.setLayoutProperty('site-clusters', 'visibility', 'visible');
    } else {
      map.setLayoutProperty('site-polygons', 'visibility', 'visible');
      map.setLayoutProperty('site-clusters', 'visibility', 'none');
    }
    
    // Reduce polygon detail at low zoom
    map.setFilter('site-polygons', [
      'all',
      ['>', ['get', 'areaHectares'], zoom < 12 ? 10 : 1],  // Hide small sites when zoomed out
    ]);
  }, [zoom, mapRef]);
}
```

### Debounced Search

```typescript
// features/filters/hooks/useSearch.ts
import { useDebouncedValue } from '@mantine/hooks';

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebouncedValue(searchQuery, 500);
  
  const { data: results } = useQuery({
    queryKey: ['sites', 'search', debouncedSearch],
    queryFn: () => sitesApi.search(debouncedSearch),
    enabled: debouncedSearch.length >= 3,
  });
  
  return { searchQuery, setSearchQuery, results };
}
```

## Error Boundary Strategy

```typescript
// shared/components/ErrorBoundary.tsx
export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Send to Sentry
    Sentry.captureException(error, {
      contexts: { react: errorInfo },
    });
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-6">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <Button onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Usage: Wrap critical sections
<ErrorBoundary fallback={<MapErrorFallback />}>
  <Map />
</ErrorBoundary>
```

---

# 7️⃣ GEOSPATIAL DESIGN DETAILS

## GeoJSON Storage and Fetching

### Database Storage

**PostGIS Geometry Column**:
```sql
-- site_boundaries table
CREATE TABLE site_boundaries (
  geometry GEOMETRY(POLYGON, 4326) NOT NULL
);

-- Spatial index (GIST)
CREATE INDEX idx_boundaries_geom ON site_boundaries USING GIST(geometry);
```

**Why GEOMETRY over GEOGRAPHY?**
- Faster queries (planar calculations vs spherical)
- Sufficient accuracy for Kenya's geographic extent (~5° x 6°)
- For high-precision area calculations, cast to geography:
  ```sql
  ST_Area(geometry::geography) / 10000  -- Hectares
  ```

### API Response Format

**GeoJSON FeatureCollection**:
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "site-uuid",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [[36.8, -1.2], [36.9, -1.2], [36.9, -1.3], [36.8, -1.3], [36.8, -1.2]]
        ]
      },
      "properties": {
        "name": "Mikoko Pamoja",
        "restorationYear": 2023,
        "restorationType": "MANGROVE",
        "areaHectares": 117.5,
        "metrics": {
          "treesPlanted": 25000,
          "survivalRate": 78.5
        }
      }
    }
  ]
}
```

**Optimization**: For large datasets (100+ polygons), simplify geometries:
```sql
SELECT 
  id,
  ST_AsGeoJSON(
    ST_SimplifyPreserveTopology(geometry, 0.0001)  -- ~11m tolerance
  ) as geometry
FROM site_boundaries
WHERE ST_Intersects(geometry, $viewport_bbox);
```

## Raster Imagery Integration

### Tile Serving Strategy

**Option 1: COG (Cloud-Optimized GeoTIFF) + GDAL**
```bash
# Convert Sentinel-2 scene to COG
gdal_translate \
  -of COG \
  -co COMPRESS=DEFLATE \
  -co TILING_SCHEME=GoogleMapsCompatible \
  S2_scene.tif \
  output.cog.tif

# Upload to S3
aws s3 cp output.cog.tif s3://bucket/tiles/ndvi/2024-01-15/

# Serve via GDAL VRT or TiTiler
curl "https://tiler.example.com/cog/tiles/{z}/{x}/{y}?url=s3://bucket/..."
```

**Option 2: Pre-rendered Tiles (Pyramid)**
```python
# Generate tile pyramid using rasterio
import rasterio
from rasterio.warp import calculate_default_transform, reproject
from tiler import mercantile

def generate_tiles(raster_path, zoom_levels=[10, 11, 12, 13]):
    with rasterio.open(raster_path) as src:
        for zoom in zoom_levels:
            tiles = mercantile.tiles(*src.bounds, zooms=zoom)
            for tile in tiles:
                # Read window
                window = mercantile.xy_bounds(tile)
                array = src.read(window=window)
                
                # Save as PNG
                output_path = f"tiles/{zoom}/{tile.x}/{tile.y}.png"
                save_tile(array, output_path)
```

**Option 3: Sentinel Hub WMTS (Recommended for MVP)**
```typescript
// Frontend: Add Sentinel Hub layer
map.addLayer({
  id: 'sentinel-ndvi',
  type: 'raster',
  source: {
    type: 'raster',
    tiles: [
      'https://services.sentinel-hub.com/ogc/wmts/{instance}?' +
      'layer=NDVI&' +
      'tilematrixset=PopularWebMercator512&' +
      'Service=WMTS&Request=GetTile&' +
      'time=2024-01-15&' +
      'tilematrix={z}&tilecol={x}&tilerow={y}'
    ],
    tileSize: 512,
  },
});
```

### NDVI Calculation

**Sentinel-2 Bands**:
- Band 4 (Red): 665 nm
- Band 8 (NIR): 842 nm

**Formula**:
```python
NDVI = (NIR - Red) / (NIR + Red)
```

**Server-side Batch Processing**:
```python
# Background job: Compute NDVI time-series
import rasterio
from rasterio.mask import mask

def compute_site_ndvi(site_id, site_geometry, date_range):
    results = []
    
    for date in date_range:
        # Fetch Sentinel-2 scene
        scene = download_sentinel_scene(site_geometry, date)
        
        with rasterio.open(scene) as src:
            # Clip to site boundary
            red, _ = mask(src, [site_geometry], crop=True, indexes=4)
            nir, _ = mask(src, [site_geometry], crop=True, indexes=8)
            
            # Compute NDVI
            ndvi = (nir - red) / (nir + red)
            
            # Aggregate (mean, median, std)
            results.append({
                'date': date,
                'ndvi_mean': float(np.mean(ndvi)),
                'ndvi_median': float(np.median(ndvi)),
                'ndvi_std': float(np.std(ndvi)),
            })
    
    # Store in metric_timeseries table
    bulk_insert(results)
```

## Spatial Queries using PostGIS

### Common Query Patterns

**1. Sites Within Viewport**
```sql
SELECT 
  s.id,
  s.name,
  ST_AsGeoJSON(sb.geometry) as boundary
FROM restoration_sites s
JOIN site_boundaries sb ON s.id = sb.site_id
WHERE ST_Intersects(
  sb.geometry,
  ST_MakeEnvelope(36.5, -1.5, 37.5, -0.5, 4326)
);

-- Execution plan: Index Scan using idx_boundaries_geom (~5ms for 100 sites)
```

**2. Sites Within Radius**
```sql
-- Find sites within 50km of Nairobi CBD
SELECT 
  s.id,
  s.name,
  ST_Distance(
    sb.centroid::geography,
    ST_SetSRID(ST_MakePoint(36.8219, -1.2921), 4326)::geography
  ) / 1000 as distance_km
FROM restoration_sites s
JOIN site_boundaries sb ON s.id = sb.site_id
WHERE ST_DWithin(
  sb.centroid::geography,
  ST_SetSRID(ST_MakePoint(36.8219, -1.2921), 4326)::geography,
  50000  -- meters
)
ORDER BY distance_km;
```

**3. County Aggregation (Spatial Join)**
```sql
-- Aggregate sites by county (assuming county boundaries table)
SELECT 
  c.county_name,
  COUNT(s.id) as site_count,
  SUM(sb.area_hectares) as total_hectares,
  ST_Union(sb.geometry) as combined_geometry
FROM counties c
LEFT JOIN site_boundaries sb ON ST_Within(sb.geometry, c.geometry)
LEFT JOIN restoration_sites s ON sb.site_id = s.id
GROUP BY c.county_name, c.geometry;
```

**4. Overlap Detection**
```sql
-- Find sites that overlap (potential duplicates)
SELECT 
  a.id as site_a_id,
  b.id as site_b_id,
  ST_Area(ST_Intersection(a.geometry, b.geometry)::geography) / 10000 as overlap_hectares
FROM site_boundaries a
JOIN site_boundaries b ON a.id < b.id  -- Avoid self-join and duplicates
WHERE ST_Overlaps(a.geometry, b.geometry);
```

**5. Buffer Zone Analysis**
```sql
-- Create 1km buffer around sites (for riparian corridors)
SELECT 
  s.id,
  s.name,
  ST_AsGeoJSON(
    ST_Buffer(sb.geometry::geography, 1000)::geometry
  ) as buffer_zone
FROM restoration_sites s
JOIN site_boundaries sb ON s.id = sb.site_id;
```

## County-Level Rollups

### Materialized View Strategy

```sql
CREATE MATERIALIZED VIEW county_impact_summary AS
SELECT 
  county,
  COUNT(DISTINCT s.id) as site_count,
  SUM(sb.area_hectares) as total_hectares,
  SUM(m.trees_planted) as total_trees_planted,
  AVG(m.survival_rate) as avg_survival_rate,
  SUM(m.co2_sequestered_tonnes) as total_co2,
  SUM(m.jobs_created) as total_jobs,
  ST_Union(sb.geometry) as combined_boundary
FROM restoration_sites s
JOIN site_boundaries sb ON s.id = sb.site_id
JOIN site_metrics m ON s.id = m.site_id
WHERE s.deleted_at IS NULL
  AND s.status != 'CANCELLED'
GROUP BY county;

-- Spatial index on aggregated geometry
CREATE INDEX idx_county_summary_geom ON county_impact_summary USING GIST(combined_boundary);

-- Refresh strategy
REFRESH MATERIALIZED VIEW CONCURRENTLY county_impact_summary;
```

**Refresh Schedule**:
- Daily at 3 AM (off-peak hours)
- On-demand via API endpoint (admin only)
- Triggered by background job after bulk imports

**API Endpoint**:
```http
GET /api/v1/impact/by-county

Response:
{
  "counties": [
    {
      "name": "Kilifi",
      "siteCount": 8,
      "totalHectares": 980.3,
      "metrics": {
        "treesPlanted": 125000,
        "avgSurvivalRate": 75.2,
        "totalCO2": 450.7,
        "jobs": 48
      },
      "boundary": {GeoJSON Polygon}
    }
  ]
}
```

## Performance Strategies for Large Geometries

### Simplification

**Topology-Preserving Simplification**:
```sql
-- Simplify based on zoom level
CREATE OR REPLACE FUNCTION get_simplified_geometry(
  geom GEOMETRY,
  zoom INTEGER
) RETURNS GEOMETRY AS $$
BEGIN
  RETURN CASE
    WHEN zoom <= 8 THEN ST_SimplifyPreserveTopology(geom, 0.01)   -- ~1km tolerance
    WHEN zoom <= 10 THEN ST_SimplifyPreserveTopology(geom, 0.001)  -- ~100m
    WHEN zoom <= 12 THEN ST_SimplifyPreserveTopology(geom, 0.0001) -- ~10m
    ELSE geom  -- Full resolution at high zoom
  END;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Use in API
SELECT 
  s.id,
  ST_AsGeoJSON(
    get_simplified_geometry(sb.geometry, $zoom)
  ) as boundary
FROM restoration_sites s
JOIN site_boundaries sb ON s.id = sb.site_id;
```

### Clustering

**Server-Side Clustering (PostGIS)**:
```sql
-- K-means clustering of site centroids
WITH clustered AS (
  SELECT 
    s.id,
    ST_ClusterKMeans(sb.centroid, 20) OVER() as cluster_id,
    sb.centroid,
    s.name
  FROM restoration_sites s
  JOIN site_boundaries sb ON s.id = sb.site_id
  WHERE ST_Intersects(sb.centroid, $viewport_bbox)
)
SELECT 
  cluster_id,
  COUNT(*) as site_count,
  ST_AsGeoJSON(ST_Centroid(ST_Collect(centroid))) as cluster_center,
  jsonb_agg(jsonb_build_object('id', id, 'name', name)) as sites
FROM clustered
GROUP BY cluster_id;
```

**Client-Side Clustering (Mapbox GL)**:
```typescript
map.addSource('sites', {
  type: 'geojson',
  data: sitesGeoJSON,
  cluster: true,
  clusterMaxZoom: 10,
  clusterRadius: 50,
  clusterProperties: {
    // Aggregate metrics within clusters
    totalTrees: ['+', ['get', 'treesPlanted']],
    avgSurvival: ['/', ['+', ['get', 'survivalRate']], ['get', 'siteCount']],
  },
});

map.addLayer({
  id: 'clusters',
  type: 'circle',
  source: 'sites',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': [
      'step',
      ['get', 'point_count'],
      '#51bbd6', 10,
      '#f1f075', 50,
      '#f28cb1',
    ],
    'circle-radius': [
      'step',
      ['get', 'point_count'],
      20, 10,
      30, 50,
      40,
    ],
  },
});
```

### Vector Tiles

**Generate MVT (Mapbox Vector Tiles)**:
```sql
-- PostGIS function to generate vector tiles
CREATE OR REPLACE FUNCTION get_mvt_tile(
  z INTEGER,
  x INTEGER,
  y INTEGER
) RETURNS BYTEA AS $$
DECLARE
  tile_bbox GEOMETRY;
BEGIN
  -- Get tile bounding box in Web Mercator
  tile_bbox := TileBBox(z, x, y, 3857);
  
  RETURN (
    SELECT ST_AsMVT(q, 'sites', 4096, 'geom')
    FROM (
      SELECT 
        s.id,
        s.name,
        s.restoration_type,
        m.trees_planted,
        m.survival_rate,
        ST_AsMVTGeom(
          ST_Transform(sb.geometry, 3857),
          tile_bbox,
          4096,
          10,  -- Buffer
          true  -- Clip geometries
        ) as geom
      FROM restoration_sites s
      JOIN site_boundaries sb ON s.id = sb.site_id
      JOIN site_metrics m ON s.id = m.site_id
      WHERE ST_Intersects(sb.geometry, ST_Transform(tile_bbox, 4326))
    ) q
  );
END;
$$ LANGUAGE plpgsql STABLE;

-- Serve via pg_tileserv or custom endpoint
-- GET /tiles/{z}/{x}/{y}.pbf
```

**Frontend Consumption**:
```typescript
map.addSource('sites-vector', {
  type: 'vector',
  tiles: ['https://api.restoration.earth/tiles/{z}/{x}/{y}.pbf'],
  minzoom: 6,
  maxzoom: 14,
});

map.addLayer({
  id: 'sites-fill',
  type: 'fill',
  source: 'sites-vector',
  'source-layer': 'sites',
  paint: {
    'fill-color': '#2E7D32',
    'fill-opacity': 0.5,
  },
});
```

### Caching Strategy

**Multi-Tier Caching**:

1. **CDN (CloudFront)**: Cache static vector tiles (30-day TTL)
2. **Redis**: Cache API responses (5-minute TTL)
3. **PostGIS**: Materialized views (daily refresh)

```typescript
// Backend: Caching middleware
@Get('/sites')
@UseInterceptors(CacheInterceptor)
@CacheTTL(300)  // 5 minutes
async findAll(@Query() filters: SiteFilters) {
  const cacheKey = `sites:${JSON.stringify(filters)}`;
  
  // Check Redis
  const cached = await this.cacheManager.get(cacheKey);
  if (cached) return cached;
  
  // Query database
  const sites = await this.sitesService.findAll(filters);
  
  // Store in Redis
  await this.cacheManager.set(cacheKey, sites, 300);
  
  return sites;
}
```

---

# 8️⃣ SECURITY ARCHITECTURE

## Authentication

### JWT Token Structure

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user-uuid",
    "email": "user@example.com",
    "role": "EDITOR",
    "organizationId": "org-uuid",
    "iat": 1640995200,
    "exp": 1640996100  // 15 minutes expiration
  },
  "signature": "..."
}
```

### Token Lifecycle

```typescript
// auth.service.ts
export class AuthService {
  async login(email: string, password: string) {
    // 1. Validate credentials
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // 2. Generate tokens
    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId,
      },
      { expiresIn: '15m' }
    );
    
    const refreshToken = this.jwtService.sign(
      { sub: user.id, type: 'refresh' },
      { expiresIn: '7d' }
    );
    
    // 3. Store refresh token hash in database
    await this.storeRefreshToken(user.id, refreshToken);
    
    // 4. Update last login
    await this.usersService.update(user.id, {
      lastLoginAt: new Date(),
    });
    
    return { accessToken, refreshToken };
  }
  
  async refreshAccessToken(refreshToken: string) {
    // 1. Verify refresh token
    const payload = this.jwtService.verify(refreshToken);
    
    // 2. Check if token exists in database (not revoked)
    const storedToken = await this.getStoredRefreshToken(payload.sub);
    if (!storedToken || storedToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    
    // 3. Generate new access token
    const user = await this.usersService.findById(payload.sub);
    const newAccessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
    }, { expiresIn: '15m' });
    
    return { accessToken: newAccessToken };
  }
  
  async logout(userId: string) {
    // Revoke refresh tokens
    await this.revokeAllRefreshTokens(userId);
  }
}
```

### Password Security

```typescript
// users.service.ts
export class UsersService {
  async createUser(dto: CreateUserDto) {
    // Hash password with bcrypt (cost factor 12)
    const passwordHash = await bcrypt.hash(dto.password, 12);
    
    return this.usersRepo.save({
      ...dto,
      passwordHash,
      password: undefined,  // Never store plaintext
    });
  }
  
  validatePasswordStrength(password: string) {
    const minLength = 12;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (password.length < minLength) {
      throw new BadRequestException('Password must be at least 12 characters');
    }
    if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
      throw new BadRequestException(
        'Password must contain uppercase, lowercase, number, and special character'
      );
    }
  }
}
```

## Authorization (RBAC)

### Role Definitions

```typescript
enum Role {
  VIEWER = 'VIEWER',      // Read-only access to sites within organization
  EDITOR = 'EDITOR',      // Create/update sites, upload data
  ADMIN = 'ADMIN',        // Full control, manage users, delete sites
  SUPER_ADMIN = 'SUPER_ADMIN',  // Cross-organization access (internal only)
}

// Permission matrix
const PERMISSIONS = {
  VIEWER: ['sites:read', 'metrics:read', 'reports:read'],
  EDITOR: [...VIEWER, 'sites:create', 'sites:update', 'data:upload'],
  ADMIN: [...EDITOR, 'sites:delete', 'users:manage', 'org:settings'],
  SUPER_ADMIN: ['*'],  // All permissions
};
```

### Guard Implementation

```typescript
// guards/roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) return true;
    
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}

// Usage
@Controller('sites')
export class SitesController {
  @Get()
  @Roles(Role.VIEWER, Role.EDITOR, Role.ADMIN)
  async findAll() { ... }
  
  @Post()
  @Roles(Role.EDITOR, Role.ADMIN)
  async create() { ... }
  
  @Delete(':id')
  @Roles(Role.ADMIN)
  async delete() { ... }
}
```

### Organization-Level Isolation

```typescript
// interceptors/organization.interceptor.ts
@Injectable()
export class OrganizationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    // Automatically add organization filter to all queries
    if (user.role !== Role.SUPER_ADMIN) {
      request.query.organizationId = user.organizationId;
    }
    
    return next.handle();
  }
}

// Repository method
async findAll(filters: SiteFilters, user: User) {
  const query = this.sitesRepo
    .createQueryBuilder('site')
    .where('site.organizationId = :orgId', { orgId: user.organizationId });
  
  // Apply additional filters...
  return query.getMany();
}
```

## API Protection

### Rate Limiting

```typescript
// guards/throttle.guard.ts
@Injectable()
export class ThrottleGuard extends ThrottlerGuard {
  protected async getTracker(req: Request): Promise<string> {
    // Use user ID if authenticated, IP otherwise
    return req.user?.id || req.ip;
  }
  
  protected errorMessage = 'Rate limit exceeded. Please try again later.';
}

// main.ts
app.useGlobalGuards(new ThrottleGuard({
  ttl: 60,      // 1 minute window
  limit: 100,   // 100 requests per window
}));

// Per-endpoint overrides
@Controller('reports')
export class ReportsController {
  @Post('generate')
  @Throttle(5, 60)  // 5 PDF generations per minute
  async generateReport() { ... }
}
```

### CORS Configuration

```typescript
// main.ts
app.enableCors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://app.restoration.earth',
      'https://staging.restoration.earth',
      process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null,
    ].filter(Boolean);
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

## Input Validation

### DTO Validation

```typescript
// dto/create-site.dto.ts
export class CreateSiteDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name: string;
  
  @IsEnum(RestorationType)
  restorationType: RestorationType;
  
  @IsInt()
  @Min(1990)
  @Max(new Date().getFullYear())
  restorationYear: number;
  
  @IsObject()
  @ValidateNested()
  @Type(() => GeoJSONPolygonDto)
  boundary: GeoJSONPolygonDto;
}

// Custom validator for GeoJSON
export class GeoJSONPolygonDto {
  @Equals('Polygon')
  type: string;
  
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  coordinates: number[][][];
  
  @Validate(ValidGeoJSONConstraint)
  _valid: boolean;  // Custom validation
}

// validators/valid-geojson.validator.ts
@ValidatorConstraint({ name: 'validGeoJSON', async: false })
export class ValidGeoJSONConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const geojson = args.object;
    
    // Check if coordinates form a closed ring
    const firstPoint = geojson.coordinates[0][0];
    const lastPoint = geojson.coordinates[0][geojson.coordinates[0].length - 1];
    if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
      return false;
    }
    
    // Check coordinate bounds (Kenya: 33.9°E to 41.9°E, 5.0°S to 4.6°N)
    for (const ring of geojson.coordinates) {
      for (const [lon, lat] of ring) {
        if (lon < 33.9 || lon > 41.9 || lat < -5.0 || lat > 4.6) {
          return false;  // Outside Kenya bounds
        }
      }
    }
    
    return true;
  }
  
  defaultMessage(args: ValidationArguments) {
    return 'Invalid GeoJSON geometry';
  }
}
```

### SQL Injection Prevention

```typescript
// NEVER do this:
const sites = await db.query(
  `SELECT * FROM sites WHERE name = '${userInput}'`  // VULNERABLE!
);

// ALWAYS use parameterized queries:
const sites = await this.sitesRepo
  .createQueryBuilder('site')
  .where('site.name = :name', { name: userInput })
  .getMany();

// Or with raw queries (rare cases):
const sites = await db.query(
  'SELECT * FROM sites WHERE name = $1',
  [userInput]  // Parameterized
);
```

## Secure Headers

```typescript
// main.ts
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.restoration.earth'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
      connectSrc: ["'self'", 'https://api.restoration.earth', 'https://services.sentinel-hub.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000,  // 1 year
    includeSubDomains: true,
    preload: true,
  },
  frameguard: { action: 'deny' },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
}));

// Additional headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Permissions-Policy', 'geolocation=(self), microphone=()');
  next();
});
```

## Data Integrity Validation

### Geometry Validation

```typescript
// services/geometry-validation.service.ts
@Injectable()
export class GeometryValidationService {
  async validateGeometry(geojson: GeoJSONPolygon): Promise<ValidationResult> {
    const errors: string[] = [];
    
    // 1. PostGIS validation
    const isValid = await this.db.query(
      `SELECT ST_IsValid(ST_GeomFromGeoJSON($1)) as valid`,
      [JSON.stringify(geojson)]
    );
    
    if (!isValid.rows[0].valid) {
      const reason = await this.db.query(
        `SELECT ST_IsValidReason(ST_GeomFromGeoJSON($1)) as reason`,
        [JSON.stringify(geojson)]
      );
      errors.push(`Invalid geometry: ${reason.rows[0].reason}`);
    }
    
    // 2. Area constraints (0.1 - 100,000 hectares)
    const area = await this.db.query(
      `SELECT ST_Area(ST_GeomFromGeoJSON($1)::geography) / 10000 as area_hectares`,
      [JSON.stringify(geojson)]
    );
    
    const areaHectares = area.rows[0].area_hectares;
    if (areaHectares < 0.1 || areaHectares > 100000) {
      errors.push(`Area must be between 0.1 and 100,000 hectares (got ${areaHectares.toFixed(2)})`);
    }
    
    // 3. Self-intersection check
    const hasIntersection = await this.db.query(
      `SELECT NOT ST_IsSimple(ST_GeomFromGeoJSON($1)) as has_intersection`,
      [JSON.stringify(geojson)]
    );
    
    if (hasIntersection.rows[0].has_intersection) {
      errors.push('Geometry contains self-intersections');
    }
    
    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
```

### Metrics Validation

```typescript
// dto/update-metrics.dto.ts
export class UpdateMetricsDto {
  @IsInt()
  @Min(0)
  @Max(10000000)
  treesPlanted?: number;
  
  @IsNumber()
  @Min(0)
  @Max(100)
  survivalRate?: number;
  
  @IsNumber()
  @Min(0)
  @ValidateIf((o) => o.co2SequesteredTonnes !== null)
  @Max(1000000)
  co2SequesteredTonnes?: number;
  
  // Custom validation: CO2 must be realistic based on trees
  @Validate(RealisticCO2Constraint)
  _validCO2: boolean;
}

@ValidatorConstraint()
export class RealisticCO2Constraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const dto = args.object as UpdateMetricsDto;
    
    // Rough estimate: 1 tree sequesters ~20kg CO2/year
    // With 80% survival, max CO2 = trees * 0.8 * 0.02 tonnes * 10 years
    const maxCO2 = dto.treesPlanted * 0.8 * 0.02 * 10;
    
    return dto.co2SequesteredTonnes <= maxCO2;
  }
  
  defaultMessage() {
    return 'CO2 sequestration value is unrealistically high for number of trees planted';
  }
}
```

## Audit Logging

```typescript
// interceptors/audit-log.interceptor.ts
@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(private auditService: AuditLogService) {}
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { user, method, url, body } = request;
    
    // Only log write operations
    if (!['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
      return next.handle();
    }
    
    const before = Date.now();
    
    return next.handle().pipe(
      tap((response) => {
        const after = Date.now();
        
        this.auditService.log({
          userId: user?.id,
          organizationId: user?.organizationId,
          action: this.getActionFromMethod(method),
          entityType: this.getEntityTypeFromUrl(url),
          entityId: response?.id,
          changes: { before: null, after: body },  // Simplified
          ipAddress: request.ip,
          userAgent: request.headers['user-agent'],
          duration: after - before,
        });
      })
    );
  }
}
```

---

# 9️⃣ SCALABILITY & PERFORMANCE

## Handling Thousands of Polygons

### Database Optimizations

**1. Viewport-Based Querying**
```sql
-- Only fetch polygons in visible area
SELECT s.id, s.name, ST_AsGeoJSON(sb.geometry) as boundary
FROM restoration_sites s
JOIN site_boundaries sb ON s.id = sb.site_id
WHERE ST_Intersects(sb.geometry, ST_MakeEnvelope($1, $2, $3, $4, 4326));

-- Index usage: GIST index scan (~10ms for 10,000 sites)
EXPLAIN ANALYZE shows:
  Bitmap Heap Scan on site_boundaries  (actual time=2.45..8.32 rows=47)
    Recheck Cond: (geometry && ST_MakeEnvelope(...))
    ->  Bitmap Index Scan on idx_boundaries_geom  (actual time=2.21..2.21 rows=47)
```

**2. Geometry Simplification**
```sql
-- Create simplified versions at different zoom levels
CREATE TABLE site_boundaries_simplified AS
SELECT 
  site_id,
  ST_SimplifyPreserveTopology(geometry, 0.001) as geometry_z10,
  ST_SimplifyPreserveTopology(geometry, 0.0001) as geometry_z12,
  geometry as geometry_full
FROM site_boundaries;

-- Query based on zoom
SELECT 
  CASE 
    WHEN $zoom <= 10 THEN ST_AsGeoJSON(geometry_z10)
    WHEN $zoom <= 12 THEN ST_AsGeoJSON(geometry_z12)
    ELSE ST_AsGeoJSON(geometry_full)
  END as boundary
FROM site_boundaries_simplified
WHERE site_id = $1;
```

**3. Pagination**
```typescript
// API endpoint with cursor-based pagination
@Get('/sites')
async findAll(@Query() query: PaginationQuery) {
  const { cursor, limit = 50 } = query;
  
  const qb = this.sitesRepo
    .createQueryBuilder('site')
    .orderBy('site.createdAt', 'DESC')
    .limit(limit + 1);  // Fetch one extra to check if hasNext
  
  if (cursor) {
    qb.where('site.createdAt < :cursor', { 
      cursor: new Date(cursor) 
    });
  }
  
  const sites = await qb.getMany();
  const hasNext = sites.length > limit;
  
  return {
    data: sites.slice(0, limit),
    meta: {
      hasNext,
      nextCursor: hasNext ? sites[limit - 1].createdAt.toISOString() : null,
    },
  };
}
```

### Frontend Optimizations

**1. Virtual Scrolling (Site List)**
```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

function SitesList({ sites }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: sites.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 10,
  });
  
  return (
    <div ref={parentRef} className="h-screen overflow-auto">
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <SiteListItem site={sites[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

**2. Map Clustering**
```typescript
// Mapbox GL clustering config
map.addSource('sites', {
  type: 'geojson',
  data: sitesGeoJSON,
  cluster: true,
  clusterMaxZoom: 10,  // Decluster at zoom 11+
  clusterRadius: 50,
  clusterProperties: {
    siteCount: ['+', 1],
    totalTrees: ['+', ['get', 'treesPlanted']],
  },
});

// Cluster layer
map.addLayer({
  id: 'clusters',
  type: 'circle',
  source: 'sites',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': [
      'step',
      ['get', 'point_count'],
      '#51bbd6', 10,
      '#f1f075', 50,
      '#f28cb1',
    ],
    'circle-radius': [
      'step',
      ['get', 'point_count'],
      20, 10,
      30, 50,
      40,
    ],
  },
});

// Cluster count label
map.addLayer({
  id: 'cluster-count',
  type: 'symbol',
  source: 'sites',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12,
  },
});
```

## Caching Strategy

### Multi-Tier Caching

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                      │
│  Cache: In-memory (TanStack Query), IndexedDB (offline)│
│  TTL: 5 minutes (sites list), 10 minutes (site details)│
└─────────────────────────┬───────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    CDN (CloudFront)                      │
│  Cache: Static assets, vector tiles, imagery tiles      │
│  TTL: 24 hours (static), 1 hour (tiles), immutable=true│
└─────────────────────────┬───────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    REDIS (ElastiCache)                   │
│  Cache: API responses, session data, rate limit counters│
│  TTL: 5 minutes (API), 15 minutes (sessions)           │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────────┐
│               DATABASE (PostgreSQL + PostGIS)            │
│  Cache: Query cache (PgBouncer), result cache          │
└─────────────────────────────────────────────────────────┘
```

### Redis Implementation

```typescript
// cache.service.ts
@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  
  async get<T>(key: string): Promise<T | null> {
    return this.cacheManager.get(key);
  }
  
  async set(key: string, value: any, ttl: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }
  
  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
  
  async invalidatePattern(pattern: string): Promise<void> {
    // Redis SCAN with pattern matching
    const keys = await this.cacheManager.store.keys(pattern);
    await Promise.all(keys.map(key => this.del(key)));
  }
}

// Usage in controller
@Get('/sites')
async findAll(@Query() filters: SiteFilters) {
  const cacheKey = `sites:${JSON.stringify(filters)}`;
  
  const cached = await this.cacheService.get(cacheKey);
  if (cached) {
    return { data: cached, source: 'cache' };
  }
  
  const sites = await this.sitesService.findAll(filters);
  await this.cacheService.set(cacheKey, sites, 300);  // 5 minutes
  
  return { data: sites, source: 'database' };
}

// Cache invalidation on writes
@Post('/sites')
async create(@Body() dto: CreateSiteDto) {
  const site = await this.sitesService.create(dto);
  
  // Invalidate all sites list caches
  await this.cacheService.invalidatePattern('sites:*');
  
  return site;
}

```

### CDN Configuration

```typescript
// AWS CloudFront distribution config
const distribution = new cloudfront.Distribution(this, 'CDN', {
  defaultBehavior: {
    origin: new origins.S3Origin(bucket),
    viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    cachePolicy: new cloudfront.CachePolicy(this, 'StaticCachePolicy', {
      cachePolicyName: 'StaticAssets',
      defaultTtl: Duration.hours(24),
      maxTtl: Duration.days(365),
      minTtl: Duration.seconds(0),
      headerBehavior: cloudfront.CacheHeaderBehavior.allowList('Accept-Encoding'),
      queryStringBehavior: cloudfront.CacheQueryStringBehavior.none(),
    }),
  },
  
  additionalBehaviors: {
    '/tiles/*': {
      origin: new origins.S3Origin(tilesBucket),
      cachePolicy: new cloudfront.CachePolicy(this, 'TilesCachePolicy', {
        cachePolicyName: 'SatelliteTiles',
        defaultTtl: Duration.hours(1),
        maxTtl: Duration.days(30),
        queryStringBehavior: cloudfront.CacheQueryStringBehavior.all(),
      }),
    },
    '/api/*': {
      origin: new origins.HttpOrigin('api.restoration.earth'),
      cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,  // API responses not cached at CDN
    },
  },
});
```

## Query Optimization

### Index Analysis

```sql
-- Find missing indexes (queries doing sequential scans)
SELECT 
  schemaname,
  tablename,
  attname,
  n_distinct,
  correlation
FROM pg_stats
WHERE schemaname = 'public'
  AND n_distinct > 100
  AND correlation < 0.1
ORDER BY n_distinct DESC;

-- Unused indexes (zero scans in 30 days)
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  pg_size_pretty(pg_relation_size(indexrelid)) as index_size
FROM pg_stat_user_indexes
WHERE idx_scan = 0
  AND schemaname = 'public'
ORDER BY pg_relation_size(indexrelid) DESC;

-- Index bloat detection
SELECT 
  schemaname,
  tablename,
  indexname,
  pg_size_pretty(pg_relation_size(indexrelid)) as index_size,
  round(100 * pg_relation_size(indexrelid) / pg_relation_size(indrelid)) as bloat_ratio
FROM pg_stat_user_indexes
WHERE pg_relation_size(indexrelid) > 10000000;  -- Indexes > 10MB
```

### Query Planning

```sql
-- Analyze expensive queries
EXPLAIN (ANALYZE, BUFFERS, VERBOSE) 
SELECT 
  s.id,
  s.name,
  ST_AsGeoJSON(sb.geometry) as boundary,
  m.trees_planted,
  m.survival_rate
FROM restoration_sites s
JOIN site_boundaries sb ON s.id = sb.site_id
JOIN site_metrics m ON s.id = m.site_id
WHERE s.organization_id = 'org-uuid'
  AND s.restoration_year = 2023
  AND ST_Intersects(sb.geometry, ST_MakeEnvelope(36, -1, 37, 0, 4326));

-- Expected plan:
--   Nested Loop  (cost=0.42..1234.56 rows=47 width=256)
--     ->  Bitmap Heap Scan on site_boundaries sb
--           Recheck Cond: (geometry && ST_MakeEnvelope(...))
--           ->  Bitmap Index Scan on idx_boundaries_geom
--     ->  Index Scan using sites_pkey on restoration_sites s
--           Filter: (organization_id = 'org-uuid' AND restoration_year = 2023)
```

### Connection Pooling

```typescript
// Database connection pooling (PgBouncer or TypeORM)
const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  poolSize: 20,  // Max connections
  extra: {
    max: 20,
    min: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    // Statement timeout to prevent long-running queries
    statement_timeout: 10000,  // 10 seconds
  },
});

// Monitor pool health
setInterval(async () => {
  const pool = dataSource.driver.pool;
  console.log({
    totalCount: pool.totalCount,
    idleCount: pool.idleCount,
    waitingCount: pool.waitingCount,
  });
}, 60000);  // Every minute
```

## Horizontal Scaling Strategy

### Stateless API Design

```typescript
// ❌ BAD: Storing state in memory
class SitesController {
  private userSessions = new Map();  // Lost when container restarts!
  
  @Get()
  async findAll(@Req() req: Request) {
    const session = this.userSessions.get(req.user.id);
    // ...
  }
}

// ✅ GOOD: Stateless, store sessions in Redis
class SitesController {
  constructor(private sessionService: SessionService) {}
  
  @Get()
  async findAll(@Req() req: Request) {
    const session = await this.sessionService.get(req.user.id);  // From Redis
    // ...
  }
}
```

### Load Balancing

```yaml
# AWS ECS Service with Application Load Balancer
Resources:
  ALB:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Type: application
      Subnets: [subnet-1, subnet-2, subnet-3]
      SecurityGroups: [sg-alb]
  
  TargetGroup:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      TargetType: ip
      Port: 8000
      Protocol: HTTP
      HealthCheckPath: /health
      HealthCheckIntervalSeconds: 30
      HealthCheckTimeoutSeconds: 5
      HealthyThresholdCount: 2
      UnhealthyThresholdCount: 3
      Matcher:
        HttpCode: 200
  
  ECSService:
    Type: AWS::ECS::Service
    Properties:
      Cluster: !Ref ECSCluster
      TaskDefinition: !Ref TaskDefinition
      DesiredCount: 3
      LaunchType: FARGATE
      LoadBalancers:
        - ContainerName: api
          ContainerPort: 8000
          TargetGroupArn: !Ref TargetGroup
```

### Auto-Scaling Policies

```yaml
# ECS Auto Scaling
AutoScalingTarget:
  Type: AWS::ApplicationAutoScaling::ScalableTarget
  Properties:
    MaxCapacity: 10
    MinCapacity: 2
    ResourceId: !Sub service/${ECSCluster}/${ECSService.Name}
    RoleARN: !GetAtt AutoScalingRole.Arn
    ScalableDimension: ecs:service:DesiredCount
    ServiceNamespace: ecs

# Scale up when CPU > 70%
ScaleUpPolicy:
  Type: AWS::ApplicationAutoScaling::ScalingPolicy
  Properties:
    PolicyName: ScaleUpPolicy
    PolicyType: TargetTrackingScaling
    ScalingTargetId: !Ref AutoScalingTarget
    TargetTrackingScalingPolicyConfiguration:
      PredefinedMetricSpecification:
        PredefinedMetricType: ECSServiceAverageCPUUtilization
      TargetValue: 70.0
      ScaleInCooldown: 300
      ScaleOutCooldown: 60

# Scale based on request count
RequestCountScaling:
  Type: AWS::ApplicationAutoScaling::ScalingPolicy
  Properties:
    PolicyName: RequestCountScaling
    PolicyType: TargetTrackingScaling
    ScalingTargetId: !Ref AutoScalingTarget
    TargetTrackingScalingPolicyConfiguration:
      PredefinedMetricSpecification:
        PredefinedMetricType: ALBRequestCountPerTarget
      ResourceLabel: !GetAtt TargetGroup.TargetGroupFullName
      TargetValue: 1000.0  # 1000 requests per target
```

## Monitoring and Logging

### Prometheus Metrics

```typescript
// metrics.service.ts
import { Counter, Histogram, Registry } from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly registry: Registry;
  private readonly httpRequestDuration: Histogram;
  private readonly httpRequestTotal: Counter;
  private readonly dbQueryDuration: Histogram;
  
  constructor() {
    this.registry = new Registry();
    
    this.httpRequestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
      registers: [this.registry],
    });
    
    this.httpRequestTotal = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code'],
      registers: [this.registry],
    });
    
    this.dbQueryDuration = new Histogram({
      name: 'db_query_duration_seconds',
      help: 'Duration of database queries',
      labelNames: ['query_type'],
      buckets: [0.001, 0.01, 0.1, 0.5, 1],
      registers: [this.registry],
    });
  }
  
  recordHttpRequest(method: string, route: string, statusCode: number, duration: number) {
    this.httpRequestDuration.observe({ method, route, status_code: statusCode }, duration);
    this.httpRequestTotal.inc({ method, route, status_code: statusCode });
  }
  
  recordDbQuery(queryType: string, duration: number) {
    this.dbQueryDuration.observe({ query_type: queryType }, duration);
  }
  
  async getMetrics(): Promise<string> {
    return this.registry.metrics();
  }
}

// Middleware to track requests
@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private metricsService: MetricsService) {}
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const start = Date.now();
    
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const duration = (Date.now() - start) / 1000;
        
        this.metricsService.recordHttpRequest(
          request.method,
          request.route.path,
          response.statusCode,
          duration
        );
      })
    );
  }
}
```

### Structured Logging

```typescript
// logger.service.ts
import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  defaultMeta: {
    service: 'restoration-api',
    environment: process.env.NODE_ENV,
    version: process.env.APP_VERSION,
  },
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message, ...meta }) => {
          return `${timestamp} [${level}]: ${message} ${JSON.stringify(meta)}`;
        })
      ),
    }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Usage
logger.info('Site created', {
  siteId: 'uuid',
  organizationId: 'org-uuid',
  userId: 'user-uuid',
  duration: 145,
});

logger.error('Database connection failed', {
  error: error.message,
  stack: error.stack,
  host: dbConfig.host,
});
```

### Grafana Dashboards

```json
{
  "dashboard": {
    "title": "Restoration API Metrics",
    "panels": [
      {
        "title": "Request Rate",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} {{route}}"
          }
        ]
      },
      {
        "title": "Response Time (p95)",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "{{route}}"
          }
        ]
      },
      {
        "title": "Error Rate",
        "targets": [
          {
            "expr": "rate(http_requests_total{status_code=~\"5..\"}[5m])",
            "legendFormat": "5xx Errors"
          }
        ]
      },
      {
        "title": "Database Query Duration",
        "targets": [
          {
            "expr": "histogram_quantile(0.99, rate(db_query_duration_seconds_bucket[5m]))",
            "legendFormat": "p99 {{query_type}}"
          }
        ]
      }
    ]
  }
}
```

---

# 🔟 DEVOPS & DEPLOYMENT

## Docker Setup

### Multi-Stage Dockerfile

```dockerfile
# Frontend Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build production bundle
ENV NODE_ENV=production
RUN npm run build

# Production image
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

```dockerfile
# Backend Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

# Build TypeScript
RUN npm run build

# Production image
FROM node:20-alpine

WORKDIR /app

# Copy dependencies and built code
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

EXPOSE 8000

CMD ["node", "dist/main.js"]
```

### Docker Compose (Development)

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      target: development
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - VITE_API_URL=http://localhost:8000/api/v1
    depends_on:
      - api

  api:
    build:
      context: ./backend
      target: development
    ports:
      - "8000:8000"
      - "9229:9229"  # Debugger
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/restoration_db
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=dev-secret-change-in-production
    depends_on:
      - postgres
      - redis

  worker:
    build:
      context: ./backend
      target: development
    command: npm run worker
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/restoration_db
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgis/postgis:15-3.3
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
    environment:
      - POSTGRES_DB=restoration_db
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redisdata:/data

  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    volumes:
      - grafana_data:/var/lib/grafana
      - ./monitoring/grafana/dashboards:/etc/grafana/provisioning/dashboards
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin

volumes:
  pgdata:
  redisdata:
  prometheus_data:
  grafana_data:
```

## Environment Configuration

```typescript
// config/configuration.ts
export default () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'restoration_db',
    ssl: process.env.DB_SSL === 'true',
  },
  
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD,
    ttl: parseInt(process.env.REDIS_TTL, 10) || 300,
  },
  
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  
  aws: {
    region: process.env.AWS_REGION || 'af-south-1',
    s3: {
      bucket: process.env.S3_BUCKET,
      uploadsBucket: process.env.S3_UPLOADS_BUCKET,
      tilesBucket: process.env.S3_TILES_BUCKET,
    },
  },
  
  sentinelHub: {
    clientId: process.env.SENTINEL_HUB_CLIENT_ID,
    clientSecret: process.env.SENTINEL_HUB_CLIENT_SECRET,
    instanceId: process.env.SENTINEL_HUB_INSTANCE_ID,
  },
  
  sentry: {
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
  },
});
```

## CI/CD Pipeline

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, staging, develop]
  pull_request:
    branches: [main]

env:
  AWS_REGION: af-south-1
  ECR_REPOSITORY_API: restoration-api
  ECR_REPOSITORY_FRONTEND: restoration-frontend

jobs:
  # 1. Lint and Test
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgis/postgis:15-3.3
        env:
          POSTGRES_PASSWORD: password
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
      
      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: |
            frontend/package-lock.json
            backend/package-lock.json
      
      - name: Install dependencies
        run: |
          cd frontend && npm ci
          cd ../backend && npm ci
      
      - name: Lint
        run: |
          cd frontend && npm run lint
          cd ../backend && npm run lint
      
      - name: Run tests
        env:
          DATABASE_URL: postgresql://postgres:password@localhost:5432/test_db
          REDIS_URL: redis://localhost:6379
        run: |
          cd frontend && npm test -- --coverage
          cd ../backend && npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./frontend/coverage/lcov.info,./backend/coverage/lcov.info

  # 2. Build Docker images
  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name == 'push'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1
      
      - name: Build and push API image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY_API:$IMAGE_TAG backend/
          docker tag $ECR_REGISTRY/$ECR_REPOSITORY_API:$IMAGE_TAG $ECR_REGISTRY/$ECR_REPOSITORY_API:latest
          docker push $ECR_REGISTRY/$ECR_REPOSITORY_API:$IMAGE_TAG
          docker push $ECR_REGISTRY/$ECR_REPOSITORY_API:latest
      
      - name: Build and push Frontend image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY_FRONTEND:$IMAGE_TAG frontend/
          docker tag $ECR_REGISTRY/$ECR_REPOSITORY_FRONTEND:$IMAGE_TAG $ECR_REGISTRY/$ECR_REPOSITORY_FRONTEND:latest
          docker push $ECR_REGISTRY/$ECR_REPOSITORY_FRONTEND:$IMAGE_TAG
          docker push $ECR_REGISTRY/$ECR_REPOSITORY_FRONTEND:latest

  # 3. Deploy to staging
  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/staging'
    environment: staging
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      
      - name: Deploy to ECS
        run: |
          aws ecs update-service \
            --cluster restoration-staging-cluster \
            --service api-service \
            --force-new-deployment
          
          aws ecs update-service \
            --cluster restoration-staging-cluster \
            --service frontend-service \
            --force-new-deployment
      
      - name: Wait for deployment
        run: |
          aws ecs wait services-stable \
            --cluster restoration-staging-cluster \
            --services api-service frontend-service

  # 4. Deploy to production
  deploy-production:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      
      - name: Run database migrations
        run: |
          # SSH into migration runner or use ECS task
          aws ecs run-task \
            --cluster restoration-prod-cluster \
            --task-definition migration-runner \
            --launch-type FARGATE \
            --network-configuration "awsvpcConfiguration={subnets=[subnet-1],securityGroups=[sg-1]}"
      
      - name: Deploy to ECS (Blue/Green)
        run: |
          aws deploy create-deployment \
            --application-name restoration-app \
            --deployment-group-name production \
            --deployment-config-name CodeDeployDefault.ECSAllAtOnce \
            --description "Deploy ${{ github.sha }}"
      
      - name: Notify Slack
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: 'Production deployment completed'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## Production Deployment Strategy

### Blue/Green Deployment

```yaml
# AWS CodeDeploy AppSpec
version: 0.0
Resources:
  - TargetService:
      Type: AWS::ECS::Service
      Properties:
        TaskDefinition: <TASK_DEFINITION>
        LoadBalancerInfo:
          ContainerName: "api"
          ContainerPort: 8000
        PlatformVersion: "LATEST"

Hooks:
  - BeforeInstall: "LambdaFunctionToValidateBeforeInstall"
  - AfterInstall: "LambdaFunctionToValidateAfterInstall"
  - AfterAllowTestTraffic: "LambdaFunctionToValidateAfterTestTrafficStarts"
  - BeforeAllowTraffic: "LambdaFunctionToValidateBeforeAllowingProductionTraffic"
  - AfterAllowTraffic: "LambdaFunctionToValidateAfterAllowingProductionTraffic"
```

**Deployment Flow**:
1. New task definition created with updated image
2. New tasks (green) started alongside old tasks (blue)
3. Test traffic routed to green tasks (10%)
4. Health checks and smoke tests run
5. If pass: Gradually shift 100% traffic to green
6. If fail: Roll back to blue immediately
7. Old tasks terminated after successful deployment

### Database Migration Strategy

```typescript
// migrations/1640000000000-AddSitePhotos.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSitePhotos1640000000000 implements MigrationInterface {
  name = 'AddSitePhotos1640000000000';
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Backward compatible: Add nullable column first
    await queryRunner.query(`
      ALTER TABLE restoration_sites
      ADD COLUMN site_photos TEXT[]
    `);
    
    // Backfill existing data
    await queryRunner.query(`
      UPDATE restoration_sites
      SET site_photos = ARRAY[]::TEXT[]
      WHERE site_photos IS NULL
    `);
    
    // Make non-nullable after backfill
    await queryRunner.query(`
      ALTER TABLE restoration_sites
      ALTER COLUMN site_photos SET NOT NULL
    `);
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE restoration_sites
      DROP COLUMN site_photos
    `);
  }
}

// Run migrations in ECS task before deployment
// docker run --rm restoration-api npm run migration:run
```

## Observability Tools

### Health Check Endpoint

```typescript
// health.controller.ts
@Controller('health')
export class HealthController {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly redisService: RedisService,
  ) {}
  
  @Get()
  async check(): Promise<HealthCheckResult> {
    const checks = await Promise.allSettled([
      this.checkDatabase(),
      this.checkRedis(),
      this.checkExternalAPIs(),
    ]);
    
    const status = checks.every(c => c.status === 'fulfilled' && c.value.healthy)
      ? 'healthy'
      : 'unhealthy';
    
    return {
      status,
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION,
      checks: {
        database: checks[0].status === 'fulfilled' ? checks[0].value : { healthy: false },
        redis: checks[1].status === 'fulfilled' ? checks[1].value : { healthy: false },
        externalAPIs: checks[2].status === 'fulfilled' ? checks[2].value : { healthy: false },
      },
    };
  }
  
  private async checkDatabase(): Promise<{ healthy: boolean; latency: number }> {
    const start = Date.now();
    try {
      await this.dbService.query('SELECT 1');
      return { healthy: true, latency: Date.now() - start };
    } catch (error) {
      return { healthy: false, latency: Date.now() - start };
    }
  }
  
  private async checkRedis(): Promise<{ healthy: boolean; latency: number }> {
    const start = Date.now();
    try {
      await this.redisService.ping();
      return { healthy: true, latency: Date.now() - start };
    } catch (error) {
      return { healthy: false, latency: Date.now() - start };
    }
  }
}
```

### Alerting Rules

```yaml
# prometheus/alerts.yml
groups:
  - name: restoration_api
    interval: 30s
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status_code=~"5.."}[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value | humanizePercentage }}"
      
      - alert: HighResponseTime
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 2
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High response time (p95 > 2s)"
      
      - alert: DatabaseConnectionsExhausted
        expr: pg_stat_activity_count > 18
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Database connection pool near limit"
      
      - alert: DiskSpaceRunningOut
        expr: node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"} < 0.1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Disk space < 10%"
```

---

# 1️⃣1️⃣ TESTING STRATEGY

## Unit Tests

```typescript
// sites.service.spec.ts
describe('SitesService', () => {
  let service: SitesService;
  let repository: MockType<Repository<Site>>;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SitesService,
        {
          provide: getRepositoryToken(Site),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    
    service = module.get<SitesService>(SitesService);
    repository = module.get(getRepositoryToken(Site));
  });
  
  describe('findAll', () => {
    it('should return paginated sites', async () => {
      const mockSites = [
        { id: '1', name: 'Site 1', restorationYear: 2023 },
        { id: '2', name: 'Site 2', restorationYear: 2024 },
      ];
      
      repository.find.mockResolvedValue(mockSites);
      repository.count.mockResolvedValue(2);
      
      const result = await service.findAll({ page: 1, pageSize: 10 });
      
      expect(result.data).toEqual(mockSites);
      expect(result.meta.total).toBe(2);
      expect(repository.find).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 0,
          take: 10,
        })
      );
    });
    
    it('should filter by restoration year', async () => {
      await service.findAll({ year: 2023 });
      
      expect(repository.find).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ restorationYear: 2023 }),
        })
      );
    });
  });
  
  describe('create', () => {
    it('should validate geometry before creating site', async () => {
      const invalidDto = {
        name: 'Test Site',
        boundary: { type: 'Polygon', coordinates: [[]] },  // Invalid
      };
      
      await expect(service.create(invalidDto)).rejects.toThrow(BadRequestException);
    });
    
    it('should create site and compute derived fields', async () => {
      const dto: CreateSiteDto = {
        name: 'Test Site',
        restorationType: RestorationType.MANGROVE,
        restorationYear: 2024,
        boundary: validGeoJSONPolygon,
      };
      
      const mockSite = { ...dto, id: 'uuid', areaHectares: 117.5 };
      repository.save.mockResolvedValue(mockSite);
      
      const result = await service.create(dto);
      
      expect(result.id).toBeDefined();
      expect(result.areaHectares).toBeCloseTo(117.5);
    });
  });
});
```

## Integration Tests

```typescript
// sites.e2e.spec.ts
describe('Sites API (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    
    app = moduleFixture.createNestApplication();
    await app.init();
    
    // Login and get token
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' });
    
    authToken = loginResponse.body.accessToken;
  });
  
  afterAll(async () => {
    await app.close();
  });
  
  describe('GET /sites', () => {
    it('should return 401 without auth token', () => {
      return request(app.getHttpServer())
        .get('/api/v1/sites')
        .expect(401);
    });
    
    it('should return paginated sites', () => {
      return request(app.getHttpServer())
        .get('/api/v1/sites?page=1&pageSize=20')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeInstanceOf(Array);
          expect(res.body.meta).toHaveProperty('total');
          expect(res.body.meta).toHaveProperty('page', 1);
        });
    });
    
    it('should filter sites by year', () => {
      return request(app.getHttpServer())
        .get('/api/v1/sites?year=2023')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          res.body.data.forEach((site) => {
            expect(site.restorationYear).toBe(2023);
          });
        });
    });
  });
  
  describe('POST /sites', () => {
    it('should create a new site', () => {
      const newSite = {
        name: 'E2E Test Site',
        restorationType: 'MANGROVE',
        restorationYear: 2024,
        county: 'Kilifi',
        boundary: validGeoJSONPolygon,
      };
      
      return request(app.getHttpServer())
        .post('/api/v1/sites')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newSite)
        .expect(201)
        .expect((res) => {
          expect(res.body.id).toBeDefined();
          expect(res.body.name).toBe(newSite.name);
        });
    });
    
    it('should reject invalid GeoJSON', () => {
      const invalidSite = {
        name: 'Invalid Site',
        boundary: { type: 'Polygon', coordinates: [[[]]] },
      };
      
      return request(app.getHttpServer())
        .post('/api/v1/sites')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidSite)
        .expect(400)
        .expect((res) => {
          expect(res.body.error).toBe('VALIDATION_ERROR');
        });
    });
  });
});
```

## API Tests (Postman/Newman)

```json
{
  "info": {
    "name": "Restoration API Tests",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Login",
          "event": [
            {
              "listen": "test",
              "script": {
                "exec": [
                  "pm.test('Status code is 200', () => {",
                  "  pm.response.to.have.status(200);",
                  "});",
                  "",
                  "pm.test('Response has access token', () => {",
                  "  const jsonData = pm.response.json();",
                  "  pm.expect(jsonData).to.have.property('accessToken');",
                  "  pm.environment.set('authToken', jsonData.accessToken);",
                  "});"
                ]
              }
            }
          ],
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/auth/login",
            "body": {
              "mode": "raw",
              "raw": "{\"email\": \"test@example.com\", \"password\": \"password\"}"
            }
          }
        }
      ]
    },
    {
      "name": "Sites",
      "item": [
        {
          "name": "Get All Sites",
          "event": [
            {
              "listen": "test",
              "script": {
                "exec": [
                  "pm.test('Status code is 200', () => {",
                  "  pm.response.to.have.status(200);",
                  "});",
                  "",
                  "pm.test('Response time < 500ms', () => {",
                  "  pm.expect(pm.response.responseTime).to.be.below(500);",
                  "});",
                  "",
                  "pm.test('Response has pagination meta', () => {",
                  "  const jsonData = pm.response.json();",
                  "  pm.expect(jsonData.meta).to.have.all.keys('total', 'page', 'pageSize', 'totalPages');",
                  "});"
                ]
              }
            }
          ],
          "request": {
            "method": "GET",
            "url": "{{baseUrl}}/sites",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{authToken}}"
              }
            ]
          }
        }
      ]
    }
  ]
}
```

## End-to-End Testing (Playwright)

```typescript
// e2e/sites-workflow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Sites Workflow', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });
  
  test('should create a new site', async ({ page }) => {
    // Navigate to sites page
    await page.click('text=Sites');
    await expect(page).toHaveURL('/sites');
    
    // Click create button
    await page.click('button:has-text("Create Site")');
    
    // Fill form
    await page.fill('[name="name"]', 'Playwright Test Site');
    await page.selectOption('[name="restorationType"]', 'MANGROVE');
    await page.fill('[name="restorationYear"]', '2024');
    await page.fill('[name="county"]', 'Kilifi');
    
    // Draw polygon on map (simplified)
    const map = await page.locator('.mapboxgl-canvas');
    await map.click({ position: { x: 100, y: 100 } });
    await map.click({ position: { x: 200, y: 100 } });
    await map.click({ position: { x: 200, y: 200 } });
    await map.click({ position: { x: 100, y: 200 } });
    await map.click({ position: { x: 100, y: 100 } });  // Close polygon
    
    // Submit form
    await page.click('button:has-text("Create")');
    
    // Verify success
    await expect(page.locator('.toast')).toHaveText(/Site created successfully/);
    await expect(page.locator('text=Playwright Test Site')).toBeVisible();
  });
  
  test('should filter sites by year', async ({ page }) => {
    await page.goto('/sites');
    
    // Apply year filter
    await page.selectOption('[name="year"]', '2023');
    
    // Wait for results
    await page.waitForResponse((response) => 
      response.url().includes('/api/v1/sites?year=2023')
    );
    
    // Verify all visible sites are from 2023
    const siteCards = await page.locator('.site-card');
    const count = await siteCards.count();
    
    for (let i = 0; i < count; i++) {
      const year = await siteCards.nth(i).locator('.restoration-year').textContent();
      expect(year).toContain('2023');
    }
  });
  
  test('should display site details on click', async ({ page }) => {
    await page.goto('/sites');
    
    // Click first site polygon
    const canvas = await page.locator('.mapboxgl-canvas');
    await canvas.click({ position: { x: 300, y: 300 } });
    
    // Wait for side panel
    await expect(page.locator('.site-details-panel')).toBeVisible();
    
    // Verify metrics are displayed
    await expect(page.locator('text=Trees Planted')).toBeVisible();
    await expect(page.locator('text=Survival Rate')).toBeVisible();
    await expect(page.locator('text=CO2 Sequestered')).toBeVisible();
  });
});
```

## Performance Testing

```javascript
// k6/load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '2m', target: 100 },  // Ramp up to 100 users
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '2m', target: 200 },  // Spike to 200 users
    { duration: '5m', target: 200 },  // Stay at 200 users
    { duration: '2m', target: 0 },    // Ramp down to 0 users
  ],
  thresholds: {
    'http_req_duration': ['p(95)<500', 'p(99)<1000'],  // 95% < 500ms, 99% < 1s
    'http_req_failed': ['rate<0.01'],  // Error rate < 1%
    'errors': ['rate<0.05'],  // Custom error rate < 5%
  },
};

const BASE_URL = 'https://api.restoration.earth';
let authToken;

export function setup() {
  // Login once
  const res = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
    email: 'loadtest@example.com',
    password: 'password',
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
  
  return { authToken: res.json('accessToken') };
}

export default function (data) {
  const headers = {
    'Authorization': `Bearer ${data.authToken}`,
    'Content-Type': 'application/json',
  };
  
  // 1. Get sites list (70% of traffic)
  if (Math.random() < 0.7) {
    const res = http.get(`${BASE_URL}/api/v1/sites?page=1&pageSize=50`, { headers });
    
    check(res, {
      'status is 200': (r) => r.status === 200,
      'response time < 500ms': (r) => r.timings.duration < 500,
      'has data': (r) => r.json('data').length > 0,
    }) || errorRate.add(1);
  }
  
  // 2. Get site details (20% of traffic)
  else if (Math.random() < 0.9) {
    const siteId = 'random-site-uuid';  // In real test, pick from list
    const res = http.get(`${BASE_URL}/api/v1/sites/${siteId}`, { headers });
    
    check(res, {
      'status is 200': (r) => r.status === 200,
      'has metrics': (r) => r.json('metrics') !== undefined,
    }) || errorRate.add(1);
  }
  
  // 3. Create site (10% of traffic)
  else {
    const payload = JSON.stringify({
      name: `Load Test Site ${Date.now()}`,
      restorationType: 'MANGROVE',
      restorationYear: 2024,
      county: 'Kilifi',
      boundary: validGeoJSONPolygon,
    });
    
    const res = http.post(`${BASE_URL}/api/v1/sites`, payload, { headers });
    
    check(res, {
      'status is 201': (r) => r.status === 201,
      'created site has ID': (r) => r.json('id') !== undefined,
    }) || errorRate.add(1);
  }
  
  sleep(1);  // Think time between requests
}
```

## Geospatial Edge Cases

```typescript
// geometry-validation.spec.ts
describe('Geometry Validation Edge Cases', () => {
  it('should reject self-intersecting polygons', async () => {
    const selfIntersecting = {
      type: 'Polygon',
      coordinates: [
        [
          [36.0, 0.0],
          [37.0, 0.0],
          [37.0, 1.0],
          [36.5, -0.5],  // Creates self-intersection
          [36.0, 0.0],
        ],
      ],
    };
    
    await expect(service.validateGeometry(selfIntersecting))
      .rejects.toThrow('Geometry contains self-intersections');
  });
  
  it('should reject polygons with holes (not supported)', async () => {
    const withHole = {
      type: 'Polygon',
      coordinates: [
        [[36.0, 0.0], [37.0, 0.0], [37.0, 1.0], [36.0, 1.0], [36.0, 0.0]],
        [[36.2, 0.2], [36.8, 0.2], [36.8, 0.8], [36.2, 0.8], [36.2, 0.2]],  // Hole
      ],
    };
    
    await expect(service.validateGeometry(withHole))
      .rejects.toThrow('Polygons with holes are not supported');
  });
  
  it('should handle antimeridian crossing', async () => {
    const crossingAntimeridian = {
      type: 'Polygon',
      coordinates: [
        [[179.0, 0.0], [-179.0, 0.0], [-179.0, 1.0], [179.0, 1.0], [179.0, 0.0]],
      ],
    };
    
    // Should split into two polygons or handle specially
    const result = await service.normalizeGeometry(crossingAntimeridian);
    expect(result.type).toBe('MultiPolygon');
  });
  
  it('should reject polygons outside Kenya bounds', async () => {
    const outsideKenya = {
      type: 'Polygon',
      coordinates: [
        [[0.0, 0.0], [1.0, 0.0], [1.0, 1.0], [0.0, 1.0], [0.0, 0.0]],  // Atlantic Ocean
      ],
    };
    
    await expect(service.validateGeometry(outsideKenya))
      .rejects.toThrow('Geometry outside Kenya bounds');
  });
  
  it('should handle very large polygons gracefully', async () => {
    const veryLarge = {
      type: 'Polygon',
      coordinates: [
        [
          [33.9, -5.0],  // Southwest Kenya
          [41.9, -5.0],  // Southeast Kenya
          [41.9, 4.6],   // Northeast Kenya
          [33.9, 4.6],   // Northwest Kenya
          [33.9, -5.0],
        ],
      ],
    };
    
    const result = await service.validateGeometry(veryLarge);
    expect(result.areaHectares).toBeGreaterThan(50000000);  // ~500,000 km²
    expect(result.warnings).toContain('Polygon covers entire country - is this correct?');
  });
});
```

---

# 1️⃣2️⃣ ROADMAP

## Phase 1: MVP (Months 1-3)

**Goal**: Launch functional platform for 5 beta partner NGOs

### Features
- ✅ User authentication (email/password)
- ✅ Site management (CRUD operations)
- ✅ GeoJSON upload/export
- ✅ Interactive map with Mapbox GL
- ✅ Basic metrics dashboard (trees, survival rate, CO2)
- ✅ Satellite imagery overlay (Sentinel-2 RGB, NDVI)
- ✅ Filtering by year, type, county, status
- ✅ Time-series charts for NDVI
- ✅ PDF report generation
- ✅ Mobile-responsive UI

### Infrastructure
- AWS ECS Fargate deployment
- PostgreSQL + PostGIS (RDS)
- Redis caching (ElastiCache)
- S3 for file storage
- CloudFront CDN
- GitHub Actions CI/CD

### Success Criteria
- 5 NGOs onboarded with 20+ sites
- <3 second page load time
- 99% uptime
- User satisfaction score >7/10

---

## Phase 2: Advanced Analytics (Months 4-6)

**Goal**: Enhance decision-making with deeper insights

### Features
- **Advanced Visualizations**
  - Heatmaps (survival rate, biodiversity density)
  - 3D terrain view with Mapbox GL Terrain
  - Before/after image slider
  - Animated time-lapse (NDVI greening over years)

- **Predictive Analytics**
  - ML model to predict survival rate based on soil, rainfall, elevation
  - Optimal planting season recommendations
  - Carbon sequestration projections

- **Biodiversity Module**
  - GBIF integration for species observations
  - Biodiversity index calculation (Shannon, Simpson)
  - Endemic/threatened species tracking
  - Camera trap photo upload

- **Collaboration Features**
  - Multi-user editing (conflict resolution)
  - Comments/notes on sites
  - Activity feed (who changed what, when)
  - Email notifications for site updates

- **Data Quality**
  - Confidence scoring for metrics
  - Anomaly detection (flag suspicious values)
  - Field data validation rules

### Infrastructure
- Machine learning pipeline (AWS SageMaker or self-hosted TensorFlow)
- WebSocket server for real-time updates
- Elasticsearch for full-text search

### Success Criteria
- 15+ NGOs using platform
- 10,000+ sites tracked
- Predictive models with >80% accuracy
- Average session duration >10 minutes

---

## Phase 3: AI-Driven Insights (Months 7-12)

**Goal**: Automate analysis and provide proactive recommendations

### Features
- **Automated Site Monitoring**
  - Weekly satellite analysis (detect changes, deforestation)
  - Automated alerts (low survival rate, pest outbreak)
  - Recommendation engine (where to intervene)

- **Natural Language Queries**
  - "Show me all sites with declining NDVI in last 6 months"
  - "Which sites need urgent attention?"
  - Chat interface powered by LLM

- **Computer Vision**
  - Automated tree counting from drone imagery
  - Species identification from camera trap photos
  - Damage assessment after wildfires/floods

- **Impact Forecasting**
  - 10-year carbon sequestration projections
  - Ecosystem service valuation ($$$ value of restoration)
  - Climate resilience scoring

- **Advanced Reporting**
  - Customizable dashboard widgets
  - Scheduled email reports (weekly/monthly)
  - Comparison with national/global benchmarks

### Infrastructure
- GPU instances for ML inference
- Vector database for embeddings (ChromaDB, Pinecone)
- Serverless functions for batch processing
- Data lake (S3 + Athena for historical analysis)

### Success Criteria
- 30+ NGOs, 50,000+ sites
- 80% of alerts actionable
- $500K+ carbon credits tracked
- Featured in 2+ academic publications

---

## Phase 4: Multi-Country Expansion (Year 2+)

**Goal**: Scale platform to East Africa and beyond

### Features
- **Geographic Expansion**
  - Support for Uganda, Tanzania, Ethiopia, Rwanda
  - Multi-country dashboard
  - Cross-border ecosystem tracking (e.g., Mara-Serengeti)

- **Advanced Satellite Products**
  - Sentinel-1 SAR (all-weather monitoring)
  - LiDAR for biomass estimation
  - High-resolution imagery (Planet Labs <5m)
  - Hyperspectral analysis (species composition)

- **Carbon Credit Integration**
  - Verified Carbon Standard (VCS) project tracking
  - Automatic MRV (Monitoring, Reporting, Verification)
  - Blockchain-based carbon credit registry
  - Marketplace for buyers/sellers

- **Community Engagement**
  - Mobile app for field teams (offline-first)
  - Gamification (leaderboards, badges)
  - Community science (citizen data collection)
  - Local language support (Swahili, Amharic, etc.)

- **Policy Tools**
  - National restoration progress tracker
  - Alignment with Bonn Challenge, AFR100
  - SDG reporting (SDG 13, 15)
  - Integration with national forest inventories

### Infrastructure
- Multi-region deployment (Africa, Europe, US)
- Data residency compliance (GDPR, local laws)
- Federated data architecture
- Edge computing for offline capabilities

### Success Criteria
- 100+ organizations across 5+ countries
- 500,000+ hectares tracked
- $5M+ carbon credits transacted
- Partnership with UN Environment Programme or World Bank

---

# 1️⃣3️⃣ BONUS

## Data Sourcing Strategy for Kenya

### Restoration Sites
**Primary Sources**:
1. **Kenya Forest Service (KFS)**
   - Official records of gazetted forests
   - Community Forest Association (CFA) sites
   - Contact: conservator@kenyaforest.org

2. **Partner NGOs**
   - Green Belt Movement: greenbeltmovement.org
   - Wildlife Works: wildlifeworks.com
   - Mikoko Pamoja: mikokopamojaKenya.org
   - The Nature Conservancy Kenya

3. **Government Programs**
   - NEMA (National Environment Management Authority) EIA reports
   - County Environment Offices

### Satellite Data
**Free Sources**:
- **Sentinel-2**: 10m resolution RGB, NDVI (ESA Copernicus)
  - API: Sentinel Hub, Google Earth Engine
  - Update frequency: 5 days
- **Landsat 8/9**: 30m resolution (NASA/USGS)
  - Historical archive back to 1984
- **MODIS**: 250m resolution, daily (Terra/Aqua satellites)

**Commercial (if budget allows)**:
- **Planet Labs**: 3-5m resolution, daily revisit ($1000-5000/month)
- **Maxar**: <1m resolution for specific areas

### Biodiversity Data
- **GBIF (Global Biodiversity Information Facility)**: gbif.org
  - 2.3M+ species occurrence records for Kenya
  - Free API access
- **eBird Kenya**: ebird.org/region/KE
  - Crowdsourced bird observations
- **Kenya Wildlife Service**: kws.go.ke
  - Official wildlife census data (request via data sharing agreement)

### Climate/Environmental Data
- **CHIRPS**: Rainfall data (5km resolution)
- **WorldClim**: Temperature, precipitation historical averages
- **Soil Grids**: Global soil property maps (250m)
- **Elevation**: SRTM (30m), ASTER GDEM (30m)

---

## Limitations of Satellite-Derived Impact Metrics

### 1. NDVI Limitations
**What it measures**: Greenness (chlorophyll absorption)  
**What it doesn't measure**:
- **Species composition**: High NDVI could be invasive species or monoculture
- **Tree age/maturity**: Young plantation vs old-growth forest look similar
- **Understory vegetation**: Satellite sees canopy, not ground layer
- **Non-photosynthetic biomass**: Dead wood, soil carbon

**Mitigation**:
- Combine with field surveys for ground truth
- Use additional indices (NDMI for water stress, EVI for biomass)
- Stratify by ecosystem type

### 2. Carbon Sequestration Uncertainty
**Challenges**:
- **Allometric equations**: Generic formulas may not fit local species
- **Soil carbon**: Not visible from space, requires soil samples
- **Temporal lag**: Trees sequester carbon over decades, satellite shows instant snapshot
- **Disturbances**: Fire, logging, disease reset carbon accumulation

**Best Practices**:
- Use conservative estimates (IPCC Tier 1 defaults)
- Validate with biomass plots every 3-5 years
- Account for leakage and permanence in carbon calculations

### 3. Cloud Cover
**Problem**: Tropical regions have 60-80% cloud cover during rainy season  
**Solutions**:
- SAR (Sentinel-1) penetrates clouds but has lower resolution
- Time-series compositing (cloud-free pixels over 3 months)
- Optical + SAR fusion

### 4. Resolution Constraints
**Sentinel-2**: 10m pixels  
- Can detect patches >0.1 ha but not individual trees
- Small restoration sites (<1 ha) may be missed

**Workarounds**:
- Use Planet Labs (3m) for small sites
- Drone imagery for tree-level detail
- Accept limitation and focus on landscape-scale change

### 5. Attribution Challenges
**Questions**:
- Is greening due to restoration or natural regeneration?
- Did rainfall increase cause NDVI increase, not planting?
- How to separate restoration impact from regional trends?

**Approaches**:
- Control sites (similar areas without intervention)
- Before-After-Control-Impact (BACI) study design
- Statistical modeling to control for confounders

---

## Future Google Earth Engine Integration Architecture

### Why GEE?
- **Planetary-scale analysis**: Entire Sentinel/Landsat archive (petabytes)
- **No download required**: Process in cloud
- **JavaScript/Python API**: Easy integration
- **Free for non-commercial**: Perfect for NGOs

### Architecture Design

```
┌─────────────────────────────────────────────────────────┐
│                 FRONTEND (React)                        │
│  User draws polygon or selects site                     │
└────────────────┬────────────────────────────────────────┘
                 │
                 ↓ POST /api/v1/analytics/ndvi
┌─────────────────────────────────────────────────────────┐
│                BACKEND (NestJS)                          │
│  1. Receive site polygon (GeoJSON)                      │
│  2. Queue background job (Bull)                          │
│  3. Return 202 Accepted                                  │
└────────────────┬────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────────────┐
│            WORKER SERVICE (Python)                       │
│  Google Earth Engine Script:                            │
│                                                          │
│  import ee                                               │
│  ee.Initialize(credentials=service_account_key)          │
│                                                          │
│  # Define area of interest                              │
│  aoi = ee.Geometry.Polygon(site_polygon_coords)          │
│                                                          │
│  # Get Sentinel-2 collection                            │
│  collection = ee.ImageCollection('COPERNICUS/S2_SR') \   │
│    .filterBounds(aoi) \                                  │
│    .filterDate('2023-01-01', '2024-01-01') \            │
│    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)) │
│                                                          │
│  # Compute NDVI for each image                          │
│  def add_ndvi(image):                                    │
│    ndvi = image.normalizedDifference(['B8', 'B4'])       │
│    return image.addBands(ndvi.rename('NDVI'))            │
│                                                          │
│  ndvi_collection = collection.map(add_ndvi)              │
│                                                          │
│  # Extract time series                                  │
│  def get_ndvi_stats(image):                              │
│    stats = image.select('NDVI').reduceRegion(            │
│      reducer=ee.Reducer.mean(),                          │
│      geometry=aoi,                                       │
│      scale=10                                            │
│    )                                                     │
│    return ee.Feature(None, {                             │
│      'date': image.date().format('YYYY-MM-dd'),          │
│      'ndvi_mean': stats.get('NDVI')                      │
│    })                                                    │
│                                                          │
│  time_series = ndvi_collection.map(get_ndvi_stats)       │
│  results = time_series.getInfo()                         │
│                                                          │
│  # Store in database                                     │
│  for point in results['features']:                       │
│    db.insert('metric_timeseries', {                      │
│      'site_id': site_id,                                 │
│      'metric_name': 'ndvi_mean',                         │
│      'metric_value': point['properties']['ndvi_mean'],   │
│      'measurement_date': point['properties']['date'],    │
│      'data_source': 'SATELLITE'                          │
│    })                                                    │
└─────────────────────────────────────────────────────────┘
```

### Authentication
```python
# GEE Service Account (server-side)
import ee
from google.oauth2 import service_account

credentials = service_account.Credentials.from_service_account_file(
  'path/to/service-account-key.json',
  scopes=['https://www.googleapis.com/auth/earthengine']
)

ee.Initialize(credentials)
```

### Rate Limits and Quotas
- **Compute**: 10,000 concurrent tasks per project
- **Storage**: 250 GB free
- **API calls**: Generous limits (thousands per day)

**Optimization**:
- Cache results in database
- Batch process multiple sites
- Use `ee.batch.Export` for large analyses

### Example Advanced Analysis

```python
# Detect deforestation using Hansen Global Forest Change
def detect_forest_loss(aoi, start_year=2020, end_year=2023):
    hansen = ee.Image('UMD/hansen/global_forest_change_2023_v1_11')
    
    # Forest cover in 2000
    tree_cover_2000 = hansen.select('treecover2000')
    
    # Loss year
    loss_year = hansen.select('lossyear')
    
    # Mask to AOI and year range
    loss_in_period = loss_year.gte(start_year - 2000).And(
      loss_year.lte(end_year - 2000)
    ).clip(aoi)
    
    # Compute area
    loss_area = loss_in_period.multiply(ee.Image.pixelArea()).reduceRegion(
      reducer=ee.Reducer.sum(),
      geometry=aoi,
      scale=30,
      maxPixels=1e9
    )
    
    return loss_area.getInfo()['lossyear'] / 10000  # Convert to hectares
```

---

This completes the comprehensive technical specification document for the Kenya Ecosystem Restoration Impact Tracker. The document provides production-grade architecture, implementation details, and a clear roadmap for building a scalable geospatial platform aligned with modern software engineering best practices.