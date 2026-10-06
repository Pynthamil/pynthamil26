"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { HookSidebar } from "@/components/ui/hook-sidebar";
import { useParams } from "next/navigation";
import { portfolioData } from "@/data/portfolio";
import { Moon, Sun, Play, Link as LinkIcon, PieChart, Eye, ExternalLink, Copy, Check, Maximize2, X } from "lucide-react";
import { Footer } from "@/components/Footer";

function ZoomableImage({
  src,
  alt,
  className,
  containerClassName,
  onZoom,
}: {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  onZoom: (src: string, alt: string) => void;
}) {
  return (
    <div
      onClick={() => onZoom(src, alt)}
      className={`relative group cursor-pointer overflow-hidden rounded-xl select-none ${containerClassName || ""}`}
    >
      <img
        src={src}
        alt={alt}
        className={className || "w-full h-auto object-cover rounded-xl shadow-sm border border-neutral-200/60 dark:border-neutral-800/60 transition-transform duration-300 group-hover:scale-[1.008]"}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-xl pointer-events-none">
        <div className="bg-white/95 dark:bg-neutral-900/95 text-neutral-800 dark:text-neutral-100 px-5 py-3 rounded-md shadow-xl backdrop-blur-md transform scale-90 group-hover:scale-100 transition-transform duration-200 flex items-center gap-3 text-[18px] sm:text-[20px] font-medium font-sans">
          <Maximize2 className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
          <span>enlarge</span>
        </div>
      </div>
    </div>
  );
}

