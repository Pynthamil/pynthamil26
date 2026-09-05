"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { portfolioData } from "@/data/portfolio";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [soundOn, setSoundOn] = useState<boolean>(true);

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

      {/* Main Container: exactly 490px across the site */}
      <main className="w-full relative z-10 flex flex-col max-w-[490px] animate-in fade-in duration-200">
        {/* Top Navigation */}
        <header className="flex items-center justify-between w-full mb-8">
          <Link
            href="/blog"
            onClick={() => playTone(880)}
            className="font-mono text-[14.5px] sm:text-[15px] tracking-tight text-[#232564] hover:text-[#6666FF] transition-colors flex items-center space-x-1.5 focus:outline-none font-medium cursor-pointer"
          >
            <span>&larr;</span>
            <span>blog</span>
          </Link>

          <div className="font-mono text-xs text-[#11408F]">
            {post.readingTime.toLowerCase()} read
          </div>
        </header>

        {/* Article Header */}
        <article className="space-y-6">
          <div className="border-b border-neutral-200/70 pb-5">
            <h1 className="text-[21px] sm:text-[23px] font-medium text-[#232564] leading-snug">
              {post.title.toLowerCase()}
            </h1>
            <div className="font-mono text-xs text-[#11408F] mt-2 flex items-center space-x-2">
              <span>{post.date.toLowerCase()}</span>
              <span>&bull;</span>
              <span>pynthamil pavendan</span>
            </div>
          </div>

          {/* Article Body */}
          <div className="space-y-6 text-[14px] sm:text-[14.5px] text-[#232564] leading-relaxed font-sans pt-1">
            {/* Intro */}
            <div className="space-y-3.5">
              <p>At first, Git might seem very scary and daunting.</p>
              <p>
                You see words like <span className="font-mono text-xs bg-white px-1.5 py-0.5 border border-neutral-200/70">commit</span>,{" "}
                <span className="font-mono text-xs bg-white px-1.5 py-0.5 border border-neutral-200/70">branch</span>,{" "}
                <span className="font-mono text-xs bg-white px-1.5 py-0.5 border border-neutral-200/70">merge</span>,{" "}
                <span className="font-mono text-xs bg-white px-1.5 py-0.5 border border-neutral-200/70">rebase</span>… and suddenly you&apos;re scared to even touch the keyboard.
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
              <p className="font-mono text-xs text-[#11408F] font-medium pt-1">
                Tiny commits. Big growth.
              </p>
            </div>

            {/* Section 1 */}
            <div className="pt-4 border-t border-neutral-200/70 space-y-3">
              <h2 className="text-[16px] font-medium text-[#232564]">
                What even is a commit?
              </h2>
              <p>A commit is basically a saved checkpoint of your project.</p>
              <p className="text-xs font-mono text-[#11408F]">Think of it like:</p>
              <ul className="space-y-1.5 pl-1 text-[13.5px] sm:text-[14px]">
                <li className="flex items-start space-x-2">
                  <span className="font-mono text-[#11408F] select-none">+</span>
                  <span>a save button for your code</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-mono text-[#11408F] select-none">+</span>
                  <span>a time machine for your project</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-mono text-[#11408F] select-none">+</span>
                  <span>proof that you did something productive today</span>
                </li>
              </ul>
              <p className="text-xs font-mono text-[#11408F] pt-1">Each commit captures:</p>
              <ul className="space-y-1.5 pl-1 text-[13.5px] sm:text-[14px]">
                <li className="flex items-start space-x-2">
                  <span className="font-mono text-[#11408F] select-none">+</span>
                  <span>what changed</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-mono text-[#11408F] select-none">+</span>
                  <span>when it changed</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-mono text-[#11408F] select-none">+</span>
                  <span>why it changed (if your commit message is good)</span>
                </li>
              </ul>
              <p className="italic text-[#232564]/90 pt-1">
                Instead of one giant messy save, Git encourages small meaningful updates. Because progress looks better in chapters than in chaos.
              </p>
            </div>

            {/* Section 2 */}
            <div className="pt-4 border-t border-neutral-200/70 space-y-3">
              <h2 className="text-[16px] font-medium text-[#232564]">
                Basic Commands (tiny cheat sheet)
              </h2>
              <div className="bg-white p-3.5 border border-neutral-200/80 font-mono text-xs sm:text-[12.5px] text-[#232564] space-y-1.5 leading-relaxed">
                <div>git init</div>
                <div>git add .</div>
                <div>git commit -m &quot;message&quot;</div>
                <div>git push origin main</div>
              </div>
              <p className="font-mono text-xs text-[#11408F]">Simple, but powerful.</p>
            </div>

            {/* Step 1 */}
            <div className="pt-4 border-t border-neutral-200/70 space-y-3">
              <h2 className="text-[16px] font-medium text-[#232564]">
                Step 1 &mdash; Initialize the repository
              </h2>
              <p>
                First, I start by initializing the project repository that I’m working on, on my local device.
              </p>
              <p>
                This converts a normal project folder into a Git repository so changes can be tracked.
              </p>
              <div className="font-mono text-xs text-[#11408F] py-1">
                Project Repository &rarr; Git Repository
              </div>
              <div className="bg-white px-3.5 py-2 border border-neutral-200/80 font-mono text-xs sm:text-[12.5px] text-[#232564]">
                git init
              </div>
            </div>

            {/* Step 2 */}
            <div className="pt-4 border-t border-neutral-200/70 space-y-3">
              <h2 className="text-[16px] font-medium text-[#232564]">
                Step 2 &mdash; Stage the files
              </h2>
              <p>
                Next, I stage the files whose changes I want Git to track.
              </p>
              <p>
                Think of staging like selecting which updates you want included in the next checkpoint.
              </p>
              <div className="font-mono text-xs text-[#11408F] py-1">
                Changed/New Files &rarr; staged files for tracking new changes &rarr; changes now tracked
              </div>
              <div className="bg-white p-3.5 border border-neutral-200/80 font-mono text-xs sm:text-[12.5px] text-[#232564] space-y-1">
                <div>git add .</div>
                <div className="text-[#232564]/50 text-[11px] pt-1">// or specific files</div>
                <div>git add index.js</div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="pt-4 border-t border-neutral-200/70 space-y-3">
              <h2 className="text-[16px] font-medium text-[#232564]">
                Step 3 &mdash; Write meaningful commit messages
              </h2>
              <p>
                Now I write a clean, clear, and concise commit message to make a note of what changes I made.
              </p>
              <p>
                Good commit messages help both present-you and future-you understand what happened.
              </p>
              <p className="text-xs font-mono text-[#11408F]">Examples:</p>
              <div className="bg-white p-3 border border-neutral-200/80 font-mono text-xs space-y-1 text-[#232564]">
                <div>feat: add profile picture upload</div>
                <div>fix: correct typo in navbar</div>
                <div>chore: update dependencies</div>
              </div>
              <p className="text-xs font-mono text-[#11408F] pt-1">Quick guide:</p>
              <ul className="space-y-1.5 pl-1 text-[13.5px] sm:text-[14px]">
                <li className="flex items-start space-x-2">
                  <span className="font-mono text-[#11408F] select-none font-semibold">feat</span>
                  <span>&rarr; adding a new feature or functionality</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-mono text-[#11408F] select-none font-semibold">fix</span>
                  <span>&rarr; correcting something that was broken</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-mono text-[#11408F] select-none font-semibold">chore</span>
                  <span>&rarr; changes that don&apos;t affect the app behaviour directly (configs, dependencies, build tasks)</span>
                </li>
              </ul>
              <div className="bg-white px-3.5 py-2 border border-neutral-200/80 font-mono text-xs sm:text-[12.5px] text-[#232564] mt-2">
                git commit -m &quot;feat: add search bar&quot;
              </div>
            </div>

            {/* Step 4 */}
            <div className="pt-4 border-t border-neutral-200/70 space-y-3">
              <h2 className="text-[16px] font-medium text-[#232564]">
                Step 4 &mdash; Push changes to GitHub
              </h2>
              <p>
                After writing a good commit message, I push the changes to the main branch.
              </p>
              <p>
                This uploads the local changes to the remote repository (GitHub).
              </p>
              <div className="bg-white px-3.5 py-2 border border-neutral-200/80 font-mono text-xs sm:text-[12.5px] text-[#232564]">
                git push origin main
              </div>
              <p className="italic text-[#232564]/90">
                Now the changes are backed up and visible online.
              </p>
            </div>

            {/* GitHub Repo Creation */}
            <div className="pt-4 border-t border-neutral-200/70 space-y-3">
              <h2 className="text-[16px] font-medium text-[#232564]">
                Creating a repository on GitHub
              </h2>
              <p>If you don&apos;t already have a repo:</p>
              <div className="font-mono text-xs text-[#11408F] py-0.5">
                GitHub &rarr; click the + icon &rarr; New repository
              </div>
              <p className="text-xs font-mono text-[#11408F]">Choose:</p>
              <ul className="space-y-1 pl-1 text-[13.5px] sm:text-[14px]">
                <li className="flex items-start space-x-2">
                  <span className="font-mono text-[#11408F] select-none">+</span>
                  <span>repository name</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-mono text-[#11408F] select-none">+</span>
                  <span>visibility (public or private)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-mono text-[#11408F] select-none">+</span>
                  <span>optional description</span>
                </li>
              </ul>
              <p>Then connect your local project to this repo.</p>
            </div>

            {/* Pull Requests */}
            <div className="pt-4 border-t border-neutral-200/70 space-y-3">
              <h2 className="text-[16px] font-medium text-[#232564]">
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
            <div className="pt-4 border-t border-neutral-200/70 space-y-3">
              <h2 className="text-[16px] font-medium text-[#232564]">
                Always sync before starting work
              </h2>
              <p>
                Before I start working in my local repository, I always make sure to sync and pull changes first.
              </p>
              <p>
                Sometimes (almost all the time) when I forget this step, I run into merge conflicts.
              </p>
              <p className="text-[#232564]">
                And then I wish myself good luck… because I will definitely be needing it and probably 10 years of life span 🤡
              </p>
              <div className="bg-white px-3.5 py-2 border border-neutral-200/80 font-mono text-xs sm:text-[12.5px] text-[#232564]">
                git pull origin main
              </div>
            </div>

            {/* Quick summary workflow */}
            <div className="pt-4 border-t border-neutral-200/70 space-y-3">
              <h2 className="text-[16px] font-medium text-[#232564]">
                Quick summary workflow
              </h2>
              <div className="bg-white p-3.5 border border-neutral-200/80 font-mono text-xs sm:text-[12.5px] text-[#232564] space-y-1.5 leading-relaxed">
                <div>git init</div>
                <div>git add .</div>
                <div>git commit -m &quot;I&apos;m so done&quot;</div>
                <div>git push origin main</div>
              </div>
              <p className="font-mono text-xs text-[#11408F]">
                Repeat until the project magically works.
              </p>
            </div>

            {/* Helpful learning resources */}
            <div className="pt-4 border-t border-neutral-200/70 space-y-4">
              <h2 className="text-[16px] font-medium text-[#232564]">
                Helpful learning resources
              </h2>

              <div className="space-y-2">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#11408F] font-semibold">
                  Articles / Blogs
                </h3>
                <ul className="space-y-2 text-[13.5px] sm:text-[14px]">
                  <li>
                    <a
                      href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6666FF] hover:underline underline-offset-4 decoration-wavy decoration-[#6666FF] font-medium"
                    >
                      Complete Tutorial of Git and GitHub for Basic to Advanced &mdash; Sachinsoni
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6666FF] hover:underline underline-offset-4 decoration-wavy decoration-[#6666FF] font-medium"
                    >
                      I don’t Git it &mdash; Rick Martinez
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6666FF] hover:underline underline-offset-4 decoration-wavy decoration-[#6666FF] font-medium"
                    >
                      Git Full Tutorial &mdash; How to Use Git in a Real Project &mdash; Saikiran Kalidindi
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#11408F] font-semibold">
                  YouTube Tutorials
                </h3>
                <ul className="space-y-2 text-[13.5px] sm:text-[14px]">
                  <li>
                    <a
                      href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6666FF] hover:underline underline-offset-4 decoration-wavy decoration-[#6666FF] font-medium"
                    >
                      Git and GitHub Crash Course &mdash; freeCodeCamp
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6666FF] hover:underline underline-offset-4 decoration-wavy decoration-[#6666FF] font-medium"
                    >
                      Git and GitHub for beginners &mdash; Amigoscode
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6666FF] hover:underline underline-offset-4 decoration-wavy decoration-[#6666FF] font-medium"
                    >
                      Git and GitHub course &mdash; Javascript Mastery
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </article>

        {/* Return link */}
        <div className="pt-10 pb-6 border-b border-neutral-200/70">
          <Link
            href="/blog"
            onClick={() => playTone(880)}
            className="font-mono text-xs text-[#6666FF] hover:underline underline-offset-4 font-medium flex items-center space-x-1 cursor-pointer"
          >
            <span>&larr; back to all writings</span>
          </Link>
        </div>

        {/* Standard Footer */}
        <footer className="pt-8 flex items-center justify-between font-mono text-[11px] text-[#232564]/60">
          <div>curiosity doesn&apos;t kill the cat.</div>
          <div>made w love &bull; &copy; 2026</div>
        </footer>
      </main>
    </div>
  );
}
