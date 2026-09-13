import { headers } from "next/headers";

/**
 * Visitor's ISO country code, resolved by Vercel from their IP on every
 * request. Returns null when it can't be determined — callers should treat
 * that as "not Canada" so we never promise shipping terms we can't honour.
 *
 * Reading request headers opts a route into dynamic rendering, so this is
 * called once in the root layout rather than scattered across components.
 */
export async function getCountry(): Promise<string | null> {
  // Lets us check the non-Canadian experience without a VPN.
  const override = process.env.TRAKK_COUNTRY_OVERRIDE;
  if (override) return override;

  const country = (await headers()).get("x-vercel-ip-country");
  if (country) return country;

  // `next dev` gets no geo header, so assume the home market locally.
  return process.env.NODE_ENV === "development" ? "CA" : null;
}
