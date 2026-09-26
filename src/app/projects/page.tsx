import { PortfolioView } from "@/components/PortfolioView";

export const metadata = {
  title: "Work — Pynthamil Pavendan",
  description: "Selected projects and engineering work by Pynthamil Pavendan.",
};

export default function ProjectsPage() {
  return <PortfolioView initialViewMode="projects" />;
}
