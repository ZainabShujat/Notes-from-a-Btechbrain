import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // <-- ADD THIS
import "./globals.css";

import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  AUTHOR_NAME,
  DEFAULT_OG_IMAGE,
} from "../lib/seo";
import Nav from "./components/Nav";
import UpdatesWidget from "./components/UpdatesWidget";
import Footer from "./components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // metadataBase lets every relative image/canonical below resolve absolutely.
  metadataBase: new URL(SITE_URL),

  title: {
    // Pages set only their own name; the brand is appended here, once.
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR_NAME, url: "https://zainabshujat.dev/" }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,

  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: `${SITE_NAME} — RSS` }],
    },
  },

  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
    images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};


// Client wrapper for Nav to handle communityEnabled state
// const NavWithCommunity = dynamic(() => import("./components/NavWithCommunity"), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      {/* ✅ GOOGLE ANALYTICS SCRIPT */}
      <head>
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#05031a" />
      </head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-FWR505Z901"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FWR505Z901', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      <body
        suppressHydrationWarning
        className="antialiased text-ink-2"
      >
        <Nav />
        {children}
        <UpdatesWidget />
        <Footer />
      </body>
    </html>
  );
}
