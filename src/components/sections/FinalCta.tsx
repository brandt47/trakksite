import { ElkIslandScene } from "@/components/graphics";
import WaitlistForm from "@/components/WaitlistForm";
import { getFeaturedProduct } from "@/lib/products";

export default async function FinalCta() {
  const product = await getFeaturedProduct();
  const soldOut = product ? !product.available : false;

  return (
    <section id="waitlist" className="relative isolate overflow-hidden bg-forest py-28 sm:py-36">
      <ElkIslandScene className="absolute inset-0 h-full w-full opacity-20" />
      <div className="absolute inset-0 bg-linear-to-b from-charcoal/60 via-charcoal/40 to-forest" />

      <div className="relative mx-auto max-w-3xl px-6 text-center sm:px-10">
        <h2 className="font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl">
          {soldOut ? "The first batch is gone." : "Batch two is coming."}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-cream/80">
          {soldOut ? (
            <>
              All 28 pairs found homes. Get on the list and you&rsquo;ll be
              first to know the moment batch two drops.
            </>
          ) : (
            <>
              Get on the list to be the first to hear what comes next.
            </>
          )}
        </p>
        <div className="mt-9 flex justify-center">
          <WaitlistForm soldOut={soldOut} />
        </div>
      </div>
    </section>
  );
}
