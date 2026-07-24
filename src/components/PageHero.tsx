import Image from "next/image";

type PageHeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  cta?: React.ReactNode;
};

export default function PageHero({
  eyebrow = "TRAKK",
  title,
  description,
  cta,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-forest">
      <Image
        src="/images/sockhero.png"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="relative mx-auto max-w-3xl px-6 pt-36 pb-16 text-center sm:px-10 sm:pt-44 sm:pb-20">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-sand [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]">
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl [text-shadow:0_2px_10px_rgba(0,0,0,0.8)]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 inline-block rounded-full bg-charcoal/25 px-6 py-2 text-lg leading-relaxed text-cream backdrop-blur-md">
            {description}
          </p>
        )}
        {cta && <div className="mt-8 flex justify-center">{cta}</div>}
      </div>
    </section>
  );
}
