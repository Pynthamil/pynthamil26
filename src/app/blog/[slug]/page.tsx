import type { Metadata } from "next";
import { portfolioData } from "@/data/portfolio";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

export function generateStaticParams() {
  return portfolioData.writings.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = portfolioData.writings.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found" };

  const rawImage = post.image || "/blog-covers/post4.png";
  const ogImage = rawImage.replace(/\.svg$/, ".png");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pynthamil26.vercel.app";
  const absoluteOgImageUrl = ogImage.startsWith("http")
    ? ogImage
    : `${baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`;

  return {
    title: `${post.title} — Pynthamil Pavendan`,
    description: post.description,
    openGraph: {
      title: `${post.title} — Pynthamil Pavendan`,
      description: post.description,
      type: "article",
      url: `${baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`}/blog/${post.slug}`,
      siteName: "Pynthamil Pavendan",
      images: [
        {
          url: absoluteOgImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — Pynthamil Pavendan`,
      description: post.description,
      images: [absoluteOgImageUrl],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = portfolioData.writings.find((p) => p.slug === params.slug);
  if (!post) {
    notFound();
  }
  return <BlogPostClient slug={params.slug} />;
}
