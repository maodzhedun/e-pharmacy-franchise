//components/Footer/Footer.tsx

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

const SOCIAL = [
  { icon: 'icon-facebook', href: 'https://www.facebook.com/goITclub/' },
  { icon: 'icon-instagram', href: 'https://www.instagram.com/goitclub/' },
  { icon: 'icon-youtube', href: 'https://www.youtube.com/c/GoIT' },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-10 md:px-8 lg:px-[100px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/shop" className="mb-4 flex items-center gap-2 no-underline">
              <img src="/images/logo-footer.svg" alt="E-Pharmacy" width={44} height={44} className="h-[44px] w-[44px] brightness-0 invert" />
              <span className="text-lg font-bold text-white">E-Pharmacy</span>
            </Link>
            <p className="max-w-[280px] text-sm text-white/70 leading-relaxed">
              Created a drug franchise that embodies effective formulas and changes the approach to treatment.
            </p>
          </div>
          <nav className="flex gap-8 text-sm">
            <Link href="/shop" className="text-white no-underline hover:text-white/80 transition">Shop</Link>
            <Link href="/medicine" className="text-white no-underline hover:text-white/80 transition">Medicine</Link>
            <Link href="/statistics" className="text-white no-underline hover:text-white/80 transition">Statistics</Link>
          </nav>
          <ul className="flex gap-3 list-none">
            {SOCIAL.map((s) => (
              <li key={s.icon}>
                <a href={s.href} target="_blank" rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-white transition hover:bg-white/30">
                  <Icon id={s.icon} size={18} className="text-white" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-6 border-white/20" />
        <div className="flex flex-col gap-2 text-xs text-white/60 md:flex-row md:items-center md:justify-center md:gap-6">
          <span>&copy; E-Pharmacy 2023. All Rights Reserved</span>
          <span className="hidden md:inline">|</span>
          <span>Privacy Policy</span>
          <span className="hidden md:inline">|</span>
          <span>Terms &amp; Conditions</span>
        </div>
      </div>
    </footer>
  );
}

