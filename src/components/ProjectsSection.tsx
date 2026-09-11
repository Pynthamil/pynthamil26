"use client";

import React from "react";
import { portfolioData, Project } from "@/data/portfolio";
import { ArrowUpRight, FolderGit2 } from "lucide-react";

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
}) => {
  return (
    <section className="max-w-2xl mx-auto px-4 mb-20">
      <div className="flex items-center gap-2 mb-6">
        <FolderGit2 className="w-5 h-5 text-neutral-600" />
        <h2 className="text-sm font-semibold tracking-tight text-neutral-900">
          Selected Projects
        </h2>
      </div>

      <div className="divide-y divide-neutral-100 border-t border-b border-neutral-100">
        {portfolioData.projects.map((project: Project) => (
          <div
            key={project.title}
            onClick={() => onSelectProject(project)}
            className="group flex items-baseline justify-between py-3.5 px-2 -mx-2 rounded-lg cursor-dot hover:bg-neutral-50 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 flex-1">
              <span className="font-semibold text-sm text-neutral-900 min-w-[140px] group-hover:text-[#4e52ec] transition-colors">
                {project.title}
              </span>
              <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors flex items-center gap-1">
                {project.description}
                {project.status !== "soon" && (
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#4e52ec] transition-opacity" />
                )}
              </span>
            </div>
            <span
              className={`font-mono text-xs ml-4 shrink-0 ${
                project.status === "soon" ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              {project.year}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
