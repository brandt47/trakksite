import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import WhyElkIsland from "@/components/sections/WhyElkIsland";
import Features from "@/components/sections/Features";
import MadeInCanada from "@/components/sections/MadeInCanada";
import MeetJack from "@/components/sections/MeetJack";
import Lifestyle from "@/components/sections/Lifestyle";
import Trust from "@/components/sections/Trust";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="flex flex-1 flex-col">
        <Hero />
        <WhyElkIsland />
        <Features />
        <MadeInCanada />
        <MeetJack />
        <Lifestyle />
        <Trust />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
