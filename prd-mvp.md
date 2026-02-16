# Kenya Restoration Sites Tracker - MVP PRD
## 48-Hour Interview Project with Real Data Integration

---

## 🎯 Executive Summary

**Project Goal**: Build a production-quality geospatial web application demonstrating React + TypeScript + mapping expertise for Green.Earth interview.

**Core Value Proposition**: Interactive map visualizing real Kenya restoration sites with satellite imagery, biodiversity data, and environmental metrics.

**Timeline**: 48 hours
**Target Audience**: Green.Earth technical interviewers
**Success Metric**: Demonstrate job-required skills through working MVP

---

## 📋 Product Requirements

### Must-Have Features (Critical Path)

#### 1. Interactive Map Dashboard
**User Story**: As a user, I want to see restoration sites on an interactive map so I can explore environmental projects across Kenya.

**Acceptance Criteria**:
- ✅ Map centered on Kenya (bounds: 33.9°E to 41.9°E, 5.0°S to 4.6°N)
- ✅ 8-12 site polygons rendered from real data sources
- ✅ Color-coded by restoration type (Mangrove=green, Forest=dark green, Dryland=orange)
- ✅ Smooth pan/zoom interactions
- ✅ Hover effect on polygons (cursor change + opacity)
- ✅ Click polygon → opens detail panel
- ✅ Loads in <3 seconds on 4G connection

#### 2. Satellite Imagery Toggle
**User Story**: As a user, I want to toggle satellite view so I can see actual ground conditions.

**Acceptance Criteria**:
- ✅ Button to switch between map/satellite styles
- ✅ Uses Mapbox satellite-streets layer
- ✅ Maintains zoom/center when switching
- ✅ Visual indicator of active mode

#### 3. Site Details Panel
**User Story**: As a user, I want to see site metrics when clicking a polygon so I can understand restoration impact.

**Acceptance Criteria**:
- ✅ Slides in from right on polygon click
- ✅ Displays:
  - Site name
  - Restoration type badge
  - Area (hectares)
  - Species count (from GBIF API)
  - Total observations (from GBIF API)
  - Estimated trees planted
  - Estimated CO₂ sequestered
- ✅ Close button returns to map view
- ✅ Mobile responsive (full-screen on mobile)

#### 4. Real Data Integration
**User Story**: As a developer evaluating candidate, I want to see real API integrations so I can assess production coding skills.

**Acceptance Criteria**:
- ✅ OpenStreetMap Overpass API for site polygons
- ✅ GBIF API for biodiversity data
- ✅ Mapbox GL for satellite imagery
- ✅ Error handling with fallback to mock data
- ✅ Loading states during API calls
- ✅ Caching to prevent rate limiting

### Nice-to-Have Features (Time Permitting)

#### 5. Filter by Restoration Type
- Dropdown to filter sites (Mangrove, Forest, Dryland, All)
- Updates map polygons dynamically

#### 6. Search Bar
- Search sites by name
- Auto-complete suggestions
- Zoom to selected site

#### 7. Site Statistics Overview
- Summary cards: Total Sites, Total Hectares, Total Species
- Updates based on active filters

---

## 🏗️ Technical Architecture

### Technology Stack

**Frontend Framework**:
- React 18.2+ with TypeScript 5+
- Vite 5 (build tool)
- React Context API (state management)

**Mapping Library**:
- Mapbox GL JS 3.0+
- @types/mapbox-gl for TypeScript

**Styling**:
- Tailwind CSS 3.4+
- PostCSS for processing

**Data Sources**:
- OpenStreetMap Overpass API (protected areas)
- GBIF API (biodiversity)
- Mapbox Satellite (imagery)

**Utilities**:
- @turf/turf (geospatial calculations)
- date-fns (date formatting)

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    BROWSER (Client)                      │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │           React Application (Vite)              │    │
│  │                                                  │    │
│  │  ┌──────────────┐  ┌──────────────┐           │    │
│  │  │  MapView     │  │ SitePanel    │           │    │
│  │  │  Component   │  │ Component    │           │    │
│  │  └──────┬───────┘  └──────┬───────┘           │    │
│  │         │                  │                    │    │
│  │         └──────────┬───────┘                    │    │
│  │                    │                            │    │
│  │         ┌──────────▼───────────┐               │    │
│  │         │   MapContext (State) │               │    │
│  │         └──────────┬───────────┘               │    │
│  │                    │                            │    │
│  │         ┌──────────▼───────────┐               │    │
│  │         │    API Service       │               │    │
│  │         └──────────┬───────────┘               │    │
│  └────────────────────┼────────────────────────────┘    │
└───────────────────────┼─────────────────────────────────┘
                        │
            ┌───────────┼───────────┐
            │           │           │
            ▼           ▼           ▼
    ┌───────────┐ ┌──────────┐ ┌──────────┐
    │ Mapbox    │ │   OSM    │ │  GBIF    │
    │ Satellite │ │Overpass  │ │   API    │
    │   API     │ │   API    │ │          │
    └───────────┘ └──────────┘ └──────────┘
