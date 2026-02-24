/**
 * Sentinel Hub Processing API integration.
 *
 * Fetches real Sentinel-2 L2A satellite imagery for a given bounding box and
 * date range. Uses OAuth2 client credentials for authentication.
 *
 * Setup:
 *   1. Sign up free at https://www.sentinel-hub.com/
 *   2. Dashboard → Account → OAuth clients → New OAuth client
 *      - Select "SPA" for single-page app usage
 *      - Allow all domains (for dev)
 *   3. Copy client_id and client_secret into .env.local
 */

const TOKEN_URL =
  "https://services.sentinel-hub.com/auth/realms/main/protocol/openid-connect/token";
const PROCESS_URL = "https://services.sentinel-hub.com/api/v1/process";

// True-color evalscript for Sentinel-2 L2A
const RGB_EVALSCRIPT = `//VERSION=3
function setup() {
  return {
    input: ["B02", "B03", "B04"],
    output: { bands: 3, sampleType: "AUTO" }
  };
}
function evaluatePixel(sample) {
  return [2.5 * sample.B04, 2.5 * sample.B03, 2.5 * sample.B02];
}`;

// NDVI false-color evalscript with explicit alpha mask.
// Uses a vivid palette so NDVI is clearly distinct from RGB imagery.
const NDVI_EVALSCRIPT = `//VERSION=3
function setup() {
  return {
    input: ["B04", "B08", "dataMask"],
    output: { bands: 4, sampleType: "UINT8" }
  };
}

function evaluatePixel(sample) {
  if (sample.dataMask === 0) {
    return [0, 0, 0, 0];
  }

  const ndvi = (sample.B08 - sample.B04) / (sample.B08 + sample.B04 + 0.0001);

  // Vivid class breaks:
  // water/bare -> brown/red, sparse -> yellow, healthy -> green
  if (ndvi < -0.2) return [90, 60, 30, 255];
  if (ndvi < 0.0) return [160, 80, 40, 255];
  if (ndvi < 0.2) return [220, 170, 60, 255];
  if (ndvi < 0.4) return [140, 190, 80, 255];
  if (ndvi < 0.6) return [70, 160, 70, 255];
  return [20, 110, 45, 255];
}`;

// ---- Token cache ----
let cachedToken: string | null = null;
let tokenExpiresAt = 0;

// ---- Image cache (in-memory) ----
const imageCache = new Map<string, string>(); // key → blob URL
const blobCache = new Map<string, Blob>(); // key -> image blob

export type SentinelLayer = "RGB" | "NDVI";

/** Check if Sentinel Hub credentials are configured */
export function isSentinelConfigured(): boolean {
  const clientId = import.meta.env.VITE_SENTINEL_HUB_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SENTINEL_HUB_CLIENT_SECRET;
  return Boolean(clientId && clientSecret);
}

/** Get an OAuth2 access token (cached until near expiry) */
async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiresAt - 60_000) {
    return cachedToken;
  }

  const clientId = import.meta.env.VITE_SENTINEL_HUB_CLIENT_ID as string;
  const clientSecret = import.meta.env.VITE_SENTINEL_HUB_CLIENT_SECRET as string;

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    throw new Error(`Sentinel Hub token error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  cachedToken = data.access_token as string;
  tokenExpiresAt = Date.now() + (data.expires_in as number) * 1000;
  return cachedToken;
}

/**
 * Fetch a true-color Sentinel-2 image for a bounding box and date range.
 *
 * @param bbox [west, south, east, north] in WGS84 (lon/lat)
 * @param from ISO date string (e.g. "2018-01-01")
 * @param to   ISO date string (e.g. "2018-12-31")
 * @param size Image width/height in pixels (default 512)
 * @returns A blob URL pointing to the PNG image, or null on failure
 */
export async function fetchSentinelImage(
  bbox: [number, number, number, number],
  from: string,
  to: string,
  size = 512,
  layer: SentinelLayer = "RGB",
): Promise<string | null> {
  if (!isSentinelConfigured()) return null;

  // Check cache
  const cacheKey = `${layer}_${bbox.join(",")}_${from}_${to}_${size}`;
  const cached = imageCache.get(cacheKey);
  if (cached) return cached;

  try {
    const token = await getToken();

    const requestPayload = {
      input: {
        bounds: {
          properties: { crs: "http://www.opengis.net/def/crs/OGC/1.3/CRS84" },
          bbox: [bbox[0], bbox[1], bbox[2], bbox[3]],
        },
        data: [
          {
            type: "sentinel-2-l2a",
            dataFilter: {
              timeRange: {
                from: `${from}T00:00:00Z`,
                to: `${to}T23:59:59Z`,
              },
              mosaickingOrder: "leastCC",
            },
          },
        ],
      },
      output: {
        width: size,
        height: size,
        responses: [
          { identifier: "default", format: { type: "image/png" } },
        ],
      },
    };

    const formData = new FormData();
    formData.append(
      "request",
      new Blob([JSON.stringify(requestPayload)], { type: "application/json" }),
    );
    formData.append("evalscript", layer === "NDVI" ? NDVI_EVALSCRIPT : RGB_EVALSCRIPT);

    const res = await fetch(PROCESS_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!res.ok) {
      console.warn(`Sentinel Hub process error: ${res.status} ${res.statusText}`);
      return null;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    // Cache it
    blobCache.set(cacheKey, blob);
    imageCache.set(cacheKey, url);
    return url;
  } catch (err) {
    console.warn("Sentinel Hub fetch failed:", err);
    return null;
  }
}

/**
 * Download a Sentinel image for a date range and layer.
 * Returns true when a download was triggered.
 */
export async function downloadSentinelImage(
  bbox: [number, number, number, number],
  from: string,
  to: string,
  layer: SentinelLayer,
  filename: string,
  size = 1024,
): Promise<boolean> {
  if (!isSentinelConfigured()) return false;

  const cacheKey = `${layer}_${bbox.join(",")}_${from}_${to}_${size}`;
  const existingBlob = blobCache.get(cacheKey);

  let blob = existingBlob;
  if (!blob) {
    const url = await fetchSentinelImage(bbox, from, to, size, layer);
    if (!url) return false;
    const response = await fetch(url);
    if (!response.ok) return false;
    blob = await response.blob();
    blobCache.set(cacheKey, blob);
  }

  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(objectUrl);
  return true;
}
