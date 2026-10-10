import type { Metadata } from "next";
import CodedexClientPage from "./CodedexClientPage";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pynthamil26.vercel.app";
const siteUrl = baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;

export const metadata: Metadata = {
  title: "CodeDex Mobile — Gamified Coding Companion | Pynthamil Pavendan",
  description:
    "Product & Mobile Design case study: Gamified coding companion engineered for intuitive mobile learning.",
  openGraph: {
    title: "CodeDex Mobile — Gamified Coding Companion",
    description:
      "Gamified mobile learning experience designed for learning to code on the go.",
    url: `${siteUrl}/codedex`,
    siteName: "Pynthamil Pavendan",
    type: "article",
    images: [
      {
        url: `${siteUrl}/codedex/CourseScreen.png`,
        width: 1200,
        height: 630,
        alt: "CodeDex Mobile — Case Study",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeDex Mobile — Gamified Coding Companion",
    description:
      "Gamified mobile learning experience designed for learning to code on the go.",
    images: [`${siteUrl}/codedex/CourseScreen.png`],
  },
};

export default function CodedexPage() {
  return <CodedexClientPage />;
}
