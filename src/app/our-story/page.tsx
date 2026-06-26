import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import WhyElkIsland from "@/components/sections/WhyElkIsland";
import MeetJack from "@/components/sections/MeetJack";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Our Story | TRAKK",
  description:
    "How a national park east of Edmonton and an orange cat named Jack became the inspiration behind TRAKK.",
};

export default function OurStoryPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="flex flex-1 flex-col">
        <PageHero
          title="Our Story"
          description="A national park, a quiet summer of trails, and a cat who came along for the ride."
        />
        <WhyElkIsland />
        <MeetJack />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
