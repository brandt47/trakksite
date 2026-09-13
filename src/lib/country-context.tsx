"use client";

import { createContext, useContext, type ReactNode } from "react";

const CountryContext = createContext<string | null>(null);

/**
 * Carries the request-time country from the root layout down to client
 * components. Nav is imported by the client-rendered cart and checkout pages,
 * so anything it renders has to reach the country this way rather than
 * reading headers directly.
 */
export function CountryProvider({
  country,
  children,
}: {
  country: string | null;
  children: ReactNode;
}) {
  return (
    <CountryContext.Provider value={country}>
      {children}
    </CountryContext.Provider>
  );
}

/** ISO country code for the current visitor, or null when unknown. */
export function useCountry(): string | null {
  return useContext(CountryContext);
}
