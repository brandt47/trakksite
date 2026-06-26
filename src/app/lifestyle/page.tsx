import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Lifestyle from "@/components/sections/Lifestyle";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Lifestyle | TRAKK",
  description:
    "Running, hiking, road trips, and everyday adventure — the Elk Island Sock keeps up wherever Jack goes.",
};

export default function LifestylePage() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="flex flex-1 flex-col">
        <PageHero
          title="Wherever Jack Goes"
          description="One sock that does most of it, from tempo runs to gravel roads."
        />
        <Lifestyle />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
