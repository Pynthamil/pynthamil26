import type { Metadata } from "next";
import QuippyClientPage from "./QuippyClientPage";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pynthamil26.vercel.app";
const siteUrl = baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;

export const metadata: Metadata = {
  title: "Quippy — Vulnerable Conversation Rooms | Pynthamil Pavendan",
  description:
    "Product Design & UX research case study: How might we make practising vulnerable conversations feel safe, natural, and useful?",
  openGraph: {
    title: "Quippy — Vulnerable Conversation Rooms",
    description:
      "Product Design & UX research case study exploring safe space environments for difficult interpersonal conversations.",
    url: `${siteUrl}/quippy`,
    siteName: "Pynthamil Pavendan",
    type: "article",
    images: [
      {
        url: `${siteUrl}/quippy/hmw-question.png`,
        width: 1200,
        height: 630,
        alt: "Quippy — Product Design Case Study",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quippy — Vulnerable Conversation Rooms",
    description:
      "Product Design & UX research case study exploring safe space environments for difficult interpersonal conversations.",
    images: [`${siteUrl}/quippy/hmw-question.png`],
  },
};

export default function QuippyPage() {
  return <QuippyClientPage />;
}
