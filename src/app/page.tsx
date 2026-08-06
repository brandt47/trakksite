import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import FirstBatch from "@/components/sections/FirstBatch";
import MeetTheCao from "@/components/sections/MeetTheCao";
import HomeFaq from "@/components/sections/HomeFaq";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://trakk.ca/#organization",
      name: "TRAKK",
      alternateName: "TRAKK by Jack",
      url: "https://trakk.ca",
      logo: "https://trakk.ca/images/trakk-logo.png",
      description:
        "TRAKK makes merino wool trail socks, designed in Edmonton, Alberta.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Edmonton",
        addressRegion: "AB",
        addressCountry: "CA",
      },
      sameAs: [
        "https://www.instagram.com/trakkbyjack",
        "https://www.tiktok.com/@trakkbyjack",
        "https://www.facebook.com/trakkbyjack",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://trakk.ca/#website",
      name: "TRAKK",
      url: "https://trakk.ca",
      publisher: { "@id": "https://trakk.ca/#organization" },
    },
  ],
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-1 flex-col">
        <Hero />
        <FeaturedProducts />
        <MeetTheCao />
        <FirstBatch />
        <HomeFaq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
