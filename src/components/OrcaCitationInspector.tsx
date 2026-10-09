"use client";

import React, { useState } from "react";
import { CheckCircle2, ExternalLink, FileText, Sparkles, ShieldCheck, Database } from "lucide-react";

interface CitationData {
  id: string;
  badgeText: string;
  author: string;
  year: string;
  title: string;
  journal: string;
  doi: string;
  doiLink: string;
  snippet: string;
  sampleSize: string;
  relevance: string;
  confidence: string;
}

const citations: CitationData[] = [
  {
    id: "smith2024",
    badgeText: "[Smith et al., 2024]",
    author: "Smith, J., et al.",
    year: "2024",
    title: "Ocean Acidification Suppresses Calcification in Reef-Building Corals",
    journal: "Nature Climate Change",
    doi: "10.1038/s41597-024-03120-x",
    doiLink: "https://doi.org/10.1038/s41597-024-03120-x",
    snippet: "Under elevated CO₂ levels (800 ppm), net calcification rates in Acropora palmata declined by 22.4% ± 3.1% over a 12-week exposure period, indicating severe structural degradation under projected 2050 ocean acidification scenarios.",
    sampleSize: "n = 480 colonies",
    relevance: "99% Match",
    confidence: "High (0.98)",
  },
  {
    id: "chen2023",
    badgeText: "[Chen & Oceanography, 2023]",
    author: "Chen, L., & Oceanography Group",
    year: "2023",
    title: "Aragonite Saturation Dynamics Across Tropical Coral Reef Ecosystems",
    journal: "Journal of Marine Systems",
    doi: "10.1016/j.jmarsys.2023.103892",
    doiLink: "https://doi.org/10.1016/j.jmarsys.2023.103892",
    snippet: "Seasonal monitoring across 14 Indo-Pacific reefs confirmed that when aragonite saturation (Ω_arg) drops below 3.0, skeletal density reduction accelerates by 18.6% per decade.",
    sampleSize: "n = 14 reef stations",
    relevance: "96% Match",
    confidence: "High (0.95)",
  },
  {
    id: "klaus2022",
    badgeText: "[Klaus et al., 2022]",
    author: "Klaus, R., et al.",
    year: "2022",
    title: "Larval Settlement Suppression Under Synergistic Acidification and Warming",
    journal: "Global Change Biology",
    doi: "10.1111/gcb.16340",
    doiLink: "https://doi.org/10.1111/gcb.16340",
    snippet: "Combined sea surface warming (+1.8°C) and acidification (pH 7.95) reduced coral larval metamorphosis and substrate attachment by 41.2%, bottlenecking natural reef regeneration.",
    sampleSize: "n = 1,200 larvae",
    relevance: "94% Match",
    confidence: "High (0.92)",
  },
];