```

### Folder Structure

```
kenya-restoration-tracker/
├── public/
│   └── logo.svg
│
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.tsx
│   │   │   └── LoadingScreen.tsx
│   │   │
│   │   ├── Map/
│   │   │   ├── MapView.tsx           # Main map component
│   │   │   ├── SatelliteToggle.tsx   # Layer switcher
│   │   │   └── MapControls.tsx       # Zoom, reset controls
│   │   │
│   │   └── SiteDetails/
│   │       ├── SitePanel.tsx         # Details drawer
│   │       ├── MetricCard.tsx        # Individual metric display
│   │       └── BiodiversitySection.tsx
│   │
│   ├── context/
│   │   └── MapContext.tsx            # Global state management
│   │
│   ├── services/
│   │   ├── api.service.ts            # API orchestration
│   │   ├── osm.service.ts            # OpenStreetMap integration
│   │   ├── gbif.service.ts           # GBIF integration
│   │   └── cache.service.ts          # LocalStorage caching
│   │
│   ├── types/
│   │   ├── index.ts                  # Shared TypeScript types
│   │   └── geojson.types.ts          # GeoJSON interfaces
│   │
│   ├── utils/
│   │   ├── geojson.utils.ts          # GeoJSON transformations
│   │   ├── calculations.ts           # Area, CO2 estimates
│   │   └── formatters.ts             # Number/date formatting
│   │
│   ├── data/
│   │   └── mockSites.ts              # Fallback data
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .env.example
├── .env.local
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## 🔌 API Integration Specifications

### 1. OpenStreetMap Overpass API

**Purpose**: Fetch real protected area polygons in Kenya

**Endpoint**: `https://overpass-api.de/api/interpreter`

**Authentication**: None required

**Request Example**:
```typescript
const query = `
  [out:json][timeout:25];
  area["ISO3166-1"="KE"]->.searchArea;
  (
    way["boundary"="protected_area"]["name"](area.searchArea);
    relation["boundary"="protected_area"]["name"](area.searchArea);
  );
  out geom;
`;

const response = await fetch('https://overpass-api.de/api/interpreter', {
  method: 'POST',
  body: `data=${encodeURIComponent(query)}`
});
```

**Response Format**:
```json
{
  "elements": [
    {
      "type": "way",
      "id": 123456,
      "tags": {
        "name": "Arabuko Sokoke Forest Reserve",
        "boundary": "protected_area",
        "protect_class": "4"
      },
      "geometry": [
        {"lat": -3.3, "lon": 39.9},
        {"lat": -3.3, "lon": 40.0},
        {"lat": -3.2, "lon": 40.0},
        {"lat": -3.2, "lon": 39.9},
        {"lat": -3.3, "lon": 39.9}
      ]
    }
  ]
}
```

**Rate Limits**: ~10,000 requests/day, timeout after 180 seconds

**Error Handling**:
- Timeout → Use cached data
- 429 Too Many Requests → Use mock data
- Network error → Fallback to mock data

### 2. GBIF API (Biodiversity Data)

**Purpose**: Get real species observation counts

**Endpoint**: `https://api.gbif.org/v1/occurrence/search`

**Authentication**: None required

**Request Example**:
```typescript
const [minLng, minLat, maxLng, maxLat] = bbox(polygon);

const response = await fetch(
  `https://api.gbif.org/v1/occurrence/search?` +
  `country=KE&` +
  `decimalLatitude=${minLat},${maxLat}&` +
  `decimalLongitude=${minLng},${maxLng}&` +
  `limit=100`
);
```

**Response Format**:
```json
{
  "offset": 0,
  "limit": 100,
  "count": 1234,
  "results": [
    {
      "key": 3456789,
      "scientificName": "Rhizophora mucronata",
      "species": "Rhizophora mucronata",
      "decimalLatitude": -3.98,
      "decimalLongitude": 39.73,
      "eventDate": "2023-05-15"
    }
  ]
}
```

**Rate Limits**: Very generous, no hard limit documented

**Processing**:
```typescript
const uniqueSpecies = new Set(results.map(r => r.species)).size;
const totalObservations = data.count;
```

### 3. Mapbox Satellite API

**Purpose**: Satellite imagery basemap

**Endpoint**: Configured via Mapbox GL JS style URL

**Authentication**: API token (free tier: 50,000 loads/month)

**Setup**:
```typescript
// Sign up at mapbox.com
// Copy token to .env.local
VITE_MAPBOX_TOKEN=pk.eyJ1IjoieW91cnVzZXJuYW1lIiwi...
```

**Usage**:
```typescript
map.setStyle('mapbox://styles/mapbox/satellite-streets-v12');
```

**Rate Limits**: 50,000 map loads/month (free tier)

---

## 📊 Data Model

### TypeScript Interfaces

```typescript
// types/index.ts

export interface Site {
  type: 'Feature';
  id: string;
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  properties: SiteProperties;
}

export interface SiteProperties {
  name: string;
  restorationType: RestorationType;
  year: number;
  county?: string;
  areaHectares: number;
  metrics: SiteMetrics;
  source: 'OSM' | 'MOCK';
}

export type RestorationType = 
  | 'MANGROVE' 
  | 'FOREST' 
  | 'DRYLAND' 
  | 'MOUNTAIN_FOREST'
  | 'PROTECTED_AREA';

export interface SiteMetrics {
  speciesCount: number;         // From GBIF
  totalObservations: number;    // From GBIF
  treesPlanted: number;         // Estimated
  survivalRate: number;         // Estimated
  co2SequesteredTonnes: number; // Calculated
  biodiversityIndex: number;    // Calculated
}

