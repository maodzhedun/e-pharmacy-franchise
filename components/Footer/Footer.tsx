//components/Footer/Footer.tsx

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Logo from "@/components/ui/Logo";

const SOCIAL = [
  { label: "f", href: "https://www.facebook.com/goITclub/" },
  { label: "ig", href: "https://www.instagram.com/goitclub/" },
  { label: "yt", href: "https://www.youtube.com/c/GoIT" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1D1E21] text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-10 md:px-8 xl:px-[100px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/images/logo.svg"
                alt="E-Pharmacy"
                width={32}
                height={32}
              />
              <span className="text-lg font-bold">E-Pharmacy</span>
            </div>
            <p className="max-w-[280px] text-sm text-gray-400 leading-relaxed">
              Get the medicine to help you feel better, get back to your active
              life, and enjoy every moment.
            </p>
          </div>
          <nav className="flex gap-8 text-sm">
            <Link
              href="/shop"
              className="text-white no-underline hover:text-primary transition"
            >
              Shop
            </Link>
            <Link
              href="/medicine"
              className="text-white no-underline hover:text-primary transition"
            >
              Medicine
            </Link>
            <Link
              href="/statistics"
              className="text-white no-underline hover:text-primary transition"
            >
              Statistics
            </Link>
          </nav>
          <div className="flex gap-3">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-sm text-white transition hover:bg-primary"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <hr className="my-6 border-white/10" />
        <div className="flex flex-col gap-2 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">
          <span>&copy; E-Pharmacy 2023. All Rights Reserved</span>
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms &amp; Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
