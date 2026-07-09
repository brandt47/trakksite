import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { IconArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="relative isolate flex flex-1 flex-col items-center justify-center overflow-hidden bg-forest px-6 py-32 text-center sm:py-44">
        <div className="absolute inset-0 bg-linear-to-b from-charcoal/60 via-charcoal/40 to-forest" />
        <div className="relative mx-auto max-w-xl">
          <p className="font-display text-6xl font-semibold text-cream sm:text-7xl">
            404
          </p>
          <h1 className="mt-5 font-display text-3xl font-semibold text-cream sm:text-4xl">
            This trail doesn&rsquo;t exist.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-cream/80">
            Jack has been notified.
          </p>
          <div className="mt-9 flex justify-center">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-clay-light"
            >
              Back to solid ground
              <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