export interface BiodiversityData {
  speciesCount: number;
  totalObservations: number;
  endemicSpecies: number;
  recentObservations: Observation[];
}

export interface Observation {
  species: string;
  scientificName: string;
  date: string;
  location: [number, number];
}

export interface MapState {
  sites: Site[];
  selectedSiteId: string | null;
  loading: boolean;
  error: string | null;
  showSatellite: boolean;
}

export type BBox = [number, number, number, number]; // [minLng, minLat, maxLng, maxLat]
```

### Estimation Formulas

```typescript
// utils/calculations.ts

/**
 * Estimate trees planted based on area
 * Assumes ~200-400 trees per hectare depending on restoration type
 */
export function estimateTreesPlanted(
  areaHectares: number, 
  type: RestorationType
): number {
  const densityMap = {
    MANGROVE: 250,
    FOREST: 300,
    MOUNTAIN_FOREST: 350,
    DRYLAND: 150,
    PROTECTED_AREA: 200
  };
  
  return Math.round(areaHectares * densityMap[type]);
}

/**
 * Estimate CO2 sequestration
 * Assumes 1 tree sequesters ~20kg CO2/year over 10 years
 */
export function estimateCO2Sequestered(
  treesPlanted: number,
  survivalRate: number,
  yearsActive: number = 3
): number {
  const CO2_PER_TREE_PER_YEAR = 0.02; // tonnes
  const survivingTrees = treesPlanted * (survivalRate / 100);
  
  return Number((survivingTrees * CO2_PER_TREE_PER_YEAR * yearsActive).toFixed(2));
}

/**
 * Estimate survival rate based on type
 * More realistic estimates per ecosystem
 */
export function estimateSurvivalRate(type: RestorationType): number {
  const survivalMap = {
    MANGROVE: 75,      // High survival in coastal wetlands
    FOREST: 70,        // Good conditions
    MOUNTAIN_FOREST: 65, // Moderate conditions
    DRYLAND: 55,       // Challenging conditions
    PROTECTED_AREA: 70
  };
  
  return survivalMap[type];
}

/**
 * Calculate biodiversity index (simplified Shannon)
 * Based on species count relative to area
 */
export function calculateBiodiversityIndex(
  speciesCount: number,
  areaHectares: number
): number {
  if (areaHectares === 0) return 0;
  
  const speciesDensity = speciesCount / areaHectares;
  const normalizedIndex = Math.min(100, speciesDensity * 10);
  
  return Math.round(normalizedIndex);
}
```

---

## 🎨 UI/UX Design Specifications

### Color Palette

```typescript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          500: '#4CAF50',  // Main green
          700: '#388E3C',
          900: '#1B5E20',
        },
        mangrove: '#2E7D32',
        dryland: '#F57C00',
        forest: '#388E3C',
        mountain: '#558B2F',
      }
    }
  }
}
```

### Component Specifications

#### Header Component
```
┌─────────────────────────────────────────────────────────┐
│  🌍 Kenya Restoration Tracker        [🛰️ Satellite]    │
│  Monitoring ecosystem restoration impact                │
└─────────────────────────────────────────────────────────┘
Height: 80px
Background: white
Shadow: md
```

#### Map View
```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│                     [Interactive Map]                    │
│                                                          │
│  [Zoom +]                                     [Reset]    │
│  [Zoom -]                                                │
│                                                          │
└─────────────────────────────────────────────────────────┘
Height: calc(100vh - 80px)
Polygon fill opacity: 0.6
Polygon stroke: 2px black
```

#### Site Details Panel (Desktop)
```
┌──────────────────────────────┐
│  [X]  Arabuko Sokoke Forest  │
│                              │
│  🏷️ FOREST  📍 Kilifi        │
│                              │
│  ┌─────────┐  ┌─────────┐   │
│  │ 2,450   │  │  34     │   │
│  │ Hectares│  │ Species │   │
│  └─────────┘  └─────────┘   │
│                              │
│  ┌─────────┐  ┌─────────┐   │
│  │ 735,000 │  │  70%    │   │
│  │  Trees  │  │Survival │   │
│  └─────────┘  └─────────┘   │
│                              │
│  📊 Biodiversity             │
│  • 453 total observations    │
│  • Last recorded: 2024-01-15 │
│                              │
│  🌱 Impact                   │
│  • 157.5 tonnes CO₂          │
│  • Biodiversity Index: 14    │
└──────────────────────────────┘
Width: 380px
Slide from right
Shadow: xl
```

#### Site Details Panel (Mobile)
```
Full screen overlay
Swipe down to close
Same content, vertical scroll
```

### Responsive Breakpoints

```typescript
// Mobile: < 640px
- Full-screen site panel
- Stacked metric cards
- Simplified header

// Tablet: 640px - 1024px
- Side panel: 320px width
- 2-column metric grid

// Desktop: > 1024px
- Side panel: 380px width
- 2-column metric grid
- All controls visible
```

---

## 🔧 Implementation Guide

### Phase 1: Setup (Hours 0-4)

#### 1.1 Project Initialization
```bash
# Create Vite project
npm create vite@latest kenya-restoration-tracker -- --template react-ts
cd kenya-restoration-tracker

