import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/our-story", label: "Our Story" },
  { href: "/the-sock", label: "The Sock" },
  { href: "/made-in-canada", label: "Made in Canada" },
  { href: "/lifestyle", label: "Lifestyle" },
];

export default function Nav() {
  return (
    <header className="absolute top-0 z-30 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/trakk-logo.png"
            alt="TRAKK"
            width={349}
            height={301}
            className="h-12 w-12"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-cream/90 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="transition hover:text-white">
              {label}
            </Link>
          ))}
        </nav>
        <a
          href="#waitlist"
          className="rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-charcoal transition hover:bg-white"
        >
          Join the Waitlist
        </a>
      </div>
    </header>
  );
}
