import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pynthamil Pavendan",
  description:
    "Design engineer and product builder crafting thoughtful software experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Geist:wght@300;400;450;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#F5F5FF] text-[#111111] antialiased selection:bg-neutral-200 selection:text-neutral-900">
        {children}
      </body>
    </html>
  );
}
