import type { Metadata, Viewport } from "next";
import { Geist_Mono, Host_Grotesk, Instrument_Serif } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Menu } from "@/components/layout/menu";
import { SkipLink } from "@/components/layout/skip-link";
import { Providers } from "@/components/providers";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

import "./globals.css";

const sans = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f3ef",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={cn(sans.variable, serif.variable, mono.variable)}
    >
      <body className="bg-paper text-ink">
        <SkipLink />
        <Providers>
          <Header />
          <Menu />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
