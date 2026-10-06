import type { Metadata } from "next";
import "./globals.css";
import { CSPostHogProvider } from "./providers";
import { Poppins as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { CustomCursor } from "@/components/CustomCursor";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? (process.env.NEXT_PUBLIC_SITE_URL.startsWith("http")
      ? process.env.NEXT_PUBLIC_SITE_URL
      : `https://${process.env.NEXT_PUBLIC_SITE_URL}`)
  : "https://pynthamil26.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Pynthamil Pavendan",
    template: "%s",
  },
  description:
    "Design engineer and product builder crafting thoughtful software experiences.",
  openGraph: {
    title: "Pynthamil Pavendan",
    description:
      "Design engineer and product builder crafting thoughtful software experiences.",
    url: baseUrl,
    siteName: "Pynthamil Pavendan",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/blog-covers/post4.png",
        width: 1200,
        height: 630,
        alt: "Pynthamil Pavendan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pynthamil Pavendan",
    description:
      "Design engineer and product builder crafting thoughtful software experiences.",
    images: ["/blog-covers/post4.png"],
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/logo.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", "font-sans", fontSans.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="min-h-screen bg-white dark:bg-[#0E0E0F] text-[#111111] dark:text-[#F2F2F2] antialiased selection:bg-neutral-200 dark:selection:bg-neutral-800 selection:text-neutral-900 dark:selection:text-white">
        <CSPostHogProvider>
          <CustomCursor />
          {children}
        </CSPostHogProvider>
      </body>
    </html>
  );
}

