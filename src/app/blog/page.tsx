import { PortfolioView } from "@/components/PortfolioView";

export const metadata = {
  title: "Blog — Pynthamil Pavendan",
  description: "Writings on software design, calm interfaces, and systems by Pynthamil Pavendan.",
};

export default function BlogPage() {
  return <PortfolioView initialViewMode="blog" />;
}
