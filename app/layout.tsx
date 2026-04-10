import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: { default: "E-Pharmacy — Franchise", template: "%s | E-Pharmacy" },
  description: "Franchise management platform for online pharmacies.",
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-bg font-sans text-text antialiased">
        {children}
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </body>
    </html>
  );
}
