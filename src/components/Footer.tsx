import { IconMaple } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="bg-charcoal py-12 text-cream/70">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center sm:flex-row sm:justify-between sm:text-left sm:px-10">
        <div className="flex items-center gap-2">
          <IconMaple className="h-5 w-5 text-sand" />
          <span className="font-display text-lg font-semibold text-cream">
            TRAKK
          </span>
        </div>
        <p className="text-sm">
          Technical outdoor socks inspired by Canada&rsquo;s most beautiful
          landscapes.
        </p>
        <p className="text-xs text-cream/50">
          &copy; {new Date().getFullYear()} TRAKK. Made in Canada.
        </p>
      </div>
    </footer>
  );
}
