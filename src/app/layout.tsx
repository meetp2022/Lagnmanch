import type { Metadata, Viewport } from "next";
import { Geist, Great_Vibes } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/components/LanguageProvider";
import { AuthProvider } from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { ToastProvider } from "@/components/ToastProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

const siteUrl = "https://lagnamanch.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LagnaManch – Kodi Patel Matrimonial Platform",
    template: "%s | LagnaManch",
  },
  description:
    "A modern matrimonial platform built specifically for the Kodi Patel community. Find your perfect match from trusted Kodi Patel families across South Gujarat and beyond.",
  keywords: [
    "Kodi Patel matrimony",
    "Kodi Patel marriage",
    "Gujarati matrimonial",
    "Patel marriage",
    "LagnaManch",
    "lagnamanch",
    "South Gujarat matrimony",
  ],
  authors: [{ name: "LagnaManch" }],
  creator: "LagnaManch",
  publisher: "LagnaManch",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "LagnaManch",
    title: "LagnaManch – Kodi Patel Matrimonial Platform",
    description:
      "A modern matrimonial platform built specifically for the Kodi Patel community. Find your perfect match from trusted families.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LagnaManch – Kodi Patel Matrimonial Platform",
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
  verification: {
    google: "QvGVWsQqjM9dodif5bNp4VOmcj0NfNPgn_p-V5soR0A",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "LagnaManch",
  },
};

export const viewport: Viewport = {
  themeColor: "#800020",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()` }} />
      </head>
      <body className={`${geistSans.variable} ${greatVibes.variable} antialiased flex flex-col min-h-screen`}>
        <LanguageProvider>
          <AuthProvider>
            <ToastProvider>
              <Navbar />
              <main className="flex-1 pb-16 md:pb-0">{children}</main>
              <Footer />
              <BottomNav />
            </ToastProvider>
          </AuthProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
