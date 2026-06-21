import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-charcoal py-12 text-cream/70">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center sm:flex-row sm:justify-between sm:text-left sm:px-10">
        <Image
          src="/images/trakk-logo.png"
          alt="TRAKK"
          width={349}
          height={301}
          className="h-10 w-10"
        />
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