# Install dependencies
npm install

# Install Mapbox
npm install mapbox-gl
npm install -D @types/mapbox-gl

# Install Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install utilities
npm install @turf/turf @turf/bbox @turf/area @turf/centroid
npm install date-fns
```

#### 1.2 Environment Setup
```bash
# Create .env.local
echo "VITE_MAPBOX_TOKEN=your_token_here" > .env.local

# Get Mapbox token
# 1. Sign up at mapbox.com
# 2. Go to Account → Tokens
# 3. Copy default public token
```

#### 1.3 Tailwind Configuration
```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#4CAF50',
          700: '#388E3C',
        },
        mangrove: '#2E7D32',
        dryland: '#F57C00',
        forest: '#388E3C',
      }
    },
  },
  plugins: [],
}
```

### Phase 2: Core Services (Hours 4-12)

#### 2.1 API Service Layer

```typescript
// services/api.service.ts
import { osmToGeoJSON } from './osm.service';
import { fetchBiodiversityData } from './gbif.service';
import { mockSites } from '../data/mockSites';
import type { Site } from '../types';

const CACHE_KEY = 'restoration-sites-cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export class APIService {
  private cache = new Map<string, any>();

  /**
   * Fetch protected areas from OpenStreetMap
   */
  async getProtectedAreas(): Promise<Site[]> {
    const cacheKey = 'osm-protected-areas';
    
    // Check memory cache
    if (this.cache.has(cacheKey)) {
      console.log('Returning cached OSM data');
      return this.cache.get(cacheKey);
    }

    // Check localStorage cache
    const localCache = this.getLocalCache();
    if (localCache) {
      console.log('Returning localStorage cached data');
      this.cache.set(cacheKey, localCache);
      return localCache;
    }

    try {
      console.log('Fetching from OSM API...');
      
      const query = `
        [out:json][timeout:25];
        area["ISO3166-1"="KE"]->.searchArea;
        (
          way["boundary"="protected_area"]["name"](area.searchArea);
          relation["boundary"="protected_area"]["name"](area.searchArea);
        );
        out geom;
      `;

      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: `data=${encodeURIComponent(query)}`
      });

      if (!response.ok) {
        throw new Error(`OSM API error: ${response.status}`);
      }

      const data = await response.json();
      console.log(`OSM returned ${data.elements.length} elements`);

      // Convert to GeoJSON and take first 12 sites
      const sites = osmToGeoJSON(data).slice(0, 12);

      // Cache results
      this.cache.set(cacheKey, sites);
      this.setLocalCache(sites);

      return sites;

    } catch (error) {
      console.error('OSM API error, using fallback data:', error);
      return mockSites;
    }
  }

  /**
   * Enrich sites with biodiversity data from GBIF
   */
  async enrichWithBiodiversity(sites: Site[]): Promise<Site[]> {
    console.log('Enriching sites with GBIF data...');

    const enrichedSites = await Promise.all(
      sites.map(async (site) => {
        try {
          const bioData = await fetchBiodiversityData(site.geometry);
          
          return {
            ...site,
            properties: {
              ...site.properties,
              metrics: {
                ...site.properties.metrics,
                speciesCount: bioData.speciesCount,
                totalObservations: bioData.totalObservations,
              }
            }
          };
        } catch (error) {
          console.error(`GBIF error for site ${site.id}:`, error);
          // Return site with default metrics
          return site;
        }
      })
    );

    return enrichedSites;
  }

  /**
   * Main data fetching method
   */
  async fetchSites(): Promise<Site[]> {
    // Get base sites from OSM
    const sites = await this.getProtectedAreas();

    // Enrich with biodiversity data
    const enrichedSites = await this.enrichWithBiodiversity(sites);

    return enrichedSites;
  }

  private getLocalCache(): Site[] | null {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      
      // Check if cache is still valid
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }

      // Cache expired
      localStorage.removeItem(CACHE_KEY);
      return null;

    } catch (error) {
      console.error('Error reading cache:', error);
      return null;
    }
  }

  private setLocalCache(data: Site[]): void {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Error setting cache:', error);
    }
  }
}

export const apiService = new APIService();
```

#### 2.2 OSM Service

```typescript
// services/osm.service.ts
import { area, centroid } from '@turf/turf';
import { estimateTreesPlanted, estimateSurvivalRate, estimateCO2Sequestered, calculateBiodiversityIndex } from '../utils/calculations';
import type { Site, RestorationType } from '../types';

interface OSMElement {
  type: string;
  id: number;
  tags: {
    name?: string;
    boundary?: string;
    protect_class?: string;
    leisure?: string;
  };
  geometry?: Array<{ lat: number; lon: number }>;
  members?: Array<{
    type: string;
    ref: number;
    role: string;
    geometry?: Array<{ lat: number; lon: number }>;
  }>;
}

interface OSMResponse {
  elements: OSMElement[];
}

