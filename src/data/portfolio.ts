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
}

export interface Post {
  title: string;
  date: string;
  readingTime: string;
  description: string;
  slug: string;
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
  tagline: "Engineering Intern at Plue. Building calm software and tactile design systems.",
  location: "India",
  status: "Currently engineering at Plue",
  statusPhrases: [
    "Currently engineering at Plue",
    "Currently joining testflight waitlists",
    "Currently crafting calm software & design systems",
    "Currently exploring tactile micro-interactions",
  ],
  email: "pynthamil@example.com",
  socialLinks: [
    { label: "email", href: "mailto:pynthamil@example.com", isPrimary: true },
    { label: "github", href: "https://github.com", isPrimary: false },
    { label: "linkedin", href: "https://linkedin.com", isPrimary: false },
    { label: "twitter", href: "https://x.com", isPrimary: false },
  ],
  navItems: [
    { id: "all", label: "ALL" },
    { id: "experience", label: "EXPERIENCE" },
    { id: "projects", label: "PROJECTS" },
    { id: "writing", label: "WRITING" },
    { id: "about", label: "ABOUT" },
  ],
  bioHtml: `I'm an Engineering Intern at <a href="https://plue.ai" target="_blank" rel="noopener noreferrer" class="text-[#111111] hover:underline underline-offset-4 decoration-neutral-400 font-normal">Plue</a>. I design and engineer thoughtful digital artifacts with high aesthetic precision, tactile interactions, and calm typography. You can see more of my work on <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="text-[#111111] hover:underline underline-offset-4 decoration-neutral-400 font-normal">GitHub</a>, <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="text-[#111111] hover:underline underline-offset-4 decoration-neutral-400 font-normal">LinkedIn</a>, or reach out <a href="mailto:pynthamil@example.com" class="text-[#111111] hover:underline underline-offset-4 decoration-neutral-400 font-normal">via email</a>.`,
  about: {
    bio: "I'm a Design Engineer & Engineering Intern at Plue, focusing on building calm software, micro-interactions, and design systems. I believe the best software is unobtrusive, tactile, and crafted with obsessively high standards for speed and aesthetic restraint.",
    skills: [
      "TypeScript & React Ecosystem",
      "Next.js App Router & Server Components",
      "Design Systems & Figma Component Architectures",
      "Tactile Micro-interactions & Physics",
      "Canvas & Web Audio Synthesizers",
      "TailwindCSS & Framer Motion",
    ],
  },
  showcase: [],
  projects: [
    {
      title: "ORCA RESEARCH PLATFORM",
      description: "Interactive AI research interface analyzing longitudinal datasets and cognitive behaviors with real-time vector charting.",
      year: "2025",
      link: "https://orca.ai",
      tags: ["Next.js", "Web Audio", "Data Viz"],
      status: "Production",
    },
    {
      title: "SEMANTIC MOBILE TIMELINE",
      description: "A chronological timeline interface exploring micro-haptics and fluid deadline management on mobile devices.",
      year: "2025",
      link: "#",
      tags: ["React Native", "Haptics", "Gestures"],
      status: "Active",
    },
    {
      title: "PIXEL BOOM AMBIENT CHAT",
      description: "Real-time communication widget crafted with playful physics, tactile micro-interactions, and vibrant color systems.",
      year: "2024",
      link: "#",
      tags: ["Canvas", "WebSocket", "Audio Engine"],
      status: "Completed",
    },
    {
      title: "PLUE DESIGN SYSTEM",
      description: "Comprehensive token system, component primitives, and tactile vector typography for digital consumer applications.",
      year: "2024",
      link: "https://plue.ai",
      tags: ["Design System", "Figma", "Radix UI"],
      status: "Live",
    },
  ],
  writings: [
    {
      title: "Designing Quiet Interfaces in the Age of Noise",
      date: "AUG 2026",
      readingTime: "4 MIN",
      description: "Why the best software is the one that disappears into the background and lets human intention breathe without endless push notifications.",
      slug: "quiet-interfaces",
    },
    {
      title: "Crafting Micro-Haptic Audio on the Modern Web",
      date: "JUN 2026",
      readingTime: "6 MIN",
      description: "Techniques for synthesizing dynamic subtle audio cues using the Web Audio API without adding payload bloat.",
      slug: "micro-haptic-audio",
    },
    {
      title: "The Architecture of Ambient AI Agents",
      date: "MAR 2026",
      readingTime: "5 MIN",
      description: "Exploring proactive contextual interactions that anticipate user needs calmly without constant popups or noisy banners.",
      slug: "ambient-ai-agents",
    },
  ],
  experiences: [
    {
      id: "plue",
      company: "PLUE",
      role: "ENGINEERING INTERN",
      period: "SEP 2026 – NOV 2026",
      color: "#4e5df8",
      glowColor: "rgba(78, 93, 248, 0.65)",
      url: "https://plue.ai",
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
