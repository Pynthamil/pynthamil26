export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  color: string;
  glowColor: string;
  url?: string;
  bullets?: string[];
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
  github?: string;
  tags?: string[];
  banner?: string;
  coverBg?: string;
  status?: string;
  category?: string;
  hoverText?: string;
  themeColor?: string;
  longDescription?: string;
  id?: string;
}

export interface Post {
  id?: string;
  title: string;
  date: string;
  readingTime: string;
  voiceTime?: string;
  description: string;
  slug: string;
  content?: string[];
  image?: string;
  category?: string;
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
  tagline: "i build things and figure out why people should care. most AI just sounds right. i build AI that shows you why. lately: a research assistant that won't cite anything it can't quote.",
  location: "India",
  status: "Upcoming: making plue THE student haven",
  statusPhrases: [
    "Upcoming: making plue THE student haven",
    "Upcoming engineering at Plue",
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
    { label: "twitter", href: "https://x.com/pynwrites", isPrimary: false },
    { label: "resume", href: "https://drive.google.com/file/d/1_aeDI5PGaZttchMGSzkMBiEScwSsTEtj/view?usp=sharing", isPrimary: false },
  ],
  navItems: [
    { id: "all", label: "ALL" },
    { id: "experience", label: "EXPERIENCE" },
    { id: "projects", label: "WORK" },
    { id: "writing", label: "WRITING" },
    { id: "about", label: "ABOUT" },
  ],
  bioHtml: `I'm an upcoming Engineering Intern at <a href="https://joinplue.com/" target="_blank" rel="noopener noreferrer" class="text-[#111111] hover:underline underline-offset-4 decoration-neutral-400 font-normal">Plue</a>. I design and engineer thoughtful digital artifacts with high aesthetic precision, tactile interactions, and calm typography. You can see more of my work on <a href="https://github.com/Pynthamil" target="_blank" rel="noopener noreferrer" class="text-[#111111] hover:underline underline-offset-4 decoration-neutral-400 font-normal">GitHub</a>, <a href="https://linkedin.com/in/pynthamil-pavendan" target="_blank" rel="noopener noreferrer" class="text-[#111111] hover:underline underline-offset-4 decoration-neutral-400 font-normal">LinkedIn</a>, or reach out <a href="mailto:pavendanpynthamil@gmail.com" class="text-[#111111] hover:underline underline-offset-4 decoration-neutral-400 font-normal">via email</a>.`,
  about: {
    bio: "I'm a Design Engineer & upcoming Engineering Intern at Plue, focusing on building calm software, micro-interactions, and design systems. I believe the best software is unobtrusive, tactile, and crafted with obsessively high standards for speed and aesthetic restraint.",
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
      title: "AI research assistant that turns complex marine science papers into clear, cited answers.",
      description: "ORCA",
      year: "2026",
      link: "/orca",
      banner: "/orca1.svg",
      coverBg: "/cover1-bg.svg",
      tags: ["AI/ML", "LLM", "Data Viz"],
      status: "Shipped",
      category: "Design + Engineering",
      themeColor: "#007FFF",
    },
    {
      title: "Turning inbox chaos into structured tasks, deadlines, and context.",
      description: "Semantic Email Copilot",
      year: "2026",
      link: "/semantic",
      tags: ["Figma", "UI/UX"],
      banner: "/semantic1.svg",
      status: "Concept",
      category: "Product Design",
      themeColor: "#6666FF",
    },
    {
      title: "Engineering Intern @ Plue — coming soon.",
      description: "Plue",
      year: "2026",
      link: "https://joinplue.com/",
      tags: ["Engineering", "Design"],
      status: "Coming Soon",
      category: "Design + Engineering",
      themeColor: "#111111",
      banner: "/plue.png",
    },

  ],
  writings: [
    {
      id: "git-commit-go",
      title: "Git Commit Go",
      date: "SEP 12, 2026",
      readingTime: "4 MIN",
      voiceTime: "4:06",
      description: "At some point, just committing code isn’t enough. Learn how to interact with GitHub programmatically via the REST API.",
      slug: "git-commit-go",
      image: "/blog-covers/post2.svg",
      category: "Engineering",
    },
    {
      id: "art-of-committing",
      title: "The Art of Committing",
      date: "SEP 5, 2026",
      readingTime: "3 MIN",
      voiceTime: "3:14",
      description: "Version control isn’t just about saving code — it’s about telling the story of how your ideas evolve. Tiny commits. Big growth.",
      slug: "art-of-committing",
      image: "/blog-covers/post1.svg",
      category: "Engineering",
    },
    {
      id: "so-here-i-am-on-the-internet",
      title: "So... Here I Am on the Internet",
      date: "AUG 28, 2026",
      readingTime: "3 MIN",
      voiceTime: "2:45",
      description: "Building my way out of frustration and documenting everything along the way. A safe space to try, fail, learn, repeat.",
      slug: "so-here-i-am-on-the-internet",
      image: "/blog-covers/post_intro.svg",
      category: "Personal",
    },
  ],
  experiences: [
    {
      id: "plue",
      company: "Plue",
      role: "ENGINEERING INTERN",
      period: "OCT 2026 – DEC 2026",
      color: "#4e5df8",
      glowColor: "transparent",
      url: "https://joinplue.com/",
      bullets: ["coming soon"],
    },
    {
      id: "scientiflow",
      company: "Scientiflow",
      role: "FRONTEND DEVELOPER INTERN",
      period: "MAY 2025 – JUL 2025",
      color: "#111111",
      glowColor: "transparent",
      url: "#",
      bullets: [
        "Designed and developed an interactive drag-and-drop interface for data visualization",
        "Implemented interactive CSV/JSON upload and preview interfaces for 10,000+ row datasets"
      ]
    },
    {
      id: "acm-vit",
      company: "ACM VIT",
      role: "CORE DESIGN MEMBER",
      period: "2025",
      color: "#0088FF",
      glowColor: "transparent",
      url: "https://acmvit.in/",
      bullets: [
        "Designed 12+ digital campaign posts for the InspiHer women-in-STEM initiative"
      ]
    },
  ],
  playground: [],
  lastPlayed: {
    artist: "ENHYPEN",
    url: "https://music.apple.com/artist/enhypen/1539268390",
    timeAgo: "3h ago",
  },
};
