"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { portfolioData } from "@/data/portfolio";

export default function BlogPostClient({ slug: propSlug }: { slug?: string }) {
  const params = useParams();
  const slug = propSlug || (params?.slug as string);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

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
      <div className="min-h-screen w-full flex flex-col justify-center items-center px-5 font-mono text-sm text-[#232564]">
        <p>Post not found.</p>
        <Link
          href="/blog"
          onClick={() => playTone(880)}
          className="mt-4 text-[#6666FF] hover:underline underline-offset-4 font-medium"
        >
          &larr; return to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center px-5 sm:px-8 md:px-12 pt-12 sm:pt-16 pb-24 selection:bg-neutral-200">
      {/* Soft atmospheric ambient glow */}
      <div className="ambient-glow" />

      {/* Main Container */}
      <main className="w-full relative z-10 flex flex-col max-w-[530px] animate-in fade-in duration-200">
        {/* Top Navigation */}
        <header className="flex items-center justify-between w-full mb-8">
          <Link
            href="/blog"
            onClick={() => playTone(880)}
            className="font-mono text-[15px] sm:text-[15.5px] tracking-tight text-[#232564] dark:text-[#F5F5FF] hover:text-[#6666FF] dark:hover:text-[#9999FF] transition-colors flex items-center space-x-1.5 focus:outline-none font-medium cursor-pointer"
          >
            <span>&larr;</span>
            <span>blog</span>
          </Link>

          <div className="flex items-center space-x-3.5">
            <span className="font-mono text-xs sm:text-[13px] text-[#11408F] dark:text-[#AEF0FF]">
              {post.readingTime.toLowerCase()} read
            </span>
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-1 text-[#232564] dark:text-[#F5F5FF] hover:text-[#6666FF] dark:hover:text-[#9999FF] transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 hover:rotate-45"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 hover:-rotate-12"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* Article Header */}
        <article className="space-y-6">
          <div className="border-b border-neutral-200/70 dark:border-[#9999FF]/20 pb-5">
            <h1 className="text-[23px] sm:text-[25px] font-semibold text-[#232564] dark:text-[#F5F5FF] leading-snug">
              {post.title.toLowerCase()}
            </h1>
            <div className="font-mono text-xs sm:text-[13px] text-[#11408F] dark:text-[#AEF0FF] mt-2.5 flex items-center space-x-2">
              <span>{post.date.toLowerCase()}</span>
              <span>&bull;</span>
              <span>pynthamil pavendan</span>
            </div>
          </div>

          {/* =========================================================
              ARTICLE 1: GIT COMMIT GO
             ========================================================= */}
          {slug === "git-commit-go" && (
            <div className="space-y-8 text-[16px] sm:text-[16.5px] text-[#232564] dark:text-[#F5F5FF] leading-[1.8] font-sans pt-1">
              {/* Intro */}
              <div className="space-y-4">
                <p>At some point, just committing code isn’t enough.</p>
                <p className="font-mono text-[13.5px] sm:text-[14px] text-[#11408F] dark:text-[#AEF0FF]">You start wondering:</p>
                <p className="italic text-[#232564] dark:text-[#F5F5FF] pl-3 border-l-2 border-[#11408F]/40 dark:border-[#AEF0FF]/40">
                  can I interact with GitHub programmatically?
                </p>
                <p>
                  That’s where the <span className="font-medium text-[#FF42FF] dark:text-[#FF94FF]">GitHub REST API</span> comes in.
                </p>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#11408F] dark:text-[#AEF0FF] pt-1">It lets you:</p>
                <ul className="space-y-2.5 pl-1 text-[15px] sm:text-[15.5px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>create repositories automatically</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>fetch repository data</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>automate workflows</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>build tools that interact with GitHub</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>understand what’s happening behind the UI</span>
                  </li>
                </ul>
                <p className="font-mono text-[13.5px] sm:text-[14px] text-[#11408F] dark:text-[#AEF0FF] pt-1">
                  Let’s walk through the basics.
                </p>
              </div>

              {/* What is GitHub REST API */}
              <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
                <h2 className="text-[19px] sm:text-[20px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                  What is the GitHub REST API?
                </h2>
                <p>
                  The GitHub REST API allows developers to communicate with GitHub using HTTP requests.
                </p>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#11408F] dark:text-[#AEF0FF]">
                  Instead of clicking buttons on GitHub’s website, you can send requests like:
                </p>
                <ul className="space-y-2.5 pl-1 text-[15px] sm:text-[15.5px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-xs sm:text-[13px] bg-white dark:bg-[#13151E] px-2 py-0.5 border border-neutral-200/80 dark:border-[#9999FF]/30 font-semibold text-[#11408F] dark:text-[#AEF0FF]">GET</span>
                    <span>&rarr; retrieve data</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-xs sm:text-[13px] bg-white dark:bg-[#13151E] px-2 py-0.5 border border-neutral-200/80 dark:border-[#9999FF]/30 font-semibold text-[#11408F] dark:text-[#AEF0FF]">POST</span>
                    <span>&rarr; create data</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-xs sm:text-[13px] bg-white dark:bg-[#13151E] px-2 py-0.5 border border-neutral-200/80 dark:border-[#9999FF]/30 font-semibold text-[#11408F] dark:text-[#AEF0FF]">PATCH</span>
                    <span>&rarr; update data</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-xs sm:text-[13px] bg-white dark:bg-[#13151E] px-2 py-0.5 border border-neutral-200/80 dark:border-[#9999FF]/30 font-semibold text-[#11408F] dark:text-[#AEF0FF]">DELETE</span>
                    <span>&rarr; remove data</span>
                  </li>
                </ul>
                <p className="italic text-[#232564]/90 dark:text-[#F5F5FF]/90 pt-1">
                  Think of it as a bridge between your application and GitHub.
                </p>
              </div>

              {/* Step 1 */}
              <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
                <h2 className="text-[19px] sm:text-[20px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                  Step 1 &mdash; Choose an endpoint
                </h2>
                <p>
                  GitHub provides many API endpoints depending on what you want to do.
                </p>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#11408F] dark:text-[#AEF0FF]">
                  Example endpoint for repositories:
                </p>
                <div className="bg-white dark:bg-[#13151E] px-4 py-3 border border-neutral-200/80 dark:border-[#9999FF]/30 font-mono text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#F5F5FF] break-all">
                  https://api.github.com/user/repos
                </div>
                <p>
                  This endpoint allows you to retrieve repositories connected to your account.
                </p>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#11408F] dark:text-[#AEF0FF] pt-1">Each endpoint defines:</p>
                <ul className="space-y-2 pl-1 text-[15px] sm:text-[15.5px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>request method</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>parameters</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>response structure</span>
                  </li>
                </ul>
                <div className="pt-2">
                  <p className="text-[13.5px] sm:text-[14px] font-mono text-[#11408F] dark:text-[#AEF0FF] mb-1">Documentation:</p>
                  <a
                    href="https://docs.github.com/en/rest/repos/repos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6666FF] dark:text-[#9999FF] hover:underline underline-offset-4 decoration-wavy decoration-[#6666FF] dark:decoration-[#9999FF] font-mono text-[13px] sm:text-[13.5px] break-all font-medium"
                  >
                    https://docs.github.com/en/rest/repos/repos
                  </a>
                </div>
              </div>

              {/* Step 2 */}
              <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
                <h2 className="text-[19px] sm:text-[20px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                  Step 2 &mdash; Generate a Personal Access Token (PAT)
                </h2>
                <p>GitHub requires authentication for most API requests.</p>
                <p>We generate a Personal Access Token.</p>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#11408F] dark:text-[#AEF0FF]">Steps:</p>
                <ul className="space-y-2.5 pl-1 text-[15px] sm:text-[15.5px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none font-semibold pt-0.5">1.</span>
                    <span>Go to GitHub Settings</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none font-semibold pt-0.5">2.</span>
                    <span>Scroll to Developer Settings</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none font-semibold pt-0.5">3.</span>
                    <span>Select Personal Access Tokens</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none font-semibold pt-0.5">4.</span>
                    <span>Generate new token</span>
                  </li>
                </ul>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#11408F] dark:text-[#AEF0FF] pt-1">Choose:</p>
                <ul className="space-y-2 pl-1 text-[15px] sm:text-[15.5px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>token name</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>expiration duration</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>required permissions</span>
                  </li>
                </ul>
                <div className="bg-white dark:bg-[#13151E] p-4 border border-neutral-200/80 dark:border-[#9999FF]/30 font-mono text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#F5F5FF] space-y-1.5 mt-2">
                  <div className="text-[#FF42FF] dark:text-[#FF94FF] font-semibold">Copy the token immediately.</div>
                  <div>GitHub will not show it again.</div>
                  <div className="text-[#11408F] dark:text-[#AEF0FF]">Treat it like a password.</div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
                <h2 className="text-[19px] sm:text-[20px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                  Step 3 &mdash; Send request using Postman
                </h2>
                <p>Postman helps test API requests easily.</p>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#11408F] dark:text-[#AEF0FF]">Example GET request:</p>
                <div className="bg-white dark:bg-[#13151E] px-4 py-3 border border-neutral-200/80 dark:border-[#9999FF]/30 font-mono text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#F5F5FF] break-all">
                  https://api.github.com/user/repos
                </div>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#11408F] dark:text-[#AEF0FF]">Add Authorization header:</p>
                <div className="bg-white dark:bg-[#13151E] px-4 py-3 border border-neutral-200/80 dark:border-[#9999FF]/30 font-mono text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#F5F5FF] break-all leading-relaxed">
                  Authorization: Bearer YOUR_PERSONAL_ACCESS_TOKEN
                </div>
                <p>Send request. GitHub returns data in JSON format.</p>
              </div>

              {/* Example create repo */}
              <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
                <h2 className="text-[19px] sm:text-[20px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                  Example &mdash; create repository via API
                </h2>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#11408F] dark:text-[#AEF0FF]">POST request:</p>
                <div className="bg-white dark:bg-[#13151E] p-4 border border-neutral-200/80 dark:border-[#9999FF]/30 font-mono text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#F5F5FF] space-y-1.5 overflow-x-auto leading-relaxed">
                  <div>curl -X POST https://api.github.com/user/repos \</div>
                  <div className="pl-4">-H &quot;Authorization: Bearer YOUR_PERSONAL_ACCESS_TOKEN&quot; \</div>
                  <div className="pl-4">-H &quot;Accept: application/vnd.github+json&quot; \</div>
                  <div className="pl-4">-d &apos;{`{"name":"my-new-repo","private":false}`}&apos;</div>
                </div>
                <ul className="space-y-1 pl-1 text-[13.5px] sm:text-[14px] font-mono text-[#11408F] dark:text-[#AEF0FF]">
                  <li>&bull; Replace YOUR_PERSONAL_ACCESS_TOKEN with your token.</li>
                  <li>&bull; Replace my-new-repo with repository name.</li>
                </ul>
              </div>

              {/* Example response */}
              <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
                <h2 className="text-[19px] sm:text-[20px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                  Example response
                </h2>
                <p>GitHub responds with structured JSON data:</p>
                <div className="bg-white dark:bg-[#13151E] p-4 border border-neutral-200/80 dark:border-[#9999FF]/30 font-mono text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#F5F5FF] space-y-1.5 overflow-x-auto leading-relaxed">
                  <div>{`{`}</div>
                  <div className="pl-4">{`"name": "my-new-repo",`}</div>
                  <div className="pl-4">{`"private": false,`}</div>
                  <div className="pl-4">{`"owner": {`}</div>
                  <div className="pl-8">{`"login": "username"`}</div>
                  <div className="pl-4">{`}`}</div>
                  <div>{`}`}</div>
                </div>
                <p className="italic text-[#232564]/90 dark:text-[#F5F5FF]/90">
                  The API confirms repository creation and returns metadata.
                </p>
              </div>

              {/* Why learn GitHub API */}
              <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
                <h2 className="text-[19px] sm:text-[20px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                  Why learn GitHub API?
                </h2>
                <p>Understanding the API allows you to:</p>
                <ul className="space-y-2.5 pl-1 text-[15px] sm:text-[15.5px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>automate workflows</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>build developer tools</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>create dashboards</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>manage repositories programmatically</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>integrate GitHub with apps</span>
                  </li>
                </ul>
                <div className="pt-2 font-mono text-[13.5px] sm:text-[14px] text-[#11408F] dark:text-[#AEF0FF]">
                  <p>Git becomes more than version control.</p>
                  <p className="text-[#FF42FF] dark:text-[#FF94FF] font-semibold mt-0.5">It becomes programmable infrastructure.</p>
                </div>
              </div>

              {/* Mental model */}
              <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
                <h2 className="text-[19px] sm:text-[20px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                  Mental model
                </h2>
                <div className="bg-white dark:bg-[#13151E] p-4 border border-neutral-200/80 dark:border-[#9999FF]/30 font-mono text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#F5F5FF] space-y-2 leading-relaxed">
                  <div><span className="font-semibold text-[#11408F] dark:text-[#AEF0FF]">Git CLI</span> &rarr; manage code locally</div>
                  <div><span className="font-semibold text-[#11408F] dark:text-[#AEF0FF]">GitHub UI</span> &rarr; manage repos visually</div>
                  <div><span className="font-semibold text-[#FF42FF] dark:text-[#FF94FF]">GitHub API</span> &rarr; manage everything programmatically</div>
                </div>
              </div>

              {/* If you're just starting */}
              <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
                <h2 className="text-[19px] sm:text-[20px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                  If you&apos;re just starting
                </h2>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#11408F] dark:text-[#AEF0FF]">Focus on understanding:</p>
                <ul className="space-y-2.5 pl-1 text-[15px] sm:text-[15.5px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>request</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>response</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>authentication</span>
                  </li>
                </ul>
                <p className="font-mono text-[13.5px] sm:text-[14px] text-[#11408F] dark:text-[#AEF0FF] pt-1">
                  Everything else becomes easier with practice.
                </p>
              </div>
            </div>
          )}

          {/* =========================================================
              ARTICLE 2: THE ART OF COMMITTING
             ========================================================= */}
          {slug === "art-of-committing" && (
            <div className="space-y-8 text-[16px] sm:text-[16.5px] text-[#232564] dark:text-[#F5F5FF] leading-[1.8] font-sans pt-1">
              {/* Intro */}
              <div className="space-y-4">
                <p>At first, Git might seem very scary and daunting.</p>
                <p>
                  You see words like <span className="font-mono text-xs sm:text-[13px] bg-white dark:bg-[#13151E] px-2 py-0.5 border border-neutral-200/70 dark:border-[#9999FF]/30 text-[#11408F] dark:text-[#AEF0FF]">commit</span>,{" "}
                  <span className="font-mono text-xs sm:text-[13px] bg-white dark:bg-[#13151E] px-2 py-0.5 border border-neutral-200/70 dark:border-[#9999FF]/30 text-[#11408F] dark:text-[#AEF0FF]">branch</span>,{" "}
                  <span className="font-mono text-xs sm:text-[13px] bg-white dark:bg-[#13151E] px-2 py-0.5 border border-neutral-200/70 dark:border-[#9999FF]/30 text-[#11408F] dark:text-[#AEF0FF]">merge</span>,{" "}
                  <span className="font-mono text-xs sm:text-[13px] bg-white dark:bg-[#13151E] px-2 py-0.5 border border-neutral-200/70 dark:border-[#9999FF]/30 text-[#11408F] dark:text-[#AEF0FF]">rebase</span>… and suddenly you&apos;re scared to even touch the keyboard.
                </p>
                <p>
                  But once it clicks, everything falls into place like the pieces of a puzzle you&apos;ve been spending your time trying to solve.
                </p>
                <p>
                  Version control isn&apos;t just about saving code &mdash; it&apos;s about telling the story of how your ideas evolve.
                </p>
                <p>
                  And honestly? There&apos;s something oddly satisfying about committing your work and watching your progress stack up.
                </p>
                <p className="font-mono text-[13.5px] sm:text-[14px] text-[#11408F] dark:text-[#AEF0FF] font-medium pt-1">
                  Tiny commits. Big growth.
                </p>
              </div>

              {/* Section 1 */}
              <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
                <h2 className="text-[19px] sm:text-[20px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                  What even is a commit?
                </h2>
                <p>A commit is basically a saved checkpoint of your project.</p>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#11408F] dark:text-[#AEF0FF]">Think of it like:</p>
                <ul className="space-y-2.5 pl-1 text-[15px] sm:text-[15.5px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>a save button for your code</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>a time machine for your project</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>proof that you did something productive today</span>
                  </li>
                </ul>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#11408F] dark:text-[#AEF0FF] pt-1">Each commit captures:</p>
                <ul className="space-y-2 pl-1 text-[15px] sm:text-[15.5px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>what changed</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>when it changed</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>why it changed (if your commit message is good)</span>
                  </li>
                </ul>
                <p className="italic text-[#232564]/90 dark:text-[#F5F5FF]/90 pt-1">
                  Instead of one giant messy save, Git encourages small meaningful updates. Because progress looks better in chapters than in chaos.
                </p>
              </div>

              {/* Section 2 */}
              <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
                <h2 className="text-[19px] sm:text-[20px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                  Basic Commands (tiny cheat sheet)
                </h2>
                <div className="bg-white dark:bg-[#13151E] p-4 border border-neutral-200/80 dark:border-[#9999FF]/30 font-mono text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#F5F5FF] space-y-1.5 leading-relaxed">
                  <div>git init</div>
                  <div>git add .</div>
                  <div>git commit -m &quot;message&quot;</div>
                  <div>git push origin main</div>
                </div>
                <p className="font-mono text-[13.5px] sm:text-[14px] text-[#11408F] dark:text-[#AEF0FF]">Simple, but powerful.</p>
              </div>

              {/* Step 1 */}
              <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
                <h2 className="text-[19px] sm:text-[20px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                  Step 1 &mdash; Initialize the repository
                </h2>
                <p>
                  First, I start by initializing the project repository that I’m working on, on my local device.
                </p>
                <p>
                  This converts a normal project folder into a Git repository so changes can be tracked.
                </p>
                <div className="font-mono text-[13.5px] sm:text-[14px] text-[#11408F] dark:text-[#AEF0FF] py-1">
                  Project Repository &rarr; Git Repository
                </div>
                <div className="bg-white dark:bg-[#13151E] px-4 py-3 border border-neutral-200/80 dark:border-[#9999FF]/30 font-mono text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#F5F5FF]">
                  git init
                </div>
              </div>

              {/* Step 2 */}
              <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
                <h2 className="text-[19px] sm:text-[20px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                  Step 2 &mdash; Stage the files
                </h2>
                <p>
                  Next, I stage the files whose changes I want Git to track.
                </p>
                <p>
                  Think of staging like selecting which updates you want included in the next checkpoint.
                </p>
                <div className="font-mono text-[13.5px] sm:text-[14px] text-[#11408F] dark:text-[#AEF0FF] py-1">
                  Changed/New Files &rarr; staged files for tracking new changes &rarr; changes now tracked
                </div>
                <div className="bg-white dark:bg-[#13151E] p-4 border border-neutral-200/80 dark:border-[#9999FF]/30 font-mono text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#F5F5FF] space-y-1.5">
                  <div>git add .</div>
                  <div className="text-[#232564]/50 dark:text-[#F5F5FF]/50 text-xs pt-1">// or specific files</div>
                  <div>git add index.js</div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
                <h2 className="text-[19px] sm:text-[20px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                  Step 3 &mdash; Write meaningful commit messages
                </h2>
                <p>
                  Now I write a clean, clear, and concise commit message to make a note of what changes I made.
                </p>
                <p>
                  Good commit messages help both present-you and future-you understand what happened.
                </p>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#11408F] dark:text-[#AEF0FF]">Examples:</p>
                <div className="bg-white dark:bg-[#13151E] p-4 border border-neutral-200/80 dark:border-[#9999FF]/30 font-mono text-[13.5px] sm:text-[14px] space-y-1.5 text-[#232564] dark:text-[#F5F5FF]">
                  <div>feat: add profile picture upload</div>
                  <div>fix: correct typo in navbar</div>
                  <div>chore: update dependencies</div>
                </div>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#11408F] dark:text-[#AEF0FF] pt-1">Quick guide:</p>
                <ul className="space-y-2.5 pl-1 text-[15px] sm:text-[15.5px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none font-semibold pt-0.5">feat</span>
                    <span>&rarr; adding a new feature or functionality</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none font-semibold pt-0.5">fix</span>
                    <span>&rarr; correcting something that was broken</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none font-semibold pt-0.5">chore</span>
                    <span>&rarr; changes that don&apos;t affect the app behaviour directly (configs, dependencies, build tasks)</span>
                  </li>
                </ul>
                <div className="bg-white dark:bg-[#13151E] px-4 py-3 border border-neutral-200/80 dark:border-[#9999FF]/30 font-mono text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#F5F5FF] mt-2">
                  git commit -m &quot;feat: add search bar&quot;
                </div>
              </div>

              {/* Step 4 */}
              <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
                <h2 className="text-[19px] sm:text-[20px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                  Step 4 &mdash; Push changes to GitHub
                </h2>
                <p>
                  After writing a good commit message, I push the changes to the main branch.
                </p>
                <p>
                  This uploads the local changes to the remote repository (GitHub).
                </p>
                <div className="bg-white dark:bg-[#13151E] px-4 py-3 border border-neutral-200/80 dark:border-[#9999FF]/30 font-mono text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#F5F5FF]">
                  git push origin main
                </div>
                <p className="italic text-[#232564]/90 dark:text-[#F5F5FF]/90">
                  Now the changes are backed up and visible online.
                </p>
              </div>

              {/* GitHub Repo Creation */}
              <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
                <h2 className="text-[19px] sm:text-[20px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                  Creating a repository on GitHub
                </h2>
                <p>If you don&apos;t already have a repo:</p>
                <div className="font-mono text-[13.5px] sm:text-[14px] text-[#11408F] dark:text-[#AEF0FF] py-0.5">
                  GitHub &rarr; click the + icon &rarr; New repository
                </div>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#11408F] dark:text-[#AEF0FF]">Choose:</p>
                <ul className="space-y-2 pl-1 text-[15px] sm:text-[15.5px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>repository name</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>visibility (public or private)</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>optional description</span>
                  </li>
                </ul>
                <p>Then connect your local project to this repo.</p>
              </div>

              {/* Pull Requests */}
              <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
                <h2 className="text-[19px] sm:text-[20px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
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
              <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
                <h2 className="text-[19px] sm:text-[20px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                  Always sync before starting work
                </h2>
                <p>
                  Before I start working in my local repository, I always make sure to sync and pull changes first.
                </p>
                <p>
                  Sometimes (almost all the time) when I forget this step, I run into merge conflicts.
                </p>
                <p className="text-[#232564] dark:text-[#F5F5FF]">
                  And then I wish myself good luck… because I will definitely be needing it and probably 10 years of life span 🤡
                </p>
                <div className="bg-white dark:bg-[#13151E] px-4 py-3 border border-neutral-200/80 dark:border-[#9999FF]/30 font-mono text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#F5F5FF]">
                  git pull origin main
                </div>
              </div>

              {/* Quick summary workflow */}
              <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
                <h2 className="text-[19px] sm:text-[20px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                  Quick summary workflow
                </h2>
                <div className="bg-white dark:bg-[#13151E] p-4 border border-neutral-200/80 dark:border-[#9999FF]/30 font-mono text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#F5F5FF] space-y-2 leading-relaxed">
                  <div>git init</div>
                  <div>git add .</div>
                  <div>git commit -m &quot;I&apos;m so done&quot;</div>
                  <div>git push origin main</div>
                </div>
                <p className="font-mono text-[13.5px] sm:text-[14px] text-[#11408F] dark:text-[#AEF0FF]">
                  Repeat until the project magically works.
                </p>
              </div>

              {/* Helpful learning resources */}
              <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-5">
                <h2 className="text-[19px] sm:text-[20px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                  Helpful learning resources
                </h2>

                <div className="space-y-2.5">
                  <h3 className="font-mono text-[13px] sm:text-[13.5px] uppercase tracking-wider text-[#11408F] dark:text-[#AEF0FF] font-semibold">
                    Articles / Blogs
                  </h3>
                  <ul className="space-y-2 text-[14.5px] sm:text-[15px]">
                    <li>
                      <a
                        href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#6666FF] dark:text-[#9999FF] hover:underline underline-offset-4 decoration-wavy decoration-[#6666FF] dark:decoration-[#9999FF] font-medium"
                      >
                        Complete Tutorial of Git and GitHub for Basic to Advanced &mdash; Sachinsoni
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#6666FF] dark:text-[#9999FF] hover:underline underline-offset-4 decoration-wavy decoration-[#6666FF] dark:decoration-[#9999FF] font-medium"
                      >
                        I don’t Git it &mdash; Rick Martinez
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#6666FF] dark:text-[#9999FF] hover:underline underline-offset-4 decoration-wavy decoration-[#6666FF] dark:decoration-[#9999FF] font-medium"
                      >
                        Git Full Tutorial &mdash; How to Use Git in a Real Project &mdash; Saikiran Kalidindi
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2.5 pt-2">
                  <h3 className="font-mono text-[13px] sm:text-[13.5px] uppercase tracking-wider text-[#11408F] dark:text-[#AEF0FF] font-semibold">
                    YouTube Tutorials
                  </h3>
                  <ul className="space-y-2 text-[14.5px] sm:text-[15px]">
                    <li>
                      <a
                        href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#6666FF] dark:text-[#9999FF] hover:underline underline-offset-4 decoration-wavy decoration-[#6666FF] dark:decoration-[#9999FF] font-medium"
                      >
                        Git and GitHub Crash Course &mdash; freeCodeCamp
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#6666FF] dark:text-[#9999FF] hover:underline underline-offset-4 decoration-wavy decoration-[#6666FF] dark:decoration-[#9999FF] font-medium"
                      >
                        Git and GitHub for beginners &mdash; Amigoscode
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#6666FF] dark:text-[#9999FF] hover:underline underline-offset-4 decoration-wavy decoration-[#6666FF] dark:decoration-[#9999FF] font-medium"
                      >
                        Git and GitHub course &mdash; Javascript Mastery
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </article>

        {/* Return link */}
        <div className="pt-10 pb-6 border-b border-neutral-200/70 dark:border-[#9999FF]/20">
          <Link
            href="/blog"
            onClick={() => playTone(880)}
            className="font-mono text-[13.5px] sm:text-[14px] text-[#6666FF] dark:text-[#9999FF] hover:underline underline-offset-4 font-medium flex items-center space-x-1 cursor-pointer"
          >
            <span>&larr; back to all writings</span>
          </Link>
        </div>

        {/* Standard Footer */}
        <footer className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 font-mono text-xs sm:text-[13px] text-[#64748B] dark:text-[#8E95B8]">
          <div>curiosity doesn&apos;t kill the cat.</div>
          <div>made w love &bull; &copy; 2026</div>
        </footer>
      </main>
    </div>
  );
}
