import type { Site } from "@/types";

export const mockSites: Site[] = [
  {
    type: "Feature",
    id: "mock-1",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [39.85, -4.05], [39.95, -4.05], [39.98, -3.95],
        [39.90, -3.88], [39.82, -3.92], [39.85, -4.05],
      ]],
    },
    properties: {
      name: "Gazi Bay Mangrove Reserve",
      restorationType: "MANGROVE",
      year: 2018,
      county: "Kwale",
      areaHectares: 620,
      metrics: {
        speciesCount: 42,
        totalObservations: 1340,
        treesPlanted: 155000,
        survivalRate: 78,
        co2SequesteredTonnes: 1820,
        biodiversityIndex: 68,
      },
      source: "MOCK",
    },
  },
  {
    type: "Feature",
    id: "mock-2",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [39.88, -3.35], [40.02, -3.33], [40.05, -3.22],
        [39.95, -3.18], [39.85, -3.25], [39.88, -3.35],
      ]],
    },
    properties: {
      name: "Arabuko-Sokoke Forest",
      restorationType: "FOREST",
      year: 2015,
      county: "Kilifi",
      areaHectares: 42000,
      metrics: {
        speciesCount: 230,
        totalObservations: 8920,
        treesPlanted: 12600000,
        survivalRate: 72,
        co2SequesteredTonnes: 136080,
        biodiversityIndex: 85,
      },
      source: "MOCK",
    },
  },
  {
    type: "Feature",
    id: "mock-3",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [36.65, -1.38], [36.78, -1.36], [36.82, -1.28],
        [36.74, -1.22], [36.62, -1.30], [36.65, -1.38],
      ]],
    },
    properties: {
      name: "Karura Forest Reserve",
      restorationType: "FOREST",
      year: 2010,
      county: "Nairobi",
      areaHectares: 1063,
      metrics: {
        speciesCount: 115,
        totalObservations: 4560,
        treesPlanted: 318900,
        survivalRate: 75,
        co2SequesteredTonnes: 7178,
        biodiversityIndex: 72,
      },
      source: "MOCK",
    },
  },
  {
    type: "Feature",
    id: "mock-4",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [37.15, 0.10], [37.35, 0.12], [37.40, 0.25],
        [37.28, 0.32], [37.12, 0.22], [37.15, 0.10],
      ]],
    },
    properties: {
      name: "Mount Kenya Forest Reserve",
      restorationType: "MOUNTAIN_FOREST",
      year: 2012,
      county: "Nyeri",
      areaHectares: 71500,
      metrics: {
        speciesCount: 340,
        totalObservations: 12400,
        treesPlanted: 25025000,
        survivalRate: 65,
        co2SequesteredTonnes: 244744,
        biodiversityIndex: 91,
      },
      source: "MOCK",
    },
  },
  {
    type: "Feature",
    id: "mock-5",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [38.20, 1.50], [38.55, 1.52], [38.60, 1.75],
        [38.35, 1.80], [38.15, 1.65], [38.20, 1.50],
      ]],
    },
    properties: {
      name: "Shaba National Reserve",
      restorationType: "DRYLAND",
      year: 2019,
      county: "Isiolo",
      areaHectares: 23900,
      metrics: {
        speciesCount: 78,
        totalObservations: 2100,
        treesPlanted: 3585000,
        survivalRate: 52,
        co2SequesteredTonnes: 22373,
        biodiversityIndex: 45,
      },
      source: "MOCK",
    },
  },
  {
    type: "Feature",
    id: "mock-6",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [40.00, -2.55], [40.12, -2.52], [40.15, -2.42],
        [40.05, -2.38], [39.97, -2.45], [40.00, -2.55],
      ]],
    },
    properties: {
      name: "Lamu Mangrove Estuary",
      restorationType: "MANGROVE",
      year: 2020,
      county: "Lamu",
      areaHectares: 980,
      metrics: {
        speciesCount: 56,
        totalObservations: 1890,
        treesPlanted: 245000,
        survivalRate: 80,
        co2SequesteredTonnes: 2352,
        biodiversityIndex: 74,
      },
      source: "MOCK",
    },
  },
  {
    type: "Feature",
    id: "mock-7",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [35.20, 0.30], [35.42, 0.32], [35.48, 0.48],
        [35.35, 0.55], [35.18, 0.42], [35.20, 0.30],
      ]],
    },
    properties: {
      name: "Mau Forest Complex",
      restorationType: "FOREST",
      year: 2014,
      county: "Nakuru",
      areaHectares: 40000,
      metrics: {
        speciesCount: 195,
        totalObservations: 7650,
        treesPlanted: 12000000,
        survivalRate: 68,
        co2SequesteredTonnes: 122400,
        biodiversityIndex: 82,
      },
      source: "MOCK",
    },
  },
  {
    type: "Feature",
    id: "mock-8",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [36.80, 2.60], [37.10, 2.62], [37.15, 2.80],
        [36.95, 2.85], [36.75, 2.72], [36.80, 2.60],
      ]],
    },
    properties: {
      name: "Marsabit Forest Reserve",
      restorationType: "DRYLAND",
      year: 2017,
      county: "Marsabit",
      areaHectares: 15050,
      metrics: {
        speciesCount: 62,
        totalObservations: 1560,
        treesPlanted: 2257500,
        survivalRate: 55,
        co2SequesteredTonnes: 17872,
        biodiversityIndex: 40,
      },
      source: "MOCK",
    },
  },
  {
    type: "Feature",
    id: "mock-9",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [34.75, -0.70], [34.90, -0.68], [34.95, -0.55],
        [34.82, -0.50], [34.72, -0.60], [34.75, -0.70],
      ]],
    },
    properties: {
      name: "Kakamega Tropical Rainforest",
      restorationType: "FOREST",
      year: 2011,
      county: "Kakamega",
      areaHectares: 23800,
      metrics: {
        speciesCount: 380,
        totalObservations: 14200,
        treesPlanted: 7140000,
        survivalRate: 70,
        co2SequesteredTonnes: 75075,
        biodiversityIndex: 94,
      },
      source: "MOCK",
    },
  },
  {
    type: "Feature",
    id: "mock-10",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [36.05, -2.30], [36.30, -2.28], [36.35, -2.15],
        [36.18, -2.10], [36.02, -2.20], [36.05, -2.30],
      ]],
    },
    properties: {
      name: "Amboseli Protected Ecosystem",
      restorationType: "PROTECTED_AREA",
      year: 2016,
      county: "Kajiado",
      areaHectares: 39200,
      metrics: {
        speciesCount: 145,
        totalObservations: 5320,
        treesPlanted: 7840000,
        survivalRate: 60,
        co2SequesteredTonnes: 70560,
        biodiversityIndex: 65,
      },
      source: "MOCK",
    },
  },
];
