import { portfolioData } from "@/data/portfolio";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

export function generateStaticParams() {
  return portfolioData.writings.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = portfolioData.writings.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — Pynthamil Pavendan`,
    description: post.description,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = portfolioData.writings.find((p) => p.slug === params.slug);
  if (!post) {
    notFound();
  }
  return <BlogPostClient slug={params.slug} />;
}
