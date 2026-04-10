//app/(auth)/layout.tsx

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-bg">
      {/* Logo */}
      <div className="absolute left-5 top-5 z-10 md:left-8 md:top-8 xl:left-[100px] xl:top-10">
        <Link href="/register" className="flex items-center gap-2">
          <img src="/images/logo.svg" alt="E-Pharmacy" width={44} height={44} />
          <span className="text-base font-semibold text-text sm:text-lg">
            E-Pharmacy
          </span>
        </Link>
      </div>

      {/* Content — max 1440px centered */}
      <div className="mx-auto flex min-h-dvh max-w-[1440px] flex-col justify-center px-5 pt-24 pb-10 md:px-10 xl:flex-row xl:items-center xl:justify-between xl:px-[100px]">
        {/* Left — Text block */}
        <div className="relative mb-12 h-[192px] w-[335px] md:mb-16 md:h-[344px] md:w-[614px] xl:mb-0">
          {/* Pill — absolute, top-right, ABOVE text */}
          <img
            src="/images/pill.svg"
            alt=""
            className="pointer-events-none absolute right-[10px] top-[-60px] z-10 h-[93px] w-[95px] md:right-[130px] md:top-[-120px] md:h-[175px] md:w-[179px] xl:right-[10px] xl:top-[-100px]"
          />
          {/* Text */}
          <h1 className="relative z-0 text-[28px] font-bold leading-[1.15] text-text md:text-[40px] xl:text-[54px]">
            Your medication,
            <br />
            delivered Say goodbye
            <br />
            to all <span className="text-primary">your healthcare</span>
            <br />
            worries with us
          </h1>
        </div>

        {/* Right — Form */}
        <div className="w-full md:max-w-[323px] xl:w-[323px] xl:shrink-0">
          {children}
        </div>
      </div>

      {/* Decorative pills — bottom right */}
      <img
        src="/images/pills-decor.svg"
        alt=""
        width={279}
        height={257}
        className="pointer-events-none absolute -bottom-2 -right-2 z-0 md:bottom-0 md:right-0"
      />
    </main>
  );
}
