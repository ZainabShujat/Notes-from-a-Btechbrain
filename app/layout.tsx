import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // <-- ADD THIS
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import Nav from "./components/Nav";
import NavWithCommunity from "./components/NavWithCommunityClient";
import Footer from "./components/Footer";
import ThemeLoader from "./components/ThemeLoader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notes From a BTech Brain",
  description: "Insights on tech, world events, and personal growth — by a BTech student.",
};


// Client wrapper for Nav to handle communityEnabled state
// const NavWithCommunity = dynamic(() => import("./components/NavWithCommunity"), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* ✅ GOOGLE ANALYTICS SCRIPT */}
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
        className={`${inter.variable} antialiased`}
      >
        <ThemeLoader />
        <NavWithCommunity />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
