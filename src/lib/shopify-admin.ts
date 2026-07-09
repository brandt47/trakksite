/**
 * Shopify Admin API client using the client-credentials OAuth flow.
 *
 * Instead of a long-lived static access token, this exchanges your app
 * credentials for a short-lived token on demand. The token is cached in
 * memory and refreshed automatically shortly before it expires (Shopify
 * access tokens last 24 hours).
 *
 * Required env vars:
 *   SHOPIFY_CLIENT_ID      — the app's API key / client id
 *   SHOPIFY_CLIENT_SECRET  — the app's client secret
 *   SHOPIFY_SHOP           — shop subdomain (e.g. "trakkshop"), optional if
 *                            NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is set
 */

const API_VERSION = "2025-04";

// Prefer an explicit shop subdomain, otherwise derive it from the storefront
// domain already configured for the site (e.g. "trakkshop.myshopify.com").
const SHOP =
  process.env.SHOPIFY_SHOP ??
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.replace(/\.myshopify\.com$/, "");

const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET;

function requireCredentials(): {
  shop: string;
  clientId: string;
  clientSecret: string;
} {
  if (!SHOP || !CLIENT_ID || !CLIENT_SECRET) {
    throw new Error(
      "Missing Shopify Admin credentials. Set SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET, and SHOPIFY_SHOP (or NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN).",
    );
  }
  return { shop: SHOP, clientId: CLIENT_ID, clientSecret: CLIENT_SECRET };
}

// --- Token cache ---

let token: string | null = null;
let tokenExpiresAt = 0;
let inflight: Promise<string> | null = null;

async function requestToken(): Promise<string> {
  const { shop, clientId, clientSecret } = requireCredentials();

  const res = await fetch(
    `https://${shop}.myshopify.com/admin/oauth/access_token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`Shopify token request failed: ${res.status}`);
  }

  const { access_token, expires_in } = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };

  token = access_token;
  tokenExpiresAt = Date.now() + expires_in * 1000;
  return token;
}

/**
 * Returns a valid Admin API access token, reusing the cached one until it is
 * within 60s of expiry. Concurrent callers share a single in-flight request.
 */
export async function getAdminToken(): Promise<string> {
  if (token && Date.now() < tokenExpiresAt - 60_000) return token;
  if (inflight) return inflight;

  inflight = requestToken().finally(() => {
    inflight = null;
  });
  return inflight;
}

/**
 * Resolves an Admin API access token for direct header use (REST or GraphQL).
 * Prefers the client-credentials flow when SHOPIFY_CLIENT_ID/SECRET are set,
 * and otherwise falls back to the static SHOPIFY_ADMIN_API_ACCESS_TOKEN.
 * Returns null when neither is configured.
 */
export async function getAdminAccessToken(): Promise<string | null> {
  if (CLIENT_ID && CLIENT_SECRET && SHOP) {
    return getAdminToken();
  }
  return process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN ?? null;
}

// --- GraphQL ---

/**
 * Runs a query/mutation against the Shopify GraphQL Admin API, authenticating
 * with an auto-refreshed client-credentials token.
 */
export async function adminGraphql<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const { shop } = requireCredentials();

  const res = await fetch(
    `https://${shop}.myshopify.com/admin/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": await getAdminToken(),
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(`Shopify Admin API request failed: ${res.status}`);
  }

  const { data, errors } = (await res.json()) as {
    data: T;
    errors?: unknown[];
  };

  if (errors?.length) {
    throw new Error(`Shopify Admin API errors: ${JSON.stringify(errors)}`);
  }

  return data;
}
