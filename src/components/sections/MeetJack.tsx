import Image from "next/image";
import { IconLeaf } from "@/components/icons";

export default function MeetJack() {
  return (
    <section id="leadership" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-forest/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-forest">
            <IconLeaf className="h-4 w-4" />
            Leadership
          </div>
          <h2 className="font-display text-4xl font-semibold leading-tight text-charcoal sm:text-5xl">
            Under the direction of Jack.
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-stone">
            <p>
              Trakk was founded in Edmonton in 2025 under the direction of Jack,
              Chief Adventure Officer. Jack sets the design direction for every
              Trakk release and personally approves each colorway.
            </p>
            <p>
              He is known for his exacting standards, his commitment to
              geographic accuracy, and his refusal to compromise on cuff
              tension.
            </p>
            <p>
              Trakk&rsquo;s first release, the Elk Island Sock, reflects his
              belief that the best gear starts with the places closest to home.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="aspect-square overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="/images/jack.png"
              alt="Jack, Chief Adventure Officer"
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl bg-charcoal px-5 py-3 text-cream shadow-lg">
            <p className="font-display text-sm font-semibold">Jack</p>
            <p className="text-xs text-cream/70">Chief Adventure Officer</p>
          </div>
        </div>
      </div>
    </section>
  );
}