export default function BlogPostClient({ slug: propSlug }: { slug?: string }) {
  const params = useParams();
  const slug = propSlug || (params?.slug as string);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [views, setViews] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const hasFetchedRef = useRef<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    if (selectedImage) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  useEffect(() => {
    if (!slug) return;
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    fetch(`/api/views/${slug}?incr=true`)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.views === "number") {
          setViews(data.views);
        }
      })
      .catch((err) => console.error("Error fetching view count:", err));
  }, [slug]);

  
  // Table of Contents logic
  const [headings, setHeadings] = useState<{id: string, text: string}[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Find all h2 in the article
    const article = document.querySelector('article');
    if (!article) return;

    const elements = Array.from(article.querySelectorAll('h2'));
    const newHeadings = elements.map((el, index) => {
      // Give it an ID if it doesn't have one
      if (!el.id) {
        el.id = `heading-${index}`;
      }
      return {
        id: el.id,
        text: el.textContent || ''
      };
    });
    setHeadings(newHeadings);

    // Intersection Observer for highlighting
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, { rootMargin: '-10% 0px -80% 0px' }); // Trigger near the top

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Sync theme with localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    playTone(1046);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const post = portfolioData.writings.find((p) => p.slug === slug);

  // Web Audio synthesizer for tactile clicks
  const playTone = (freq: number = 880) => {
    if (!soundOn) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq / 2, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  };

  if (!post) {
    return (
      <div className="min-h-screen w-full flex flex-col justify-center items-center px-5 font-sans text-sm text-[#2C2C2C]">
        <p>Post not found.</p>
        <Link
          href="/blog"
          onClick={() => playTone(880)}
          className="mt-4 text-[#737373] hover:underline underline-offset-4 font-medium"
        >
          &larr; return to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center px-5 sm:px-8 md:px-12 pt-6 sm:pt-8 pb-6 selection:bg-neutral-200">
      {/* Soft atmospheric ambient glow */}
      <div className="ambient-glow" />

      {/* Main Container Wrapper - Grid Layout */}
      <main className="w-full relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_minmax(auto,640px)_1fr] max-w-[1400px] mx-auto">
        
        {/* Header & Hero Section (Row 1: Title, Date, Banner, Action Bar) */}
        <div className="lg:col-start-2 lg:row-start-1 w-full animate-in fade-in duration-200">
          <header className="flex items-center justify-between w-full mb-8">
            <Link
              href="/blog"
              onClick={() => playTone(880)}
              className="font-sans text-[17px] sm:text-[19px] tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#737373] dark:hover:text-[#a3a3a3] transition-colors flex items-center space-x-1.5 focus:outline-none font-medium cursor-pointer"
            >
              <span>&larr;</span>
              <span>blog</span>
            </Link>

            <div className="flex items-center space-x-3.5">
              <span className="flex items-center space-x-1.5 font-sans text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                <PieChart className="w-3.5 h-3.5 fill-current" strokeWidth={2} />
                <span>{post.readingTime.toLowerCase()} read</span>
              </span>
            </div>
          </header>

          {/* Article Header */}
          <div className="space-y-6">
            <div className="pb-5 text-center">
              <h1 className="instrument-serif text-[42px] sm:text-[48px] font-normal leading-tight text-[#2C2C2C] dark:text-[#F2F2F2]">
                {post.title.toLowerCase()}
              </h1>
              <div className="font-sans text-[16px] sm:text-[17px] text-[#525252] dark:text-[#a3a3a3] mt-2.5 flex items-center justify-center space-x-2">
                <span>{post.date.toLowerCase()}</span>
                <span>•</span>
                <span>pynthamil pavendan</span>
              </div>
            </div>

            {post.image && (
              <div className="w-full sm:w-[120%] sm:-ml-[10%] rounded-xl mt-6 mb-4 overflow-hidden">
                <ZoomableImage
                  src={post.image}
                  alt={`${post.title} Banner`}
                  className="w-full h-[350px] sm:h-[450px] object-cover rounded-xl"
                  onZoom={(s, a) => setSelectedImage({ src: s, alt: a })}
                />
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-end space-x-4 py-4 border-b border-neutral-200/70 dark:border-[#a3a3a3]/20 mb-8 text-[16.5px] sm:text-[17.5px] font-sans">
              <div className="flex items-center space-x-1.5 font-sans text-[16px] sm:text-[17px] text-[#525252] dark:text-[#a3a3a3]">
                <Eye className="w-4 h-4" />
                <span>{views !== null ? `${views} views` : "..."}</span>
              </div>
              <span className="text-neutral-300 dark:text-neutral-700 font-sans select-none">•</span>
              <button 
                onClick={handleShare}
                className="flex items-center space-x-2 font-medium text-[#2C2C2C] dark:text-[#F2F2F2] hover:opacity-70 transition-opacity"
              >
                <LinkIcon className="w-4 h-4" />
                <span>{isCopied ? "Copied!" : "Share"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table of Contents Sidebar (Aligned with Article body, sticky on scroll) */}
        {headings.length > 0 && (
          <aside className="hidden lg:block lg:col-start-1 lg:row-start-2 sticky top-24 self-start pt-2 justify-self-end pr-8 xl:pr-12 w-full max-w-[260px] max-h-[calc(100vh-7rem)] overflow-y-auto">
            <HookSidebar 
              items={headings.map(h => h.text)}
              value={headings.findIndex(h => h.id === activeId) !== -1 ? headings.findIndex(h => h.id === activeId) : 0}
              onChange={(index) => {
                 const h = headings[index];
                 if(h) {
                   document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
                   setActiveId(h.id);
                 }
              }}
              color="#FC4C01"
              dashed={true}
            />
          </aside>
        )}

        {/* Article Text Content (Row 2) */}
        <article className="lg:col-start-2 lg:row-start-2 w-full animate-in fade-in duration-200">

          {/* =========================================================
              ARTICLE: THE DESIGN PROJECT I'M MOST EMBARRASSED TO PUT IN MY PORTFOLIO
             ========================================================= */}
          {slug === "the-design-project-im-most-embarrassed-to-put-in-my-portfolio" && (
            <div className="space-y-8 text-[17.5px] sm:text-[18.5px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-[1.8] font-sans pt-1">
              {/* Intro */}
              <div className="space-y-4">
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Enter: My Very Serious Internship Plan
                </h2>
                <p>
                  We all have that one project (or maybe more) lurking at the bottom of our Figma drafts folder.
                </p>
                <p className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">
                  This is mine.
                </p>
                <p>
                  This summer, I decided to cold apply for a summer internship at Codédex by doing what any perfectly reasonable person would do: designing an entire mobile-first concept for them. (bare minimum, baby!)
                </p>
                <p className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">
                  Why?
                </p>
                <p>
                  Because I am madly in love with their gamified, pixel-y little universe, and I thought maybe I could sneak my way into their attention through Figma.
                </p>
                <p className="font-bold text-[#2C2C2C] dark:text-[#F2F2F2]">
                  SPOILER ALERT: I didn&apos;t.
                </p>
                <p>
                  I never even managed to reach them or capture their attention in the first place.
                </p>
                <p>
                  And, unfortunately, that wasn&apos;t even the most embarrassing part.
                </p>
                <p>
                  A few months later, I opened the Figma file again.
                </p>
                <p className="italic text-[#2C2C2C]/90 dark:text-[#F2F2F2]/90">
                  And realized the design wasn&apos;t very good either.
                </p>
              </div>

              {/* THE REALIZATION */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  THE REALIZATION
                </span>
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  How I got it so wrong
                </h2>

                <p>
                  I always thought good design meant something visually striking and aesthetically pleasing.
                </p>
                <p className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">
                  But boy, was I wrong.
                </p>
                <p>
                  From that narrow-minded POV, every single screen I designed seemed to be looking <em>really</em> good. I was obsessing over colors, spacing, animations, little pixel details, and all the tiny things that made the interface feel more like Codédex.
                </p>
                <p>
                  And somewhere along the way, I completely missed the whole point of designing in the first place:
                </p>

                <div className="bg-[#F7F7F7] dark:bg-[#141415] p-5 border-l-4 border-[#8A51FC] dark:border-[#CEBAFC] text-[#2C2C2C] dark:text-[#F2F2F2] font-semibold text-[18px] sm:text-[19px] leading-relaxed rounded-r-md">
                  I was so busy thinking about how the product looked that I forgot to think about how it worked.
                </div>

                <p>
                  At the time, I was already living in an alternate universe where I was an intern at Codédex, building and testing their shiny new mobile app before release.
                </p>
                <p className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">
                  In reality?
                </p>
                <p>
                  I was constructing a sensory-overload nightmare.
                </p>
                <p>
                  And the funniest part is that I genuinely couldn&apos;t see it.
                </p>
                <p>
                  I looked at a screen like this and thought:
                </p>
                <p className="font-semibold text-[19px] sm:text-[20px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  &ldquo;This is so Codédex.&rdquo;
                </p>
                <p>
                  What I should have been asking was:
                </p>
                <p className="font-semibold text-[19px] sm:text-[20px] text-[#8A51FC] dark:text-[#CEBAFC]">
                  &ldquo;Does this actually make learning easier?&rdquo;
                </p>
                <p>
                  I had taken everything I loved about Codédex &mdash; the pixels, the colors, the gamification, the little moments of delight &mdash; and kept adding more of it.
                </p>

                <ul className="space-y-2 pl-2 text-[17px] sm:text-[18px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#8A51FC] dark:text-[#CEBAFC] select-none pt-0.5">+</span>
                    <span>More badges.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#8A51FC] dark:text-[#CEBAFC] select-none pt-0.5">+</span>
                    <span>More cards.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#8A51FC] dark:text-[#CEBAFC] select-none pt-0.5">+</span>
                    <span>More interactions.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#8A51FC] dark:text-[#CEBAFC] select-none pt-0.5">+</span>
                    <span>More things happening on one screen.</span>
                  </li>
                </ul>

                <p>
                  Because every addition made the design feel more <em>designed</em>.
                </p>
                <p className="font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] text-[19px] sm:text-[20px]">
                  I had confused <strong>more with better.</strong>
                </p>
                <p>
                  And because I was designing for a company I desperately wanted to impress, I think I was also designing for an imaginary person on the other side of my cold email.
                </p>
                <p>
                  I wanted someone at Codédex to open my Figma file and think:
                </p>
                <p className="italic font-medium text-[#2C2C2C] dark:text-[#F2F2F2] pl-3 border-l-2 border-[#8A51FC]/40">
                  &ldquo;Oh wow. She gets us.&rdquo;
                </p>
                <p>
                  Instead, if they had actually opened it, they might have thought:
                </p>
                <p className="italic font-medium text-[#EF4444] dark:text-[#F87171] pl-3 border-l-2 border-[#EF4444]/40">
                  &ldquo;Girl, what is happening here?&rdquo;
                </p>
                <p className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">
                  And somehow, that still wasn&apos;t the part that bothered me most.
                </p>
              </div>

              {/* THE ROBOT MASCOT */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  VISUAL IDENTITY
                </span>
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  The Robot Had More Character Than the Product
                </h2>

                <p>
                  Before I completely roast this project, I have to give myself some credit.
                </p>
                <p>
                  I actually loved making the visual identity for it.
                </p>
                <p>
                  One of the things I loved most about Codédex was how much personality they managed to squeeze into their little pixel universe, so I wanted to push that even further for my concept.
                </p>
                <p className="font-semibold text-[#2C2C2C] dark:text-[#F2F2F2]">
                  And apparently, my solution was:
                </p>
                <p className="font-bold text-[20px] text-[#8A51FC] dark:text-[#CEBAFC]">
                  make a mascot.
                </p>
                <p>
                  So I started sketching.
                </p>
                <p>
                  Different outfits. Different expressions. Different poses. Different little props.
                </p>
                <p>
                  I would sketch these tiny ideas and then show them to my sister, who helped me turn my rough little drawings into the digital illustrations you see here. It became this weird little side project we were building together, and honestly, that might be one of my favorite parts of the whole thing.
                </p>
                <p>
                  Somehow, this tiny coding robot ended up with an entire wardrobe.
                </p>
                <p>
                  Before I knew it, I had created a whole little universe for a product that, unfortunately, did not exist.
                </p>
                <p>
                  But to be frank?
                </p>
                <p className="font-bold text-[19px] sm:text-[20px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  I still love these.
                </p>

                {/* Mascot Image 1 - codedex2.webp (1 Column) */}
                <div className="w-full my-6">
                  <ZoomableImage
                    src="/codedex/codedex2.webp"
                    alt="CodeDex Robot Mascot Wardrobe 2"
                    className="w-full h-auto object-contain rounded-xl"
                    onZoom={(s, a) => setSelectedImage({ src: s, alt: a })}
                  />
                </div>

                {/* Mascot Images 2 & 3 - codedex1.webp & codedex3.webp (2 Column Grid) */}
                <div className="w-full my-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-stretch">
                  <ZoomableImage
                    src="/codedex/codedex1.webp"
                    alt="CodeDex Robot Mascot Wardrobe 1"
                    containerClassName="w-full aspect-[4/3]"
                    className="w-full h-full object-cover rounded-xl shadow-sm border border-neutral-200/60 dark:border-neutral-800/60 transition-transform duration-300 group-hover:scale-[1.008]"
                    onZoom={(s, a) => setSelectedImage({ src: s, alt: a })}
                  />
                  <ZoomableImage
                    src="/codedex/codedex3.webp"
                    alt="CodeDex Robot Mascot Wardrobe 3"
                    containerClassName="w-full aspect-[4/3]"
                    className="w-full h-full object-cover rounded-xl shadow-sm border border-neutral-200/60 dark:border-neutral-800/60 transition-transform duration-300 group-hover:scale-[1.008]"
                    onZoom={(s, a) => setSelectedImage({ src: s, alt: a })}
                  />
                </div>

                {/* Color Palette - color-palette.webp (1 Column) */}
                <div className="w-full my-6">
                  <ZoomableImage
                    src="/codedex/color-palette.webp"
                    alt="CodeDex Color Palette & Visual System"
                    className="w-full h-auto object-contain rounded-xl"
                    onZoom={(s, a) => setSelectedImage({ src: s, alt: a })}
                  />
                </div>

                <p>
                  I wanted the mascot to feel like it belonged in the Codédex universe while still giving my concept its own personality. So I built the illustrations, color palette, expressions, and little scenes around it.
                </p>
                <p>
                  This was probably the first time I realized how much I enjoy the <em>visual storytelling</em> side of product design.
                </p>
                <p>
                  And ironically, this was also where I started noticing the problem.
                </p>
                <p>
                  I was getting very, very good at answering:
                </p>
                <p className="font-semibold text-[19px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  &ldquo;What should this look like?&rdquo;
                </p>
                <p>
                  I just wasn&apos;t asking enough:
                </p>
                <p className="font-bold text-[19px] text-[#8A51FC] dark:text-[#CEBAFC]">
                  &ldquo;What should this do?&rdquo;
                </p>
                <p className="italic text-[#2C2C2C]/90 dark:text-[#F2F2F2]/90">
                  And that distinction would come back to haunt me later.
                </p>
              </div>

              {/* THE SCREENS GALLERY */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  PROJECT GALLERY
                </span>
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Exhibit A: The Figma File
                </h2>
                <p>
                  Okay, enough talking.
                </p>
                <p className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">
                  Here&apos;s what I actually made.
                </p>

                {/* Screens1.webp - 1 Column Full Width */}
                <div className="w-full my-6">
                  <ZoomableImage
                    src="/codedex/Screens1.webp"
                    alt="CodeDex Mobile Screen 1"
                    className="w-full h-auto object-contain rounded-xl"
                    onZoom={(s, a) => setSelectedImage({ src: s, alt: a })}
                  />
                </div>

                {/* Screens2.webp - 1 Column Full Width */}
                <div className="w-full my-6">
                  <ZoomableImage
                    src="/codedex/Screens2.webp"
                    alt="CodeDex Mobile Solution Overview"
                    className="w-full h-auto object-contain rounded-xl"
                    onZoom={(s, a) => setSelectedImage({ src: s, alt: a })}
                  />
                </div>

                {/* Screens3.webp & Screens4.webp - 2 Column Grid */}
                <div className="w-full my-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <ZoomableImage
                    src="/codedex/Screens3.webp"
                    alt="CodeDex Interactive Screen 3"
                    className="w-full h-auto object-contain rounded-xl"
                    onZoom={(s, a) => setSelectedImage({ src: s, alt: a })}
                  />
                  <ZoomableImage
                    src="/codedex/Screens4.webp"
                    alt="CodeDex Interactive Screen 4"
                    className="w-full h-auto object-contain rounded-xl"
                    onZoom={(s, a) => setSelectedImage({ src: s, alt: a })}
                  />
                </div>

                {/* Screens5.webp - 1 Column Full Width */}
                <div className="w-full my-6">
                  <ZoomableImage
                    src="/codedex/Screens5.webp"
                    alt="CodeDex Interactive Screen 5"
                    className="w-full h-auto object-contain rounded-xl"
                    onZoom={(s, a) => setSelectedImage({ src: s, alt: a })}
                  />
                </div>

                {/* Screens6.webp & Screens7.webp - 2 Column Grid */}
                <div className="w-full my-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <ZoomableImage
                    src="/codedex/Screens6.webp"
                    alt="CodeDex Interactive Screen 6"
                    className="w-full h-auto object-contain rounded-xl"
                    onZoom={(s, a) => setSelectedImage({ src: s, alt: a })}
                  />
                  <ZoomableImage
                    src="/codedex/Screens7.webp"
                    alt="CodeDex Interactive Screen 7"
                    className="w-full h-auto object-contain rounded-xl"
                    onZoom={(s, a) => setSelectedImage({ src: s, alt: a })}
                  />
                </div>

                {/* Screens8.webp - 1 Column Full Width */}
                <div className="w-full my-6">
                  <ZoomableImage
                    src="/codedex/Screens8.webp"
                    alt="CodeDex Interactive Screen 8"
                    className="w-full h-auto object-contain rounded-xl"
                    onZoom={(s, a) => setSelectedImage({ src: s, alt: a })}
                  />
                </div>

                {/* Screens9.webp - 1 Column Full Width */}
                <div className="w-full my-6">
                  <ZoomableImage
                    src="/codedex/Screens9.webp"
                    alt="CodeDex Interactive Screen 9"
                    className="w-full h-auto object-contain rounded-xl"
                    onZoom={(s, a) => setSelectedImage({ src: s, alt: a })}
                  />
                </div>

                {/* Screens10.webp - 1 Column Full Width */}
                <div className="w-full my-6">
                  <ZoomableImage
                    src="/codedex/Screens10.webp"
                    alt="CodeDex Interactive Screen 10"
                    className="w-full h-auto object-contain rounded-xl"
                    onZoom={(s, a) => setSelectedImage({ src: s, alt: a })}
                  />
                </div>
              </div>

              {/* WHAT WENT HILARIOUSLY WRONG */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-6">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  THE CRIME SCENE
                </span>
                <h2 className="text-[28px] sm:text-[32px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  What went hilariously wrong
                </h2>

                <p className="font-semibold text-[18px] sm:text-[19px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  The funny thing about bad design is that it doesn&apos;t always look bad.
                </p>

                <p>Sometimes it looks polished.</p>
                <p>Sometimes it looks <em>really</em> good.</p>
                <p>
                  Sometimes you stare at your Figma file for three hours thinking, <em>&ldquo;holy shit, I might actually be onto something.&rdquo;</em>
                </p>
                <p>
                  And then, months later, you open it again and realize you spent all that time making the <strong>wrong thing look good.</strong>
                </p>
                <p className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">That was me.</p>

                {/* Point 1 */}
                <div className="pt-4 border-t border-neutral-200/40 dark:border-[#a3a3a3]/10 space-y-3">
                  <h3 className="font-sans text-[19px] sm:text-[21px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2]">
                    1. The UI was actually pretty good. The product thinking wasn&apos;t.
                  </h3>
                  <p>I still kind of like how it looks.</p>
                  <p>
                    I designed the mascot, illustrations, colors, cards, and an entire visual language specifically for Codédex.
                  </p>
                  <p>
                    The problem was that I was <strong>solving the wrong problem really, really pretty.</strong>
                  </p>
                  <p className="italic text-[#2C2C2C]/90 dark:text-[#F2F2F2]/90">
                    Making something beautiful is only useful when you&apos;re making the <em>right</em> thing beautiful.
                  </p>
                  <p className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">
                    And unfortunately, I had several examples of exactly how I managed to get that wrong.
                  </p>
                </div>

                {/* Point 2 */}
                <div className="pt-4 border-t border-neutral-200/40 dark:border-[#a3a3a3]/10 space-y-3">
                  <h3 className="font-sans text-[19px] sm:text-[21px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2]">
                    2. I made the home screen do absolutely everything.
                  </h3>
                  <p>My biggest inspiration? <strong>Amazon.</strong></p>
                  <p>
                    I loved how much Amazon could surface on one screen, so naturally I thought:
                  </p>
                  <p className="italic font-medium text-[#2C2C2C] dark:text-[#F2F2F2] pl-3 border-l-2 border-[#8A51FC]/40">
                    &ldquo;What if I did that... but for learning to code?&rdquo;
                  </p>
                  <p>
                    So I crammed in Trending Courses, Beginner Courses, Latest Courses, progress, and probably someone&apos;s blood type.
                  </p>
                  <p>
                    Except I was borrowing an information architecture designed for <strong>browsing and buying</strong> and applying it to something meant for <strong>learning and focusing.</strong>
                  </p>
                  <p className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Slightly different goals.</p>
                  <p>I should have asked <em>why</em> the pattern worked before borrowing it.</p>
                  <p>Instead, I saw a pattern that looked useful and immediately decided it belonged in my product.</p>
                  <p className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">
                    And apparently, Amazon wasn&apos;t the only thing I was borrowing without understanding.
                  </p>
                </div>

                {/* Point 3 */}
                <div className="pt-4 border-t border-neutral-200/40 dark:border-[#a3a3a3]/10 space-y-3">
                  <h3 className="font-sans text-[19px] sm:text-[21px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2]">
                    3. Typography salad
                  </h3>
                  <p>
                    I couldn&apos;t pick between serif, sans-serif, and monospace, so naturally, I chose all three.
                  </p>
                  <p className="font-medium text-[#8A51FC] dark:text-[#CEBAFC]">
                    Five fonts. Sixteen font sizes.
                  </p>
                  <p>
                    It looked like a ransom note written by a designer on four cups of espresso.
                  </p>
                  <p>
                    I was slowly learning that not every design decision needs to scream for attention.
                  </p>
                  <p>But at least typography was fixable.</p>
                  <p className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">
                    My next problem was a little more catastrophic.
                  </p>
                </div>

                {/* Point 4 */}
                <div className="pt-4 border-t border-neutral-200/40 dark:border-[#a3a3a3]/10 space-y-3">
                  <h3 className="font-sans text-[19px] sm:text-[21px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2]">
                    4. Zero Auto Layout
                  </h3>
                  <p>
                    Back then, Auto Layout felt like black magic I didn&apos;t want to touch.
                  </p>
                  <p>
                    So every card, icon, label, and button was manually dragged into place, pixel by pixel.
                  </p>
                  <p>
                    The second I changed <strong>&ldquo;Start&rdquo;</strong> to <strong>&ldquo;Begin Focus Session,&rdquo;</strong> the entire right column collapsed into a catastrophic pile of overlapping boxes.
                  </p>
                  <p>I wasn&apos;t designing a responsive interface.</p>
                  <p className="font-semibold text-[#EF4444] dark:text-[#F87171]">I was building a house of cards.</p>
                  <p>
                    Turns out, reusable components aren&apos;t just about saving time. They force you to think about how a product behaves beyond one perfect screenshot.
                  </p>
                  <p>And honestly, that was probably the first time Figma itself started exposing the gaps in my thinking.</p>
                  <p>But the biggest gap wasn&apos;t in my components.</p>
                  <p className="font-semibold text-[#2C2C2C] dark:text-[#F2F2F2]">
                    It was in <strong>who I was designing for.</strong>
                  </p>
                </div>

                {/* Point 5 */}
                <div className="pt-4 border-t border-neutral-200/40 dark:border-[#a3a3a3]/10 space-y-3">
                  <h3 className="font-sans text-[19px] sm:text-[21px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2]">
                    5. I designed for Codédex, not Codédex users.
                  </h3>
                  <p>
                    I was so obsessed with their visual identity that <strong>&ldquo;make it feel like Codédex&rdquo;</strong> became my entire brief.
                  </p>
                  <p className="text-[#8A51FC] dark:text-[#CEBAFC] font-medium">
                    Pixels. Colors. Gamification. Animations. Badges. More pixels.
                  </p>
                  <p>But I wasn&apos;t asking:</p>
                  <ul className="space-y-1.5 pl-3 italic font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">
                    <li>Who is this for?</li>
                    <li>What problem am I solving?</li>
                    <li>Why does this need to exist?</li>
                  </ul>
                  <p>
                    I was recreating the <em>feeling</em> of Codédex without really understanding the people using it.
                  </p>
                  <div className="bg-[#F7F7F7] dark:bg-[#141415] p-4 border-l-4 border-[#8A51FC] text-[#2C2C2C] dark:text-[#F2F2F2] font-semibold rounded-r-md">
                    You can understand a company&apos;s aesthetic perfectly and still completely misunderstand its users.
                  </div>
                  <p className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2] pt-1">
                    Which brings me to what might be my most embarrassing confession.
                  </p>
                </div>

                {/* Point 6 */}
                <div className="pt-4 border-t border-neutral-200/40 dark:border-[#a3a3a3]/10 space-y-3">
                  <h3 className="font-sans text-[19px] sm:text-[21px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2]">
                    6. My user research consisted of:
                  </h3>
                  <ol className="space-y-1.5 pl-4 list-decimal font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">
                    <li>Me.</li>
                    <li>My opinions.</li>
                    <li>&ldquo;I would probably use this.&rdquo;</li>
                  </ol>
                  <p>No interviews. No usability tests. No validation.</p>
                  <p>Just pure vibes and an increasingly confident Figma file.</p>
                  <p className="italic text-[#2C2C2C]/90 dark:text-[#F2F2F2]/90">God, it&apos;s embarrassing.</p>
                  <p>The worst part?</p>
                  <p className="font-bold text-[19px] text-[#2C2C2C] dark:text-[#F2F2F2]">The vibes were immaculate.</p>
                  <p>Everything looked polished enough to convince me I was making good decisions.</p>
                  
                  <blockquote className="my-6 py-5 px-6 border-l-4 border-[#8A51FC] bg-[#F7F7F8] dark:bg-[#151517] rounded-r-xl">
                    <p className="text-[24px] sm:text-[28px] instrument-serif italic font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                      &ldquo;Everything looked polished enough to convince me I was making good decisions. But confidence isn&apos;t evidence.&rdquo;
                    </p>
                  </blockquote>

                  <p>And I had a lot of confidence.</p>
                  <p className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Maybe too much.</p>
                </div>

                {/* Point 7 */}
                <div className="pt-4 border-t border-neutral-200/40 dark:border-[#a3a3a3]/10 space-y-3">
                  <h3 className="font-sans text-[19px] sm:text-[21px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2]">
                    7. The imaginary internship
                  </h3>
                  <p>Meanwhile, in my head, I was already an intern at Codédex.</p>
                  <p>Shipping the app. Running usability tests. Looking at analytics. Iterating on onboarding.</p>
                  <p>Maybe even getting a return offer.</p>
                  <p className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">In reality?</p>
                  <p className="font-bold text-[19px] sm:text-[20px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                    Codédex had no idea this Figma file existed.
                  </p>
                  <p>I was conducting product strategy meetings at a company that had never hired me.</p>
                  <p>And honestly, the broken Auto Layout and typography salad aren&apos;t what embarrass me most.</p>
                  <p className="font-semibold text-[#2C2C2C] dark:text-[#F2F2F2]">
                    It&apos;s how confidently I made decisions without knowing whether they were right.
                  </p>
                  <p>I used to think being a good designer meant having good taste.</p>
                  
                  <blockquote className="my-6 py-5 px-6 border-l-4 border-[#8A51FC] bg-[#F7F7F8] dark:bg-[#151517] rounded-r-xl">
                    <p className="text-[24px] sm:text-[28px] instrument-serif italic font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                      &ldquo;Good taste is only the starting point. The harder part is knowing when your taste is getting in the way of actually solving a problem.&rdquo;
                    </p>
                  </blockquote>

                  <p>I didn&apos;t need another font, another animation, or another card.</p>
                  <p>I needed to stop designing for a minute and ask:</p>
                  <p className="font-bold text-[20px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                    &ldquo;What am I actually trying to solve?&rdquo;
                  </p>
                  <p>I had opened Figma before I had really figured out what I was designing.</p>
                  <p className="italic font-medium text-[#2C2C2C]/90 dark:text-[#F2F2F2]/90 pt-1">
                    And that might have been the most useful mistake I made all summer.
                  </p>
                </div>
              </div>

              {/* THIS TIME, I ASKED THE RIGHT QUESTIONS */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  GROWTH &amp; CASE STUDY
                </span>
                <h2 className="text-[28px] sm:text-[32px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  This Time, I Asked the Right Questions
                </h2>

                <p>
                  A few months after Codédex, I started working on another product design project: <a href="/semantic" className="font-semibold text-[#8A51FC] dark:text-[#CEBAFC] hover:underline underline-offset-4">Semantic Email</a>.
                </p>

                <p>
                  And this time, I did something that sounds embarrassingly obvious now.
                </p>

                <p className="font-bold text-[19px] sm:text-[20px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  I didn&apos;t start with Figma.
                </p>

                <p>
                  I started with the problem.
                </p>

                <p>
                  I looked at real student and faculty inbox workflows across dozens of active inboxes. One finding stood out: <strong>over 75% of the cognitive overload came from low-signal emails hiding the things people actually needed to act on &mdash; deadlines, follow-ups, and important requests.</strong>
                </p>

                <p>
                  That finding completely changed how I thought about the product.
                </p>

                <p>
                  I wasn&apos;t just trying to make email <em>look</em> less overwhelming. I was trying to figure out <strong>what information actually mattered and how to surface it at the right moment.</strong>
                </p>

                <p>
                  So I researched. I mapped out the problem. I thought through the user flows. I questioned my assumptions.
                </p>

                <p className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">
                  And only then did I open Figma.
                </p>

                <p>
                  The funny thing is, I don&apos;t think I had suddenly become a much better UI designer.
                </p>

                <p>
                  I still cared about typography. I still obsessed over spacing. I still spent way too long making things look nice.
                </p>

                <p className="font-semibold text-[19px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  But this time, <strong>the pretty screens came after the thinking, not instead of it.</strong>
                </p>

                <p>
                  And when I put Semantic Email next to my old Codédex project, I could finally see the difference.
                </p>

                <p>
                  Codédex was me asking:
                </p>
                <p className="font-semibold text-[19px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  &ldquo;What would look cool?&rdquo;
                </p>

                <p>
                  Semantic Email was me asking:
                </p>
                <p className="font-bold text-[19px] sm:text-[20px] text-[#8A51FC] dark:text-[#CEBAFC]">
                  &ldquo;What would actually help?&rdquo;
                </p>

                <p className="italic font-medium text-[#2C2C2C]/90 dark:text-[#F2F2F2]/90">
                  That shift probably mattered more than any new Figma skill I picked up.
                </p>
                <p>
                  Because I don&apos;t think the biggest change was that I had become better at designing.
                </p>
                <p className="font-semibold text-[19px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  I had become better at <strong>deciding what was worth designing.</strong>
                </p>
              </div>

              {/* EMBRACE YOUR CRINGEY DRAFTS */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <h2 className="text-[28px] sm:text-[32px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Embrace your cringey drafts
                </h2>

                <p>
                  If you look back at something you made 1&ndash;2 years ago and feel embarrassed, congratulations!
                </p>

                <p className="font-bold text-[19px] sm:text-[20px] text-[#8A51FC] dark:text-[#CEBAFC]">
                  Your taste evolved faster than your old work could keep up.
                </p>

                <p>
                  And honestly, I think that&apos;s a good thing.
                </p>

                <p className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">
                  Keep the ugly drafts around.
                </p>

                <p>
                  They&apos;re little time capsules of who you were, what you knew, and what you thought was a good idea at the time.
                </p>

                <p>
                  Because eventually, you&apos;ll open one, cringe a little, laugh a lot, and realize:
                </p>

                <p className="font-bold text-[20px] sm:text-[22px] text-[#2C2C2C] dark:text-[#F2F2F2] pt-1">
                  &ldquo;Wait. I actually got better.&rdquo; 🤍
                </p>

                <p className="italic text-[#525252] dark:text-[#a3a3a3] pt-4 border-t border-neutral-200/40 dark:border-[#a3a3a3]/10">
                  I still haven&apos;t deleted the Codédex Figma file.
                </p>
                <p className="italic text-[#525252] dark:text-[#a3a3a3]">
                  Mostly because I&apos;m sentimental.
                </p>
                <p className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">
                  But also because it&apos;s a pretty good reminder to <strong>think before I open Figma.</strong>
                </p>
              </div>
            </div>
          )}

          {/* =========================================================
              ARTICLE: MY PORTFOLIO AND ITS NEVER-ENDING VERSIONS
             ========================================================= */}
          {slug === "my-portfolio-and-its-never-ending-versions" && (
            <div className="space-y-8 text-[17.5px] sm:text-[18.5px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-[1.8] font-sans pt-1">
              {/* Intro */}
              <div className="space-y-4">
                <p>
                  Building a personal website is never really finished, it evolves as design sense, technical skills, and tastes change over time.
                </p>
                <p className="font-sans text-[16px] sm:text-[17px] text-[#525252] dark:text-[#a3a3a3]">
                  Here is a look at the iterations and versions of my portfolio.
                </p>
              </div>

              {/* VERSION 7 */}
              <div className="pt-4 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-[36px] sm:text-[42px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-none">
                    Version 7
                  </h2>
                  <button
                    type="button"
                    onClick={() => handleCopyUrl("https://pynthamil26.vercel.app/")}
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-md border-0 bg-[#FCE7F3] dark:bg-[#500724]/70 text-[#DB2777] dark:text-[#FBCFE8] hover:bg-[#FBCFE8] dark:hover:bg-[#831843] font-sans text-[15px] sm:text-[16px] font-medium transition-all cursor-pointer select-none"
                  >
                    <span>{copiedUrl === "https://pynthamil26.vercel.app/" ? "copied!" : "copy link"}</span>
                    {copiedUrl === "https://pynthamil26.vercel.app/" ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4 opacity-80" />
                    )}
                  </button>
                </div>
                <div className="space-y-3 text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                  <p>
                    I was inspired largely by Rachel Chen for listing the experiences on the hero section (because that is genius as recruiters can see my experience right away!) and I also made project preview cards (inspired by Vivian Zhao — the pill design which has the category of the project because that way people can know what each project was about, since I had quite a few people asking me for my &quot;design&quot; projects when it was right there along with the &quot;dev&quot; ones, so I knew I had to add a category so it&apos;s easier to navigate).
                  </p>
                  <p>
                    Also inspired by Rachel Chen for my project preview card for Orca having some after effects... that was a wild experience for me since I&apos;m a beginner on that front.
                  </p>
                  <p>
                    Wanted to keep my about and blog sections very simple so ended up cutting a lot of text from the about page (hurt a lot cause I&apos;m a certified yapper!).
                  </p>
                </div>
              </div>

              {/* VERSION 6 */}
              <div className="pt-6 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-[36px] sm:text-[42px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-none">
                    Version 6
                  </h2>
                </div>
                <div className="space-y-3 text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                  <p>
                    I loved the tealish green that GitButler used so I implemented it as an accent in my website. As for the fonts, I sort of switched between the But-Head font and the Instrument Serif font for titles and some parts of the website.
                  </p>
                  <p>
                    Also this is the 1st time I discovered Grok bots and ended up falling for them as well (sorry Clawd, my Shayla!) then there were some complications with mobile version so switched back to Clawd itself (that&apos;s what I get!).
                  </p>
                  <p>
                    But I had been noticing that people who visit my site don&apos;t even open the detailed projects page of each project or any other page, they all stay on the homescreen for a very short time (how do I know this? All thanks to my baby, PostHog!).
                  </p>
                  <p>
                    It was then that I realised why mostly senior designers or design engineers had these type of portfolios — because they had their years and years of experience, meanwhile I didn&apos;t. I&apos;m still very early on in my career so I knew I had to buckle up for another iteration anyway! That&apos;s how my current version was born (as of 5 Oct, 2026).
                  </p>
                </div>

                <div className="space-y-6 pt-2">
                  <ZoomableImage
                    src="/blog-assets/v6.svg"
                    alt="Portfolio V6 Asset"
                    onZoom={(s, a) => setSelectedImage({ src: s, alt: a })}
                  />
                </div>
              </div>

              {/* VERSION 5 */}
              <div className="pt-6 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-[36px] sm:text-[42px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-none">
                    Version 5
                  </h2>
                </div>
                <div className="space-y-3 text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                  <p>
                    I was doom scrolling WallofPortfolios and found some cool portfolios of senior designers and loved it a lot, but at the same time wanted to maintain some personality instead of plain B&amp;W templated and cookie cutter.
                  </p>
                  <p>
                    Got inspired by radicle.dev for the color palette/theme. But as much as I avoided it, I still ended up going sort of black and white in the next version anyway...
                  </p>
                </div>

                <div className="space-y-6 pt-2">
                  <ZoomableImage
                    src="/blog-assets/v5.svg"
                    alt="Portfolio V5 Asset"
                    onZoom={(s, a) => setSelectedImage({ src: s, alt: a })}
                  />
                </div>
              </div>

              {/* VERSION 4 */}
              <div className="pt-6 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-[36px] sm:text-[42px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-none">
                    Version 4
                  </h2>
                  <button
                    type="button"
                    onClick={() => handleCopyUrl("https://software-portfolio-ecru.vercel.app/")}
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-md border-0 bg-[#F3E8FF] dark:bg-[#3B0764]/70 text-[#9333EA] dark:text-[#E9D5FF] hover:bg-[#E9D5FF] dark:hover:bg-[#581C87] font-sans text-[15px] sm:text-[16px] font-medium transition-all cursor-pointer select-none"
                  >
                    <span>{copiedUrl === "https://software-portfolio-ecru.vercel.app/" ? "copied!" : "copy link"}</span>
                    {copiedUrl === "https://software-portfolio-ecru.vercel.app/" ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4 opacity-80" />
                    )}
                  </button>
                </div>
                <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                  I wanted to make something recruiter friendly but at the same time something that screams ME. This is also the portfolio that got me my first proper internship &lt;3 but sadly the dropdowns are not that recruiter friendly.
                </p>

                <div className="space-y-6 pt-2">
                  {[
                    "/blog-assets/v4.1.svg",
                    "/blog-assets/v4.2.svg",
                    "/blog-assets/v4.3.svg",
                    "/blog-assets/v4.4.svg",
                    "/blog-assets/v4.5.svg",
                  ].map((src, idx) => (
                    <ZoomableImage
                      key={src}
                      src={src}
                      alt={`Portfolio V4 Asset ${idx + 1}`}
                      onZoom={(s, a) => setSelectedImage({ src: s, alt: a })}
                    />
                  ))}
                </div>
              </div>

              {/* VERSION 3 */}
              <div className="pt-6 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-[36px] sm:text-[42px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-none">
                    Version 3
                  </h2>
                  <button
                    type="button"
                    onClick={() => handleCopyUrl("https://ctfp1.vercel.app")}
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-md border-0 bg-[#FFEDD5] dark:bg-[#431407]/70 text-[#EA580C] dark:text-[#FFEDD5] hover:bg-[#FED7AA] dark:hover:bg-[#7C2D12] font-sans text-[15px] sm:text-[16px] font-medium transition-all cursor-pointer select-none"
                  >
                    <span>{copiedUrl === "https://ctfp1.vercel.app" ? "copied!" : "copy link"}</span>
                    {copiedUrl === "https://ctfp1.vercel.app" ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4 opacity-80" />
                    )}
                  </button>
                </div>
                <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                  I really love Clawd so much (Claude Code mascot) and I&apos;m someone who loves terminal interfaces a lot, so I got super inspired by it and made this version. Probably my most fav portfolio version of all time, but sadly this is very recruiter unfriendly so had to painfully move on from this masterpiece.
                </p>

                <div className="space-y-6 pt-2">
                  {[
                    "/blog-assets/v3.1.svg",
                    "/blog-assets/v3.2.svg",
                    "/blog-assets/v3.3.svg",
                    "/blog-assets/v3.4.svg",
                    "/blog-assets/v3.5.svg",
                    "/blog-assets/v3.6.svg",
                  ].map((src, idx) => (
                    <ZoomableImage
                      key={src}
                      src={src}
                      alt={`Portfolio V3 Asset ${idx + 1}`}
                      onZoom={(s, a) => setSelectedImage({ src: s, alt: a })}
                    />
                  ))}
                </div>
              </div>

              {/* VERSION 2 */}
              <div className="pt-6 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-[36px] sm:text-[42px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-none">
                    Version 2
                  </h2>
                </div>
                <div className="space-y-3 text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                  <p>
                    I was super inspired by Marco&apos;s portfolio (<a href="https://www.marco.fyi/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80 transition-opacity">https://www.marco.fyi/</a>) and created a very Applesque portfolio. It was very clean but I felt like somehow it was pretty complicated and I really didn&apos;t like it a lot... it seemed very dry and plain.
                  </p>
                  <p>
                    So unlike me (I&apos;m a really cheerful bundle of joy man I ain&apos;t gotta be so plain). So yea out! I threw the portfolio into my trash folder (just kidding it&apos;s still live but gonna take it down soon).
                  </p>
                  <p>
                    I really loved the project preview cards a lot tho but decided to take them off because most of the portfolios I found were having these high quality polished mockups instead of these vibrant ones of mine. Still sad about it tho.
                  </p>
                </div>

                <div className="space-y-6 pt-2">
                  {[
                    "/blog-assets/v2.1.svg",
                    "/blog-assets/v2.2.svg",
                    "/blog-assets/v2.3.svg",
                    "/blog-assets/v2.4.svg",
                    "/blog-assets/v2.5.svg",
                    "/blog-assets/v2.6.svg",
                  ].map((src, idx) => (
                    <ZoomableImage
                      key={src}
                      src={src}
                      alt={`Portfolio V2 Asset ${idx + 1}`}
                      onZoom={(s, a) => setSelectedImage({ src: s, alt: a })}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              ARTICLE 1: GIT COMMIT GO
             ========================================================= */}
          {slug === "git-commit-go" && (
            <div className="space-y-8 text-[17.5px] sm:text-[18.5px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-[1.8] font-sans pt-1">
              {/* Intro */}
              <div className="space-y-4">
                <p>At some point, just committing code isn’t enough.</p>
                <p className="font-sans text-[16.5px] sm:text-[17.5px] text-[#525252] dark:text-[#a3a3a3]">You start wondering:</p>
                <p className="italic text-[#2C2C2C] dark:text-[#F2F2F2] pl-3 border-l-2 border-[#525252]/40 dark:border-[#a3a3a3]/40">
                  can I interact with GitHub programmatically?
                </p>
                <p>
                  That’s where the <span className="font-medium text-[#525252] dark:text-[#a3a3a3]">GitHub REST API</span> comes in.
                </p>
                <p className="text-[16px] sm:text-[17px] font-sans text-[#525252] dark:text-[#a3a3a3] pt-1">It lets you:</p>
                <ul className="space-y-2.5 pl-1 text-[17px] sm:text-[18px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>create repositories automatically</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>fetch repository data</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>automate workflows</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>build tools that interact with GitHub</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>understand what’s happening behind the UI</span>
                  </li>
                </ul>
                <p className="font-sans text-[16px] sm:text-[17px] text-[#525252] dark:text-[#a3a3a3] pt-1">
                  Let’s walk through the basics.
                </p>
              </div>

              {/* THE CONCEPT */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  THE CONCEPT
                </span>
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  What is the GitHub REST API?
                </h2>
                <p>
                  The GitHub REST API allows developers to communicate with GitHub using HTTP requests.
                </p>
                <p className="text-[16px] sm:text-[17px] font-sans text-[#525252] dark:text-[#a3a3a3]">
                  Instead of clicking buttons on GitHub’s website, you can send requests like:
                </p>
                <ul className="space-y-2.5 pl-1 text-[17px] sm:text-[18px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm sm:text-[15px] bg-[#F7F7F7] dark:bg-[#141415] px-2 py-0.5 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-semibold text-[#525252] dark:text-[#a3a3a3]">GET</span>
                    <span>&rarr; retrieve data</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm sm:text-[15px] bg-[#F7F7F7] dark:bg-[#141415] px-2 py-0.5 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-semibold text-[#525252] dark:text-[#a3a3a3]">POST</span>
                    <span>&rarr; create data</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm sm:text-[15px] bg-[#F7F7F7] dark:bg-[#141415] px-2 py-0.5 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-semibold text-[#525252] dark:text-[#a3a3a3]">PATCH</span>
                    <span>&rarr; update data</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm sm:text-[15px] bg-[#F7F7F7] dark:bg-[#141415] px-2 py-0.5 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-semibold text-[#525252] dark:text-[#a3a3a3]">DELETE</span>
                    <span>&rarr; remove data</span>
                  </li>
                </ul>
                <p className="italic text-[#2C2C2C]/90 dark:text-[#F2F2F2]/90 pt-1">
                  Think of it as a bridge between your application and GitHub.
                </p>
              </div>

              {/* THE ENDPOINT */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  STEP 1
                </span>
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Choose an endpoint
                </h2>
                <p>
                  GitHub provides many API endpoints depending on what you want to do.
                </p>
                <p className="text-[16px] sm:text-[17px] font-sans text-[#525252] dark:text-[#a3a3a3]">
                  Example endpoint for repositories:
                </p>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] px-4 py-3 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2] break-all">
                  https://api.github.com/user/repos
                </div>
                <p>
                  This endpoint allows you to retrieve repositories connected to your account.
                </p>
                <p className="text-[16px] sm:text-[17px] font-sans text-[#525252] dark:text-[#a3a3a3] pt-1">Each endpoint defines:</p>
                <ul className="space-y-2 pl-1 text-[17px] sm:text-[18px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>request method</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>parameters</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>response structure</span>
                  </li>
                </ul>
                <div className="pt-2">
                  <p className="text-[16px] sm:text-[17px] font-sans text-[#525252] dark:text-[#a3a3a3] mb-1">Documentation:</p>
                  <a
                    href="https://docs.github.com/en/rest/repos/repos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#737373] dark:text-[#a3a3a3] hover:underline underline-offset-4 decoration-wavy decoration-[#737373] dark:decoration-[#a3a3a3] font-sans text-[15px] sm:text-[16px] break-all font-medium"
                  >
                    https://docs.github.com/en/rest/repos/repos
                  </a>
                </div>
              </div>

              {/* Step 2 */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  STEP 2
                </span>
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Generate a Personal Access Token (PAT)
                </h2>
                <p>GitHub requires authentication for most API requests.</p>
                <p>We generate a Personal Access Token.</p>
                <p className="text-[16px] sm:text-[17px] font-sans text-[#525252] dark:text-[#a3a3a3]">Steps:</p>
                <ul className="space-y-2.5 pl-1 text-[17px] sm:text-[18px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none font-semibold pt-0.5">1.</span>
                    <span>Go to GitHub Settings</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none font-semibold pt-0.5">2.</span>
                    <span>Scroll to Developer Settings</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none font-semibold pt-0.5">3.</span>
                    <span>Select Personal Access Tokens</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none font-semibold pt-0.5">4.</span>
                    <span>Generate new token</span>
                  </li>
                </ul>
                <p className="text-[16px] sm:text-[17px] font-sans text-[#525252] dark:text-[#a3a3a3] pt-1">Choose:</p>
                <ul className="space-y-2 pl-1 text-[17px] sm:text-[18px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>token name</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>expiration duration</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>required permissions</span>
                  </li>
                </ul>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] p-4 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2] space-y-1.5 mt-2">
                  <div className="text-[#525252] dark:text-[#a3a3a3] font-semibold">Copy the token immediately.</div>
                  <div>GitHub will not show it again.</div>
                  <div className="text-[#525252] dark:text-[#a3a3a3]">Treat it like a password.</div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  STEP 3
                </span>
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Send request using Postman
                </h2>
                <p>Postman helps test API requests easily.</p>
                <p className="text-[16px] sm:text-[17px] font-sans text-[#525252] dark:text-[#a3a3a3]">Example GET request:</p>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] px-4 py-3 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2] break-all">
                  https://api.github.com/user/repos
                </div>
                <p className="text-[16px] sm:text-[17px] font-sans text-[#525252] dark:text-[#a3a3a3]">Add Authorization header:</p>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] px-4 py-3 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2] break-all leading-relaxed">
                  Authorization: Bearer YOUR_PERSONAL_ACCESS_TOKEN
                </div>
                <p>Send request. GitHub returns data in JSON format.</p>
              </div>

              {/* Example create repo */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Example &mdash; create repository via API
                </h2>
                <p className="text-[16px] sm:text-[17px] font-sans text-[#525252] dark:text-[#a3a3a3]">POST request:</p>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] p-4 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2] space-y-1.5 overflow-x-auto leading-relaxed">
                  <div>curl -X POST https://api.github.com/user/repos \</div>
                  <div className="pl-4">-H &quot;Authorization: Bearer YOUR_PERSONAL_ACCESS_TOKEN&quot; \</div>
                  <div className="pl-4">-H &quot;Accept: application/vnd.github+json&quot; \</div>
                  <div className="pl-4">-d &apos;{`{"name":"my-new-repo","private":false}`}&apos;</div>
                </div>
                <ul className="space-y-1 pl-1 text-[16px] sm:text-[17px] font-sans text-[#525252] dark:text-[#a3a3a3]">
                  <li> Replace YOUR_PERSONAL_ACCESS_TOKEN with your token.</li>
                  <li> Replace my-new-repo with repository name.</li>
                </ul>
              </div>

              {/* Example response */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Example response
                </h2>
                <p>GitHub responds with structured JSON data:</p>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] p-4 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2] space-y-1.5 overflow-x-auto leading-relaxed">
                  <div>{`{`}</div>
                  <div className="pl-4">{`"name": "my-new-repo",`}</div>
                  <div className="pl-4">{`"private": false,`}</div>
                  <div className="pl-4">{`"owner": {`}</div>
                  <div className="pl-8">{`"login": "username"`}</div>
                  <div className="pl-4">{`}`}</div>
                  <div>{`}`}</div>
                </div>
                <p className="italic text-[#2C2C2C]/90 dark:text-[#F2F2F2]/90">
                  The API confirms repository creation and returns metadata.
                </p>
              </div>

              {/* Why learn GitHub API */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Why learn GitHub API?
                </h2>
                <p>Understanding the API allows you to:</p>
                <ul className="space-y-2.5 pl-1 text-[17px] sm:text-[18px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>automate workflows</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>build developer tools</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>create dashboards</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>manage repositories programmatically</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>integrate GitHub with apps</span>
                  </li>
                </ul>
                <div className="pt-2 font-sans text-[16px] sm:text-[17px] text-[#525252] dark:text-[#a3a3a3]">
                  <p>Git becomes more than version control.</p>
                  <p className="text-[#525252] dark:text-[#a3a3a3] font-semibold mt-0.5">It becomes programmable infrastructure.</p>
                </div>
              </div>

              {/* Mental model */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Mental model
                </h2>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] p-4 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2] space-y-2 leading-relaxed">
                  <div><span className="font-semibold text-[#525252] dark:text-[#a3a3a3]">Git CLI</span> &rarr; manage code locally</div>
                  <div><span className="font-semibold text-[#525252] dark:text-[#a3a3a3]">GitHub UI</span> &rarr; manage repos visually</div>
                  <div><span className="font-semibold text-[#525252] dark:text-[#a3a3a3]">GitHub API</span> &rarr; manage everything programmatically</div>
                </div>
              </div>

              {/* If you're just starting */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  If you&apos;re just starting
                </h2>
                <p className="text-[16px] sm:text-[17px] font-sans text-[#525252] dark:text-[#a3a3a3]">Focus on understanding:</p>
                <ul className="space-y-2.5 pl-1 text-[17px] sm:text-[18px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>request</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>response</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>authentication</span>
                  </li>
                </ul>
                <p className="font-sans text-[16px] sm:text-[17px] text-[#525252] dark:text-[#a3a3a3] pt-1">
                  Everything else becomes easier with practice.
                </p>
              </div>
            </div>
          )}

          {/* =========================================================
              ARTICLE 2: THE ART OF COMMITTING
             ========================================================= */}
          {slug === "art-of-committing" && (
            <div className="space-y-8 text-[17.5px] sm:text-[18.5px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-[1.8] font-sans pt-1">
              {/* Intro */}
              <div className="space-y-4">
                <p>At first, Git might seem very scary and daunting.</p>
                <p>
                  You see words like <span className="font-mono text-sm sm:text-[15px] bg-[#F7F7F7] dark:bg-[#141415] px-2 py-0.5 border border-[#737373]/20 dark:border-[#a3a3a3]/30 text-[#525252] dark:text-[#a3a3a3]">commit</span>,{" "}
                  <span className="font-mono text-sm sm:text-[15px] bg-[#F7F7F7] dark:bg-[#141415] px-2 py-0.5 border border-[#737373]/20 dark:border-[#a3a3a3]/30 text-[#525252] dark:text-[#a3a3a3]">branch</span>,{" "}
                  <span className="font-mono text-sm sm:text-[15px] bg-[#F7F7F7] dark:bg-[#141415] px-2 py-0.5 border border-[#737373]/20 dark:border-[#a3a3a3]/30 text-[#525252] dark:text-[#a3a3a3]">merge</span>,{" "}
                  <span className="font-mono text-sm sm:text-[15px] bg-[#F7F7F7] dark:bg-[#141415] px-2 py-0.5 border border-[#737373]/20 dark:border-[#a3a3a3]/30 text-[#525252] dark:text-[#a3a3a3]">rebase</span>… and suddenly you&apos;re scared to even touch the keyboard.
                </p>
                <p>
                  But once it clicks, everything falls into place like the pieces of a puzzle you&apos;ve been spending your time trying to solve.
                </p>
                <p>
                  Version control isn&apos;t just about saving code &mdash; it&apos;s about telling the story of how your ideas evolve.
                </p>

              </div>

              {/* Section 1 */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  What even is a commit?
                </h2>
                <p>A commit is basically a saved checkpoint of your project.</p>
                <p className="text-[16px] sm:text-[17px] font-sans text-[#525252] dark:text-[#a3a3a3]">Think of it like:</p>
                <ul className="space-y-2.5 pl-1 text-[17px] sm:text-[18px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>a save button for your code</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>a time machine for your project</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>proof that you did something productive today</span>
                  </li>
                </ul>
                <p className="text-[16px] sm:text-[17px] font-sans text-[#525252] dark:text-[#a3a3a3] pt-1">Each commit captures:</p>
                <ul className="space-y-2 pl-1 text-[17px] sm:text-[18px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>what changed</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>when it changed</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>why it changed (if your commit message is good)</span>
                  </li>
                </ul>
                <p className="italic text-[#2C2C2C]/90 dark:text-[#F2F2F2]/90 pt-1">
                  Instead of one giant messy save, Git encourages small meaningful updates. Because progress looks better in chapters than in chaos.
                </p>
              </div>

              {/* Section 2 */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Basic Commands (tiny cheat sheet)
                </h2>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] p-4 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2] space-y-1.5 leading-relaxed">
                  <div>git init</div>
                  <div>git add .</div>
                  <div>git commit -m &quot;message&quot;</div>
                  <div>git push origin main</div>
                </div>
                <p className="font-sans text-[16px] sm:text-[17px] text-[#525252] dark:text-[#a3a3a3]">Simple, but powerful.</p>
              </div>

              {/* Step 1 */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  STEP 1
                </span>
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Initialize the repository
                </h2>
                <p>
                  First, I start by initializing the project repository that I’m working on, on my local device.
                </p>
                <p>
                  This converts a normal project folder into a Git repository so changes can be tracked.
                </p>
                <div className="font-sans text-[16px] sm:text-[17px] text-[#525252] dark:text-[#a3a3a3] py-1">
                  Project Repository &rarr; Git Repository
                </div>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] px-4 py-3 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  git init
                </div>
              </div>

              {/* Step 2 */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  STEP 2
                </span>
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Stage the files
                </h2>
                <p>
                  Next, I stage the files whose changes I want Git to track.
                </p>
                <p>
                  Think of staging like selecting which updates you want included in the next checkpoint.
                </p>
                <div className="font-sans text-[16px] sm:text-[17px] text-[#525252] dark:text-[#a3a3a3] py-1">
                  Changed/New Files &rarr; staged files for tracking new changes &rarr; changes now tracked
                </div>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] p-4 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2] space-y-1.5">
                  <div>git add .</div>
                  <div className="text-[#2C2C2C]/50 dark:text-[#F2F2F2]/50 text-xs pt-1">// or specific files</div>
                  <div>git add index.js</div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  STEP 3
                </span>
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Write meaningful commit messages
                </h2>
                <p>
                  Now I write a clean, clear, and concise commit message to make a note of what changes I made.
                </p>
                <p>
                  Good commit messages help both present-you and future-you understand what happened.
                </p>
                <p className="text-[16px] sm:text-[17px] font-sans text-[#525252] dark:text-[#a3a3a3]">Examples:</p>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] p-4 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[16px] sm:text-[17px] space-y-1.5 text-[#2C2C2C] dark:text-[#F2F2F2]">
                  <div>feat: add profile picture upload</div>
                  <div>fix: correct typo in navbar</div>
                  <div>chore: update dependencies</div>
                </div>
                <p className="text-[16px] sm:text-[17px] font-sans text-[#525252] dark:text-[#a3a3a3] pt-1">Quick guide:</p>
                <ul className="space-y-2.5 pl-1 text-[17px] sm:text-[18px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none font-semibold pt-0.5">feat</span>
                    <span>&rarr; adding a new feature or functionality</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none font-semibold pt-0.5">fix</span>
                    <span>&rarr; correcting something that was broken</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none font-semibold pt-0.5">chore</span>
                    <span>&rarr; changes that don&apos;t affect the app behaviour directly (configs, dependencies, build tasks)</span>
                  </li>
                </ul>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] px-4 py-3 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2] mt-2">
                  git commit -m &quot;feat: add search bar&quot;
                </div>
              </div>

              {/* Step 4 */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  STEP 4
                </span>
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Push changes to GitHub
                </h2>
                <p>
                  After writing a good commit message, I push the changes to the main branch.
                </p>
                <p>
                  This uploads the local changes to the remote repository (GitHub).
                </p>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] px-4 py-3 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  git push origin main
                </div>
                <p className="italic text-[#2C2C2C]/90 dark:text-[#F2F2F2]/90">
                  Now the changes are backed up and visible online.
                </p>
              </div>

              {/* GitHub Repo Creation */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Creating a repository on GitHub
                </h2>
                <p>If you don&apos;t already have a repo:</p>
                <div className="font-sans text-[16px] sm:text-[17px] text-[#525252] dark:text-[#a3a3a3] py-0.5">
                  GitHub &rarr; click the + icon &rarr; New repository
                </div>
                <p className="text-[16px] sm:text-[17px] font-sans text-[#525252] dark:text-[#a3a3a3]">Choose:</p>
                <ul className="space-y-2 pl-1 text-[17px] sm:text-[18px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>repository name</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>visibility (public or private)</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>optional description</span>
                  </li>
                </ul>
                <p>Then connect your local project to this repo.</p>
              </div>

              {/* Pull Requests */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Working in collaborative environments (pull requests)
                </h2>
                <p>
                  If you&apos;re contributing to a repository where you don&apos;t have direct permission to modify the main branch, you create a pull request.
                </p>
                <p>
                  A pull request allows maintainers to review your changes before merging them into the main branch.
                </p>
                <p>This helps keep projects stable and organized.</p>
              </div>

              {/* Always sync */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Always sync before starting work
                </h2>
                <p>
                  Before I start working in my local repository, I always make sure to sync and pull changes first.
                </p>
                <p>
                  Sometimes (almost all the time) when I forget this step, I run into merge conflicts.
                </p>
                <p className="text-[#2C2C2C] dark:text-[#F2F2F2]">
                  And then I wish myself good luck… because I will definitely be needing it and probably 10 years of life span 🤡
                </p>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] px-4 py-3 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  git pull origin main
                </div>
              </div>

              {/* Quick summary workflow */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Quick summary workflow
                </h2>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] p-4 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2] space-y-2 leading-relaxed">
                  <div>git init</div>
                  <div>git add .</div>
                  <div>git commit -m &quot;I&apos;m so done&quot;</div>
                  <div>git push origin main</div>
                </div>
                <p className="font-sans text-[16px] sm:text-[17px] text-[#525252] dark:text-[#a3a3a3]">
                  Repeat until the project magically works.
                </p>
              </div>

              {/* Helpful learning resources */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Helpful learning resources
                </h2>

                <div className="space-y-2.5">
                  <h3 className="font-sans text-[15px] sm:text-[16px] uppercase tracking-wider text-[#525252] dark:text-[#a3a3a3] font-semibold">
                    Articles / Blogs
                  </h3>
                  <ul className="space-y-2 text-[16.5px] sm:text-[17.5px]">
                    <li>
                      <a
                        href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#737373] dark:text-[#a3a3a3] hover:underline underline-offset-4 decoration-wavy decoration-[#737373] dark:decoration-[#a3a3a3] font-medium"
                      >
                        Complete Tutorial of Git and GitHub for Basic to Advanced &mdash; Sachinsoni
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#737373] dark:text-[#a3a3a3] hover:underline underline-offset-4 decoration-wavy decoration-[#737373] dark:decoration-[#a3a3a3] font-medium"
                      >
                        I don’t Git it &mdash; Rick Martinez
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#737373] dark:text-[#a3a3a3] hover:underline underline-offset-4 decoration-wavy decoration-[#737373] dark:decoration-[#a3a3a3] font-medium"
                      >
                        Git Full Tutorial &mdash; How to Use Git in a Real Project &mdash; Saikiran Kalidindi
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2.5 pt-2">
                  <h3 className="font-sans text-[15px] sm:text-[16px] uppercase tracking-wider text-[#525252] dark:text-[#a3a3a3] font-semibold">
                    YouTube Tutorials
                  </h3>
                  <ul className="space-y-2 text-[16.5px] sm:text-[17.5px]">
                    <li>
                      <a
                        href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#737373] dark:text-[#a3a3a3] hover:underline underline-offset-4 decoration-wavy decoration-[#737373] dark:decoration-[#a3a3a3] font-medium"
                      >
                        Git and GitHub Crash Course &mdash; freeCodeCamp
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#737373] dark:text-[#a3a3a3] hover:underline underline-offset-4 decoration-wavy decoration-[#737373] dark:decoration-[#a3a3a3] font-medium"
                      >
                        Git and GitHub for beginners &mdash; Amigoscode
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#737373] dark:text-[#a3a3a3] hover:underline underline-offset-4 decoration-wavy decoration-[#737373] dark:decoration-[#a3a3a3] font-medium"
                      >
                        Git and GitHub course &mdash; Javascript Mastery
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              ARTICLE 3: SO... HERE I AM ON THE INTERNET
             ========================================================= */}
          {slug === "so-here-i-am-on-the-internet" && (
            <div className="space-y-8 text-[17.5px] sm:text-[18.5px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-[1.8] font-sans pt-1">
              {/* Intro */}
              <div className="space-y-4">
                <p className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2] text-[20px] sm:text-[21px]">
                  Hey there, this is Pynthamil 👋
                </p>
                <p>
                  I love coding, especially the feeling of bringing an idea from my mind into existence. There is something magical about watching a random thought turn into a feature, a design, or a tiny corner of the internet that did not exist before.
                </p>
                <p>
                  I am very much a <em>build what I need</em> kind of person. If I cannot find something that works the way I want, my first instinct is: <em>fine… I will just build it myself.</em>
                </p>
                <p>
                  So this blog is basically me building my way out of frustration and documenting everything along the way. Kind of like the iconic energy of Cassie from Blogilates, but in tech form with fewer workouts and more debugging.
                </p>
              </div>

              {/* WHY THIS BLOG EXISTS */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  MOTIVATION
                </span>
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Why this blog exists
                </h2>
                <p>I have always wanted a space where I could:</p>
                <ul className="space-y-2.5 pl-1 text-[17px] sm:text-[18px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>share what I am learning</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>document experiments</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>talk about ideas that may or may not work</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>receive encouragement</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>receive constructive criticism</span>
                  </li>
                </ul>
                <p className="italic text-[#2C2C2C]/90 dark:text-[#F2F2F2]/90 pt-1">
                  Think of this as a safe space to try, fail, learn, repeat.
                </p>
                <p className="text-[16px] sm:text-[17px] font-sans text-[#525252] dark:text-[#a3a3a3] pt-1">Or in dev terms:</p>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] p-4 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2] space-y-1.5 leading-relaxed">
                  <div>while(alive) &#123;</div>
                  <div className="pl-4">try()</div>
                  <div className="pl-4">fail()</div>
                  <div className="pl-4">debug()</div>
                  <div className="pl-4">try_again()</div>
                  <div>&#125;</div>
                </div>
              </div>

              {/* HOBBIES & FAVOURITES */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  HOBBIES &amp; FAVOURITES
                </span>
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Aside from coding and designing in Figma
                </h2>
                <p>Here are the things that make up most of my personality / hobbies and favourite things:</p>
                <ul className="space-y-2.5 pl-1 text-[17px] sm:text-[18px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>binge watching shows and movies</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>drawing (proud artist moment)</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>reading books</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>listening to audiobooks (especially immersive ones from GraphicAudio)</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>reading manhwas</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>collecting aesthetic inspiration on Pinterest for about a decade now</span>
                  </li>
                </ul>
                <p className="italic text-[#2C2C2C]/90 dark:text-[#F2F2F2]/90 pt-1">
                  If you have recommendations, please drop them. I mostly enjoy fantasy with rich world building, structured magic systems, and a tiny bit of romance as a subplot.
                </p>
              </div>

              {/* FUN FACTS */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  FUN FACTS
                </span>
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Fun facts about me
                </h2>
                <ul className="space-y-2.5 pl-1 text-[17px] sm:text-[18px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span><strong>favourite boy band:</strong> Enhypen</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span><strong>music taste:</strong> everything</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>I love singing and dancing like nobody is watching</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>introvert who also loves to yap</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span><strong>personality type:</strong> INTJ</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>I enjoy challenging myself just for the plot</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>currently in 4th year (slightly terrifying, slightly exciting)</span>
                  </li>
                </ul>
              </div>

              {/* WHAT YOU WILL FIND HERE */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  THE CONTENT
                </span>
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  What you will find here
                </h2>
                <p>This blog will mostly document:</p>
                <ul className="space-y-2.5 pl-1 text-[17px] sm:text-[18px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>things I build</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>things I try to build</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>things that refuse to work</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>things that finally work after many commits</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>design experiments</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>dev notes</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>lessons learned the hard way</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>resources that helped me</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>curiosity driven deep dives</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>basically learning in public</span>
                  </li>
                </ul>
                <p className="italic text-[#2C2C2C]/90 dark:text-[#F2F2F2]/90 pt-1">
                  If something I share helps even one person who feels stuck like I did at some point, that would mean a lot.
                </p>
              </div>

              {/* YOU CAN REQUEST POSTS TOO */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  OPEN INVITATION
                </span>
                <h2 className="text-[26px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  You can request posts too
                </h2>
                <p>
                  If there is something you would like me to write about, explore, or build, feel free to suggest it.
                </p>
                <p className="text-[16px] sm:text-[17px] font-sans text-[#525252] dark:text-[#a3a3a3]">
                  I cannot promise perfection, but I can promise:
                </p>
                <ul className="space-y-2.5 pl-1 text-[17px] sm:text-[18px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>effort</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>curiosity</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-sans text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>honest documentation of the process</span>
                  </li>
                </ul>
                <div className="pt-4 font-sans text-[16.5px] sm:text-[17.5px] text-[#2C2C2C] dark:text-[#F2F2F2] space-y-2">
                  <p>Thanks for being here 🤍</p>
                  <p className="text-[#525252] dark:text-[#a3a3a3] italic">
                    If you are also figuring things out as you go, welcome.
                  </p>
                </div>
              </div>
            </div>
          )}
        
        </article>

        {/* Footer in Row 3 (Full width across page) */}
        <div className="lg:col-span-3 w-full pt-12 pb-8">
          <Footer fullWidth={true} />
        </div>
      </main>

      {/* Lightbox Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200 cursor-zoom-out select-none"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-xl shadow-2xl border border-white/10 cursor-default"
            />
          </div>
        </div>
      )}
    </div>
  );
}
