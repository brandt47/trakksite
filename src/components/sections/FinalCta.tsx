import { ElkIslandScene } from "@/components/graphics";
import WaitlistForm from "@/components/WaitlistForm";

export default function FinalCta() {
  return (
    <section id="waitlist" className="relative isolate overflow-hidden bg-forest py-28 sm:py-36">
      <ElkIslandScene className="absolute inset-0 h-full w-full opacity-20" />
      <div className="absolute inset-0 bg-linear-to-b from-charcoal/60 via-charcoal/40 to-forest" />

      <div className="relative mx-auto max-w-3xl px-6 text-center sm:px-10">
        <h2 className="font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl">
          Be the first to land a pair.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-cream/80">
          The Elk Island Sock is on its way. Join the waitlist and we&rsquo;ll
          let you know the moment it&rsquo;s ready to ship.
        </p>
        <div className="mt-9 flex justify-center">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
