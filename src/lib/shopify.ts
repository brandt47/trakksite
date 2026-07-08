const API_VERSION = "2025-04";

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    },
  );

  const json = await res.json();
  if (json.errors) {
    throw new Error(
      `Shopify API error: ${JSON.stringify(json.errors)}`,
    );
  }
  return json.data as T;
}

// --- Response types ---

type ShopifyMoney = { amount: string; currencyCode: string };
type ShopifyImage = { url: string; altText: string | null };

type ShopifyVariant = {
  id: string;
  title: string;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  priceRange: { minVariantPrice: ShopifyMoney };
  compareAtPriceRange: { minVariantPrice: ShopifyMoney | null };
  images: { edges: { node: ShopifyImage }[] };
  options: { name: string; values: string[] }[];
  variants: { edges: { node: ShopifyVariant }[] };
};

type ShopifyCartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: ShopifyMoney;
    product: {
      handle: string;
      title: string;
      images: { edges: { node: ShopifyImage }[] };
    };
  };
};

type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  lines: { edges: { node: ShopifyCartLine }[] };
  cost: { subtotalAmount: ShopifyMoney };
};

// --- GraphQL field strings ---

const PRODUCT_FIELDS = `
  id handle title description availableForSale
  priceRange { minVariantPrice { amount currencyCode } }
  compareAtPriceRange { minVariantPrice { amount currencyCode } }
  images(first: 20) { edges { node { url altText } } }
  options { name values }
  variants(first: 20) {
    edges {
      node {
        id title availableForSale
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        selectedOptions { name value }
      }
    }
  }
`;

const CART_FIELDS = `
  id checkoutUrl
  lines(first: 50) {
    edges {
      node {
        id quantity
        merchandise {
          ... on ProductVariant {
            id title
            price { amount currencyCode }
            product {
              handle title
              images(first: 1) { edges { node { url altText } } }
            }
          }
        }
      }
    }
  }
  cost { subtotalAmount { amount currencyCode } }
`;

// --- Product queries ---

export async function fetchAllProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] };
  }>(`{ products(first: 20) { edges { node { ${PRODUCT_FIELDS} } } } }`);
  return data.products.edges.map((e) => e.node);
}

export async function fetchProductByHandle(
  handle: string,
): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>(
    `query($handle: String!) { product(handle: $handle) { ${PRODUCT_FIELDS} } }`,
    { handle },
  );
  return data.product;
}

// --- Cart types ---

export type CartLine = {
  id: string;
  variantId: string;
  productHandle: string;
  productTitle: string;
  variantTitle: string;
  price: number;
  image: string;
  quantity: number;
};

export type MappedCart = {
  id: string;
  checkoutUrl: string;
  lines: CartLine[];
};

function parseCart(cart: ShopifyCart): MappedCart {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    lines: cart.lines.edges.map(({ node }) => ({
      id: node.id,
      variantId: node.merchandise.id,
      productHandle: node.merchandise.product.handle,
      productTitle: node.merchandise.product.title,
      variantTitle: node.merchandise.title,
      price: parseFloat(node.merchandise.price.amount),
      image: node.merchandise.product.images.edges[0]?.node.url ?? "",
      quantity: node.quantity,
    })),
  };
}

// --- Cart mutations ---

type CartLineInput = { merchandiseId: string; quantity: number };
type CartLineUpdateInput = { id: string; quantity: number };

export async function cartCreate(
  lines: CartLineInput[],
): Promise<MappedCart> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>(
    `mutation($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart { ${CART_FIELDS} }
      }
    }`,
    { lines },
  );
  return parseCart(data.cartCreate.cart);
}

export async function cartLinesAdd(
  cartId: string,
  lines: CartLineInput[],
): Promise<MappedCart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>(
    `mutation($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
      }
    }`,
    { cartId, lines },
  );
  return parseCart(data.cartLinesAdd.cart);
}

export async function cartLinesUpdate(
  cartId: string,
  lines: CartLineUpdateInput[],
): Promise<MappedCart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>(
    `mutation($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
      }
    }`,
    { cartId, lines },
  );
  return parseCart(data.cartLinesUpdate.cart);
}

export async function cartLinesRemove(
  cartId: string,
  lineIds: string[],
): Promise<MappedCart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(
    `mutation($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FIELDS} }
      }
    }`,
    { cartId, lineIds },
  );
  return parseCart(data.cartLinesRemove.cart);
}

export async function fetchCart(cartId: string): Promise<MappedCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>(
    `query($cartId: ID!) { cart(id: $cartId) { ${CART_FIELDS} } }`,
    { cartId },
  );
  return data.cart ? parseCart(data.cart) : null;
}
