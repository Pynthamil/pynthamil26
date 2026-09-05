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
      title: "ORCA RESEARCH PLATFORM",
      description: "Interactive AI research interface analyzing longitudinal datasets and cognitive behaviors with real-time vector charting.",
      year: "2026",
      link: "https://orca.ai",
      tags: ["Next.js", "Web Audio", "Data Viz"],
      status: "Production",
    },
    {
      title: "SEMANTIC MOBILE TIMELINE",
      description: "A chronological timeline interface exploring micro-haptics and fluid deadline management on mobile devices.",
      year: "2026",
      link: "#",
      tags: ["Figma", "Haptics", "Gestures"],
      status: "Active",
    },
    {
      title: "PLUE DESIGN SYSTEM",
      description: "Comprehensive token system, component primitives, and tactile vector typography for digital consumer applications.",
      year: "2026",
      link: "https://getplue.com/",
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
      content: [
        "Modern digital interfaces are louder than ever. Banners, modals, tooltip tours, and bright red badges compete aggressively for every fraction of our attention.",
        "Quiet software takes the opposite stance: it honors silence. It treats user attention as a finite, precious resource that should never be squandered on engagement metrics.",
        "When designing calm interfaces, clarity comes from constraint. We reduce sensory friction by embracing generous whitespace, predictable spatial hierarchies, and typography that guides rather than shouts.",
        "The goal isn't minimalism for the sake of aesthetics—it's about creating tools that feel lightweight, transparent, and entirely subservient to human intention."
      ],
    },
    {
      title: "Crafting Micro-Haptic Audio on the Modern Web",
      date: "JUN 2026",
      readingTime: "6 MIN",
      description: "Techniques for synthesizing dynamic subtle audio cues using the Web Audio API without adding payload bloat.",
      slug: "micro-haptic-audio",
      content: [
        "Sound on the web has historically suffered a bad reputation, largely due to auto-playing background tracks and screeching notification chimes.",
        "However, when used sparingly with physical tactile intuition, micro-audio feedback can ground digital interactions into tactile reality.",
        "Using the browser's native Web Audio API, we can generate pure sine wave pulses and micro-ramps on the fly without downloading external audio files or adding network latency.",
        "By fine-tuning gain ramps to under 80 milliseconds and frequencies between 440Hz and 880Hz, feedback feels crisp and haptic—like tapping high-grade physical switches."
      ],
    },
    {
      title: "The Architecture of Ambient AI Agents",
      date: "MAR 2026",
      readingTime: "5 MIN",
      description: "Exploring proactive contextual interactions that anticipate user needs calmly without constant popups or noisy banners.",
      slug: "ambient-ai-agents",
      content: [
        "Most current AI interfaces follow the conversational chatbot paradigm: an empty text box demanding prompt engineering.",
        "Ambient agents invert this pattern. Instead of waiting for explicit instructions, they observe state, anticipate friction points, and prepare contextual workflows silently.",
        "The key architectural challenge is deciding when to surface information. An effective agent executes in the background, surfacing only when confidence is high and user value is undeniable.",
        "When designed with calm ergonomics, AI ceases to be a novelty conversational partner and transforms into seamless, ambient intelligence."
      ],
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