export function osmToGeoJSON(osmData: OSMResponse): Site[] {
  const sites: Site[] = [];

  for (const element of osmData.elements) {
    // Skip elements without geometry
    if (!element.geometry && !element.members) continue;
    if (!element.tags.name) continue;

    try {
      const coordinates = extractCoordinates(element);
      if (!coordinates || coordinates.length < 4) continue;

      // Create GeoJSON polygon
      const polygon: GeoJSON.Polygon = {
        type: 'Polygon',
        coordinates: [coordinates]
      };

      // Calculate area in hectares
      const areaHectares = Number((area(polygon) / 10000).toFixed(2));
      
      // Skip very small or very large areas
      if (areaHectares < 10 || areaHectares > 100000) continue;

      // Classify restoration type
      const restorationType = classifyRestorationType(element.tags, areaHectares);

      // Estimate metrics
      const year = 2020; // Default restoration year
      const treesPlanted = estimateTreesPlanted(areaHectares, restorationType);
      const survivalRate = estimateSurvivalRate(restorationType);
      const co2Tonnes = estimateCO2Sequestered(treesPlanted, survivalRate, new Date().getFullYear() - year);

      const site: Site = {
        type: 'Feature',
        id: `osm-${element.id}`,
        geometry: polygon,
        properties: {
          name: element.tags.name,
          restorationType,
          year,
          county: extractCounty(element.tags),
          areaHectares,
          metrics: {
            speciesCount: 0,              // Will be filled by GBIF
            totalObservations: 0,         // Will be filled by GBIF
            treesPlanted,
            survivalRate,
            co2SequesteredTonnes: co2Tonnes,
            biodiversityIndex: 0          // Will be calculated
          },
          source: 'OSM'
        }
      };

      sites.push(site);

    } catch (error) {
      console.error(`Error processing OSM element ${element.id}:`, error);
      continue;
    }
  }

  return sites;
}

function extractCoordinates(element: OSMElement): number[][] | null {
  try {
    // For ways
    if (element.geometry) {
      const coords = element.geometry.map(node => [node.lon, node.lat]);
      
      // Ensure polygon is closed
      if (coords[0][0] !== coords[coords.length - 1][0] || 
          coords[0][1] !== coords[coords.length - 1][1]) {
        coords.push(coords[0]);
      }
      
      return coords;
    }

    // For relations (multipolygon)
    if (element.members) {
      const outerMembers = element.members.filter(m => m.role === 'outer');
      if (outerMembers.length > 0 && outerMembers[0].geometry) {
        const coords = outerMembers[0].geometry.map(node => [node.lon, node.lat]);
        
        // Ensure closed
        if (coords[0][0] !== coords[coords.length - 1][0] || 
            coords[0][1] !== coords[coords.length - 1][1]) {
          coords.push(coords[0]);
        }
        
        return coords;
      }
    }

    return null;
  } catch (error) {
    console.error('Error extracting coordinates:', error);
    return null;
  }
}

function classifyRestorationType(tags: OSMElement['tags'], areaHectares: number): RestorationType {
  const name = (tags.name || '').toLowerCase();
  
  // Check name for keywords
  if (name.includes('mangrove')) return 'MANGROVE';
  if (name.includes('mountain') || name.includes('highland')) return 'MOUNTAIN_FOREST';
  if (name.includes('dryland') || name.includes('arid')) return 'DRYLAND';
  if (name.includes('forest') || name.includes('woodland')) return 'FOREST';
  
  // Check protection class
  if (tags.protect_class) {
    const protectClass = parseInt(tags.protect_class);
    if (protectClass <= 2) return 'FOREST'; // Strict nature reserves
  }

  // Default based on size
  if (areaHectares > 1000) return 'FOREST';
  
  return 'PROTECTED_AREA';
}

function extractCounty(tags: OSMElement['tags']): string | undefined {
  // OSM doesn't always have county info, would need geocoding
  // For MVP, return undefined
  return undefined;
}
```

#### 2.3 GBIF Service

```typescript
// services/gbif.service.ts
import { bbox } from '@turf/turf';
import type { BiodiversityData } from '../types';

const GBIF_API = 'https://api.gbif.org/v1';

