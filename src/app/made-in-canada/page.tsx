import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import MadeInCanada from "@/components/sections/MadeInCanada";
import Trust from "@/components/sections/Trust";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Made in Canada | TRAKK",
  description:
    "TRAKK is designed in Edmonton and knit in British Columbia. Here's why we kept production close to home.",
};

export default function MadeInCanadaPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="flex flex-1 flex-col">
        <PageHero
          title="Made in Canada"
          description="No overseas factories, no middlemen. Just a mill in BC and a brand in Edmonton."
        />
        <MadeInCanada />
        <Trust />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
