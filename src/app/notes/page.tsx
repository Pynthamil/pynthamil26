import type { Metadata } from "next";
import { PortfolioView } from "@/components/PortfolioView";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pynthamil26.vercel.app";
const siteUrl = baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;

export const metadata: Metadata = {
  title: "Notes — Pynthamil Pavendan",
  description: "A minimalistic corner to leave a note, say hi, or share feedback.",
  openGraph: {
    title: "Notes — Pynthamil Pavendan",
    description: "A minimalistic corner to leave a note, say hi, or share feedback.",
    url: `${siteUrl}/notes`,
    siteName: "Pynthamil Pavendan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notes — Pynthamil Pavendan",
    description: "A minimalistic corner to leave a note, say hi, or share feedback.",
  },
};

export default function NotesPage() {
  return <PortfolioView initialViewMode="notes" />;
}
