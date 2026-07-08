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

// Marketing copy that lives in the frontend rather than Shopify.
// Add entries here as new products are created in Shopify admin.
const productEnhancements: Record<
  string,
  { subtitle?: string; highlights?: string[] }
> = {
  "elk-island-sock": {
    subtitle: "Our very first pair",
    highlights: [
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
