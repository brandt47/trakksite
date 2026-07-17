"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconClose, IconMenu } from "@/components/icons";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/our-story", label: "Our Story" },
  { href: "/lifestyle", label: "Lifestyle" },
  { href: "/faq", label: "FAQ" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Portals require the DOM; only render the overlay after mount.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex h-10 w-10 items-center justify-center text-cream md:hidden"
      >
        <IconMenu className="h-6 w-6" />
      </button>

      {mounted &&
        createPortal(
          <div className="md:hidden">
            {/* Backdrop */}
            <div
              onClick={() => setOpen(false)}
              className={`fixed inset-0 z-40 bg-charcoal/80 transition-opacity duration-300 ${
                open ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            />

            {/* Drawer */}
            <div
              className={`fixed inset-y-0 right-0 z-50 flex w-72 flex-col bg-forest shadow-2xl transition-transform duration-300 ease-in-out ${
                open ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between px-6 py-6">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-sand">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-cream/80 transition hover:text-cream"
                >
                  <IconClose className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1 px-4">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`rounded-xl px-4 py-3.5 text-lg font-medium transition ${
                      pathname === href
                        ? "bg-cream/10 text-cream"
                        : "text-cream/75 hover:bg-cream/5 hover:text-cream"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="px-6 pb-10 pt-4">
                <Link
                  href="/shop"
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-full bg-clay px-5 py-3 text-center text-sm font-semibold text-cream transition hover:bg-clay-light"
                >
                  Shop the Sock
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
