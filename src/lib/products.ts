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

export const products: Product[] = [
  {
    id: "elk-island-sock",
    handle: "elk-island-sock",
    title: "The Elk Island Sock",
    subtitle: "Our very first pair",
    description:
      "A technical merino sock inspired by the rolling forests and quiet lakes of Elk Island National Park. Reinforced heel and toe, a cuff that actually stays put, and an arch band built for long days on the trail.",
    highlights: [
      "67% merino wool, naturally odor-resistant",
      "Reinforced heel & toe for durability",
      "Venting mesh panels for breathability",
      "Supportive arch band",
      "Stay-put cuff, no slipping into your boot",
    ],
    images: [
      {
        src: "/images/elk-island-sock-design.png",
        alt: "The Elk Island Sock, front and back, left and right",
      },
    ],
    currency: "CAD",
    price: 32,
    options: [{ name: "Size", values: ["S", "M", "L"] }],
    variants: [
      {
        id: "elk-island-sock-s",
        title: "S · W5–7 / M4–6",
        price: 32,
        available: true,
        selectedOptions: [{ name: "Size", value: "S · W5–7 / M4–6" }],
      },
      {
        id: "elk-island-sock-m",
        title: "M · W8–10 / M7–9",
        price: 32,
        available: true,
        selectedOptions: [{ name: "Size", value: "M · W8–10 / M7–9" }],
      },
      {
        id: "elk-island-sock-l",
        title: "L · W11–13 / M10–12",
        price: 32,
        available: true,
        selectedOptions: [{ name: "Size", value: "L · W11–13 / M10–12" }],
      },
    ],
    available: true,
  },
];

export function getAllProducts() {
  return products;
}

export function getProductByHandle(handle: string) {
  return products.find((product) => product.handle === handle);
}
