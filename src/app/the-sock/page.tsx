import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Features from "@/components/sections/Features";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "The Sock | TRAKK",
  description:
    "A closer look at the Elk Island Sock: merino wool blend, reinforced heel and toe, arch support, and a cuff that stays put.",
};

export default function TheSockPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="flex flex-1 flex-col">
        <PageHero
          title="The Elk Island Sock"
          description="Our very first pair. Built for the trail, comfortable enough for everywhere else."
        />
        <Features />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
