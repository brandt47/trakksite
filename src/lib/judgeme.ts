/**
 * Judge.me REST API v1 client.
 *
 * Docs: https://judge.me/api/docs (OpenAPI spec: https://judge.me/api/docs.yaml)
 *
 * Requests authenticate with a private API key in the `X-Api-Token` header
 * plus a `shop_domain` query param. Judge.me only issues private keys on its
 * paid plans, so `isJudgemeConfigured()` gates every call and `reviews.ts`
 * falls back to the exported reviews when no key is set.
 *
 * Required env vars:
 *   JUDGEME_API_TOKEN     — private API key (Judge.me → Settings → Integrations → API)
 *   JUDGEME_SHOP_DOMAIN   — myshopify domain, optional if SHOPIFY_SHOP or
 *                           NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is set
 */

const API_BASE = "https://api.judge.me/api/v1";

/** Largest page size Judge.me serves. */
const PER_PAGE = 100;

/** Hard ceiling so a server-side page cap can't turn into an endless loop. */
const MAX_PAGES = 10;

/** Reviews change rarely, so they are served from the data cache. */
const REVALIDATE_SECONDS = 900;

export type JudgemePicture = {
  hidden?: boolean;
  urls?: {
    small?: string;
    compact?: string;
    huge?: string;
    original?: string;
  } | null;
};

export type JudgemeReview = {
  id: number;
  title?: string | null;
  body?: string | null;
  rating: number;
  pinned?: boolean;
  /** Shopify product id. Absent on store-level reviews. */
  product_external_id?: number | null;
  product_title?: string | null;
  product_handle?: string | null;
  reviewer?: { id?: number; name?: string | null } | null;
  /** Judge.me also returns the reviewer name at the top level on some plans. */
  name?: string | null;
  source?: string;
  /** "ok" published, "spam" hidden, "not-yet" awaiting curation. */
  curated?: "not-yet" | "ok" | "spam" | (string & {});
  /** Archived in the Judge.me dashboard. Independent of `curated`. */
  hidden?: boolean;
  verified?: string;
  created_at: string;
  pictures?: JudgemePicture[] | null;
};

type ReviewsResponse = {
  current_page: number;
  per_page: number;
  reviews: JudgemeReview[];
};

/**
 * SHOPIFY_SHOP holds a bare subdomain ("trakkshop") for the Admin client,
 * while Judge.me identifies the store by its full myshopify domain.
 */
function resolveShopDomain(): string | undefined {
  const explicit = process.env.JUDGEME_SHOP_DOMAIN;
  if (explicit) return explicit;

  const shop = process.env.SHOPIFY_SHOP;
  if (shop) return shop.includes(".") ? shop : `${shop}.myshopify.com`;

  return process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
}

export function isJudgemeConfigured(): boolean {
  return Boolean(process.env.JUDGEME_API_TOKEN && resolveShopDomain());
}

async function judgemeFetch<T>(
  path: string,
  params: Record<string, string | number> = {},
): Promise<T> {
  const token = process.env.JUDGEME_API_TOKEN;
  const shopDomain = resolveShopDomain();

  if (!token || !shopDomain) {
    throw new Error(
      "Missing Judge.me credentials. Set JUDGEME_API_TOKEN and JUDGEME_SHOP_DOMAIN (or SHOPIFY_SHOP).",
    );
  }

  const url = new URL(`${API_BASE}${path}`);
  url.searchParams.set("shop_domain", shopDomain);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }

  const res = await fetch(url, {
    headers: { "X-Api-Token": token, Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS, tags: ["reviews"] },
  });

  if (!res.ok) {
    throw new Error(`Judge.me request failed: ${res.status} ${path}`);
  }

  return res.json() as Promise<T>;
}

/**
 * Every review in the shop, product-level and store-level, across all pages.
 *
 * Judge.me has no endpoint for resolving a Shopify handle to the internal
 * product id that `/reviews?product_id=` expects, so the whole set is fetched
 * once per cache window and grouped by `product_handle` in `reviews.ts`.
 */
export async function fetchJudgemeReviews(): Promise<JudgemeReview[]> {
  const collected = new Map<number, JudgemeReview>();

  for (let page = 1; page <= MAX_PAGES; page++) {
    const { reviews } = await judgemeFetch<ReviewsResponse>("/reviews", {
      page,
      per_page: PER_PAGE,
    });

    if (!reviews?.length) break;

    for (const review of reviews) collected.set(review.id, review);
  }

  return [...collected.values()];
}