export async function fetchBiodiversityData(
  polygon: GeoJSON.Polygon
): Promise<BiodiversityData> {
  try {
    const [minLng, minLat, maxLng, maxLat] = bbox(polygon);

    const response = await fetch(
      `${GBIF_API}/occurrence/search?` +
      `country=KE&` +
      `decimalLatitude=${minLat},${maxLat}&` +
      `decimalLongitude=${minLng},${maxLng}&` +
      `limit=100`
    );

    if (!response.ok) {
      throw new Error(`GBIF API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract unique species
    const uniqueSpecies = new Set(
      data.results
        .filter((r: any) => r.species)
        .map((r: any) => r.species)
    );

    // Count endemic species (simplified - would need more complex logic)
    const endemicCount = Math.round(uniqueSpecies.size * 0.15); // ~15% endemic estimate

    // Get recent observations
    const recentObservations = data.results
      .slice(0, 5)
      .map((r: any) => ({
        species: r.species || r.scientificName || 'Unknown',
        scientificName: r.scientificName || 'Unknown',
        date: r.eventDate || 'Unknown',
        location: [r.decimalLongitude, r.decimalLatitude] as [number, number]
      }));

    return {
      speciesCount: uniqueSpecies.size,
      totalObservations: data.count,
      endemicSpecies: endemicCount,
      recentObservations
    };

  } catch (error) {
    console.error('GBIF API error:', error);
    
    // Return default values on error
    return {
      speciesCount: 0,
      totalObservations: 0,
      endemicSpecies: 0,
      recentObservations: []
    };
  }
}
```

### Phase 3: React Components (Hours 12-24)

#### 3.1 Context Provider

```typescript
// context/MapContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '../services/api.service';
import type { Site, MapState } from '../types';

interface MapContextType extends MapState {
  setSelectedSiteId: (id: string | null) => void;
  setShowSatellite: (show: boolean) => void;
  refreshSites: () => Promise<void>;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<MapState>({
    sites: [],
    selectedSiteId: null,
    loading: true,
    error: null,
    showSatellite: false,
  });

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const sites = await apiService.fetchSites();
      
      setState(prev => ({
        ...prev,
        sites,
        loading: false
      }));
      
    } catch (error) {
      console.error('Failed to load sites:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load sites'
      }));
    }
  };

  const setSelectedSiteId = (id: string | null) => {
    setState(prev => ({ ...prev, selectedSiteId: id }));
  };

  const setShowSatellite = (show: boolean) => {
    setState(prev => ({ ...prev, showSatellite: show }));
  };

  const refreshSites = async () => {
    await loadSites();
  };

  return (
    <MapContext.Provider value={{
      ...state,
      setSelectedSiteId,
      setShowSatellite,
      refreshSites
    }}>
      {children}
    </MapContext.Provider>
  );
}

export function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within MapProvider');
  }
  return context;
}
```

#### 3.2 Map View Component

```typescript
// components/Map/MapView.tsx
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMap } from '../../context/MapContext';
import { SatelliteToggle } from './SatelliteToggle';
import type { Site } from '../../types';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const KENYA_BOUNDS: mapboxgl.LngLatBoundsLike = [
  [33.9, -5.0], // Southwest
  [41.9, 4.6]   // Northeast
];

const RESTORATION_COLORS = {
  MANGROVE: '#2E7D32',
  DRYLAND: '#F57C00',
  FOREST: '#388E3C',
  MOUNTAIN_FOREST: '#558B2F',
  PROTECTED_AREA: '#66BB6A'
};

export function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  
  const { sites, selectedSiteId, showSatellite, setSelectedSiteId } = useMap();
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      bounds: KENYA_BOUNDS,
      fitBoundsOptions: { padding: 50 }
    });

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-left');

    return () => {
      map.current?.remove();
    };
  }, []);

  // Update satellite layer
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    map.current.setStyle(
      showSatellite 
        ? 'mapbox://styles/mapbox/satellite-streets-v12'
        : 'mapbox://styles/mapbox/streets-v12'
    );

    // Wait for style to load before re-adding layers
    map.current.once('style.load', () => {
      addSiteLayers();
    });
  }, [showSatellite, mapLoaded]);

  // Update sites when data changes
  useEffect(() => {
    if (!map.current || !mapLoaded || sites.length === 0) return;

    addSiteLayers();
  }, [sites, mapLoaded]);

  // Highlight selected site
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Remove previous highlight
    if (map.current.getLayer('selected-site-outline')) {
      map.current.removeLayer('selected-site-outline');
    }
    if (map.current.getSource('selected-site')) {
      map.current.removeSource('selected-site');
    }

    // Add new highlight if site selected
    if (selectedSiteId) {
      const selectedSite = sites.find(s => s.id === selectedSiteId);
      if (selectedSite) {
        map.current.addSource('selected-site', {
          type: 'geojson',
          data: selectedSite
        });

        map.current.addLayer({
          id: 'selected-site-outline',
          type: 'line',
          source: 'selected-site',
          paint: {
            'line-color': '#FFD700',
            'line-width': 3
          }
        });

        // Zoom to selected site
        const bbox = turf.bbox(selectedSite.geometry);
        map.current.fitBounds(bbox as mapboxgl.LngLatBoundsLike, {
          padding: 100,
          maxZoom: 12
        });
      }
    }
  }, [selectedSiteId, mapLoaded, sites]);

  function addSiteLayers() {
    if (!map.current) return;

    // Remove existing layers/sources
    if (map.current.getLayer('sites-fill')) {
      map.current.removeLayer('sites-fill');
    }
    if (map.current.getLayer('sites-outline')) {
      map.current.removeLayer('sites-outline');
    }
    if (map.current.getSource('sites')) {
      map.current.removeSource('sites');
    }

    // Add sites source
    map.current.addSource('sites', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: sites
      }
    });

    // Add fill layer
    map.current.addLayer({
      id: 'sites-fill',
      type: 'fill',
      source: 'sites',
      paint: {
        'fill-color': [
          'match',
          ['get', 'restorationType'],
          'MANGROVE', RESTORATION_COLORS.MANGROVE,
          'DRYLAND', RESTORATION_COLORS.DRYLAND,
          'FOREST', RESTORATION_COLORS.FOREST,
          'MOUNTAIN_FOREST', RESTORATION_COLORS.MOUNTAIN_FOREST,
          'PROTECTED_AREA', RESTORATION_COLORS.PROTECTED_AREA,
          '#757575'
        ],
        'fill-opacity': 0.6
      }
    });

    // Add outline layer
    map.current.addLayer({
      id: 'sites-outline',
      type: 'line',
      source: 'sites',
      paint: {
        'line-color': '#000',
        'line-width': 2
      }
    });

    // Click handler
    map.current.on('click', 'sites-fill', (e) => {
      if (e.features && e.features[0]) {
        setSelectedSiteId(e.features[0].id as string);
      }
    });

    // Hover cursor
    map.current.on('mouseenter', 'sites-fill', () => {
      if (map.current) {
        map.current.getCanvas().style.cursor = 'pointer';
      }
    });

    map.current.on('mouseleave', 'sites-fill', () => {
      if (map.current) {
        map.current.getCanvas().style.cursor = '';
      }
    });
  }

  return (
    <div className="relative h-[calc(100vh-80px)] w-full">
      <div ref={mapContainer} className="h-full w-full" />
      <SatelliteToggle />
    </div>
  );
}
```

#### 3.3 Site Panel Component

```typescript
// components/SiteDetails/SitePanel.tsx
import { useMap } from '../../context/MapContext';
import { MetricCard } from './MetricCard';
import { formatNumber } from '../../utils/formatters';

export function SitePanel() {
  const { sites, selectedSiteId, setSelectedSiteId } = useMap();

  if (!selectedSiteId) return null;

  const site = sites.find(s => s.id === selectedSiteId);
  if (!site) return null;

  const { name, restorationType, areaHectares, metrics, county } = site.properties;

  return (
    <div className="absolute top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl overflow-y-auto z-10">
      {/* Header */}
      <div className="sticky top-0 bg-primary-700 text-white p-4 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold mb-1">{name}</h2>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-white/20 rounded text-sm">
              {restorationType.replace('_', ' ')}
            </span>
            {county && (
              <span className="px-2 py-1 bg-white/20 rounded text-sm">
                📍 {county}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => setSelectedSiteId(null)}
          className="text-white hover:bg-white/20 p-2 rounded"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Area */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-3xl font-bold text-primary-700">
            {formatNumber(areaHectares)}
          </div>
          <div className="text-sm text-gray-600">Hectares</div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            icon="🌳"
            value={formatNumber(metrics.treesPlanted)}
            label="Trees Planted"
          />
          <MetricCard
            icon="📈"
            value={`${metrics.survivalRate}%`}
            label="Survival Rate"
          />
          <MetricCard
            icon="🌍"
            value={`${formatNumber(metrics.co2SequesteredTonnes)} t`}
            label="CO₂ Sequestered"
          />
          <MetricCard
            icon="🦋"
            value={formatNumber(metrics.speciesCount)}
            label="Species"
          />
        </div>

        {/* Biodiversity Section */}
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <span>📊</span>
            Biodiversity
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Observations</span>
              <span className="font-medium">{formatNumber(metrics.totalObservations)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Biodiversity Index</span>
              <span className="font-medium">{metrics.biodiversityIndex}/100</span>
            </div>
          </div>
        </div>

        {/* Data Source */}
        <div className="text-xs text-gray-500 border-t pt-3">
          <div>Data sources:</div>
          <ul className="list-disc list-inside mt-1">
            <li>Site boundary: OpenStreetMap</li>
            <li>Species data: GBIF</li>
            <li>Satellite: Mapbox/Sentinel-2</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
```

### Phase 4: Polish & Deploy (Hours 24-48)

#### 4.1 Loading Screen

```typescript
// components/Layout/LoadingScreen.tsx
export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <div className="mb-4">
        <svg className="animate-spin h-12 w-12 text-primary-500" viewBox="0 0 24 24">
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
            fill="none"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Loading Restoration Sites
      </h2>
      <p className="text-sm text-gray-600">
        Fetching real data from OpenStreetMap and GBIF...
      </p>
    </div>
  );
}
```

#### 4.2 Error Boundary

```typescript
// components/Layout/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-600"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

#### 4.3 Deployment to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Build project
npm run build

# Deploy
vercel --prod

# Follow prompts:
# - Project name: kenya-restoration-tracker
# - Framework: Vite
# - Build command: npm run build
# - Output directory: dist
```

---

## 📝 Documentation Requirements

### README.md

```markdown
# Kenya Restoration Sites Tracker

An interactive geospatial web application visualizing ecosystem restoration projects across Kenya using real-world data from OpenStreetMap and GBIF.

![Screenshot](screenshot.png)

## 🌍 Live Demo

**[View Live Application](https://kenya-restoration-tracker.vercel.app)**

## ✨ Features

- **Interactive Map**: Pan, zoom, and click site polygons
- **Real Data Integration**: 
  - OpenStreetMap for protected area boundaries
  - GBIF for biodiversity observations
  - Mapbox Satellite for imagery
- **Site Details**: View metrics, biodiversity, and environmental impact
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript 5
- **Build Tool**: Vite 5
- **Mapping**: Mapbox GL JS 3
- **Styling**: Tailwind CSS 3
- **APIs**: OpenStreetMap Overpass, GBIF
- **Utilities**: Turf.js for geospatial calculations

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/kenya-restoration-tracker.git
cd kenya-restoration-tracker

# Install dependencies
npm install

# Create .env.local
echo "VITE_MAPBOX_TOKEN=your_mapbox_token" > .env.local

# Run development server
npm run dev
```

Visit `http://localhost:5173`

## 🔑 API Keys

Get a free Mapbox token:
1. Sign up at [mapbox.com](https://mapbox.com)
2. Go to Account → Tokens
3. Copy default public token
4. Add to `.env.local`

## 📊 Data Sources

- **Site Boundaries**: [OpenStreetMap](https://www.openstreetmap.org/) via Overpass API
- **Biodiversity**: [GBIF](https://www.gbif.org/) (Global Biodiversity Information Facility)
- **Satellite Imagery**: [Mapbox Satellite](https://www.mapbox.com/)

## 🏗️ Project Structure

```
src/
├── components/      # React components
├── context/         # State management
├── services/        # API integrations
├── types/           # TypeScript definitions
├── utils/           # Helper functions
└── data/            # Mock data fallbacks
```

## 🧪 Testing

```bash
# Run tests (if implemented)
npm test

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📦 Deployment

Deployed automatically on push to main branch via Vercel.

## 🤝 Contributing

This is an interview project. For inquiries, contact [your-email@example.com]

## 📄 License

MIT License - see LICENSE file

## 👨‍💻 Author

Built by [Your Name] for Green.Earth interview (February 2025)

---

**Note**: This is a technical demonstration project built in 48 hours to showcase geospatial development skills with React, TypeScript, and mapping libraries.
```

### Code Comments Best Practices

```typescript
/**
 * Fetches protected areas from OpenStreetMap Overpass API
 * 
 * Uses a spatial query filtered to Kenya (ISO3166-1=KE) to retrieve
 * protected areas with names. Results are limited by timeout (25s).
 * 
 * @returns Promise<Site[]> Array of GeoJSON features with properties
 * @throws Error if API request fails or times out
 * 
 * @example
 * const sites = await getProtectedAreas();
 * console.log(`Found ${sites.length} protected areas`);
 */
async getProtectedAreas(): Promise<Site[]> {
  // Implementation
}
```

---

## 🎤 Interview Demo Script

### Opening (30 seconds)
"I built this MVP to demonstrate my geospatial React development skills. It's an interactive map showing real restoration sites in Kenya, integrating three live data sources: OpenStreetMap for boundaries, GBIF for biodiversity, and Mapbox for satellite imagery."

### Feature Walkthrough (2 minutes)

**1. Map Interaction**
"The map uses Mapbox GL to render 8-12 real protected areas in Kenya. Each polygon is color-coded by ecosystem type. Notice the smooth interactions - pan, zoom, and polygon clicks."

**2. Real Data Integration**
"When I click a site, this panel shows real-time data from GBIF API - actual species counts and observations. The site boundaries come from OpenStreetMap's Overpass API."

**3. Satellite Toggle**
"This button switches to Mapbox satellite view, showing actual Sentinel-2 imagery. The state persists across interactions."

### Technical Deep Dive (2 minutes)

**TypeScript + React**
"The codebase is fully typed TypeScript. I use Context API for global state - keeping it simple but scalable. Each component has a single responsibility."

**API Architecture**
"I built a service layer that handles all external APIs with proper error boundaries and caching. If an API fails, it falls back to mock data seamlessly."

**Performance**
"I implemented localStorage caching with 24-hour TTL to respect rate limits. The OSM query fetches once, then caches results."

**Geospatial Calculations**
"I use Turf.js for spatial operations - calculating area from polygons, bounding boxes for API queries, and centroid for zoom-to-feature."

### Future Enhancements (1 minute)
"Next steps I'd add:
1. Google Earth Engine integration for NDVI time-series analysis
2. Real backend with PostgreSQL + PostGIS for persistent storage  
3. User authentication and project management
4. PDF report generation
5. Historical comparison (before/after imagery)"

### Closing
"The full codebase is on GitHub with comprehensive README. It's deployed on Vercel and took 48 hours to build. Happy to dive deeper into any technical aspect."

---

## ✅ Pre-Interview Checklist

**48 Hours Before:**
- [ ] Project deployed and live
- [ ] README complete with screenshots
- [ ] All environment variables documented
- [ ] Code fully commented
- [ ] No console errors in production
- [ ] Mobile responsive tested

**24 Hours Before:**
- [ ] Practice 5-minute demo walkthrough
- [ ] Test on different browsers (Chrome, Safari, Firefox)
- [ ] Prepare answers to "Why did you choose X over Y?"
- [ ] Review job description and map features to requirements
- [ ] List 3 technical challenges you solved

**Interview Day:**
- [ ] Demo site open in browser (and backup localhost)
- [ ] Code editor open to key files
- [ ] Can explain any line of code
- [ ] Prepare 2-3 questions about Green.Earth's tech stack
- [ ] Have portfolio and GitHub ready to share

---

## 🎯 Success Criteria

**You'll know you're ready when:**
- ✅ Map loads real data in <5 seconds
- ✅ All polygons render correctly
- ✅ Click interactions work smoothly
- ✅ GBIF species counts display
- ✅ Satellite toggle switches cleanly
- ✅ Mobile layout works
- ✅ Zero TypeScript errors
- ✅ Can explain every technical decision
- ✅ Deployed site is publicly accessible
- ✅ README impresses on first read

---

**Built for Green.Earth Interview - February 2025**

This PRD combines simplified MVP scope with real API integrations to create an impressive, interview-ready project demonstrating production-level geospatial React development skills in 48 hours. 🚀