export function OrcaCitationInspector() {
  const [activeId, setActiveId] = useState<string>("smith2024");
  const activeCitation = citations.find((c) => c.id === activeId) || citations[0];

  return (
    <div className="w-full overflow-hidden rounded-md sm:rounded-lg bg-[#F5F5F7] dark:bg-[#18181B] p-4 sm:p-6 md:p-8 shadow-sm border border-black/10 dark:border-white/15">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Interactive Research Answer with Clickable Badges */}
        <div className="lg:col-span-6 bg-white dark:bg-[#141415] rounded-md sm:rounded-lg p-5 sm:p-6 border border-black/10 dark:border-white/15 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#0284C7] dark:text-[#FFF0F5] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Synthesized Answer
              </span>
              <span className="text-[11px] font-mono text-slate-400">Click citations to inspect ↓</span>
            </div>

            <p className="text-[15px] sm:text-[16px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed font-sans">
              Ocean acidification severely impacts coral reefs primarily by lowering aragonite saturation states, which directly inhibits calcification and skeletal growth{" "}
              <button
                type="button"
                onClick={() => setActiveId("smith2024")}
                className={`inline-flex items-center px-2 py-0.5 mx-0.5 rounded text-[12px] font-mono font-medium transition-all cursor-pointer ${
                  activeId === "smith2024"
                    ? "bg-[#0284C7] text-white ring-2 ring-[#0284C7]/40 shadow-sm"
                    : "bg-[#0284C7]/10 dark:bg-[#FFF0F5]/10 text-[#0284C7] dark:text-[#FFF0F5] hover:bg-[#0284C7]/20"
                }`}
              >
                [Smith et al., 2024]
              </button>
              . Furthermore, when saturation levels fall below 3.0, skeletal density reduction accelerates across Indo-Pacific ecosystems{" "}
              <button
                type="button"
                onClick={() => setActiveId("chen2023")}
                className={`inline-flex items-center px-2 py-0.5 mx-0.5 rounded text-[12px] font-mono font-medium transition-all cursor-pointer ${
                  activeId === "chen2023"
                    ? "bg-[#0284C7] text-white ring-2 ring-[#0284C7]/40 shadow-sm"
                    : "bg-[#0284C7]/10 dark:bg-[#FFF0F5]/10 text-[#0284C7] dark:text-[#FFF0F5] hover:bg-[#0284C7]/20"
                }`}
              >
                [Chen &amp; Oceanography, 2023]
              </button>
              . When paired with warming waters, acidification also bottlenecks larval recruitment and metamorphosis{" "}
              <button
                type="button"
                onClick={() => setActiveId("klaus2022")}
                className={`inline-flex items-center px-2 py-0.5 mx-0.5 rounded text-[12px] font-mono font-medium transition-all cursor-pointer ${
                  activeId === "klaus2022"
                    ? "bg-[#0284C7] text-white ring-2 ring-[#0284C7]/40 shadow-sm"
                    : "bg-[#0284C7]/10 dark:bg-[#FFF0F5]/10 text-[#0284C7] dark:text-[#FFF0F5] hover:bg-[#0284C7]/20"
                }`}
              >
                [Klaus et al., 2022]
              </button>
              .
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between text-[12px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" /> 3 Peer-Reviewed Sources Grounded
            </span>
            <span>Gemini 1.5 Pro Grounding</span>
          </div>
        </div>

        {/* Right Column: Dynamic Citation Inspector Drawer */}
        <div className="lg:col-span-6 bg-[#121316] dark:bg-[#0E0E11] text-white rounded-md sm:rounded-lg p-5 sm:p-6 border border-white/10 shadow-lg flex flex-col justify-between space-y-4">
          <div className="space-y-3.5">
            {/* Header Status */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8]" />
                <span className="font-mono text-[12px] font-semibold text-white/90 uppercase tracking-wider">
                  Citation Inspector
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" /> Grounded Evidence
              </span>
            </div>

            {/* Paper Title & Journal */}
            <div className="space-y-1">
              <h5 className="font-sans font-semibold text-[16px] sm:text-[17px] text-white leading-snug">
                {activeCitation.title}
              </h5>
              <div className="flex flex-wrap items-center gap-2 text-[12px] font-mono text-white/60">
                <span>{activeCitation.author}</span>
                <span>•</span>
                <span className="text-[#38BDF8]">{activeCitation.journal}</span>
                <span>•</span>
                <span>{activeCitation.year}</span>
              </div>
            </div>

            {/* DOI Link */}
            <div className="pt-0.5">
              <a
                href={activeCitation.doiLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[11.5px] text-[#38BDF8] hover:underline"
              >
                <span>DOI: {activeCitation.doi}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Extracted Raw Text Chunk Snippet */}
            <div className="p-3.5 rounded bg-white/5 border border-white/10 space-y-1.5">
              <span className="font-mono text-[10.5px] uppercase tracking-wider text-white/40 block">
                Extracted Evidence Snippet
              </span>
              <p className="text-[13px] font-sans text-white/90 leading-relaxed italic">
                "{activeCitation.snippet}"
              </p>
            </div>
          </div>

          {/* Bottom Metrics Bar */}
          <div className="pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
            <div className="bg-white/5 p-2 rounded border border-white/5">
              <span className="text-white/40 block text-[9.5px]">SAMPLE</span>
              <span className="font-semibold text-white/90">{activeCitation.sampleSize}</span>
            </div>
            <div className="bg-white/5 p-2 rounded border border-white/5">
              <span className="text-white/40 block text-[9.5px]">MATCH</span>
              <span className="font-semibold text-emerald-400">{activeCitation.relevance}</span>
            </div>
            <div className="bg-white/5 p-2 rounded border border-white/5">
              <span className="text-white/40 block text-[9.5px]">CONFIDENCE</span>
              <span className="font-semibold text-[#38BDF8]">{activeCitation.confidence}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
