import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { IconMapPin } from "@/components/icons";

export const metadata: Metadata = {
  title: "Where to Buy | TRAKK",
  description: "Find TRAKK trail socks in stores near you, including Track 'N Trail locations in Edmonton and St. Albert.",
  alternates: { canonical: "/where-to-buy" },
  openGraph: {
    title: "Where to Buy | TRAKK",
    description: "Find TRAKK trail socks in stores near you, including Track 'N Trail locations in Edmonton and St. Albert.",
    url: "/where-to-buy",
  },
};

const stockists = [
  {
    name: "Track 'N Trail",
    address: "10148 Whyte Ave NW, Edmonton, AB T6E 1Z4",
    mapQuery: "10148 Whyte Ave NW, Edmonton, AB T6E 1Z4",
  },
  {
    name: "Track 'N Trail",
    address: "130 Bellerose Dr Unit 107, St. Albert, AB T8N 8N8",
    mapQuery: "130 Bellerose Dr Unit 107, St. Albert, AB T8N 8N8",
  },
];

export default function WhereToBuyPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="flex flex-1 flex-col">
        <PageHero
          title="Where to Buy"
          description="TRAKK socks are in stores now!"
        />

        <section className="bg-cream py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6 sm:px-10">
            <div className="rounded-2xl border border-sand bg-white p-8 sm:p-10">
              <h2 className="font-display text-2xl font-semibold text-charcoal sm:text-3xl">
                Track &rsquo;N Trail
              </h2>
             
              <a
                href="https://shop.trackntrail.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block font-semibold text-clay transition hover:text-clay-light"
              >
                shop.trackntrail.ca
              </a>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {stockists.map((store) => (
                  <a
                    key={store.address}
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3 rounded-xl border border-sand bg-cream p-5 transition hover:border-clay"
                  >
                    <IconMapPin className="mt-0.5 h-5 w-5 shrink-0 text-clay" />
                    <div>
                      <p className="font-semibold text-charcoal">{store.name}</p>
                      <p className="mt-1 text-sm leading-relaxed text-stone">
                        {store.address}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="leading-relaxed text-stone">
                Not near a store?{" "}
                <Link href="/shop" className="font-semibold text-clay transition hover:text-clay-light">
                  Shop online
                </Link>{" "}
                and we&rsquo;ll ship straight to you.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
