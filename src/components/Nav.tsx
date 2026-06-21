import Image from "next/image";

export default function Nav() {
  return (
    <header className="absolute top-0 z-30 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        <a href="/" className="flex items-center gap-3">
          <Image
            src="/images/trakk-logo.png"
            alt="TRAKK"
            width={349}
            height={301}
            className="h-12 w-12"
            priority
          />
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-cream/90 md:flex">
          <a href="/#why-elk-island" className="transition hover:text-white">
            The Place
          </a>
          <a href="/#features" className="transition hover:text-white">
            The Sock
          </a>
          <a href="/#made-in-canada" className="transition hover:text-white">
            Made in Canada
          </a>
          <a href="/#meet-jack" className="transition hover:text-white">
            Meet Jack
          </a>
        </nav>
        <a
          href="/#waitlist"
          className="rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-charcoal transition hover:bg-white"
        >
          Join the Waitlist
        </a>
      </div>
    </header>
  );
}
