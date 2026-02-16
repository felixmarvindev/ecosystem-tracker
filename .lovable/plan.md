

# Kenya Restoration Sites Tracker — Frontend with Mock Data

## Overview
Build the complete frontend UI for an interactive map dashboard showing Kenya's restoration sites. All data will come from mock/hardcoded sources so we can perfect the UI before wiring up real APIs.

---

## Phase 1: Foundation & Layout

### App Shell
- **Header bar** with app title "Kenya Restoration Tracker", subtitle, and satellite toggle button
- **Full-height map area** below the header (`calc(100vh - 80px)`)
- Clean green/earth-tone color palette matching restoration theme

### Mock Data
- Create 10 mock restoration sites across Kenya with realistic GeoJSON polygons
- Include all site properties: name, restoration type, area, species count, trees planted, CO₂ metrics
- Cover all types: Mangrove, Forest, Dryland, Mountain Forest, Protected Area

---

## Phase 2: Interactive Map

### Mapbox GL Map
- Map centered on Kenya with proper bounds
- Render all mock site polygons on the map
- Color-code polygons by restoration type (green shades for forest/mangrove, orange for dryland)
- Hover effects: cursor change + subtle opacity increase
- Click a polygon to select it and open the details panel
- Zoom controls and a "reset view" button

### Satellite Toggle
- Toggle button in the header to switch between street and satellite-streets view
- Maintains current zoom/center when switching
- Visual indicator showing which mode is active

---

## Phase 3: Site Details Panel

### Slide-in Panel
- Slides in from the right when a polygon is clicked
- **Header section**: site name, restoration type badge, county location
- **Metrics grid** (2×2 cards): Area (hectares), Trees Planted, Survival Rate, CO₂ Sequestered
- **Biodiversity section**: Species count, total observations, biodiversity index
- **Data source attribution** at the bottom
- Close button to dismiss panel and deselect site
- On mobile: panel takes full screen with scroll

---

## Phase 4: Summary Stats & Filters (Nice-to-Have)

### Stats Bar
- Summary cards above or overlaying the map: Total Sites, Total Hectares, Total Species
- Updates dynamically based on active filters

### Filter Dropdown
- Filter sites by restoration type (All, Mangrove, Forest, Dryland, etc.)
- Filtered-out polygons fade or hide on the map

---

## Phase 5: Polish

- Loading screen with spinner animation
- Smooth panel slide-in/out transitions
- Responsive layout for mobile, tablet, and desktop
- Professional typography and spacing
- Golden highlight outline on selected polygon

