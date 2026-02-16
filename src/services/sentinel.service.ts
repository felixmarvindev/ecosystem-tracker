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
const EVALSCRIPT = `//VERSION=3
function setup() {
  return {
    input: ["B02", "B03", "B04"],
    output: { bands: 3, sampleType: "AUTO" }
  };
}
function evaluatePixel(sample) {
  return [2.5 * sample.B04, 2.5 * sample.B03, 2.5 * sample.B02];
}`;

// ---- Token cache ----
let cachedToken: string | null = null;
let tokenExpiresAt = 0;

// ---- Image cache (in-memory) ----
const imageCache = new Map<string, string>(); // key → blob URL

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
): Promise<string | null> {
  if (!isSentinelConfigured()) return null;

  // Check cache
  const cacheKey = `${bbox.join(",")}_${from}_${to}_${size}`;
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
    formData.append("evalscript", EVALSCRIPT);

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
    imageCache.set(cacheKey, url);
    return url;
  } catch (err) {
    console.warn("Sentinel Hub fetch failed:", err);
    return null;
  }
}
