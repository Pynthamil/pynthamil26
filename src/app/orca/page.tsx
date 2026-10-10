import type { Metadata } from "next";
import OrcaClientPage from "./OrcaClientPage";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pynthamil26.vercel.app";
const siteUrl = baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;

export const metadata: Metadata = {
  title: "ORCA — AI Science Copilot | Pynthamil Pavendan",
  description:
    "AI research assistant that turns complex marine science papers into clear, cited answers grounded directly in peer-reviewed literature with inspectable citations.",
  openGraph: {
    title: "ORCA — AI Science Copilot",
    description:
      "AI research assistant that turns complex marine science papers into clear, cited answers grounded directly in peer-reviewed literature.",
    url: `${siteUrl}/orca`,
    siteName: "Pynthamil Pavendan",
    type: "article",
    images: [
      {
        url: `${siteUrl}/orca_cover.png`,
        width: 1200,
        height: 630,
        alt: "ORCA — AI Science Copilot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ORCA — AI Science Copilot",
    description:
      "AI research assistant that turns complex marine science papers into clear, cited answers grounded directly in peer-reviewed literature.",
    images: [`${siteUrl}/orca_cover.png`],
  },
};

export default function OrcaPage() {
  return <OrcaClientPage />;
}
