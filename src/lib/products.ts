import {
  fetchAllProducts,
  fetchProductByHandle,
  type ShopifyProduct,
} from "./shopify";

export type ProductOption = {
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  price: number;
  available: boolean;
  selectedOptions: { name: string; value: string }[];
};

export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  subtitle?: string;
  description: string;
  highlights: string[];
  images: ProductImage[];
  currency: string;
  price: number;
  compareAtPrice?: number;
  options: ProductOption[];
  variants: ProductVariant[];
  available: boolean;
};

/**
 * Frontend marketing copy keyed by Shopify product handle.
 *
 * When you publish a new product in Shopify admin, add an entry here.
 * The handle is the URL slug shown in the Shopify admin URL, e.g.:
 *   admin.shopify.com/products/elk-island-sock  →  "elk-island-sock"
 *
 * Template:
 *   "your-product-handle": {
 *     subtitle: "Short tagline shown under the product title",
 *     highlights: [
 *       "Key feature or spec",
 *       "Another feature",
 *     ],
 *   },
 *
 * Both fields are optional — omit either if not needed.
 * Everything else (price, images, variants, availability) comes from Shopify.
 */
const productEnhancements: Record<
  string,
  { subtitle?: string; highlights?: string[] }
> = {
  "elk-island-sock": {
    subtitle: "Our very first pair",
    highlights: [
      "Limited first batch — only 28 pairs",
      "67% merino wool, naturally odor-resistant",
      "Reinforced heel & toe for durability",
      "Venting mesh panels for breathability",
      "Supportive arch band",
      "Stay-put cuff, no slipping into your boot",
    ],
  },
};

function mapProduct(p: ShopifyProduct): Product {
  const enh = productEnhancements[p.handle] ?? {};
  const price = parseFloat(p.priceRange.minVariantPrice.amount);
  const compareAtAmount = p.compareAtPriceRange?.minVariantPrice?.amount;
  const compareAtPrice = compareAtAmount ? parseFloat(compareAtAmount) : undefined;

  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    subtitle: enh.subtitle,
    description: p.description,
    highlights: enh.highlights ?? [],
    images: p.images.edges.map(({ node }) => ({
      src: node.url,
      alt: node.altText ?? p.title,
    })),
    currency: p.priceRange.minVariantPrice.currencyCode,
    price,
    compareAtPrice:
      compareAtPrice && compareAtPrice > price ? compareAtPrice : undefined,
    options: p.options,
    variants: p.variants.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      price: parseFloat(node.price.amount),
      available: node.availableForSale,
      selectedOptions: node.selectedOptions,
    })),
    available: p.availableForSale,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const products = await fetchAllProducts();
  return products.map(mapProduct);
}

export async function getProductByHandle(
  handle: string,
): Promise<Product | null> {
  const product = await fetchProductByHandle(handle);
  return product ? mapProduct(product) : null;
}

/**
 * The hero product the marketing pages revolve around. Drives the
 * "buy now" vs. "next batch" copy switching across the site.
 */
export const FEATURED_PRODUCT_HANDLE = "elk-island-sock";

/**
 * Fetches the featured product for marketing copy, swallowing any Shopify
 * error so the homepage/story/lifestyle pages still render. Returns null when
 * it can't be loaded — callers should treat that as "available" and point to
 * the shop rather than hiding the buy path.
 */
export async function getFeaturedProduct(): Promise<Product | null> {
  try {
    return await getProductByHandle(FEATURED_PRODUCT_HANDLE);
  } catch {
    return null;
  }
}
