import Image from "next/image";
import { IconArrowRight } from "@/components/icons";
import { getFeaturedProduct } from "@/lib/products";

export default async function Hero() {
  const product = await getFeaturedProduct();
  // Null (Shopify unreachable) defaults to "available" so we never hide the
  // buy path — see getFeaturedProduct.
  const available = product?.available ?? true;
  const shopHref = product ? `/shop/${product.handle}` : "/shop";

  return (
    <section className="relative isolate overflow-hidden bg-forest">
      <video
        src="/videos/albertafield.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/20" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pt-36 pb-20 sm:px-10 sm:pt-44 sm:pb-28 lg:grid-cols-2 lg:gap-8">
        <div className="text-white">

          <p className="mb-3 text-2xl font-semibold uppercase tracking-[0.3em] text-white/80">TRAKK</p>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Land on your feet.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/85">
            Merino trail socks knit with a true map of Elk Island National Park.
            Designed in Edmonton.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            {available ? (
              <a
                href={shopHref}
                className="group inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-clay-light"
              >
                Shop Now
                <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
            ) : (
              <a
                href="#waitlist"
                className="group inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-clay-light"
              >
                Get Notified for Batch Two
                <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
            )}
          </div>
        </div>

        <div className="relative mx-auto hidden w-full max-w-md lg:block lg:max-w-lg">
          <div className="absolute -inset-10 -z-10 rounded-full bg-sand/10 blur-3xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-cream shadow-2xl">
            <Image
              src="/images/trakkatminnewanka.png"
              alt="TRAKK socks on the rocks at Lake Minnewanka"
              fill
              className="object-cover object-[58%_74%]"
              priority
              sizes="(min-width: 1024px) 32rem, 100vw"
            />
          </div>
          <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-white/70">
            The Elk Island Sock
          </p>
        </div>
      </div>
    </section>
  );
}
