import type { Metadata } from "next";
import { PortfolioView } from "@/components/PortfolioView";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pynthamil26.vercel.app";
const siteUrl = baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;

export const metadata: Metadata = {
  title: "About — Pynthamil Pavendan",
  description: "Engineering Intern & Design Engineer crafting calm software, micro-interactions, and design systems.",
  openGraph: {
    title: "About — Pynthamil Pavendan",
    description: "Engineering Intern & Design Engineer crafting calm software, micro-interactions, and design systems.",
    url: `${siteUrl}/about`,
    siteName: "Pynthamil Pavendan",
    type: "profile",
    images: [
      {
        url: `${siteUrl}/blog-covers/post4.png`,
        width: 1200,
        height: 630,
        alt: "About — Pynthamil Pavendan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Pynthamil Pavendan",
    description: "Engineering Intern & Design Engineer crafting calm software, micro-interactions, and design systems.",
    images: [`${siteUrl}/blog-covers/post4.png`],
  },
};

export default function AboutPage() {
  return <PortfolioView initialViewMode="about" />;
}
