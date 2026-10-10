import type { Metadata } from "next";
import SemanticClientPage from "./SemanticClientPage";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pynthamil26.vercel.app";
const siteUrl = baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;

export const metadata: Metadata = {
  title: "Semantic Email Copilot — Product Design Case Study | Pynthamil Pavendan",
  description:
    "Product Design & UI/UX case study: Turning inbox chaos into structured tasks, deadlines, and actionable context.",
  openGraph: {
    title: "Semantic Email Copilot — Product Design Case Study",
    description:
      "Turning inbox chaos into structured tasks, deadlines, and context with semantic AI classification.",
    url: `${siteUrl}/semantic`,
    siteName: "Pynthamil Pavendan",
    type: "article",
    images: [
      {
        url: `${siteUrl}/semantic_banner_phone.png`,
        width: 1200,
        height: 630,
        alt: "Semantic Email Copilot — Case Study",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Semantic Email Copilot — Product Design Case Study",
    description:
      "Turning inbox chaos into structured tasks, deadlines, and context with semantic AI classification.",
    images: [`${siteUrl}/semantic_banner_phone.png`],
  },
};

export default function SemanticPage() {
  return <SemanticClientPage />;
}
