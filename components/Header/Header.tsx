//components/Header/Header.tsx

/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import Logo from '@/components/ui/Logo';
import { useAuthStore } from '@/store/authStore';
import { logoutUser } from '@/services/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const NAV_LINKS = [
  { href: '/shop', label: 'Shop' },
  { href: '/medicine', label: 'Medicine' },
  { href: '/statistics', label: 'Statistics' },
];

export default function Header() {
  const { isLoggedIn, clearAuth } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {}
    clearAuth();
    router.push('/login');
    toast.success('Logged out');
  };

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-8 lg:px-[100px]">
          <Logo href={isLoggedIn ? '/shop' : '/register'} />

          {isLoggedIn && (
            <>
              {/* Desktop nav */}
              <nav className="hidden items-center gap-1 rounded-full border border-border p-1 md:flex">
                {NAV_LINKS.map((l) => (
                  <Link key={l.href} href={l.href}
                    className={clsx(
                      'rounded-full px-5 py-2 text-sm font-medium transition no-underline',
                      isActive(l.href) ? 'bg-primary text-white' : 'text-text hover:bg-primary-10',
                    )}
                  >{l.label}</Link>
                ))}
              </nav>

              <div className="hidden md:block">
                <button onClick={handleLogout}
                  className="rounded-full border border-border px-6 py-2 text-sm font-medium text-text transition hover:border-primary hover:text-primary cursor-pointer"
                >Log out</button>
              </div>

              {/* Mobile burger */}
              <button className="md:hidden text-2xl cursor-pointer" onClick={() => setSidebarOpen(true)}>&#9776;</button>
            </>
          )}
        </div>
      </header>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="ml-auto flex h-full w-[280px] flex-col items-center justify-center gap-6 bg-primary p-8"
            onClick={(e) => e.stopPropagation()}>
            <button className="absolute right-4 top-4 text-3xl text-white cursor-pointer" onClick={() => setSidebarOpen(false)}>&times;</button>
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setSidebarOpen(false)}
                className={clsx(
                  'rounded-full px-8 py-3 text-base font-medium no-underline transition',
                  isActive(l.href) ? 'bg-white text-primary' : 'text-white border border-white/30 hover:bg-white/10',
                )}
              >{l.label}</Link>
            ))}
            <button onClick={handleLogout}
              className="mt-8 rounded-full border border-white/40 px-8 py-3 text-base text-white hover:bg-white/10 cursor-pointer"
            >Log out</button>
          </div>
        </div>
      )}
    </>
  );
}
