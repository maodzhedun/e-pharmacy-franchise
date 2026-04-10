//components/ui/Logo.tsx

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export default function Logo({ href = '/' }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 no-underline">
      <img src="/images/logo.svg" alt="E-Pharmacy" width={44} height={44} />
      <span className="text-base font-semibold text-text sm:text-lg">E-Pharmacy</span>
    </Link>
  );
}