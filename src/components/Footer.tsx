import Image from "next/image";
import Link from "next/link";
import { IconMaple, IconInstagram, IconFacebook, IconTikTok } from "@/components/icons";

const socialLinks = [
  { href: "https://www.instagram.com/trakkbyjack", label: "Instagram", Icon: IconInstagram },
  { href: "https://www.facebook.com/trakkbyjack", label: "Facebook", Icon: IconFacebook },
  { href: "https://www.tiktok.com/@trakkbyjack", label: "TikTok", Icon: IconTikTok },
];

const siteLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/our-story", label: "Our Story" },
  { href: "/lifestyle", label: "Lifestyle" },
  { href: "/faq", label: "FAQ" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal text-cream/70">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cream/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
        <div className="flex flex-col gap-12 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <Image
              src="/images/trakk-logo.png"
              alt="TRAKK"
              width={349}
              height={301}
              className="h-16 w-16 shrink-0 sm:h-20 sm:w-20"
            />
            <p className="mt-5 font-display text-2xl text-cream">
              Land on your feet
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-cream/50">
              <IconMaple className="h-4 w-4 text-clay" />
              Designed in Edmonton, made in Canada.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-cream/40 transition hover:text-cream/80"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
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
                  <Link href="/#waitlist" className="transition hover:text-clay-light">
                    Join the Waitlist
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-cream">
                Contact
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link href="/contact" className="transition hover:text-clay-light">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-cream/10 pt-6 text-xs text-cream/40 sm:flex-row sm:justify-between">
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

        <p className="mt-6 text-center text-[11px] leading-relaxed text-cream/30 sm:text-left">
          Trakk is led by Jack, Chief Adventure Officer. Any complaints may be
          directed to him.
        </p>
      </div>
    </footer>
  );
}
