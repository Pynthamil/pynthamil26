import Home from "../page";

export const metadata = {
  title: "Blog — Pynthamil Pavendan",
  description: "Writings on software design, calm interfaces, and systems by Pynthamil Pavendan.",
};

export default function BlogPage() {
  return <Home initialViewMode="blog" />;
}
