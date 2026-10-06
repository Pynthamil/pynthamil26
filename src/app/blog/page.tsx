import type { Metadata } from "next";
import { PortfolioView } from "@/components/PortfolioView";

export const metadata: Metadata = {
  title: "Blog — Pynthamil Pavendan",
  description: "Writings on software design, calm interfaces, and systems by Pynthamil Pavendan.",
  openGraph: {
    title: "Blog — Pynthamil Pavendan",
    description: "Writings on software design, calm interfaces, and systems by Pynthamil Pavendan.",
    type: "website",
    images: [
      {
        url: "/blog-covers/post4.png",
        width: 1200,
        height: 630,
        alt: "Blog — Pynthamil Pavendan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Pynthamil Pavendan",
    description: "Writings on software design, calm interfaces, and systems by Pynthamil Pavendan.",
    images: ["/blog-covers/post4.png"],
  },
};

export default function BlogPage() {
  return <PortfolioView initialViewMode="blog" />;
}
