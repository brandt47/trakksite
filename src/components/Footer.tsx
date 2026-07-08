import Image from "next/image";
import Link from "next/link";
import { IconMaple } from "@/components/icons";

const siteLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/our-story", label: "Our Story" },
  { href: "/lifestyle", label: "Lifestyle" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal text-cream/70">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cream/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="flex flex-col gap-12 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <Image
              src="/images/trakk-logo.png"
              alt="TRAKK"
              width={349}
              height={301}
              className="h-10 w-10"
            />
            <p className="mt-5 font-display text-2xl text-cream">
              Land on your feet
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-cream/50">
              <IconMaple className="h-4 w-4 text-clay" />
              Designed in Edmonton, made in Canada.
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-cream">
                Explore
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {siteLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="transition hover:text-clay-light">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-cream">
                Get Notified
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a href="#waitlist" className="transition hover:text-clay-light">
                    Join the Waitlist
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-cream/10 pt-8 text-xs text-cream/40 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} TRAKK. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="transition hover:text-cream/70">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="transition hover:text-cream/70">
              Terms of Service
            </Link>
            <p>Made in Canada, worn everywhere.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
