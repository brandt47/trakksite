import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import FirstBatch from "@/components/sections/FirstBatch";
import MeetTheCao from "@/components/sections/MeetTheCao";
import HomeFaq from "@/components/sections/HomeFaq";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
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
