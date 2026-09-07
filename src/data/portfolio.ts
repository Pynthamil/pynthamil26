export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  color: string;
  glowColor: string;
  url?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  isPrimary?: boolean;
}

export interface Project {
  title: string;
  description: string;
  year: string;
  link?: string;
  tags?: string[];
  status?: string;
  hoverText?: string;
}

export interface Post {
  title: string;
  date: string;
  readingTime: string;
  description: string;
  slug: string;
  content?: string[];
}

export interface PlaygroundItem {
  id: string;
  title: string;
  author: string;
  type: "SAVED" | "MINE";
  categories: string[];
  image: string;
  bgColor?: string;
  aspect?: string;
}

export interface PortfolioData {
  name: string;
  tagline?: string;
  location: string;
  status: string;
  statusPhrases: string[];
  bioHtml: string;
  experiences: ExperienceItem[];
  email: string;
  resumeUrl: string;
  about: {
    bio: string;
    skills: string[];
  };
  socialLinks: SocialLink[];
  navItems?: { id: string; label: string }[];
  showcase: any[];
  projects: Project[];
  writings: Post[];
  playground: PlaygroundItem[];
  lastPlayed?: {
    artist?: string;
    url: string;
    timeAgo?: string;
  };
}

export const portfolioData: PortfolioData = {
  name: "Pynthamil Pavendan",
  tagline: "I am a curious being who loves bringing the crazy ideas existing in my mind into reality through the sheer power of code.",
  location: "India",
  status: "Currently: making plue THE student haven",
  statusPhrases: [
    "Currently: making plue THE student haven",
    "Currently engineering at Plue",
    "Currently crafting calm software & design systems",
    "Currently exploring tactile micro-interactions",
  ],
  email: "pavendanpynthamil@gmail.com",
  resumeUrl: "https://drive.google.com/file/d/1_aeDI5PGaZttchMGSzkMBiEScwSsTEtj/view?usp=sharing",
  socialLinks: [
    { label: "email", href: "mailto:pavendanpynthamil@gmail.com", isPrimary: true },
    { label: "github", href: "https://github.com/Pynthamil", isPrimary: false },
    { label: "leetcode", href: "https://leetcode.com/u/HashKnight/", isPrimary: false },
    { label: "linkedin", href: "https://linkedin.com/in/pynthamil-pavendan", isPrimary: false },
    { label: "twitter", href: "https://x.com/pyndu15", isPrimary: false },
    { label: "resume", href: "https://drive.google.com/file/d/1_aeDI5PGaZttchMGSzkMBiEScwSsTEtj/view?usp=sharing", isPrimary: false },
  ],
  navItems: [
    { id: "all", label: "ALL" },
    { id: "experience", label: "EXPERIENCE" },
    { id: "projects", label: "PROJECTS" },
    { id: "writing", label: "WRITING" },
    { id: "about", label: "ABOUT" },
  ],
  bioHtml: `I'm an Engineering Intern at <a href="https://getplue.com/" target="_blank" rel="noopener noreferrer" class="text-[#111111] hover:underline underline-offset-4 decoration-neutral-400 font-normal">Plue</a>. I design and engineer thoughtful digital artifacts with high aesthetic precision, tactile interactions, and calm typography. You can see more of my work on <a href="https://github.com/Pynthamil" target="_blank" rel="noopener noreferrer" class="text-[#111111] hover:underline underline-offset-4 decoration-neutral-400 font-normal">GitHub</a>, <a href="https://linkedin.com/in/pynthamil-pavendan" target="_blank" rel="noopener noreferrer" class="text-[#111111] hover:underline underline-offset-4 decoration-neutral-400 font-normal">LinkedIn</a>, or reach out <a href="mailto:pavendanpynthamil@gmail.com" class="text-[#111111] hover:underline underline-offset-4 decoration-neutral-400 font-normal">via email</a>.`,
  about: {
    bio: "I'm a Design Engineer & Engineering Intern at Plue, focusing on building calm software, micro-interactions, and design systems. I believe the best software is unobtrusive, tactile, and crafted with obsessively high standards for speed and aesthetic restraint.",
    skills: [
      "Next.js & React Ecosystem",
      "Supabase & Backend Architecture",
      "Python & AI Scripting",
      "Figma & Design Systems",
      "Antigravity & Agentic Workflows",
    ],
  },
  showcase: [],
  projects: [
    {
      title: "FORK THIS SHEET",
      description: "Git for Google Sheets that lets users version, commit, and push spreadsheet changes like code. Makes it easier to safely experiment with important spreadsheets without losing or manually tracking changes.",
      year: "2026",
      link: "#",
      tags: ["Dev Tool", "Productivity", "Web"],
      status: "currently developing",
      hoverText: "currently developing",
    },
    {
      title: "ORCA.AI",
      description: "AI research assistant for marine science that turns scientific papers into clear, cited answers and insights. Helps researchers quickly discover, understand, and connect information from scattered marine research.",
      year: "2026",
      link: "#",
      tags: ["AI/ML", "LLM", "Data Viz"],
      status: "currently developing",
      hoverText: "currently developing",
    },
    {
      title: "SEMANTIC EMAIL COPILOT",
      description: "An intelligent context-aware email copilot synthesizing incoming threads, prioritizing actionable items, and drafting contextual responses.",
      year: "2026",
      link: "/semantic",
      tags: ["Figma", "UI/UX"],
      status: "Active",
    },
  ],
  writings: [
    {
      title: "Git Commit Go",
      date: "SEP 12, 2026",
      readingTime: "4 MIN",
      description: "At some point, just committing code isn’t enough. Learn how to interact with GitHub programmatically via the REST API.",
      slug: "git-commit-go",
    },
    {
      title: "The Art of Committing",
      date: "SEP 5, 2026",
      readingTime: "3 MIN",
      description: "Version control isn’t just about saving code — it’s about telling the story of how your ideas evolve. Tiny commits. Big growth.",
      slug: "art-of-committing",
    },
  ],
  experiences: [
    {
      id: "plue",
      company: "PLUE",
      role: "ENGINEERING INTERN",
      period: "SEP 2026 – NOV 2026",
      color: "#4e5df8",
      glowColor: "transparent",
      url: "https://getplue.com/",
    },
    {
      id: "scientiflow",
      company: "SCIENTIFLOW",
      role: "FRONTEND DEVELOPER INTERN",
      period: "MAY 2025 – JUL 2025",
      color: "#111111",
      glowColor: "transparent",
      url: "#",
    },
  ],
  playground: [],
  lastPlayed: {
    artist: "ENHYPEN",
    url: "https://music.apple.com/artist/enhypen/1539268390",
    timeAgo: "3h ago",
  },
};
