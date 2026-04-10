//app/(private)/layout.tsx

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { getSession } from "@/services/api";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Loader from "@/components/ui/Loader";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, isLoading, setAuth, clearAuth, setLoading } =
    useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      try {
        const res: any = await getSession();
        if (res?.name) {
          setAuth(res, "");
        } else {
          clearAuth();
          router.replace("/login");
        }
      } catch {
        clearAuth();
        router.replace("/login");
      }
    };
    if (!isLoggedIn) check();
    else setLoading(false);
  }, []);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-[1440px] px-5 py-6 md:px-8 md:py-10 xl:px-[100px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}