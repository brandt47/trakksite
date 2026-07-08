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
    <header className="absolute top-0 z-30 w-full">
      <div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-6 py-6 sm:px-10">
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
