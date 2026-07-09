import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Explore from "@/components/sections/Explore";
import Trust from "@/components/sections/Trust";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="flex flex-1 flex-col">
        <Hero />
        <FeaturedProducts />
        <Explore />
        <Trust />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
