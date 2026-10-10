import type { Metadata } from "next";
import { PortfolioView } from "@/components/PortfolioView";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pynthamil26.vercel.app";
const siteUrl = baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;

export const metadata: Metadata = {
  title: "Work — Pynthamil Pavendan",
  description: "Selected design engineering projects, AI tools, and product work by Pynthamil Pavendan.",
  openGraph: {
    title: "Work — Pynthamil Pavendan",
    description: "Selected design engineering projects, AI tools, and product work by Pynthamil Pavendan.",
    url: `${siteUrl}/projects`,
    siteName: "Pynthamil Pavendan",
    type: "website",
    images: [
      {
        url: `${siteUrl}/blog-covers/post4.png`,
        width: 1200,
        height: 630,
        alt: "Work — Pynthamil Pavendan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work — Pynthamil Pavendan",
    description: "Selected design engineering projects, AI tools, and product work by Pynthamil Pavendan.",
    images: [`${siteUrl}/blog-covers/post4.png`],
  },
};

export default function ProjectsPage() {
  return <PortfolioView initialViewMode="projects" />;
}
