export default function FirstBatch() {
  return (
    <section id="first-batch" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <h2 className="font-display text-4xl font-semibold leading-tight text-charcoal sm:text-5xl">
            You&rsquo;re in at the very start.
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-stone">
            <p>
              This is our first production run. 28 pairs, and that&rsquo;s it
              until batch two.
            </p>
            <p>
              We&rsquo;re a new brand out of Edmonton making technical merino
              socks about the places we actually walk. Elk Island is first
              because it&rsquo;s ours, it&rsquo;s the park down the road.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="rounded-3xl border border-stone/15 bg-white p-8 shadow-lg sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone">
              Numbered by hand
            </p>
            <p className="mt-4 font-display text-5xl font-semibold text-charcoal sm:text-6xl">
              Pair 07
              <span className="text-stone/50"> / 28</span>
            </p>
            <p className="mt-3 text-lg leading-relaxed text-stone">
              Batch One.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-stone">
              Every pair ships with a numbered card. When they&rsquo;re gone,
              they&rsquo;re gone.
            </p>
            <p className="mt-6 border-t border-stone/15 pt-6 text-xs font-semibold uppercase tracking-[0.2em] text-stone">
              Approved by Jack, CAO
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
