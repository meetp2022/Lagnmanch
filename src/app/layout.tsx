import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl = "https://lagnmanch.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LagnManch – Kodi Patel Matrimonial Platform",
    template: "%s | LagnManch",
  },
  description:
    "A modern matrimonial platform built specifically for the Kodi Patel community. Find your perfect match from trusted Kodi Patel families across South Gujarat and beyond.",
  keywords: [
    "Kodi Patel matrimony",
    "Kodi Patel marriage",
    "Gujarati matrimonial",
    "Patel marriage",
    "LagnManch",
    "lagnmanch",
    "South Gujarat matrimony",
  ],
  authors: [{ name: "LagnManch" }],
  creator: "LagnManch",
  publisher: "LagnManch",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "LagnManch",
    title: "LagnManch – Kodi Patel Matrimonial Platform",
    description:
      "A modern matrimonial platform built specifically for the Kodi Patel community. Find your perfect match from trusted families.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LagnManch – Kodi Patel Matrimonial Platform",
    description:
      "A modern matrimonial platform built specifically for the Kodi Patel community.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "LagnManch",
  },
};

export const viewport: Viewport = {
  themeColor: "#800020",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased flex flex-col min-h-screen`}>
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
