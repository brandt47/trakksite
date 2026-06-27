import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Features from "@/components/sections/Features";
import FinalCta from "@/components/sections/FinalCta";
import { IconArrowRight } from "@/components/icons";

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
          cta={
            <Link
              href="/shop/elk-island-sock"
              className="group inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-cream transition hover:bg-clay-light"
            >
              Shop This Sock
              <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          }
        />
        <Features />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
