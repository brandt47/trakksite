import Image from "next/image";
import Link from "next/link";
import CartButton from "@/components/CartButton";
import MobileMenu from "@/components/MobileMenu";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/our-story", label: "Our Story" },
  { href: "/lifestyle", label: "Lifestyle" },
];

export default function Nav() {
  return (
    <header className="absolute top-0 z-30 w-full bg-black/20 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 sm:py-6 md:grid md:grid-cols-3">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Image
            src="/images/trakk-logo.png"
            alt="TRAKK"
            width={349}
            height={301}
            className="h-11 w-11 shrink-0 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24"
            priority
          />
          <span className="font-script text-base font-bold leading-tight text-clay sm:text-2xl lg:text-3xl">
            Land On Your Feet
          </span>
        </Link>
        <nav className="hidden items-center justify-center gap-8 text-sm font-medium text-cream/90 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="transition hover:text-white">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-2">
          <CartButton />
          <Link
            href="/shop"
            className="hidden rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-charcoal transition hover:bg-white md:inline-flex"
          >
            Shop the Sock
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
