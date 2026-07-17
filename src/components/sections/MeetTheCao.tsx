import Image from "next/image";

export default function MeetTheCao() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-stone/15 shadow-md">
            <Image
              src="/images/jackbush-web.jpg"
              alt="Jack, Chief Adventure Officer"
              width={500}
              height={500}
              className="h-full w-full object-cover scale-[1.4] origin-center"
            />
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-stone">
            Meet the Chief Adventure Officer
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-charcoal sm:text-3xl">
            Nothing ships without his approval.
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-stone">
            Jack has directed Trakk since its founding in 2026. He oversees
            design, colorway selection, and final quality review for every
            release.
          </p>
        </div>
      </div>
    </section>
  );
}
